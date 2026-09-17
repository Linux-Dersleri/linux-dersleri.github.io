---
sitemap: true
layout: simple
title: Linux Dersleri
description: "GNU/Linux için Türkçe eğitim, blog, komut listesi ve bilgi testleri. Temel Linux, ağ ve kabuk programlama içerikleriyle sıfırdan öğrenin."
excerpt: "GNU/Linux için Türkçe eğitim, blog, komut listesi ve bilgi testleri. Temel Linux, ağ ve kabuk programlama içerikleriyle sıfırdan öğrenin."
search_omit: true
---

<h1 class="text-primary">Linux Dersleri</h1>
<p>GNU/Linux için Türkçe doküman, blog yazıları, komut listesi ve bilgi testleri sunan bir platformdur. Temel Linux kullanımından ağ temellerine kadar sıralı eğitim içerikleriyle sıfırdan öğrenmeye başlayabilirsiniz.</p>

<div class="row mb-2">
<div class="col-md-6">
	<h2 class="text-primary">Eğitimler</h2>

      <div class="no-gutters border rounded overflow-hidden mb-4 shadow-sm position-relative">
        <div class="col p-4 d-flex flex-column position-static">
		<img src="/data/img/video-egitim-980.webp" srcset="/data/img/video-egitim-490.webp 490w, /data/img/video-egitim-980.webp 980w" sizes="(max-width: 768px) 100vw, 50vw" alt="Linux video eğitim kapak görseli" width="980" height="437" class="img-fluid egitim-promo-img" fetchpriority="high"/>
    <p></p>
          <p class="card-text mb-auto">Temel Linux kullanımı için eğitim içerikleri.</p>
          <a href="{{ site.url }}/egitim.html" class=" stretched-link"></a>
        </div>
        </div>
<p></p>
    </div>
	<div class="col-md-6">

	<h2 class="text-primary">Blog</h2>
  <p></p>
  <div id="post-list">
  {% for post in site.categories.blog limit:2 %}
  <div class="post-preview">
    <h3>
      <a href="{{ site.url }}{{ post.url }}">{{ post.title }}</a>
    </h3>
    <div class="post-content">
      <p>
      {% assign _content = post.content %}
      {{ _content | markdownify | strip_html | truncate: 50 }}
      </p>
    </div>
    <div class="post-meta">
      {% assign post_date = post.date | date: "%Y-%m-%d" %}
  {% assign post_modified = post.modified | date: "%Y-%m-%d" %}
      <i class="fa fa-calendar fa-fw text-muted"></i>
      <span class="text-muted timeago" data-toggle="tooltip" data-placement="bottom" title="Yayınlanma Tarihi: {{ post.date }}">
      {% assign current_date = 'now' | date: '%s' %}
{% assign post_date = post.date | date: '%s' %}
{% assign time_diff = current_date | minus: post_date %}
{% assign days = time_diff | divided_by: 86400 %}
{% assign weeks = days | divided_by: 7 %}
{% assign months = days | divided_by: 30 %}
{% if months > 0 %}
  {{ months }} ay
{% elsif weeks > 0 %}
  {{ weeks }} hafta
{% else %}
  {{ days }} gün
{% endif %}
önce
</span>

{% if post_modified > post_date %}
    <span class="small text-success yesil" data-toggle="tooltip" data-placement="bottom" title="Düzenlenme Tarihi: {{ post.modified }}">Güncellendi</span>
  {% endif %}

    </div>
    <hr>
  </div> <!-- .post-review -->
  {% endfor %}
</div> 
 </div>
    </div>
<div class="row">
    <div class="col-md-6">
    <h2 class="text-primary">Komut Listesi</h2>
      <div>
	  
        {% include komut-listesi.html %}

      
    </div>
    </div>
  
  <div class="col-md-6">
  <h2 class="text-primary">Bilgi Testi</h2>
      <div>
	  
         {% include random-question.html %}

    
    </div>
    </div>
  
    </div>
