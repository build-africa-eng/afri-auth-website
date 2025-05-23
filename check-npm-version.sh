#!/bin/bash

# Check if the version file exists
if [ ! -f .npmrc-version ]; then
  echo "No .npmrc-version file found."
  exit 1
fi

# Read expected version
EXPECTED_VERSION=$(cat .npmrc-version)
CURRENT_VERSION=$(npm -v)

# Compare versions
if [ "$CURRENT_VERSION" != "$EXPECTED_VERSION" ]; then
  echo "WARNING: Expected npm version $EXPECTED_VERSION, but found $CURRENT_VERSION."
  echo "To fix this, run: npm install -g npm@$EXPECTED_VERSION"
else
  echo "Correct npm version ($CURRENT_VERSION) is in use."
fi