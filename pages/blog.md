---
layout: page
title: Blog
permalink: /blog/
---

<ul class="postList">
  {% for post in site.posts %}
    <li class="post">
      <span class="title"><a href="{{ post.url }}">{{ post.title }}</a></span>
      <br>
      <span class="date">{{post.date | date_to_string: "ordinal", "US" }}</span>
    </li>
  {% endfor %}
</ul>