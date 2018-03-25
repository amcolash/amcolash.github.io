#!/bin/bash

# Run new build of static content
JEKYLL_ENV=production bundle exec jekyll build

# Run new build of resume
pushd resume
    ./index.js
popd

# Copy resume to output folder
mkdir docs/resume
cp -r resume/public/* docs/resume/