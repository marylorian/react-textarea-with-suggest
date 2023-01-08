# Getting Started

In this repo installed minimum tests coverage as 85%.
Coverage and prettier checks will run in `pre-commit` and `pre-push` hooks

## Set up initial setting

`npm install`
`npx husky install`

## Contribution

### To update version

1. update [CHANGELOG.md](../CHANGELOG.md)
2. `npm run build`
3. commit changes
4. `npm version {major|minor|patch}`
5. `npm publish`
6. push changes

### To update Demo page

`npm run deploy:demo`
