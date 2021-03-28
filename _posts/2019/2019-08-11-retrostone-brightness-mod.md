---
title: 'RetroStone Brightness Mod'
date: 2019-08-11T08:24:19.000Z

images:
  - _target:
    url: '/assets/img/blog/2019/retrostone-brightness/IMG_5369.jpg'
    alt: 'Final Result of Brightness vs. Darkness'
  - _target:
    url: '/assets/img/blog/2019/retrostone-brightness/IMG_20190810_230641.jpg'
    alt: 'Potentiometer Rig'
  - _target:
    url: '/assets/img/blog/2019/retrostone-brightness/IMG_20190810_231450.jpg'
    alt: 'Attached Potentiometer Rig'
  - _target:
    url: '/assets/img/blog/2019/retrostone-brightness/IMG_20190811_002407.jpg'
    alt: 'Step Up Converter'
  - _target:
    url: '/assets/img/blog/2019/retrostone-brightness/IMG_20190811_183824.jpg'
    alt: 'LCD Modifications'
  - _target:
    url: '/assets/img/blog/2019/retrostone-brightness/IMG_20190811_185759.jpg'
    alt: 'Final Brightness Mod'
---

## The Problem

One of the things I didn't like about the RetroStone was the lack of control over the LCD backlight. It was just a bit too bright at night time for me. I decided to look into modifying the portable console for varying the brightness. Surprisingly, it wasn't as bad as expected but did take a lot of work and I ended up breaking the original screen in the process - luckily replacements are cheap ($15-$20 on Amazon / eBay).

The screen installed is a slightly modified [LQ035NC111](http://aitendo3.sakura.ne.jp/aitendo_data/product_img/lcd/tft/AT035DL01/LQ035NC111.pdf). It appears that the original screen has some modifications so that it is flipped upside-down, and thus a direct replacement is not easily possible (more on this later). After investigating into the backlight, it appears it is a simple LED panel. The data sheet says to power it somewhere between 18.6 - 21 volts, however it looks like the RetroStone powers it at a much lower voltage, something like 15.6v (I think, it has been a week or two since I did the research and forgot to take notes).

## The Solution

After some research, one person on sudomod came up with a [clever solution](https://sudomod.com/forum/viewtopic.php?t=7512) to driving the backlight at varying brightnesses without needing a pwm controller. The idea is to add a resistor (10k in this case, I used [these](https://www.amazon.com/gp/product/B013FPKCMM)) in series with the power line of the backlight which sufficiently dims the backlight. My first attempt was an exact duplication of this, but things didn't work quite right. It appears that the step-up circuit that is built in to drive the LED panel is a bit picky and if things aren't hooked up properly sits at 3.6v instead of the expected voltage to drive the panel.

To combat this I needed to add in my own little step up converter. I used [this one](https://www.amazon.com/gp/product/B01N9ZVXTR) due to its small form factor. I hooked up the VIN + GND to some of the power holes on the retrostone. Attaching the 10k potentiometer in line with this step up converter and the output to the backlight did the trick! Now the hard part was getting everything to fit inside, since there is not a ton of space inside the shell for oddly shaped things.

I stuck the pot on a piece of perf board that I cut to fit near the battery. Using some hot glue and magic, I got it to stay in place and cut an opening for the dial to fit through. Additionally, I glued the step up converter directly above the L1/L2/R1/R2 button board. Below are a bunch of photos that I took that may help you do something similar! Hopefully this can help and inspire some other makers to follow suit.
