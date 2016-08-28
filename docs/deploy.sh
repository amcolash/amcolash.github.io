#!/bin/sh

if [ ! -d ".gh-pages"  ]; then
  git clone git@github.com:amcolash/amcolash.github.io.git .gh-pages
fi

jekyll build

cd .gh-pages

git checkout master
$commit_message = "$(git log -1 --pretty=%B)"
git checkout gh-pages
rm -rf *
cp -r ../_site/* .

git pull
git add .
git commit -m "$commit_message"
git push
