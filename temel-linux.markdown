---
layout: simple
title: Temel Linux Eğitimi
excerpt: "Temel Linux Eğitimi Sıralı Müfredatı"
categories: [temel-linux]
type: [egitim-serisi]
search_omit: true
author: Taylan Özgür Bildik
---

<div class="row">
 <div class="col-md-3 order-md-2">
    <img class="card-img" src="{{ site.url }}/data/img/temel-linux.webp">
  </div>
  <div class="col-md-9 order-md-1">
    <h1>Herkes için Temel Linux Eğitimi</h1>
    <p>Linux'u kişisel veya profesyonel gereksinimler dolayısıyla temel düzeyde öğrenmek istiyorsanız buradaki eğitim serisini takip edebilirsiniz. Bu eğitim DevOps, Siber Güvenlik, Veri Bilimi ve benzeri alanlar da dahil herkes için giriş seviye genel Linux kullanımı hakkında bilgi sunmak amacıyla hazırlanmıştır. Ayrıca sertifika sınavlarına (lpic, rhcsa, linux+ vb.) hazırlık konusunda da faydalı olabilir.</p>
  </div>
</div>

<div class="row mb-2">
  {% assign sorted_posts = site.egitim | where: 'categories', 'temel-linux' | sort: 'tutorial' %}
{% for post in sorted_posts %}
  <div class="col-md-6">
    <div class="no-gutters border rounded overflow-hidden mb-4 shadow-sm h-md-250 position-relative">
      <div class="row">
        <div class="col-sm-3 d-flex align-self-center justify-content-center ">
          <img class="responsive ml-3" src="{{ site.url }}/egitim/{{ page.categories }}/{{ post.cover }}" alt="">
        </div>
        <div class="col-sm-9 p-4">
          <div class="d-flex align-self-center justify-content-between">
            <div>
              <p class="text-primary">{{ post.tutorial }}. Doküman</p>
            </div>
            <div>
              <p class="readStatus"></p>
            </div>
          </div>
          <h3 class="mb-0">{{ post.title }}</h3>
          <p class="card-text mb-auto">{{ post.excerpt | remove: '\[ ... \]' | remove: '\( ... \)' | markdownify | strip_html | strip_newlines | escape_once }}</p>
        
        </div>
      </div>
      <div class="progress">
            <div class="progress-bar" role="progressbar"></div> <!-- Progress bar element -->
          </div>
          <a href="{{ site.url }}{{ post.url }}" class="stretched-link"></a>
    </div>
  </div>
{% endfor %}


</div>

<script src="{{ site.url }}/assets/js/temel-linux.js"></script>



  
  

