---
title: 'Building a Better RetrOrangePie'
date: 2019-07-05T04:45:06.000Z
---

## Dealing with Old Software

Open Source software can be such a double-edged sword for me. A lot of times I want that one extra little feature or customization. If you take a look over at my [Github](https://github.com/amcolash) you will see that (as of writing) I have 80 repositories with about 1/4 being forks of other projects. I often add a small change and file a PR or use the code as a starting point for another project. I love being able to share code and being able to tweak things to my hearts content.

This nature of tweaking and getting things "just right" often leads me late into the night to get things just how I want them. The end result is always satisfying, but I find the journey and satisfaction of knowing I got it working how _I_ wanted is the best part. I wrote about hacking my [RetroStone](https://www.8bcraft.com/product/retrostone/) - a portable emulating device in the form factor of a GameBoy. I love the little thing, but want so much more! Last time I was writing about getting some aspects of wifi working on the device. This time I am going to walk through the things I did to get a much more updated set of software running on the device.

When I initially got the device, I flashed version 1.3 of the [SupremeRetrostone](http://forum.8bcraft.com/viewtopic.php?t=1818) image (a modified version of [RetrOrangePie](http://retrorangepi.org) - a fork of [RetroPie](https://retropie.org.uk/)) which provides a nice front-end for emulating a whole handful of systems using [EmulationStation](https://emulationstation.org/) and [RetroArch](https://www.retroarch.com/). Needless to say, it is a pretty large amount of software working together to get things happily working together.

## Upgrading from Source

The last update to RetrOrangePie (and by association Supreme Retrostone) was about 8 months ago at the time of writing. While a lot of the packages for the debian-based system could be updated with `apt`, this image is also running on debian jessie - which has reached EoL and has started to lose backport updates. This makes things harder to upgrade and means a lot more compiling from source. Luckily, to update most of the interesting emulation packages, the `RetroPie-Setup` scripts provide a simple way to grab and compile the sources of these different bits.

There are 5 categories of packages/tools that RetroPie supports - `core`, `main`, `optional`, `driver` and `experimental`. Of those 5, most of my packages were from `core`, `main` and `optional`.

Out of the box, the `core` parts (like retroarch - w/o emulator cores and emulationstation) compiled mostly well. I was however not able to compile EmulationStation immediately. I was running into errors with a missing library named `rapidjson-dev` and since it was a newer package, it did not exist in the legacy repositories. I was able to find some more info with this [forumn thread](https://retropie.org.uk/forum/topic/21542/rapidjson-dev-package-not-available/6) and eventually found a pre-built `.deb` package to install via `dpkg`.

The next step was to work on `main` - which contains most of the emulators that I am using. This one made me the most nervous as it was a whole handful of emulators that had all kinds of dependencies that would need to be fetched manually if they were not in the jessie repositories. A few hours later, I came back and found that only 2 of the 20 or so emulators failed to build: `mupen64plus` and `lr-caprice32`. I was not too worried about this and decided to move on since I already had an older but functioning emulator for n64 and hadn't been emulating amstrad at all.

Onto `optional`! I only tried to update and build some of the packages here since I only wanted some emulators to work for my own use (mainly nes, snes, genesis, gb, gbc, gba, psx, n64 and some of the atari variants). Things went smoothly for `lr_snes9x`, `lr-beetle-gb` and `scummvm`.

Overall things went pretty smoothly! Now I have an up-to-date little machine. There are some individual patches I think I may need to apply to get `retroarch` working exactly how I want but I was happy at just how painless things were on the whole. I also will be unpacking the configurations from SupremeRetrostone on top of the device so that it is pre-optimized.

Until next time, happy gaming!
