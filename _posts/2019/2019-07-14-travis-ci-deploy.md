---
title: 'Deploying with Travis CI'
date: 2019-07-14T23:28:02.000Z
---

## Hello Travis!

I forgot to write a quick post about setting up [Travis CI](http://travis-ci.org) for building my website. After the investigations into rewriting [here](https://amcolash.com/2019/07/02/if-it-aint-broke-dont-fix-it.html) and [here](https://amcolash.com/2019/06/18/rewriting-my-website.html), I decided that it was too much work and I chose to stick with jekyll.

One of the pain points of working with this system is that since I am using some custom plugins, I am unable to have github pages auto-deploy my website. This means that to get an auto-deployed website, I need to go through a different 3rd party. Luckily this is where travis comes to the rescue!

Travis CI is a free CI/CD environment for open source projects and allows you to build and deploy code based on various triggers. For me, a simple push to the `master` branch of my website [Github Repo](https://github.com/amcolash/amcolash) will kick off a build. If all goes well, it then pushes that build to the `gh-pages` branch of my site. Using this configuration significantly reduced the complexity of updating my website and means that I do not need to remember to build before committing.

## Getting Things Running

I found some great sources of help on the internet, but of course customized my build to my tastes. One interesting pain-point that I ran into was getting github submodules checked out. I have a submodule that contains my current(ish) resume which I need to grab when building my site. I had to do some trickery to get that cloned since it is set up with an `ssh`-styled remote url. This is an issue since I prefer to use `ssh` to push to github instead of the `https` protocol (so I don't need to always specify my password). Based off of a conversation [here](https://github.com/algolia/examples/issues/24), others were having a similar issue.

The solution is fairly simple, just use `sed` to replace `git@github.com` with `https://github.com` in the `.gitmodules` file and then manually grab the module.

```yaml
# Handle git submodules yourself, based off of https://github.com/algolia/examples/issues/24
git:
  submodules: false
# Use sed to replace the SSH URL with the public URL, then initialize submodules
before_install:
  - sed -i 's/git@github.com:/https:\/\/github.com\//' .gitmodules
  - git submodule update --init --recursive
```

After getting the submodule working properly, the only other bits were getting some caching in place and setting up a github token to push to the repository. This is then set up as an environment variable for the build and the `.travis.yaml` file has access to it.

It is so nice to be able to have my blog now updated whenever I write a post. Oh, and I also get to use a fancy badge now so that I can see if things are working properly :grin:

[![Travis (.org)](https://img.shields.io/travis/amcolash/amcolash.svg)](https://travis-ci.org/amcolash/amcolash)

## Final `.travis.yml` Configuration

Here you can see the final `.travis.yml` file. What a simple little bit of code and a few checkboxes to get it all running! Travis is really fast and really worth it whether you have a public or private repo and can get you on the CI/CD pipeline quickly and painlessly.

```yaml
language: ruby
cache: bundler # caching bundler gem packages will speed up build

branches:
  only:
    - master

script:
  - JEKYLL_ENV=production bundle exec jekyll build --destination docs

deploy:
  provider: pages
  local-dir: ./docs
  skip-cleanup: true
  github-token: $GITHUB_TOKEN
  keep-history: true

############### Git Submodule (for resume) Hack ###############

# Handle git submodules yourself, based off of https://github.com/algolia/examples/issues/24
git:
  submodules: false
# Use sed to replace the SSH URL with the public URL, then initialize submodules
before_install:
  - sed -i 's/git@github.com:/https:\/\/github.com\//' .gitmodules
  - git submodule update --init --recursive
```
