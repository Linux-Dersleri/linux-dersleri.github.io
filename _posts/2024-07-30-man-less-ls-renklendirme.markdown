---
sitemap: true
layout: b-post
title:  "man less ve ls Çıktılarını Renklendirme"
modified:
author: Taylan Özgür Bildik
tags: [terminal, man, ls, less]
categories: blog 
cover: 
permalink: /:title
toc: true
---

Eğer `less` , `man` ve `ls` araçlarının çıktılarını renklendirmek istiyorsanız kullanmakta olduğunuz kabuğun konfigürasyon dosyasında **LESS_TERMCAP** değişkenlerini tanımlamanız yeterli. Örneğin renklendirmeden önceki man sayfası aşağıdaki gibi gözüküyor.

![uncolored man page]({{ site.url }}/blog/img/colored-man-less-ls/uncolored.png){:class="responsive img-zoomable"}

Neden **LESS_TERMCAP** isimli bir değişken olduğunu merak ediyorsanız çok kısaca özetleyecek olursak; `less` komutu, terminalin özelliklerine erişmek için Termcap kütüphanesini kullanır. Termcap, terminalin yeteneklerini tanımlayan bir veri tabanıdır ve her yetenek iki harfli kodlarla tanımlanır (örneğin, `md` kalın yazıyı başlatır). **LESS_TERMCAP** değişkenleri, Termcap kütüphanesindeki bu değerleri kullanıcı tanımlı değerlerle değiştirmeye olanak tanır. Bu yöntem, özellikle `man` sayfalarının ve `less` çıktılarının daha okunabilir ve estetik hale getirilmesi için kullanışlıdır.

Bu sebeple biz de `less` ve `man` komutu çıktılarını renklendirmek üzere, kullanmakta olduğumuz kabuğun konfigürasyon  dosyasında aşağıdaki şekilde değişkenleri tanımlayacağız. Aşağıdaki konfigürasyon, ek olarak `ls` komutu için de temel dizin renklendirmesi yapmak üzere tanımlama içeriyor.

```bash
# ls, less ver man icin renklendirme
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    export LS_COLORS="$LS_COLORS:ow=30;44:" # fix ls color for folders with 777 permissions
    export LESS_TERMCAP_mb=$'\E[1;31m'     # begin blink
    export LESS_TERMCAP_md=$'\E[1;36m'     # begin bold
    export LESS_TERMCAP_me=$'\E[0m'        # reset bold/blink
    export LESS_TERMCAP_so=$'\E[01;33m'    # begin reverse video
    export LESS_TERMCAP_se=$'\E[0m'        # reset reverse video
    export LESS_TERMCAP_us=$'\E[1;32m'     # begin underline
    export LESS_TERMCAP_ue=$'\E[0m'        # reset underline
fi
```

Ben kendi hesabımda **bash** kabuğunu kullandığım için kendi ev dizinimdeki ***~/.bashrc*** dosyasına yukarıdaki konfigürasyon ekleyip dosyamı kaydediyorum.

Daha sonra `source ~/.bashrc` komutu ile, ilgili değişiklikleringeçerli olmasını sağlamamız yeterli. Bu işlemlerin ardından açılan her yeni konsol üzerinde artık `man`, `less` ve `ls` aracının çıktıları renklendiriliyor olacak.

![colored man page]({{ site.url }}/blog/img/colored-man-less-ls/colored.png){:class="responsive img-zoomable"}

