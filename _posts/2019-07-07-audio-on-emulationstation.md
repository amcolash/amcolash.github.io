---
layout: post
title: "Fixing Audio on EmulationStation"
date: 2019-07-04 23:45:06
---

A few days ago, I went over the steps to getting updated software onto my [RetroStone](https://www.8bcraft.com/product/retrostone/) retro gaming device. It is linux-based and has internals similar to an OrangePi. Fortunately there is a big open source community for emulating old games and there is some great software called [RetroPie](https://retropie.org.uk/)) and [EmulationStation](https://emulationstation.org/) which set everything up for you.

After the update, I had a handful of issues and needed to tweak some configurations to get things functioning again. One of my big issues was with a broken audio setup in `EmulationStation`. The audio menu did not work properly and I kept getting on the error  `VolumeControl::init() - Failed to find mixer elements!` logged to my console. After a lot of searching and trial and error I found directions on the [retropie wiki](https://github.com/RetroPie/RetroPie-Setup/wiki/Sound-Issues) which explain how to get the audio set up.

Unfortunately the update had introduced a new feature that I was not aware of. It now broke up audio devices into devices and mixers - instead of previously just devices. The upgrade did its best effort to get it configured, but the RetroStone apparently has a non-standard audio device setup.

I needed to edit the file `/opt/retropie/configs/all/emulationstation/es_settings.cfg` to properly set up the audio card / device (mixer).
```
<string name="AudioCard" value="sysdefault" />
<string name="AudioDevice" value="Lineout volume control" />
```

Now that audio was again working in `EmulationStation`, I thought my work was done. Soon after changing that value however, I started seeing another error `ALSA lib pcm.c:7843:(snd_pcm_recover) underrun occurred`. Following advice from the reddit post [here](https://www.reddit.com/r/RetroPie/comments/5lo9jj/sound_issues_alsa_underrun_with_usb_audio/dbx6ox6?utm_source=share&utm_medium=web2x), I got more issues ironed out with audio and emulation station.

I simply had to edit `/etc/asound.conf` and change the sound buffer settings:
```
period_size = 4096
buffer_size = 32768
```

Now that my audio on the device is working properly, I think that my tweaking is almost done. The last step is going to be working on getting my wifi working more reliably than it currently is.