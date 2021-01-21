---
title: "If It Ain't Broke, Don't Fix It!"
date: 2019-07-03T03:50:13.000Z
---

Sometimes, I make things too complicated for their own good. Today's post is yet another story of that time when you think you can make a better version of what you have.

Technology gives us so much in our lives and allows us to do some pretty incredible things. I love all of the cool projects I work on (and open source on my [github](https://github.com/amcolash)), and yet sometimes I wonder just how much work is worth it.

A bit ago, I wrote about looking into new ways to build my website and which fancy new web stack I was looking at. I had decided on Gatsby, but when it turned out to be pretty complicated I switched to react-static. Upon further inspection I decided on next.js. I did a handful of starter tutorials and things were going pretty smoothly - until I wanted to get things working _my way_.

I realized that adding in a static blog with markdown files was going to be a bit more work than initially planned on. I spun in circles until tonight when I realized there is no point at all to rewrite the site just yet. I am already using jekyll which is designed specifically for static blogs with markdown. Here is the entire markdown for a blog page with jekyll:

```html
{% raw %} --- layout: page title: Blog permalink: /blog/ ---
<ul class="postList">
  {% for post in site.posts %}
  <li class="post">
    <span class="title"><a href="{{ post.url }}">{{ post.title }}</a></span>
    <br />
    <span class="date">{{post.date | date_to_string: "ordinal", "US" }}</span>
  </li>
  {% endfor %}
</ul>
{% endraw %}
```

I am going to stick with what I have for now. There are some quirks and not everything is quite how I would prefer it. Even so, it is so much simpler than re-writing for very little (arguably no) benefits. Sure I could use node instead of ruby, but at the end of the day this static site doesn't need react to function or routes or anything fancy. The bundle download includes all css + js in the initial html (which for most pages clocks in around 20-50kb). I am already kicking ass at the page optimization, so why make it more complicated than it needs to be.

Not everything shiny is so great close up! I love writing code, but rewriting for the sake of a new stack (for a site that is rarely updated) seems like a waste. I do hope to write more blog posts in the future, but since I am already on a great platform for blogging, it is a no-brainer to stay put for now.
