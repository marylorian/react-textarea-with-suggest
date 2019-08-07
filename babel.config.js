module.exports = function (api) {
  api.cache(true);

  const presets = [["@babel/preset-env", {"modules": false}],
    "@babel/preset-react"];
  const plugins = [["@babel/plugin-proposal-decorators", {"legacy": true}],
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    ["@babel/plugin-proposal-class-properties", {
      "loose": true
    }],
    "@babel/plugin-transform-arrow-functions",
    "@babel/plugin-proposal-json-strings",
    "@babel/plugin-proposal-function-sent",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-throw-expressions"];

  return {
    presets,
    plugins
  };
};