#!/bin/bash

REACT_ENV_PREFIX="REACT_APP_"
cp .env.sample .env
echo "backend/ frontend/ test/" | xargs -n 1 cp -v .env

NEW_PREFIXED_STR=""
REACT_ENV_FILE='frontend/.env'
cat "$REACT_ENV_FILE" | while read line; do echo $REACT_ENV_PREFIX"${line}"; done > "$REACT_ENV_FILE.tmp"
cp "$REACT_ENV_FILE.tmp" "$REACT_ENV_FILE"
rm "$REACT_ENV_FILE.tmp"
