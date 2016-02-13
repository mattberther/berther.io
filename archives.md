---
layout: page
title: archives
---

<ul class="post-list">
    {% for post in site.posts %}
    {% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}
    {% capture next_year %}{{ post.previous.date | date: "%Y" }}{% endcapture %}

    {% if forloop.first %}
    <h2 id="{{ this_year }}-ref">{{this_year}}</h2>
    <ul>
        {% endif %}
        <li><article><a href="{{ post.url }}">{{ post.title }} <span class="entry-date"><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time></span></a></article></li>
    {% if forloop.last %}
    </ul>
    {% else %}
        {% if this_year != next_year %}
        </ul><h2 id="{{ next_year}}-ref">{{next_year}}</h2><ul>
        {% endif %}
    {% endif %}
{% endfor %}
