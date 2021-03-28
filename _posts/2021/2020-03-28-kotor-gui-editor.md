---
title: 'KotOR Gui Editor'
date: 2021-03-28T13:40:18.000Z

images:
  - _target:
    url: '/assets/img/blog/2021/kotor-gui-editor/dark.png'
    alt: 'Dark Mode, Editing the galaxy map'
  - _target:
    url: '/assets/img/blog/2021/kotor-gui-editor/light.png'
    alt: 'Light Mode, Editing the computer gui (with drag and drop)'
---

Back in 2020, I was playing an older video game that I enjoyed as a teenager. That game is Star Wars: Knights of the Old Republic (KotOR), an RPG with a rich backstory and great character customizations. There are a lot of cool aspects to this game, but one of the best features of the PC version is the rich modding community. This game uses the same game engine as other Bioware games (like neverwinter nights) and so there are some great tools to help mod.

## Making Things Modern

One of the best parts of modding old games is that you can upscale the game to make it look even nicer. One of the drawbacks is when the UI is stretched or placed in the wrong spot. There have been some modders in the past who figured out some what was required to make the ui scale with screen sizes, but it was not a perfect system and required a lot of manual placement and fiddling to make things look nice. I wanted to build a tool so that I could tweak things in a reliable way and to test that things looked nice without having to restart the game each time.

## Building a Modding Tool

Given that my go to tech stack lately has been node and friends, I decided to build an electron app. This app would visually allow the user to rearrange parts of the ui and modify the game files in a predictable way.

There are a few things that happen behind the scenes with this tool:

- Extract gui metadata using [xoreos-tools](https://github.com/xoreos/xoreos-tools)
- Extract game textures and convert them to a format viewable in web
- Lay out the ui with html / css and show the textures
- Modify the extracted `.xml` file with changes
- Repackage the modified game gui asset

## Nice Extras

Since the tool is written with electron, I thought it would be nice to make it cross-platform. Since `xoreos-tools` has builds for all x86 platforms, this turned out to be pretty simple. I set up a build to package the os-specific tools for each platform as needed and then figured out a few quirks with file paths between them all.

The only other bit was getting an auto-deploying build. I got that working with Github Actions. In the past I used travis ci for a lot of my builds but the integration of Github Actions has been really slick based on some previous projects so I decided to stick with it. I really like it better than travis because it is integrated directly into the github ui and also has a completely free tier - unlike travis which recently discontinued that, due to crypto bots.

## Getting Started

Using the tool is quite easy to do, all you need to do is head over to my [Github Repo](https://github.com/amcolash/kotor-gui-editor). The `README` lays out installation, as well as getting the proper tools in place to work on things. Hopefully this is as useful for you as it has been for me! I have used it to make some 1080p-compatible layouts.
