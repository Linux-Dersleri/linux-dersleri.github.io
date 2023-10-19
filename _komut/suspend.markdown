---
layout: komut
author: Taylan Özgür Bildik
title: "suspend Komutu"
modified: 2021-04-14
excerpt: "Mevcut kabuğu askıya almayı sağlar."
tags: [bash, suspend]
categories: komutlar 
toc: true 
---


Mevcut kabuğu askıya almak için `suspend` komutunu kullanabiliriz. Normal şartlarda, mevcut kabuk üzerinde başlatılmış olan herhangi bir işlemi durdurmak için <kbd>Ctrl</kbd> + <kbd>Z</kbd> tuşlaması ile ya da `kill` komutu yardımıyla **SIGNSTP** sinyalini gönderebiliriz. Fakat mevcut kabuğu bu şekilde askıya almamız mümkün değildir. Bu durum için `suspend` komutunu kullanırız. Hemen denemek için yeni bir alt kabuk oluşturup bu kabuğu işlem numarası ile askıya almayı deneyelim.

```bash
┌──(taylan㉿linuxdersler)-[~]
└─$ bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ ps f
    PID TTY      STAT   TIME COMMAND
   9270 pts/0    Ss     0:00 /usr/bin/bash
   9869 pts/0    S      0:00  \_ bash
   9884 pts/0    R+     0:00      \_ ps f

┌──(taylan㉿linuxdersleri)-[~]
└─$ kill STP 9869
bash: kill: STP: arguments must be process or job IDs
```

Gördüğünüz gibi yeni oluşturduğumuz ve üzerinde çalışmakta olduğumuz kabuğu askıya alamadık. Şimdi aynı örneği `suspend` komutu ile tekrar edelim.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ suspend 

[1]+  Stopped                 bash

┌──(taylan㉿linuxdersler)-[~]
└─$ jobs -l
[1]+  9869 Stopped (signal)        bash

┌──(taylan㉿linuxdersler)-[~]
└─$
```

Görebildiğiniz gibi `suspend` komutunun ardından mevcut bash kabuğu askıya alındı ve biz bir önceki ana kabuktan çalışmaya devam ettik. İşte sizler de bu şekilde mevcut kabuğu askıya alıp ana kabuktan işlem yapabilir ve gerektiğinde tekrar kabuk işlemini `fg` komutu ile ön plana alarak alt kabuktan çalışmaya devam edebilirsiniz. 

Gerçek hayattaki kullanımına bir örnek vermemiz gerekirse; örneğin root yetkilerine sahip bir alt kabuk oluşturdunuz ve gerektiğinde root yetkisi dışında bir işlem yapmak için mevcut kabuğu kapatmadan ana kabuğa geçmek istediğinizde kullanabilirsiniz. Bu durumu aşağıdaki çıktıları inceleyerek daha net görebilirsiniz. 

```bash
┌──(taylan㉿linuxdersler)-[~]
└─$ whoami
taylan

┌──(taylan㉿linuxdersler)-[~]
└─$ sudo bash
[sudo] password for taylan: 
┌──(root㉿linuxdersleri)-[/home/taylan]
└─# whoami
root

┌──(root㉿linuxdersleri)-[/home/taylan]
└─# suspend 

[2]+  Stopped                 sudo bash

┌──(taylan㉿linuxdersler)-[~]
└─$ whoami 
taylan

┌──(taylan㉿linuxdersler)-[~]
└─$ fg
sudo bash

┌──(root㉿linuxdersleri)-[/home/taylan]
└─# whoami
root
```

Ek olarak, oturum açma kabukları yalnızca `suspend` komutu ile askıya alınamaz. Oturum açma kabuklarını durdurmak için `suspend` komutunun `-f` seçeneğini kullanabiliriz.