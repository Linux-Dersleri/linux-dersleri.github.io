---
layout: simple
title: Hakkında
excerpt: "Linux Dersleri Platformu Hakkında"
search_omit: true
---


<p></p>
<div align="center">
<h1 class="text-primary">🐧<br>Hakkında</h1>    
Linux Dersleri, <a href="https://www.linkedin.com/in/taylanbildik/">Taylan Özgür Bildik</a> tarafından GNU/Linux için Türkçe kaynak sunabilmek gayesiyle kurulmuş bir platformdur. Daha fazla detay için <a href="{{ site.url }}/sıkca-sorulan-sorular.html">"Sıkça Sorulan Sorular"</a> bölümünü inceleyebilir, aradığınız sorulara yanıt bulamazsanız aşağıdaki kanallardan bana ulaşabilirsiniz.
<p></p>
<a href="{{ site.url }}/bildirim.html"><i class="fa fa-paper-plane fa-lg"></i></a>
<a target="_blank" href="mailto:info@linuxdersleri.net"><i class="fa fa-envelope fa-lg"></i></a>
<a target="_blank" href="https://linkedin.com/in/taylanbildik"><i class="fa fa-linkedin fa-lg"></i></a>
<a target="_blank" href="https://github.com/taylanbildik"><i class="fa fa-github fa-lg"></i></a> 
</div>    
<hr>

<div class="container">
		<div align="center" class="container">
  		<p></p>
			<div class="row mb-2">
				
    <div class="col-md-6">
      <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="col p-4 d-flex flex-column position-static">
          
		  <div>
		  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
</svg>
</div>
		  <p>Github Kaynağı</p>
          <a target="_blank" href="https://github.com/Linux-Dersleri/linux-dersleri.github.io" class="stretched-link"></a>
			
        </div>
        
      </div>
    </div>
		<div class="col-md-6">
      <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="col p-4 d-flex flex-column position-static">
          <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-google-play" viewBox="0 0 16 16">
  <path d="M14.222 9.374c1.037-.61 1.037-2.137 0-2.748L11.528 5.04 8.32 8l3.207 2.96 2.694-1.586Zm-3.595 2.116L7.583 8.68 1.03 14.73c.201 1.029 1.36 1.61 2.303 1.055l7.294-4.295ZM1 13.396V2.603L6.846 8 1 13.396ZM1.03 1.27l6.553 6.05 3.044-2.81L3.333.215C2.39-.341 1.231.24 1.03 1.27Z"></path>
</svg>
            
            </div><p>Android Uygulaması</p>
          <a target="_blank" href="https://play.google.com/store/apps/details?id=com.bildik.linuxdersleri" class="stretched-link"></a>
			
        </div>
        
      </div>
    </div>
    
  </div>
</div>

<h4 align="center">Sürüm Notları</h4>
<p align="center" class="mavi">Sürüm notlarını görüntülemek için ilgili sürümü temsil eden kutucuğun üzerine tıklamanız yeterlidir.</p>
 {% assign latest_version = "0.0.0" %}
<div class="list-group">
 <a href="#" class="list-group-item list-group-item-action active">
        <i class="fa fa-codepen"></i> Platform
    <span class=" pull-right">Sürüm Numarası</span></a>
  {% for entry in site.data.changelog %}
    {% if entry.version > latest_version %}
      {% assign latest_version = entry.version %}
    {% endif %}
    <a class="list-group-item list-group-item-action" data-toggle="collapse" href="#collapse{{ forloop.index }}" role="button" aria-expanded="false" aria-controls="collapse{{ forloop.index }}">
      {{ entry.name }}
      {% if entry.version == latest_version %}
        <span class="badge badge-warning pull-right">Mevcut Sürüm: {{ entry.version }}</span>
      {% else %}
        <span class="badge badge-secondary pull-right">{{ entry.version }}</span>
      {% endif %}
    </a>
    <div class="collapse" id="collapse{{ forloop.index }}">
      <div class="card card-body">
        {% for change in entry.changes %}
          <li>{{ change }}</li>
        {% endfor %}
      </div>
    </div>
  {% endfor %}
</div>
  
       
