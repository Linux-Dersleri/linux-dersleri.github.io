---
layout: simple
title: Blog Paylaşımları
excerpt: "Blog üzerinde paylaşılan tüm içeriklerin listesi."
robots: noindex, follow
search_omit: true
---

<h1 class="text-primary">🗃Blog</h1>
  <p>Yayınlanma tarihine göre yeniden eskiye doğru, paylaşılmış olan tüm içeriklerin listesidir. </p>



<div id="archives">
  {% for post in site.posts %}
    {% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}
    {% capture pre_year %}{{ post.previous.date | date: "%Y" }}{% endcapture %}
    {% if forloop.first %}
      {% assign last_day = "" %}
      {% assign last_month = "" %}
      <span class="lead">{{ this_year }}</span>
      <ul class="list-unstyled">
    {% endif %}
    <li>
      <div>
        {% capture this_day %}{{ post.date | date: "%d" }}{% endcapture %}
        {% capture this_month_abbr %}{{ post.date | date: "%b" }}{% endcapture %}
        {% assign this_month = site.month_names[this_month_abbr] %}
        <span class="date day">{{ this_day }}</span>
        <span class="date month small text-muted" title="Yayınlanma Tarihi: {{ post.date }}">{{ this_month }}</span>
        {% assign post_date = post.date | date: "%Y-%m-%d" %}
        {% assign post_modified = post.modified | date: "%Y-%m-%d" %}
        <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
        {% if post_modified > post_date %}
          <span class="small text-success yesil" data-toggle="tooltip" data-placement="bottom" title="Düzenlenme Tarihi: {{ post.modified }}">Güncellendi</span>
        {% endif %}
      </div>
    </li>
    {% if forloop.last %}
      </ul>
    {% elsif this_year != pre_year %}
      </ul>
      <span class="lead">{{ pre_year }}</span>
      <ul class="list-unstyled">
        {% assign last_day = "" %}
        {% assign last_month = "" %}
      {% endif %}
  {% endfor %}
</div>