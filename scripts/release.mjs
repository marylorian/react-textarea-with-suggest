#!/usr/bin/env node
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";

const args = new Set(process.argv.slice(2));
const valueArg = (name) => {
  const prefix = `${name}=`;
  return process.argv
    .slice(2)
    .find((arg) => arg.startsWith(prefix))
    ?.slice(prefix.length);
};

const dryRun = args.has("--dry-run");
const publish = args.has("--publish");
const push = args.has("--push");
const deployExample = args.has("--deploy-example");
const yes = args.has("--yes");
const provenance = args.has("--provenance");
const allowAnyCommits = args.has("--allow-any-commits");
const explicitType = valueArg("--type");
const allowedTypes = new Set(["patch", "minor", "major"]);

if (explicitType && !allowedTypes.has(explicitType)) {
  throw new Error("--type must be one of: patch, minor, major");
}

const run = (command, commandArgs = [], options = {}) => {
  const result = spawnSync(command, commandArgs, {
    encoding: "utf8",
    stdio: options.capture ? ["ignore", "pipe", "pipe"] : "inherit",
    shell: false,
    cwd: options.cwd,
  });

  if (result.status !== 0) {
    const details = options.capture
      ? `\n${result.stderr || result.stdout}`
      : "";
    throw new Error(
      `Command failed: ${command} ${commandArgs.join(" ")}${details}`
    );
  }

  return options.capture ? result.stdout.trim() : "";
};

const currentBranch = () =>
  run("git", ["branch", "--show-current"], { capture: true });
const gitStatus = () =>
  run("git", ["status", "--porcelain"], { capture: true });
const gitSubject = () =>
  run("git", ["log", "-1", "--pretty=%s"], { capture: true });
const pkg = () => JSON.parse(readFileSync("package.json", "utf8"));

const assertCleanWorktree = () => {
  const status = gitStatus();
  if (status) {
    throw new Error(`Release requires a clean working tree:\n${status}`);
  }
};

const latestTag = () => {
  const result = spawnSync(
    "git",
    ["describe", "--tags", "--abbrev=0", "--match", "v*"],
    {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }
  );
  return result.status === 0 ? result.stdout.trim() : "";
};

const getCommits = (fromTag) => {
  const range = fromTag ? `${fromTag}..HEAD` : "HEAD";
  const output = run(
    "git",
    ["log", range, "--pretty=format:%H%x01%s%x01%b%x02"],
    { capture: true }
  );

  return output
    .split("\x02")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [hash, subject, body = ""] = entry.split("\x01");
      return { hash, subject, body };
    })
    .filter(({ subject }) => !subject.startsWith("Merge "))
    .filter(({ subject }) => !subject.startsWith("chore(release):"));
};

const parseVersion = (version) => {
  const match = version.match(/^(\d+)\.(\d+)\.(\d+)$/);
  if (!match) {
    throw new Error(`Unsupported package version: ${version}`);
  }
  return match.slice(1).map(Number);
};

const bumpVersion = (version, type) => {
  const [major, minor, patch] = parseVersion(version);
  if (type === "major") return `${major + 1}.0.0`;
  if (type === "minor") return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
};

const classifyCommit = ({ subject, body }) => {
  const breaking = subject.includes("!:") || body.includes("BREAKING CHANGE");
  if (breaking) return "major";
  if (/^feat(\(.+\))?:/.test(subject)) return "minor";
  if (/^(fix|perf)(\(.+\))?:/.test(subject)) return "patch";
  return allowAnyCommits ? "patch" : null;
};

const determineReleaseType = (commits) => {
  if (explicitType) return explicitType;

  const priority = { major: 3, minor: 2, patch: 1 };
  return commits.reduce((selected, commit) => {
    const type = classifyCommit(commit);
    return priority[type] > priority[selected] ? type : selected;
  }, null);
};

const cleanSubject = (subject) =>
  subject
    .replace(
      /^(feat|fix|perf|docs|chore|refactor|test|build|ci)(\(.+\))?!?:\s*/i,
      ""
    )
    .replace(/^Bump\s+/i, "Bump ");

const changelogSection = (commit) => {
  const subject = commit.subject;
  if (subject.includes("!:") || commit.body.includes("BREAKING CHANGE"))
    return "Breaking Changes";
  if (/^feat(\(.+\))?:/.test(subject)) return "Implemented enhancements";
  if (/^(fix|perf)(\(.+\))?:/.test(subject)) return "Fixed bugs";
  return "Changes";
};

const repositoryUrl = () => {
  const raw = run("git", ["config", "--get", "remote.origin.url"], {
    capture: true,
  });
  return raw
    .replace(/^git@github.com:/, "https://github.com/")
    .replace(/^git\+/, "")
    .replace(/\.git$/, "");
};

const formatNotes = (commits) => {
  const repo = repositoryUrl();
  const sections = new Map();

  for (const commit of commits) {
    const section = changelogSection(commit);
    if (!sections.has(section)) sections.set(section, []);
    const shortHash = commit.hash.slice(0, 7);
    const link = repo
      ? ` ([${shortHash}](${repo}/commit/${commit.hash}))`
      : ` (${shortHash})`;
    sections.get(section).push(`- ${cleanSubject(commit.subject)}${link}`);
  }

  return [...sections.entries()]
    .map(([section, lines]) => `**${section}:**\n${lines.join("\n")}`)
    .join("\n\n");
};

const updateChangelog = (version, commits) => {
  const path = "CHANGELOG.md";
  const current = readFileSync(path, "utf8");
  const date = new Date().toISOString().slice(0, 10);
  const notes = formatNotes(commits);
  const entry = `## v${version} (${date})\n\n${notes}\n\n`;

  if (!current.startsWith("# Changelog\n\n")) {
    throw new Error("CHANGELOG.md must start with '# Changelog'");
  }

  if (current.includes(`## v${version} `)) {
    console.log(
      `CHANGELOG.md already contains v${version}; keeping existing entry.`
    );
    return;
  }

  writeFileSync(
    path,
    current.replace("# Changelog\n\n", `# Changelog\n\n${entry}`)
  );
};

const assertTagExists = (tagName) => {
  const result = spawnSync(
    "git",
    ["rev-parse", "--verify", `refs/tags/${tagName}`],
    {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      shell: false,
    }
  );

  if (result.status !== 0) {
    throw new Error(`Expected ${tagName} to exist before publishing.`);
  }
};

const packageVersionExists = ({ name, version }) => {
  const result = spawnSync("npm", ["view", `${name}@${version}`, "version"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    shell: false,
  });

  return result.status === 0 && result.stdout.trim() === version;
};

const publishPackage = (packageInfo) => {
  if (!process.env.NODE_AUTH_TOKEN && !process.env.NPM_TOKEN) {
    throw new Error("Publishing requires NODE_AUTH_TOKEN or NPM_TOKEN.");
  }

  if (packageVersionExists(packageInfo)) {
    console.log(
      `${packageInfo.name}@${packageInfo.version} is already published.`
    );
    return;
  }

  const publishArgs = ["publish", "--access", "public"];
  if (provenance) publishArgs.push("--provenance");
  run("npm", publishArgs);
};

const packPackage = () => {
  const packDir = mkdtempSync(join(tmpdir(), "react-textarea-with-suggest-"));
  const output = run("npm", ["pack", "--pack-destination", packDir], {
    capture: true,
  });
  const fileName = output.split("\n").filter(Boolean).at(-1);

  if (!fileName) {
    throw new Error("npm pack did not produce a tarball name.");
  }

  return join(packDir, fileName);
};

const deployExampleApp = (packageInfo) => {
  const tarball = packPackage();
  console.log(
    `Deploying example with ${packageInfo.name}@${packageInfo.version} from ${tarball}`
  );

  run("npm", ["ci", "--ignore-scripts"], { cwd: "example" });
  run(
    "npm",
    [
      "install",
      "--no-save",
      "--package-lock=false",
      "--ignore-scripts",
      tarball,
    ],
    { cwd: "example" }
  );
  run("npm", ["run", "build"], { cwd: "example" });
  run(
    "npm",
    [
      "run",
      "deploy",
      "--",
      "-u",
      "github-actions[bot] <41898282+github-actions[bot]@users.noreply.github.com>",
    ],
    {
      cwd: "example",
    }
  );
};

const main = () => {
  const packageInfo = pkg();
  const releaseTag = `v${packageInfo.version}`;

  if (gitSubject().startsWith("chore(release):")) {
    if (publish) {
      assertTagExists(releaseTag);
      publishPackage(packageInfo);
      if (deployExample) {
        deployExampleApp(packageInfo);
      }
    } else {
      console.log("Latest commit is already a release commit; nothing to do.");
    }

    return;
  }

  if (publish && latestTag() === releaseTag) {
    assertTagExists(releaseTag);
    publishPackage(packageInfo);
    if (deployExample) {
      deployExampleApp(packageInfo);
    }
    return;
  }

  if (!dryRun) {
    assertCleanWorktree();
  }

  const tag = latestTag();
  const commits = getCommits(tag);
  const releaseType = determineReleaseType(commits);

  if (!releaseType || commits.length === 0) {
    console.log("No release-worthy commits found; nothing to release.");
    return;
  }

  const nextVersion = bumpVersion(packageInfo.version, releaseType);
  console.log(`Preparing ${releaseType} release: v${nextVersion}`);

  if (dryRun) {
    console.log(formatNotes(commits));
    return;
  }

  if (!yes && !process.env.CI) {
    throw new Error("Pass --yes to create a release.");
  }

  run("npm", ["version", nextVersion, "--no-git-tag-version"]);
  updateChangelog(nextVersion, commits);
  run("npm", ["run", "build"]);
  run("npm", ["run", "prettier:check"]);
  run("npm", ["test"]);

  run("git", [
    "add",
    "package.json",
    "package-lock.json",
    "CHANGELOG.md",
    "lib",
  ]);
  run("git", ["commit", "-m", `chore(release): v${nextVersion} [skip ci]`]);
  run("git", ["tag", "-a", `v${nextVersion}`, "-m", `v${nextVersion}`]);

  if (publish) {
    publishPackage({ ...packageInfo, version: nextVersion });
  }

  if (deployExample) {
    deployExampleApp({ ...packageInfo, version: nextVersion });
  }

  if (push) {
    const branch = currentBranch() || "master";
    run("git", ["push", "origin", `HEAD:${branch}`, "--follow-tags"]);
  }
};

main();
