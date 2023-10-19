---
layout: simple
title: Linux Komutları Listesi
excerpt: "Linux üzerinde sık kullanılan komutların listesi ve açıklama sayfaları."
search_omit: true
---


<style>
  #myUL li {
    border-bottom: 1px solid #ccc; /* Add a bottom border to the list items */
    padding-bottom: 10px; /* Add some spacing between items */
    margin-bottom: 10px; /* Add space below each item */
  }
</style>

<html lang="tr" >

	<div align="center" class="container"> 
<p></p>
<h1 class="text-primary">📜<br>Komut Listesi</h1>
<p>GNU/Linux üzerinde sık kullanılan çeşitli komutların açıklamaları ve örnek kullanımları.</p> 
</div>
        <div class="col p-4 d-flex flex-column position-static">
		
		  <p class="mavi">ℹ️Komut veya kısa komut açıklaması üzerinden filtreleme yapabilirsiniz.</p>
		  <input class="border filter-bar" type="search" id="myInput" onkeyup="myFunction()" placeholder="Komut adı girin..">
      <p></p>
<ul id="myUL" class="list-unstyled ">
             {% assign sortedKomut = site.komut | sort: 'title' %}

{% for post in sortedKomut %}
  <li>
    <a href="{{ site.url }}{{ post.url }}">
      <span class="mavi text-primary small">{{ post.title }}</span> 
      {{ post.excerpt | remove: '\[ ... \]' | remove: '\( ... \)' | markdownify | strip_html | strip_newlines | escape_once }}
    </a>
  </li>
{% endfor %}

</ul>

       
       
	   
	   
	   

	
<script>
function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
</script>

