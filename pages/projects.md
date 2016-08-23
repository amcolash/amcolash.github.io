---
layout: page
title: Projects
permalink: /projects/
---

{% assign sections = site.data.projects | group_by:"section" %}
{% for section in sections %}
  <h1>{{section.name}}</h1>
  <hr>
  <div class="row project-row">
    {% for item in section.items %}
      {% include project_thumbnail.md name=item.name image=item.thumbnail %}
    {% endfor %}
  </div>
{% endfor %}
