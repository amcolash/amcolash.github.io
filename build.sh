#!/bin/bash

pushd resume
./export.js
popd

JEKYLL_ENV=production jekyll build
