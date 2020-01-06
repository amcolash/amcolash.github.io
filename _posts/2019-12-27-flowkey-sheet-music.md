---
layout: post
title: 'Flowkey Sheet Music Scraper'
date: 2019-12-27 14:45:16
---

Note: This post mentions the paid service flowkey, it is not sponsored in any way - I just really like it! Also, I am not sure if this breaks their TOS but I am not wanting to abuse their service - just to help me learn a few songs here and there.

# Learning Piano with Flowkey

Recently, I got a piano to play as a new hobby. It has been great learning to play and having a new creative outlet for when I need it. Since it had been about 15 years since I last played, I needed a way to learn. Luckily, I found a site/app called [flowkey](https://flowkey.com/).

![flowkey](/assets/img/blog/flowkey/flowkey.jpg)

Flowkey works by connecting a computer or mobile device via MIDI or listening with a microphone. As you play the different notes, it moves along the sheet music. Until you correctly play the right notes, it will not continue moving along the music. If you are learning piano, definitely take a look at it - it's quite reasonable. There are a whole bunch of songs to learn at your own pace and they also have some lessons as well.

# Getting Sheet Music

Although flowkey is great for learning music, you can't print the sheet music by itself. Having the entire music in front of you without needing an app is quite useful for mastering a song without any help. Of course, since it is a webapp I started digging.

I found quickly that the music is served as a series of images to the browser. I started writing a script to grab the images and stitch them together. After I had and started looking at each image, I found they are not necessarily split by meausure but instead at a fixed pixel value.

Trying to make sheet music as you would see it in the wild reuires breaks in the music every few measures, similar to a paragraph with words and wrapping along between lines.

# Parsing the Image

Luckily there are ways to turn images into music! I found an open source program called [audiveris](https://github.com/Audiveris/audiveris) which does Optical Music Recognition (OMR), which similar to OCR allows images to be converted into sheet music. The sheet music is stored in the [MusicXML](http://www.musicxml.com/) format - an open standard for storing sheet music.

The parsed music is surprisingly accurate and with a few small tweaks can be an exact duplicate. I use a service called [noteflight](https://www.noteflight.com/) to fix up the music and then to export.

# The [Code](https://gist.github.com/amcolash/433421a9a729ef42461b48bd006c50af)

Now that I have explained a bit about the the problem and how I got here, here is a [gist](https://gist.github.com/amcolash/433421a9a729ef42461b48bd006c50af). With the code I have used. The file `flowkey.js` is used to grab the base url from flowkey (just paste it into your js debugger console). After running that, you will need to run `noteflight.sh` which grabs the images, stiches them, runs audiveris and finally tries to open noteflight.

Hopefully the code has enough comments inline to explain the process!
