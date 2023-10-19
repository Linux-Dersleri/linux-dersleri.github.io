---
layout: b-post
title:  "Unutulan Root Parolasını Değiştirmek"
modified: 
author: Taylan Özgür Bildik
tags: [passwd]
categories: blog 
cover: change-root-password.webp
permalink: /:title
toc: true
---


Unutulan veya çeşitli sebeplerle tahrip edilmiş olan root parolasını sistem başlangıcında yenilememiz mümkün. Ben anlatım sırasında Kali Linux dağıtımını kullandım, fakat siz kullanmakta olduğunuz dağıtım üzerinden de aynı adımları takip edebilirsiniz.

Öncelikle sistemi yeniden başlatıyoruz.

Karşımıza gelen **GNU GRUB** ekranındayken <kbd>E</kbd> tuşuna basarak “**edit**” yani “**düzenleme**” moduna geçiyoruz.

![gnu-grub]({{ site.url }}/blog/img/root-parolası/gnu-grub.webp){:class="responsive img-zoomable"}

Düzenleme modundayken klavyemizdeki yön tuşları ile alt satırlara inerek “**linux**” satırını bulmamız gerek.

![edit-gnu-grub.webp]({{ site.url }}/blog/img/root-parolası/edit-gnu-grub.webp){:class="responsive img-zoomable"}

linux satırında bulunan “**ro**” ifadesini “**rw**” ile değiştirdikten sonra, satırın sonuna ”**init=/bin/bash**” ifadesini ekliyoruz. Bu değişiklik sayesinde disk üzerinde **yazma yetkisi** ve sistem başlangıcında **bash** kabuğuna erişim kazanmış olacağız.

![edit-gnu-grub-changed.webp]({{ site.url }}/blog/img/root-parolası/edit-gnu-grub-changed.webp){:class="responsive img-zoomable"}

Değişiklikleri kaydetmek için <kbd>Ctrl</kbd> **+** <kbd>X</kbd> ya da <kbd>F10</kbd> tuşlarını kullanabiliriz.

Yaptığımız değişikliğin anlamı; **ro** ifadesi **read only** anlamındaki yalnızca **okuma yetkisi**ni temsil ediyor. Biz bu yetkiyi düzenleme yapacağımız için **rw** şeklinde **read write** yani **hem okuma hem de yazma(değişiklik yapma)** yetkisi olarak değiştirdik.

Satırın sonuna eklemiş olduğumuz **init=/bin/bash** ifadesi ise sistemi boot ettikten sonra bash kabuğunun açılmasını sağlıyor. **Eğer bu ifadeyi eklemezseniz sistemi boot ettiğinizde aşağıdaki görselde yer alan komut satırı açılmaz.**

![root-shell.webp]({{ site.url }}/blog/img/root-parolası/root-shell.webp){:class="responsive img-zoomable"}

Boot ettikten sonra bash kabuğu root yetkileriyle açılmış oldu. Öncelikle dosya sistemini yazılabilir olması için `mount -o remount,rw /` komutuyla kök dizini okunabilir biçimde bağlayalım.

![mount.webp]({{ site.url }}/blog/img/root-parolası/mount.webp){:class="responsive img-zoomable"}

Son olarak şifre belirlemek üzere `passwd` komutunu girelim.

![passwd.webp]({{ site.url }}/blog/img/root-parolası/passwd.webp){:class="responsive img-zoomable"}

`passwd` komutunu girdikten sonra resimdeki gibi konsol bizden yeni şifre oluşturmamızı isteyecek ve bunu tekrar girmemizi isteyecek.

<p class="mavi"><strong>ℹ️ Not:</strong> Parolanızı yazarken yazdığınız gözükmeyebilir bu bir güvenlik önlemidir siz yazmaya devam edin.</p>

![passwd-changed.webp]({{ site.url }}/blog/img/root-parolası/passwd-changed.webp){:class="responsive img-zoomable"}

Ve işlemler bu kadar !

Gördüğünüz gibi işlem başarılı bir şekilde gerçekleşti ve ”**passwd: password updated successfully”** çıktısını aldık. Yani root hesabının parolasını değiştirmiş olduk. 

`reboot -f` komutu ile sistemi yeniden başlatıp, tanımlamış olduğunuz root parolasını kullanabilirsiniz.