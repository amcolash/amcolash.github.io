---
layout: post
title: "Rewriting My Website"
date: 2019-06-18 12:10:32
---

A long time ago, I learned about MySpace and all of the cool things that could be done with some basic HTML and a lot of patience. Fast forward a few years and I learned all about code at UW Madison (Go Badgers!) and all kinds of pitfalls too. One of the things that I always wonder about is complexity and why the web tends to be such a complex place at times.

So much of what we see and read on the web is completely static content and needs very little interactivity - if any. A long time ago (2007) I had a website that was static. It was really cool and was hosted somewhere that seemed to have a solid 50% up SLA.

Fast-forward to 2012: I now have a new static site that is hosted on my student space and things are a little nicer than `tables` and `iframes` - I was finally using `divs` and separate css style sheets. Finally, I got an internship in 2014 where I got my first real look at making websites with EmberJS and Angular. The world was my oyster and I loved being able to do so much with my custom routes and having data automagically refresh when the backing models changed. Needless to say, I rewrote my static website soon after because it was such a cool set of web tech.

And there I was, about 3 years ago wondering why it made sense to have such a complex site when all I really had on it were a few pages about my projects and a resume. Surely it was time to go back to my roots and use a static site again - well maybe. This time I decided that the superior technology of the day was Jekyll. I could have a static site, but build it based on content in the source files. Generating websites from a well-structured place sounded like liquid gold and this time I was going to stick with the tech.

That was... Until I decided to update my website as I was looking for new jobs. What a mess it was - all hacked together and clearly still not as nice as I would have hoped. I had to downgrade my version of ruby and Jekyll to build the thing and I never really was a ruby person. I churned through and luckily got away unscathed - but vowing in the future to make it a bit nicer and easier to maintain longer-term.

Here we are, now 2019 - over 12 years after that first site (and even longer since my MySpace) and I am back at it again. This time I thought that [Gatsby](https://www.gatsbyjs.org/) sounded like the cool new kid on the block and it deserved my attention. I really like React and building a static site with it sounded like a dream come true. Clean up the bits not used and make it as simple as possible. The only problem was, well, Gatsby.

It seems like an extremely powerful tool and with such a huge following, I thought I would be in for a real treat. It turns out that the developers who initially made the framework though were _highly_ opinionated - for better or worse. I loved the idea of querying for my data with [GraphQL](https://graphql.org/), but disliked that it was the only sanctioned way to get data. I liked the idea of making images load fast - until I needed to load images from 3rd party sites and wanted a simple way to reference an image without a build of assets every time. There are a handful of other reasons I could list, but for _my use case_ it was too much and far too opinionated for my taste.

As luck would have it though, the JS ecosystem today is blooming with a hot new framework everywhere you look and I settled on [react-static](https://github.com/nozzle/react-static/). While there are plenty of good and bad things about it, my absolute favorite part is that my data is my data. I get to choose how to feed to the builder in whatever way I chose. It makes coding much easier when you can worry about the code and less about how to work within the framework that constricts your ideas from the 1st step.

Our web is constantly evolving. Our content changes daily and yet can usually be statically hosted. This page is static, but other pages on my website are in fact dynamic with client side requests. Every js library or framework will have the good and bad side to them - it is up to us to decide what matters for the task at hand. Choose something that makes sense for the job today (and tomorrow) - hopefully you choose right, but if not you can always make things better next time!

The web never sleeps, but maybe it is time for me to call it a night.

UPDATE 06/28/2019: I decided to go with [Next.js](https://nextjs.org/) instead. It seems much more mature than react-static and there are some nice plugins in place that make using `.mdx` files simple to do. So alas, the cycle of finding better and better things continues. I am so close to just ripping it all apart and wiring out the HTML by hand now.
