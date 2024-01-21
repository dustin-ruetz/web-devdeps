#!/usr/bin/env sh

# Description   - husky.sh shell script adapted from the original husky template for Git hooks.
# Documentation - https://typicode.github.io/husky/
# Repository    - https://github.com/typicode/husky
# Version       - 8.0.3
#
# To upgrade the version of husky:
#
# 1. Run the following commands:
#
# ```sh
# npm install --save-dev --save-exact husky@latest
# npx husky install ./.githooks/
# ```
#
# 2. Compare the Git diffs between the .githooks/husky.sh and .githooks/_/husky.sh files
#    and incorporate the changes from the latter into the former.
#
# 3. Commit the changes to the .githooks/husky.sh file.
#
# 4. Delete the .githooks/_/ directory.

if [ -z "$husky_skip_init" ]; then
  debug () {
    if [ "$HUSKY_DEBUG" = "1" ]; then
      echo "husky (debug) - $1"
    fi
  }

  readonly hook_name="$(basename -- "$0")"
  debug "starting $hook_name..."

  if [ "$HUSKY" = "0" ]; then
    debug "HUSKY env variable is set to 0, skipping hook"
    exit 0
  fi

  if [ -f ~/.huskyrc ]; then
    debug "sourcing ~/.huskyrc"
    . ~/.huskyrc
  fi

  readonly husky_skip_init=1
  export husky_skip_init
  sh -e "$0" "$@"
  exitCode="$?"

  if [ $exitCode != 0 ]; then
    echo "husky - $hook_name hook exited with code $exitCode (error)"
  fi

  if [ $exitCode = 127 ]; then
    echo "husky - command not found in PATH=$PATH"
  fi

  exit $exitCode
fi
