#!/usr/bin/env sh

# Description   - husky.sh shell script adapted from the original husky template for Git hooks.
# Documentation - https://typicode.github.io/husky/
# Repository    - https://github.com/typicode/husky
# Version       - 9.0.11
#
# To upgrade the husky version:
#
# 1. Run the following commands:
#
#    ```sh
#    npm install --save-dev --save-exact husky@latest
#    npx husky init
#    npm run init
#    ```
#
# 2. Compare the Git diffs between the following files and incorporate the changes from the former into the latter:
#
#    | Former                 | Latter              |
#    | :--------------------- | :------------------ |
#    | .githooks/_husky.sh    | .husky/_/h          |
#    | .githooks/_/commit-msg | .husky/_/commit-msg |
#    | .githooks/_/pre-commit | .husky/_/pre-commit |
#    | .githooks/_/pre-push   | .husky/_/pre-push   |
#
# 3. Delete the .husky/ directory.
#
# 4. Commit the changes to the files in the .githooks/ directory.

[ "$HUSKY" = "2" ] && set -x
h="${0##*/}"
s="${0%/*/*}/$h"

[ ! -f "$s" ] && exit 0

for f in "${XDG_CONFIG_HOME:-$HOME/.config}/husky/init.sh" "$HOME/.huskyrc"; do
	# shellcheck disable=SC1090
	[ -f "$f" ] && . "$f"
done

[ "${HUSKY-}" = "0" ] && exit 0

sh -e "$s" "$@"
c=$?

[ $c != 0 ] && echo "husky - $h script failed (code $c)"
[ $c = 127 ] && echo "husky - command not found in PATH=$PATH"
exit $c
