#!/usr/bin/env sh

# Related file: .githooks/_/README.md

# If the $HUSKY environment variable is set to 2 then make the shell
# print the commands (and their arguments) as they're executed.
[ "$HUSKY" = "2" ] && set -x
# h = the name of the Git hook (ex: commit-msg)
h="${0##*/}"
# s = the path of the Git hook script (ex: .githooks/commit-msg)
s="${0%/*/*}/$h"

# Only log the script if it doesn't contain the ".githooks/_/" substring.
if [[ $s != *.githooks/_/* ]]; then
  echo "🪝-ℹ️ Executing Git hook script: $s"
fi

# Check if the script exists; if it doesn't exist, log a warning and terminate with a zero status code.
[ ! -f "$s" ] && echo "🪝-⚠️ Git hook script not found: $s" && exit 0

# Check if the following files exist; if they do exist, source them.
for f in "${XDG_CONFIG_HOME:-$HOME/.config}/husky/init.sh" "$HOME/.huskyrc"; do
	# shellcheck disable=SC1090
	[ -f "$f" ] && . "$f"
done

# If the $HUSKY environment variable is set to 0 then terminate with a zero status code.
[ "${HUSKY-}" = "0" ] && exit 0

# Execute the Git hook script file along with its passed arguments.
sh -e "$s" "$@"
# Store the exit status code.
c=$?

# If the Git hook script exits with a non-zero status code then log the error(s) and exit with the status code.
[ $c != 0 ] && echo "🐶-❌ husky error - $h script failed (code $c)"
[ $c = 127 ] && echo "🐶-❌ husky error - command not found in PATH=$PATH"
exit $c
