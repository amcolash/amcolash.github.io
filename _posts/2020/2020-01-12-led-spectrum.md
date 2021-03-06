---
title: 'LED Spectrum Clock'
date: 2020-01-12T19:42:10.000Z

images:
  - _target:
    url: '/assets/img/blog/2020/led-spectrum/IMG_20191101_224504_01.jpg'
    alt: 'ESP8266 w/ header connection for LED Matrix'
  - _target:
    url: '/assets/img/blog/2020/led-spectrum/IMG_20191109_203726.jpg'
    alt: 'Audio amplifier module and back of board'
  - _target:
    url: '/assets/img/blog/2020/led-spectrum/MVIMG_20191103_111655_01.jpg'
    alt: 'Testing on breadboard with oscilloscope'
  - _target:
    url: '/assets/img/blog/2020/led-spectrum/IMG_20200223_223522.jpg'
    alt: 'Final module with ATTiny85 and ambient light sensor'
  - _target:
    url: '/assets/img/blog/2020/led-spectrum/IMG_20200223_223530.jpg'
    alt: 'Ambient light sensor'
  - _target:
    url: '/assets/img/blog/2020/led-spectrum/MVIMG_20200218_091417.jpg'
    alt: 'Final Spectrum with Spotify song display'
---

I was looking around on [aliexpress](https://aliexpress.com/) recently for interesting parts and saw a ton of cheap LED matrix displays selling for very cheap. I quickly found a very cheap 64x32 LED matrix for $13 + $10 shipping for a total of \$23 - a great deal for 2048 bright rgb leds. Since I have really been into the ESP8266 board lately, I chose to use one of them in my project so it could grab info from the internet if needed. My living room has been in need of a clock as it is, so I decided to make a nice clock display for the room.

## Features

In addition to telling the time, I also wanted to have a spectrum analyzer for music playing on my stereo, current temperature outside. Later on as a bonus, I added in a simple ambient light sensor found in night lights to make the display dim at night time or when the lights go out. Finally I added a cool song ticker that replaces the date when a song starts playing from Spotify (more info after the fold).

## Parts List (Other than standard things like resistors + caps)

The list of items I needed (out of standard electronic parts) was fairly straightforward as I have a ton of things laying around.

- LED Matrix (P3, 64x32)
- Power Supply for Display (5V, 2-3A - since I am not going for brightness or fully lit, YMMV)
- ESP8266
- ATTiny85

## Making the Board

There were plenty of challenges getting the display hooked up and running. After I was able to get it displaying things, I needed to make it modular so that (in the future as I guessed) I could add on extra parts. I found that in addition to simply telling the time, I wanted to use it as a spectrum analyzer/visualizer for music playing on my stereo. Also, I wanted to have an ambient light sensor (photoresistor) so I needed a way to read sensor data.

Unfortunately, soon after making the ESP8266 header board that connected to the display as documented in the [PxMatrix](https://github.com/2dom/PxMatrix) library that I used, I found that I didn't have enough inputs for everything I wanted. I also found that the ADC on the ESP8266 is pretty slow and not sufficient for sampling audio data.

As a result, I added in a small ATTiny85 to talk over I2C which was possible by reprogramming the `RX` pin of ESP as an output and then using the one free analog input as a digital input (more on the software below).

I needed to make a small audio amplifier module (simple boost with a bias) as well as a little socket for the ATTiny and connection for the photoresistor.

I don't have a schematic for this project as it was all hand assembled, but let me tell you - that was a big mistake and something I will probably do next time as the complexity without and without a dedicated PCB made it much harder to work with.

## Software

There was a ton of software that I wrote for this project to make things talk together and happy.

- ESP8266 firmware for the main board - [github](https://github.com/amcolash/ESP8266/tree/master/led_spectrum)
- ATTiny85 firmware for the audio module which does FFT + ambient light reading - [github](https://github.com/amcolash/ATTiny85/tree/master/fft_i2c)
- Web App for customizing the colors of the display - [github](https://github.com/amcolash/led_spectrum_remote)
- Addition to my "Universal Remote" application to override brightness - [github](https://github.com/amcolash/UniversalRemote)
- Status Monitor plugin for sending Spotify Now Playing song to the ESP8266 - [github](https://github.com/amcolash/status-scripts)

## Challenges

The hardest parts of this project were getting a fast FFT (visualization) of the audio data. At first, I was using the ESP with the built-in ADC to record audio data. Unfortunately, this was slow and caused a lot of flickers on the display as it blocked the processor as the sampling happened. I decided to change my approach and offload that work to the ATTiny85. This made things much quicker and only required the ESP to poll over I2C for data as necessary and freed up resources to keep the display smooth and flicker-free. I based a lot of my code off of the work done Emmanuel Odunlade in his OLED ATTiny85 spectrum analyzer [project](https://www.electronics-lab.com/project/32-band-audio-spectrum-analyzer-using-oled-display-and-attiny85/).

Getting Spotify data to the ESP was a bit tricky. To only update when needed and to reduce the amount of work that the ESP needed to do (to reduce flicker), I needed to offload this to a different device. I then poll the [Spotify Connect Web API](https://developer.spotify.com/documentation/web-api/guides/using-connect-web-api/) on my personal server and when I notice a song change, I POST that data to the ESP. The ESP then has a small function to scroll the text across the screen, but never has to deal with OAUTH2 or polling.
