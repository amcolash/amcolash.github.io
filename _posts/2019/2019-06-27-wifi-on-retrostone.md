---
title: 'Setting Up WiFi On a RetroStone'
date: 2019-06-28T02:15:56.000Z
---

I recently got a really cool little retro gaming console called a [RetroStone](https://www.8bcraft.com/product/retrostone/) which allows me to run all kinds of retro emulators and re-live my childhood on the go. It is a pretty slick piece of tech with a completely custom-built PCB and case. A comprable DIY raspberry pi zero build costs about the same but with a single core instead of the RetroStone's quad core H3 processor. Emulating N64 and PS1 is a breeze and works smoothly for almost all but the most demanding games out there!

Now that I had such a cool piece of tech to work on, it was time to get some games on it. It has a built in ethernet port so I ssh'ed in and went to town. Later that night I realized I had forgotten Zelda: Links Awakening a game I really loved playing as a kid had been missed when I copied some games I owned over. It would have been great to do it without powering off and taking out the SD and without needing cables. Luckily I had a $3 wifi dongle sitting around.

## The Issue

Little did I know that getting wifi working on this little device would be quite a headache (and it still isn't fully working properly).

I started by figuring out what wifi dongle I had. It turns out I had a variant of the 8812EU chip, which _SHOULD_ be supported out of the box on most linux kernels going back some time. Of course, plug and play never quite seems to work on any SBC.

I started by installing headers for my kernel (3.4.113-sun8i a very old kernel at the time of writing) and trying to compile various versions of drivers I found for the 8812EU. These efforts didn't get me too far and after fighting with trying to get things working I threw in the towel on this front. It was a lot of work and there must be support already since it looked like the usb device was being picked up by `lsusb`.

Next, I decided to read through the logs from `dmesg` and here things got more interesting. Here is what happened after I plugged the device in

```accesslog
[  843.112752] ehci_irq: highspeed device connect
[  843.380223] usb 3-1: new high-speed USB device number 2 using sunxi-ehci
[  843.532354] usb 3-1: New USB device found, idVendor=0bda, idProduct=8179
[  843.532394] usb 3-1: New USB device strings: Mfr=1, Product=2, SerialNumber=3
[  843.532424] usb 3-1: Product: 802.11n WLAN NIC
[  843.532447] usb 3-1: Manufacturer: Realtek
[  843.599057] RTL871X: module init start
[  843.599093] RTL871X: rtl8188eu v4.3.0.6_12167.20140828
[  843.599115] RTL871X: build time: Feb  9 2019 20:17:07
[  843.599146] ERR: script_get_item wifi_usbc_id failed
[  843.599166] RTL871X: module init ret=-1
```

Notice the 2nd last line has the error `ERR: script_get_item wifi_usbc_id failed`. A quick stop at google and I started finding interesting results on the web. It looks like there is an improperly configured setup in the [RetrOrangePi](http://www.retrorangepi.org/) (similar to RetroPie but for OrangePi boards) image that I had flashed.

## The Fix

The fix is actually pretty simple to work through. You just have to modify the `.fex` configuration that is loaded on the boot of [armbian](https://www.armbian.com/) (the underlying OS used with allwinner chips and RetrOrangePi).

Start the armbian configuration utility using the command `sudo armbian-config`.

Select system from the menu, then choose Fexedit from the submenu. This will open a text editor with the boot configuration of the device. Around 75% of the way through the file for me, there was a chunk that started with `[wifi_para]`.

I changed the line `wifi_usbc_id =` to `wifi_usbc_id = 1` based off of a post [here](http://4pda.ru/forum/lofiversion/index.php?t750921-1740.html) and magically after a reboot the network device now showed up with `sudo ifconfig`. As an odd side effect, it seems that 2 network devices showed up: `wlan1` as well as `wlan3`. I am not sure why both are there, but it seems that it has something to do with `network-manager` being installed. After uninstalling, one of the devices disappeared, but there were still quirks so I didn't mention that part.

The final step was to configure wifi on the device. This is pretty simple using the built in command `sudo nmtui-connect`. I connected to wifi with `wlan3` since this seemed to work out better than `wlan1`. After connected to wifi things seemed to be working - that is until I tried to ssh over wifi when I unplugged the ethernet cable while it was turned on. For some reason or another, it seems that having both network interfaces enabled at the same time confuses something (though I have never had an issue on other similar linux devices). My solution to this problem is to choose a method of connection when the device is off and then to only switch from wifi/ethernet after a reboot.

**UPDATE 06/30/2019**:
I ended up editing up `/etc/network/interfaces` to try and get things working better. I was able to turn off power management on the wifi device which really helped the reliability of the connection. (Just uncommented from the existing file)

## Wrapping Up

Luckily things were not too complicated in the end to get working, but what a pain that was. Working with newer versions of linux kernels I would assume would solve a lot of the issues seen here - someday I hope I can get a mainline kernel onto this thing to make things work out of the box. Until then, I have this workaround which works well enough for a once in a while wifi connection!
