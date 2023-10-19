---
layout: simple
title: Ağ Temelleri Eğitimi
excerpt: "Ağ Temelleri Müfredatı"
categories: [temel-network]
type: [egitim-serisi]
search_omit: true
author: Taylan Özgür Bildik
---

<div class="row">
 <div class="col-md-3 order-md-2">
    <img class="card-img" src="{{ site.url }}/data/img/temel-network.webp">
  </div>
  <div class="col-md-9 order-md-1">
    <h1>Ağ Temelleri Eğitimi</h1>
    <p>Ağ temelleri hakkında giriş seviyesi teorik bilgi için bu eğitim serisini takip edebilirsiniz. Bu eğitimde pratik uygulamalar bulunmuyor, yalnızca giriş düzeyi teorik anlatımlar mevcut. </p>
  </div>
</div>

<div class="row mb-2">
  {% assign sorted_posts = site.egitim | where: 'categories', 'temel-network' | sort: 'tutorial' %}
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



  
  

