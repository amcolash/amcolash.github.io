---
layout: page
title: Blog
permalink: /blog/
---

<ul class="postList">
  {% assign year = 0 %}
  {% for post in site.posts %}
    {% assign current = post.date | date: "%Y" %}
    {% if current != year %}
      <br>
      <h3>{{current}}</h3>
      {% assign year = current %}
    {% endif %}
    <li class="post">
      <span class="title"><a href="{{ post.url }}">{{ post.title }}</a></span>
      <br>
      <span class="date">{{post.date | date_to_string: "ordinal", "US" }}</span>
    </li>
  {% endfor %}
</ul>
