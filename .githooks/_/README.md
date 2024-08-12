# .githooks/\_/husky

## Summary

- Description: husky shell script adapted from the original husky template for Git hooks.
- Documentation: https://typicode.github.io/husky/
- Repository: https://github.com/typicode/husky
- Version: 9.1.4

## Upgrading the husky version

1. Begin by running the following commands:

```sh
# Upgrade to the latest version of husky.
npm install --save-dev --save-exact husky@latest

# Re-initialize the `.husky` folder and its Git hook files.
npx husky init
```

2. Open the `package.json` file and delete the unneeded `prepare` script that was added by the previous `husky init` command.

3. Execute the `npm run init` command to re-configure the Git hooks path back to the `.githooks/` directory.

4. Compare the Git diffs between the following files and incorporate the changes from the former into the latter:

| Former               | Latter                  |
| :------------------- | :---------------------- |
| .husky/\_/h          | .githooks/\_/husky      |
| .husky/\_/commit-msg | .githooks/\_/commit-msg |
| .husky/\_/pre-commit | .githooks/\_/pre-commit |
| .husky/\_/pre-push   | .githooks/\_/pre-push   |

5. Delete the `.husky/` directory.

6. Commit the changes to all modified files.
