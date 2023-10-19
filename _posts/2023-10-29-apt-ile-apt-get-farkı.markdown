---
layout: b-post
title:  "apt ile apt-get Arasındaki Fark"
modified:
author: Taylan Özgür Bildik
tags: [apt , apt-get]
categories: blog 
permalink: /:title
toc: true
---


`apt` ve `apt-get` benzer amaçla yani paket yönetimi için kullanılan iki alternatiftir. Aralarındaki en temel fark `apt` aracının sunduğu sadeliktir. 

<p class="mavi"><strong>ℹ️ Not:</strong> Bu yazı <code class="language-plaintext highlighter-rouge">apt</code> aracının kullanımından ziyade neden <code class="language-plaintext highlighter-rouge">apt</code> ve <code class="language-plaintext highlighter-rouge">apt-get</code> olmak üzere iki alternatif olduğunu irdeliyor. Yani paket yönetimi hakkında bilgi almak için buradaysanız, maalesef doğru yazıyı okumuyorsunuz. Mevcut platformda bu konuda doküman mevcut.</p>

## `apt` Nereden Çıktı ?

`apt` komutunun ortaya çıkışındaki temel motivasyon; daha az komut ile daha fazla işlevi yerine getirebilen bir araç ortaya koyarak, kullanıcıların işini kolaylaştırmaktı. Biraz daha açıklayacak olursak;

Linux sistemleri, kullanıcının ihtiyacı olduğunda, programa kolayca ulaşabilmesini sağlayacak program paketlerini içinde bulunduran kendi **paket depolarına(repository)** sahiptirler. Bu paketleri yönetmek(sorgulamak, yüklemek, kaldırmak, güncellemek vs…) için de bir paket yöneticisine ihtiyaç vardır. Debian tabanlı dağıtımlar da **APT**(**A**dvanced **P**ackaging **T**ool) paket yöneticisini kullanmaktadır.

Paket yöneticisini etkili şekilde kullanmak için de bir çok komut bulunmaktadır. Hatta öyle ki, eski `apt-get` aracında aynı işlevi yerine getiren benzer komutlara ek olarak artık pek sık kullanılmayan işlevleri de yerine getirmek için de çok fazla komut mevcut. Tabii hal böyle olunca da doğal olarak kullanıcılar bu komutları öğrenme ve hatırlama konusunda zorluk yaşayabiliyorlar.

İşte `apt` komutu da tüm bu fazlalıklardan kurtulmak adına `apt-get` ve `apt-cache` komutunun tüm işlevlerinin tek elde toplanmasıyla oluşturulmuştur. Bu durumu daha iyi anlamak için tablo üzerinden kıyaslayabiliriz.



<table class="table table-dark table-striped">
  <tr>
    <th><code class="language-plaintext highlighter-rouge">apt</code> Komutu</th>
    <th><code class="language-plaintext highlighter-rouge">apt-get</code> Komutu</th>
    <th>Komutun İşlevi</th>
  </tr>
  <tr>
    <td><code class="language-plaintext highlighter-rouge">apt install</code></td>
    <td><code class="language-plaintext highlighter-rouge">apt-get install</code></td>
    <td>Paket kurar.</td>
  </tr>
  <tr>
    <td><code class="language-plaintext highlighter-rouge">apt remove</code></td>
    <td><code class="language-plaintext highlighter-rouge">apt-get remove</code></td>
    <td>Paket kaldırır.</td>
  </tr>
  <tr>
    <td><code class="language-plaintext highlighter-rouge">apt purge</code></td>
    <td><code class="language-plaintext highlighter-rouge">apt-get purge</code></td>
    <td>Paketleri ayarlarıyla birlikte kaldırır.</td>
  </tr>
  <tr>
    <td><code class="language-plaintext highlighter-rouge">apt update</code></td>
    <td><code class="language-plaintext highlighter-rouge">apt-get update</code></td>
    <td>Paket kaynağı (repo) güncel bilgilerini alır.</td>
  </tr>
  <tr>
    <td><code class="language-plaintext highlighter-rouge">apt upgrade</code></td>
    <td><code class="language-plaintext highlighter-rouge">apt-get upgrade</code></td>
    <td>Yükseltilebilir tüm paketleri yükseltir.</td>
  </tr>
  <tr>
    <td><code class="language-plaintext highlighter-rouge">apt autoremove</code></td>
    <td><code class="language-plaintext highlighter-rouge">apt-get autoremove</code></td>
    <td>Kullanılmayan paketleri kaldırır.</td>
  </tr>
  <tr>
    <td><code class="language-plaintext highlighter-rouge">apt full-upgrade</code></td>
    <td><code class="language-plaintext highlighter-rouge">apt-get dist-upgrade</code></td>
    <td>Bağımlılıkları ile birlikte sistemi günceller.</td>
  </tr>
  <tr>
    <td><code class="language-plaintext highlighter-rouge">apt search</code></td>
    <td><code class="language-plaintext highlighter-rouge">apt-cache search</code></td>
    <td>Repolardan program aramayı sağlar.</td>
  </tr>
  <tr>
    <td><code class="language-plaintext highlighter-rouge">apt show</code></td>
    <td><code class="language-plaintext highlighter-rouge">apt-cache show</code></td>
    <td>Paket ile ilgili detayları gösterir.</td>
  </tr>
</table>

Amaç sadeleştirmek olduğu için elbette `apt-get` aracındaki tüm seçenekler `apt` aracına aynen aktarılmış. Bunun yerine `apt`’nin de paket yönetimine yeni eklediği kendine özgü komutları mevcut.

<table class="table table-dark table-striped">
<tr>
    <th>Yeni <code class="language-plaintext highlighter-rouge">apt</code> Komutları</th>
    <th>Komutun İşlevi</th>
  </tr>
  <tr>
    <td><code class="language-plaintext highlighter-rouge">apt list</code></td>
    <td>Sistemdeki paketlerin durumları ile listeler. (yüklenmiş yada yükseltilebilir)</td>
  </tr>
  <tr>
    <td><code class="language-plaintext highlighter-rouge">apt edit-sources</code></td>
    <td>Kaynak listesini düzenlemeyi sağlar.</td>
  </tr>
</table>

`apt` ile  `apt-get` komutunun karşılaştırılması konusunda dikkat edilmesi gereken asıl nokta, `apt` ‘nin sürekli gelişme altında olduğudur. Böylece, gelecek sürümlerde komuta eklenecek olan bir çok yeni ve kullanışlı özelliği de görmüş olacağız.

## Sonuç

- `apt` paket yönetimi için gerekli komutları sağlayan `apt-get` ve `apt-cache` komutlarının tek bir elde toplanmış hali, bir alt kümesidir.
- `apt` komutunda hatırlanması gereken çok daha az parametre vardır. Dolayısıyla kolayca hatırlanabilen, oldukça az komutla çok işler başarabilen bir yapısı vardır.
- Sürekli gelişmeye devam edecektir, dolayısı ile zamanla çok daha yaygın kullanıma ve güçlü özelliklere sahip olacaktır.

Özellikle geri dönük uyumluluk dolayısıyla `apt-get`  uzun yıllar boyu yaygın olarak kullanılmaya devam edecek. Ancak, gelecekteki paket yönetimi ve yenilikler `apt` üzerine kuruluyor olacak. Eğer sürekli `apt-get` ‘in, `apt` komutuna oranla sahip olduğu ek özelliklerine ihtiyaç duymuyorsanız `apt-get`’ e bağlı kalmak için bir neden göremiyorum. Yani zarif `apt` komutumuza bir şans verin derim 🙂