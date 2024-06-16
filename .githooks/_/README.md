# .githooks/\_/husky.sh

## Summary

- Description: husky.sh shell script adapted from the original husky template for Git hooks.
- Documentation: https://typicode.github.io/husky/
- Repository: https://github.com/typicode/husky
- Version: 9.0.11

## Upgrading the husky version

1. Run the following commands:

```sh
npm install --save-dev --save-exact husky@latest
npx husky init
npm run init
```

2. Compare the Git diffs between the following files and incorporate the changes from the former into the latter:

| Former               | Latter                  |
| :------------------- | :---------------------- |
| .husky/\_/h          | .githooks/\_/husky.sh   |
| .husky/\_/commit-msg | .githooks/\_/commit-msg |
| .husky/\_/pre-commit | .githooks/\_/pre-commit |
| .husky/\_/pre-push   | .githooks/\_/pre-push   |

3. Delete the .husky/ directory.

4. Commit the changes to the files in the .githooks/ directory.
