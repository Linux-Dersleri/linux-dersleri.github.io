---
sitemap: true
layout: b-post
title:  "Linux Komut Satırı ile IP Öğrenme"
modified:
author: Taylan Özgür Bildik
tags: [network, IP]
categories: blog 
cover: local-public-ip.webp
permalink: /:title
toc: true
---


Cihazlarımızın “local” ve “public” olmak üzere temelde 2 tür ip adresi bulunur. Lokal ip adresimiz, lokal ağımızdaki iletişim için kullanılırken, public ip adresimiz “internet” yani genel ağ üzerinde geçerli olan benzersiz bir ip adresidir. Bu konu hakkında daha fazla detay için [buraya](https://www.linuxdersleri.net/egitim/temel-network/temel-kavramlar/index.html#genel-ve-%C3%B6zel-ip-adresleri-hakk%C4%B1nda) göz atabilirsiniz. Ayrıca temel network bilgisi için [tüm seriyi](https://www.linuxdersleri.net/temel-network) tamamlamanızı da tavsiye edebilirim.

![local-public-ip]({{ site.url }}/egitim/temel-network/temel-kavramlar/LAN-to-WAN.webp){:class="responsive img-zoomable"}

## Local IP Adresini Öğrenmek

Eğer “local” ağınızdaki ip adresinizi öğrenmek isterseniz `ip a` komutunu kullanabilirsiniz.

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>┌──<span class="o">(</span>taylan㉿linuxdersleri<span class="o">)</span>-[~]
└─<span class="nv">$ </span>ip a
1: lo: &lt;LOOPBACK,UP,LOWER_UP&gt; mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    <span class="nb">link</span>/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: <span class="mavi">eth0</span>: &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt; mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    <span class="nb">link</span>/ether 08:00:27:95:bd:54 brd ff:ff:ff:ff:ff:ff
    <span class="mavi">inet 10.0.2.15/24</span> brd 10.0.2.255 scope global dynamic noprefixroute eth0
       valid_lft 86240sec preferred_lft 86240sec
    inet6 fe80::5614:84da:7a62:e798/64 scope <span class="nb">link </span>noprefixroute 
       valid_lft forever preferred_lft forever

</code></pre></div></div>

Ben **ethernet** yani kablo ile internete bağlı olduğum için “<span class="mavi">eth0</span>” arayüzündeki “<span class="mavi">inet</span>” olarak belirtilmiş olan <span class="mavi">10.0.2.15/24</span> adresi benim local ağımdaki ip adresimdir.

## Public IP Adresini Öğrenmek

Eğer “public” yani dış ağdaki benzersiz ip adresinizi öğrenmek isterseniz, bunun için hizmet sunan bazı servislere `curl` aracı yardımıyla sorgu gönderebilirsiniz. Bazı örnekler aşağıdaki gibidir:

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ curl ifconfig.me
151.126.45.155
┌──(taylan㉿linuxdersleri)-[~]
└─$ curl ifconfig.co
151.126.45.155

```

Gördüğünüz gibi yanıt olarak doğrudan mevcut makinenin public ip adresi konsola bastırıldı.

Esasen “local” ve “public” ip adresini öğrenmek için pek çok farklı yaklaşım olsa da, pratiklik açısından burada bahsedilen temel yaklaşımlar yeterli olacaktır.
