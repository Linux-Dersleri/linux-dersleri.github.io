---
layout: simple
title: Konu Etiketleri
excerpt: "Tüm içeriklerin kategorize etiket listesi."
search_omit: true
---

<aside data-pagefind-ignore="all">
<div align="center"><h1>🏷️</h1><h1>Etiket Listesi</h1><p>Etiketlerine göre gruplanmış paylaşımların tümü.</p></div>

{% assign all_posts = site.posts | concat: site.egitim | concat: site.komut %}
{% assign all_tags = "" | split: "" %}

{% for post in all_posts %}
  {% for tag in post.tags %}
    {% unless all_tags contains tag %}
      {% assign all_tags = all_tags | push: tag %}
    {% endunless %}
  {% endfor %}
{% endfor %}

{% assign sorted_tags = all_tags | sort %}

<ul class="card-columns">
  {% for tag in sorted_tags %}
    {% assign tag_posts = site.posts | where: 'tags', tag %}
    {% assign tag_egitim = site.egitim | where: 'tags', tag %}
    {% assign tag_komut = site.komut | where: 'tags', tag %}
    {% assign total_posts = tag_posts | concat: tag_egitim | concat: tag_komut %}
    <li><a href="#{{ tag }}">{{ tag }}: <span class="badge badge-secondary ">{{ total_posts.size }}</span></a></li>
  {% endfor %}
</ul>




<hr>
<div class="alert mavi">
  <strong>Not:</strong> Birden fazla etikete sahip olan konuları farklı etiket başlıkları altında tekrar tekrar görebilirsiniz.
</div>

{% assign sorted_tags = all_tags | sort %}
{% for tag in sorted_tags %}
  {% assign tag_posts = site.posts | where: 'tags', tag %}
  {% assign tag_egitim = site.egitim | where: 'tags', tag %}
  {% assign tag_komut = site.komut | where: 'tags', tag %}
  {% assign total_posts = tag_posts | concat: tag_egitim | concat: tag_komut %}
  
  <div class="border rounded mb-4 shadow-sm col p-4">
    <h2 id="{{ tag }}">{{ tag }}</h2>
    <hr>
    <ul>
      {% for post in total_posts %}
        {% if post.title %}
          <li>
            <a href="{{ site.url }}{{ post.url }}">{{ post.title }}</a>
            {% if post.url contains '/egitim/' %}
              <span class="text-success small yesil" data-toggle="tooltip" data-placement="bottom" title="{{ post.coursetitle }}">Doküman</span>
            {% elsif post.url contains '/komut/' %}
              <span class="text-primary small mavi">Komut</span>
            {% else %}
              <span class="text-warning small sari">Blog</span>
            {% endif %}
          </li>
        {% endif %}
      {% endfor %}
    </ul>
  </div>
{% endfor %}

</aside>


  
