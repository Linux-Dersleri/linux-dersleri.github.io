---
sitemap: true
layout: tutorial
title:  "Değişkenler"
modified: 2024-01-16
author: Taylan Özgür Bildik
coursetitle: "Temel Bash Kabuk Programlama Eğitimi"
excerpt: "Bash kabuğunda değişken tanımlamaktan bahsediyoruz."
tags: [kabuk-programlama,]
categories: [kabuk-programlama]
tutorial: 3
cover: girizgah.webp
toc: true 
---


Bu bölümde değişkenleri ele alacağız, peki ama nedir bu değişkenler ?

Kısaca değişkenler, girdiğimiz değerleri alan veya programın çalışmasıyla bazı değerlerin atandığı veri tutucularıdır. Biz bir değişkene değer atayarak o değeri tekrar tekrar tanımlamak yerine tek bir değişken üzerinden istediğimiz zaman çağırabiliyoruz. Hemen basit bir örnek ile açıklamaya başlayalım;

Değişken tanımlarken öncelikle değişken adını girerek eşittir işaretini koyduktan sonra değişkene atamak istediğimiz değeri tırnak işareti içerisine yazıyoruz.

Örneğin ben `sistem="linux"` şeklinde yazarsam, **sistem** isimli değişkene "**linux**" değerini atamış oluyorum.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ sistem="linux"
```

Değişkenin tanımlanma durumunu, hemen konsol üzerinden çağırarak kontrol edelim. Tanımladığımız herhangi bir değişkeni çağırırken `echo $degisken` şeklinde komut girmemiz yeterli oluyor.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ echo $sistem 
linux
```

Bizim tanımladığımız değişken de ”**sistem”** isimli değişken olduğu için konsola `echo $sistem` komutunu girdiğimde, gördüğünüz gibi karşıma "**linux**" ifadesi basılmış oldu.

Bir örnek daha yapalım ve bu sefer değişkenimize, değer olarak sayı atayalım. Bunun için `rakamlar="12345"` ifadesini konsola giriyorum ve `echo $rakamlar` komutu ile atadığım değişkene ulaşıyorum.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ echo $rakamlar 
12345
```

İşte değişken tanımlamak bu kadar basit. Ancak yine de değişken tanımlarken dikkat etmemiz gereken önemli birkaç detay bulunuyor.

# Değişken Tanımlanırken Dikkat Edilmesi Gerekenler

- Değişken isimleri tanımlarken **Türkçe karakter kullanmadan** alfanümerik(**A-Z, a-z**) karakter kullanmamız gerekiyor.

Örneğin konsola içerisinde Türkçe karakter geçen, `çalı="bitki"` gibi bir değişken tanımlamak istersem, konsol bana çıktı olarak "**komut yok**" hatasını basıyor.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ çalı="bitki"
çalı=bitki: command not found
```

Bunun nedeni de değişken tanımlarında Türkçe karakter kullanımının geçersiz olmasıdır. Bu kullanımın doğrusu Türkçe karakter içermeyen `cali="bitki"` şeklinde olmalıydı.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ echo $cali 
bitki
```

---

- Türkçe karakter dışında, değişken ismi tanımlarken **alt tire işareti haricinde** herhangi bir sembol kullanımı da hataya yol açmaktadır.

Örneğin ben `yeni-yeni="yeni değer"` gibi bir değişken tanımlamaya kalkarsam , konsol bana çıktı olarak "**komut yok**" hatasını basacaktır.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ yeni-yeni="yeni değer"
yeni-yeni=yeni değer: command not found
```

Bunun nedeni, değişken isminde bulunan **tire**(**-**)işaretidir.

Şimdi aynı örneği **alt tire**(**_**) işareti ile deneyerek bu durumu teyit edelim. Bunun için konsola `yeni_yeni="yeni değer"` ifadesini yazıyorum ve tanımladığım değişkeni `echo $yeni_yeni` komutunu girerek sorguluyorum.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ yeni_yeni="yeni değer"

┌──(taylan㉿linuxdersleri)-[~]
└─$ echo $yeni_yeni 
yeni değer
```

Ve gördüğünüz gibi değişken başarılı şekilde tanımlanmış bulunuyor.

Tekrar belirtmiş olalım, hatalı bir kullanıma yol açmamak adına değişken tanımlarken **alt tire işareti haricinde hiç bir sembol kullanmayın**. Yani **yeni+yeni**..**yeni#yeni**..**yeni@yeni** vb tüm kullanımlar hatalıdır.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ yeni+yeni="değer"
yeni+yeni=değer: command not found

┌──(taylan㉿linuxdersleri)-[~]
└─$ yeni#yeni="değer"
yeni#yeni=değer: command not found

┌──(taylan㉿linuxdersleri)-[~]
└─$ yeni@yeni="değer"
yeni@yeni=değer: command not found

┌──(taylan㉿linuxdersleri)-[~]
└─$ yeni^yeni="değer"
yeni^yeni=değer: command not found
```

---

- Tanımlanacak değişken isimleri **kesinlikle rakam ile başlamamalıdır**. Fakat başlangıcı hariç, değişken isimlerinde rakam kullanılabilir.

Yani örneğin herhangi bir değişken tanımlarken **1kitap** hatalı bir kullanım iken **kitap1** ya da **kit1ap** doğru kullanıma örnektir.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ 1kitap="roman"
1kitap=roman: command not found

┌──(taylan㉿linuxdersleri)-[~]
└─$ kitap1="roman"

┌──(taylan㉿linuxdersleri)-[~]
└─$ echo $kitap1 
roman
```

Rakam başta olmadığı sürece tüm kombinasyonlar rakam kullanımına uygundur. (**k1itap**..**ki2tap**..**kit3ap**..**kit33ap**..**kita555p**.. vb.)

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ k1itap="roman"

┌──(taylan㉿linuxdersleri)-[~]
└─$ ki2tap="roman"

┌──(taylan㉿linuxdersleri)-[~]
└─$ kit3ap="roman"

┌──(taylan㉿linuxdersleri)-[~]
└─$ kita4p="roman"

┌──(taylan㉿linuxdersleri)-[~]
└─$ kitap55="roman"

┌──(taylan㉿linuxdersleri)-[~]
└─$ kit44ap="roman"
```

---

- Değişken tanımlarken kullanılan tanımlar, Linux sistemlerinde olduğu gibi **büyük küçük harf duyarlılığına** sahiptir.

Örneğin tamamı büyük harflerden oluşan `TEST="ilk ifade"` şeklindeki bir tanım ile tamamı küçük harflerden oluşan `test="ikinci ifade"` tanımı, bash diline göre iki farklı değişkeni temsil eder. Hemen `echo` komutu yardımıyla bu durumu teyit edelim.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ TEST="ilk ifade"

┌──(taylan㉿linuxdersleri)-[~]
└─$ test="ikinci ifade"

┌──(taylan㉿linuxdersleri)-[~]
└─$ echo $TEST 
ilk ifade

┌──(taylan㉿linuxdersleri)-[~]
└─$ echo $test
ikinci ifade
```

Gördüğünüz gibi aynı isime sahip olan biri küçük diğeri büyük harflerden oluşan iki değişken, sistem tarafından iki farklı değişken olarak algılanarak konsola ayrı ayrı çıktılar basmış oldu.

---

- Değişken tanımlarken **eşittir**(**=**) işaretinin **sağında ve solunda boşluk olmamasına** dikkat etmemiz gerekiyor. Aksi takdirde kabuk, bizlerin değişken tanımlamak istediğini anlayamadığından, kaçınılmaz olarak konsola "**komut yok**" şeklinde hata çıktısı basıyor.

**Aşağıdaki kullanımlar yanlış kullanımlara örnektir.**

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ tanım ="değer"
tanım: command not found

┌──(taylan㉿linuxdersleri)-[~]
└─$ tanım = "değer"
tanım: command not found

┌──(taylan㉿linuxdersleri)-[~]
└─$ tanım= "değer"
tanım=: command not found
```

Ayrıca tırnak işaretleri, değişken değerinin birden fazla kelime bütünü içerdiği durumda sistem tarafından **değerin tamamının** doğru algılanabilmesi adına çok önemlidir. Yani örneğin ben `kalem="kırmızı"` ya da `kalem1=mavi` şeklinde değişken tanımlayabilirim.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ kalem="kırmızı"

┌──(taylan㉿linuxdersleri)-[~]
└─$ echo $kalem 
kırmızı

┌──(taylan㉿linuxdersleri)-[~]
└─$ kalem=mavi

┌──(taylan㉿linuxdersleri)-[~]
└─$ echo $kalem 
mavi
```

Fakat değerin `kalem="kırmızı pilot"` gibi daha fazla öge içerdiği durumlarda mutlaka tırnak içerisinde yazılması gerekiyor. Bu durumu aşağıdaki çıktılara göz atarak teyit edebilirsiniz.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ kalem="kırmızı pilot"

┌──(taylan㉿linuxdersleri)-[~]
└─$ echo $kalem 
kırmızı pilot

┌──(taylan㉿linuxdersleri)-[~]
└─$ kalem=mavi pilot
Command 'pilot' not found, but can be installed with:
sudo apt install pilot
Do you want to install it? (N/y)n
```

Tırnak olmadan gerçekleştirdiğim ikinci tanımda, kabuk bunun bir değişken tanımı olduğunu anlayamadığı için “pilot” isimli bir aracı çalıştırmak istediğimi düşündü. Bu sebeple sistemimde yüklü olmayan bu aracı kurmayı teklif etti. Yani değişken değerlerini sınırlamak için tırnak kullanımının önemli olduğunu görmüş olduk.

---

Örnekler sırasında fark ettiyseniz aynı isimli değişkeni farklı değerler ile tekrar tekrar tanımlayabildiğimizi gördük. Bu da eğer bizler herhangi bir kısıtlama getirmezsek, sürekli olarak değişkenlerin üzerine yeni değerler yazılabileceği anlamına geliyor. Bu durumu daha iyi anlamak adına `spor="tenis"` komutu ile **spor** isimli bir değişken tanımlayalım ve `echo $spor` komutu ile değişkenimizi çağıralım.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ spor="tenis"

┌──(taylan㉿linuxdersleri)-[~]
└─$ echo $spor 
tenis
```

Gördüğünüz gibi bu şekilde **spor** isimli değişkeni ne zaman çağırsam karşıma **tenis** değeri basılmış oluyor. Ancak değişkenin değerini özellikle sabitlemediğimiz sürece, istenildiği zaman bu değer değiştirilebilir. Değişken değerini değiştirmek için aynı isimli değişkeni farklı bir değer ile tekrar tanımlamamız yeterli.

Hemen aynı değişkeni bu sefer **futbol** değeri ile tanımlayıp, bu durumu teyit edelim. Konsola `spor="futbol"` şeklinde yazıyorum ve `echo` komutu ile değişkenimin yeni değerini teyit ediyorum.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ spor="futbol"

┌──(taylan㉿linuxdersleri)-[~]
└─$ echo $spor 
futbol
```

Gördüğünüz gibi önceleri **spor** değişkenini çağırdığımda karşıma ”**tenis”** değeri basılıyorken, değişkenimizi tekrar tanımlamamız yani diğer bir deyişle üzerine yeni değer yazmamız sonucu, aldığımız çıktı ”**futbol”** olarak değişmiş oldu.

İlerleyen kısımlarda değiştirilemez(sabit(readonly)) değişkenler tanımlama konusuna da ayrıca değiniyor olacağız ancak şimdilik basit değişken tanımlama işlemleri ile yapılan tanımlamaların değiştirilebilir değerler aldığını unutmayın lütfen.

Değişkenler yeniden tanımlanabildiği için sistemin çalışmasında rol oynayan, varsayılan olarak tanımlanmış olan değişkenlerle aynı isimlere sahip yeni değişkenler oluşturmama konusunda da dikkatli olmamız gerekiyor. Eğer farkında olmadan sisteme ait değişkenleri yeniden tanımlarsanız, sistemle ilgili pek çok soruna yol açabilirsiniz. Bu yüzden, tanımlayacağınız değişkenin daha önce kullanılıp kullanılmadığından tam olarak emin değilseniz, değişkeninizi tanımlamadan önce sistem üzerinde var olup olmadığını kontrol etmenizde fayda var.

Örneğin o an çalışmakta olduğunuz kabuk ortamında tanımlı olan değişkenleri görmek adına konsola  `echo` yazıp `$` işareti koyduktan sonra iki kez **Tab** tuşuna basabilirsiniz.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ echo $
Display all 141 possibilities? (y or n)
```

Mevcut kabuk ortamındaki tüm değişkenleri listelemek için “y” tuşuna basmanız yeterli.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ echo $
Display all 141 possibilities? (y or n)
$_                                 $LESS_TERMCAP_me
$_backup_glob                      $LESS_TERMCAP_se
$BASH                              $LESS_TERMCAP_so
$BASH_ALIASES                      $LESS_TERMCAP_ue
$BASH_ARGC                         $LESS_TERMCAP_us
$BASH_ARGV                         $LINENO
$BASH_ARGV0                        $LINES
$BASH_CMDS                         $LOGNAME
$BASH_COMMAND                      $LS_COLORS
$BASH_COMPLETION_VERSINFO          $MACHTYPE
$BASH_LINENO                       $MAILCHECK
$BASH_LOADABLES_PATH               $NEWLINE_BEFORE_PROMPT
$BASHOPTS                          $OPTERR
$BASHPID                           $OPTIND
$BASH_REMATCH                      $OSTYPE
$BASH_SOURCE                       $PANEL_GDK_CORE_DEVICE_EVENTS
$BASH_SUBSHELL                     $PATH
$BASH_VERSINFO                     $PIPESTATUS
$BASH_VERSION                      $POWERSHELL_TELEMETRY_OPTOUT
$cali                              $POWERSHELL_UPDATECHECK
$COLORFGBG                         $PPID
$COLORTERM                         $prev
$COLUMNS                           $PROMPT_ALTERNATIVE
$COMMAND_NOT_FOUND_INSTALL_PROMPT  $PROMPT_COMMAND
$COMP_CWORD                        $PS1
$COMP_KEY                          $PS2
$COMP_LINE                         $PS4
$COMP_POINT                        $PWD
$COMPREPLY                         $QT_ACCESSIBILITY
$COMP_TYPE                         $QT_AUTO_SCREEN_SCALE_FACTOR
$COMP_WORDBREAKS                   $QT_QPA_PLATFORMTHEME
$COMP_WORDS                        $rakamlar
$cur                               $RANDOM
$cword                             $redir
$DBUS_SESSION_BUS_ADDRESS          $SECONDS
$DESKTOP_SESSION                   $SESSION_MANAGER
$DIRSTACK                          $SHELL
$DISPLAY                           $SHELLOPTS
$DOTNET_CLI_TELEMETRY_OPTOUT       $SHLVL
$EPOCHREALTIME                     $sistem
$EPOCHSECONDS                      $split
$EUID                              $spor
$exclude                           $SRANDOM
$flag                              $SSH_AGENT_PID
$FUNCNAME                          $SSH_AUTH_SOCK
$GDMSESSION                        $TERM
$__git_printf_supports_v           $test
$GROUPS                            $TEST
$GTK_MODULES                       $UID
$HISTCMD                           $USER
$HISTCONTROL                       $VIRTUAL_ENV_DISABLE_PROMPT
$HISTFILE                          $WINDOWID
$HISTFILESIZE                      $words
$HISTSIZE                          $XAUTHORITY
$HOME                              $XDG_CONFIG_DIRS
$HOSTNAME                          $XDG_CURRENT_DESKTOP
$HOSTTYPE                          $XDG_DATA_DIRS
$IFS                               $XDG_GREETER_DATA_DIR
$_JAVA_OPTIONS                     $XDG_MENU_PREFIX
$k1itap                            $XDG_RUNTIME_DIR
$kalem                             $XDG_SEAT
$ki2tap                            $XDG_SEAT_PATH
$kit3ap                            $XDG_SESSION_CLASS
$kit44ap                           $XDG_SESSION_DESKTOP
$kita4p                            $XDG_SESSION_ID
$kitap1                            $XDG_SESSION_PATH
$kitap55                           $XDG_SESSION_TYPE
$LANG                              $XDG_VTNR
$LANGUAGE                          $_xspecs
$LESS_TERMCAP_mb                   $yeni_yeni
$LESS_TERMCAP_md
```

Bu yaklaşım sayesinde, mevcut kabuktaki değişkenleri öğrendik. Bunun dışında kabuk için standart olarak tanımlı olan değişkenleri görmek üzere yalnızca `env` komutunu da girebiliriz. 

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ env
SHELL=/usr/bin/bash
SESSION_MANAGER=local/linuxdersleri.net:@/tmp/.ICE-unix/813,unix/linuxdersleri.net:/tmp/.ICE-unix/813
WINDOWID=0
QT_ACCESSIBILITY=1
COLORTERM=truecolor
XDG_CONFIG_DIRS=/etc/xdg
XDG_SESSION_PATH=/org/freedesktop/DisplayManager/Session0
XDG_MENU_PREFIX=xfce-
POWERSHELL_UPDATECHECK=Off
LANGUAGE=
LESS_TERMCAP_se=
LESS_TERMCAP_so=
POWERSHELL_TELEMETRY_OPTOUT=1
SSH_AUTH_SOCK=/tmp/ssh-XXXXXXt3tBJ0/agent.813
DOTNET_CLI_TELEMETRY_OPTOUT=1
DESKTOP_SESSION=lightdm-xsession
SSH_AGENT_PID=895
GTK_MODULES=gail:atk-bridge
XDG_SEAT=seat0
PWD=/home/taylan
XDG_SESSION_DESKTOP=lightdm-xsession
LOGNAME=taylan
QT_QPA_PLATFORMTHEME=qt5ct
XDG_SESSION_TYPE=x11
PANEL_GDK_CORE_DEVICE_EVENTS=0
XAUTHORITY=/home/taylan/.Xauthority
XDG_GREETER_DATA_DIR=/var/lib/lightdm/data/taylan                                      
COMMAND_NOT_FOUND_INSTALL_PROMPT=1                                                     
HOME=/home/taylan                                                                      
LANG=en_US.UTF-8                                                                       
LS_COLORS=rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.webp=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36::ow=30;44:                                      
XDG_CURRENT_DESKTOP=XFCE                                                               
XDG_SEAT_PATH=/org/freedesktop/DisplayManager/Seat0                                    
XDG_SESSION_CLASS=user                                                                 
TERM=xterm-256color                                                                    
LESS_TERMCAP_mb=                                                                       
LESS_TERMCAP_me=                                                                       
LESS_TERMCAP_md=
USER=taylan                                                                            
COLORFGBG=15;0                                                                         
DISPLAY=:0.0                                                                           
LESS_TERMCAP_ue=                                                                       
SHLVL=1
LESS_TERMCAP_us=
XDG_VTNR=7                                                                             
XDG_SESSION_ID=2                                                                       
XDG_RUNTIME_DIR=/run/user/1000                                                         
QT_AUTO_SCREEN_SCALE_FACTOR=0                                                          
XDG_DATA_DIRS=/usr/share/xfce4:/usr/local/share/:/usr/share/:/usr/share                
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/local/games:/usr/games:/home/taylan/Desktop/yeni-dizin:/home/taylan/.local/bin/                        
GDMSESSION=lightdm-xsession                                                            
DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/1000/bus                                  
_JAVA_OPTIONS=-Dawt.useSystemAAFontSettings=on -Dswing.aatext=true                     
_=/usr/bin/env
```

Edindiğiniz bu değişken bilgileri sayesinde, halihazırda sistemde tanımlı olan değişkenlere müdahale etmeden daha bilinçli şekilde yeni değişkenler tanımlayabilirsiniz.

Şimdiye kadar pek çok değişken tanımladık ancak tanımladığımız değişkenler herhangi bir sınıfta yer almıyordu. Buradaki sınıftan kastım tanımladığımız değişkenin hangi türden veriyi içerisinde barındırabileceğinin özellikle belirlenmesidir. Yani örneğin değişken sayısal bir değişken mi olacak yoksa bir diziyi mi temsil edecek ya da değişkenimiz sabit değerli mi olacak henüz bunlardan bahsetmedik.

Şimdi sırasıyla farklı türden değişkenleri nasıl tanımlarız bunlara göz atalım.

# Sınıfına Göre Değişken Tanımlamak

Değişkenlerin belirli türlerde değer almasını sağlamak için `declare` komutunu kullanıyoruz.

Aşağıdaki tablodan komutun parametrelerine ve yerine getirebildiği işlevlerine göz atabilirsiniz.

| Parametre | İşlev |
| --- | --- |
| -p | Değişkenin niteliklerini bastırma işlevindedir. print(yazdır) ifadesinin kısaltmasıdır. |
| -i | Sayısal değişken tanımlama işlevindedir. integer(tam sayı) ifadesinin kısaltmasıdır. |
| -a | Dizi tanımlama işlevindedir. array(dizi) ifadesinin kısaltmasıdır. |
| -r | Sabit değişken atama işlevindedir. readonly(yalnızca okunabilir) ifadesinin kısaltmasıdır. |
| -x | Değişkeni export(ihraç) ederek, alt kabuklara aktarma işlevindedir. |

`declare` komutunu kullanıyorken; eğer değişkenlere özellik eklemek istiyorsak `-` işaretini, şayet var olan özellikleri çıkarmak istiyorsak da `+` işaretini, eklemek ya da çıkarmak istediğimiz özelliğin parametresini de belirterek kullanmamız yeterli oluyor.

## Sayısal Değişken Tanımlamak

Anlatımlara ilk olarak sayısal değişken tanımlama işlemi ile başlayalım.

Sayısal değişken tanımlamak için konsola `declare -i değişken="değeri"` şeklinde komutumuzu girmemiz gerekiyor.

Ben **9** değerine sahip **rakam** isimli bir sayısal değişken tanımlamak istediğim için konsola `declare -i rakam="9"` komutumu giriyorum.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ declare -i rakam="9"

┌──(taylan㉿linuxdersleri)-[~]
└─$ echo $rakam
9
```

Böylelikle **rakam** isimli sayısal değişkenime **9** rakamını atamış oldum ve bu değişkenim ben aksini istemedikçe yalnızca sayısal ifadeler alan bir değişken olarak sınıflandırılmış oldu. Bu durumu teyit etmek için öncelikle değişkenimin sınıfını sorgulamak üzere `declare` komutunun **p** parametresini kullanarak `declare -p rakam` komutunu giriyorum.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ declare -p rakam
declare -i rakam="9"
```

Sizlerin de gördüğü gibi konsol bana çıktı olarak `declare -i rakam="9"` şeklinde bir çıktı bastı. Bu çıktı ile değişkenimizin sayısal bir değişken olduğunu teyit etmiş olsak da kesin olarak emin olmak adına, değişkenimize sayısal değerlerin dışında herhangi bir değer atamaya çalışarak bu durumu netleştirelim.

Bunun için konsola `rakam="test"` komutumu girdikten sonra, değişkenimin durumunu sorgulamak üzere `declare -p rakam` komutunu kullanıyorum.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ rakam="test"

┌──(taylan㉿linuxdersleri)-[~]
└─$ declare -p rakam 
declare -i rakam="0"

┌──(taylan㉿linuxdersleri)-[~]
└─$ echo $rakam 
0
```

Gördüğünüz gibi çıktıda rakam değişkenimin değeri "**0**" olarak karşıma gelmiş oldu. Bunun nedeni değişkenime sonradan atamaya çalıştığım "**test**" ifadesinin sayısal bir karşılığının olmamasıdır.

Hatırlarsanız değişken tanımlama anlatımlarının başında **rakamlar** isimli değişkene **12345** ifadesini atamış ve bu değişkenimizi bastırmıştık. Şimdi aynı değişkeni atayıp değerini "**"test**" ifadesi ile değiştirerek, sayısal değer alma özelliği olan değişkenler ile sıradan değişken arasındaki farkı görelim.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ rakamlar="12345"

┌──(taylan㉿linuxdersleri)-[~]
└─$ declare -p rakamlar 
declare -- rakamlar="12345"

┌──(taylan㉿linuxdersleri)-[~]
└─$ rakamlar="test"

┌──(taylan㉿linuxdersleri)-[~]
└─$ declare -p rakamlar 
declare -- rakamlar="test"
```

Gördüğünüz gibi sayısal özellik atamadığım değişkenin içeriğindeki sayısal veriler kolaylıkla değişmiş oldu. Böylelikle sayısal değişken ile sıradan değişken tanımlamanın farkını kıyaslayarak görmüş olduk.

Ancak tanımladığımız sayısal değişkenler her zaman sayısal değişken olarak kalmak zorunda da değil. Değişkenimizin sınıfını tekrar eski hale getirmek istersek ekleme işleminde kullandığımız **`-`** işareti yerine bu sefer **`+`** işaretini kullanmamız yeterli oluyor. Yani ben **rakam** isimli sayısal değişkenimin, sayısal değişken tutma özelliğini kaldırmak istersem; konsola `declare +i rakam` şeklinde komut girmem yeterli oluyor.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ declare -p rakam
declare -i rakam="0"

┌──(taylan㉿linuxdersleri)-[~]
└─$ declare +i rakam

┌──(taylan㉿linuxdersleri)-[~]
└─$ declare -p rakam
declare -- rakam="0"
```

Bu şekilde, `declare` komutunu kullanarak istediğimiz değişkene sayısal değişken özelliği ekleyip çıkartabiliyoruz.

## Dizi Tanımlamak

Birden fazla değeri tek bir değişken içerisine toparlamak istediğimizde dizileri kullanabiliyoruz.

Dizi tanımlamak için `declare` komutunun `a` parametresini `declare -a dizi=(değer1 değer2 değer3)` şeklinde kullanabiliyoruz.

Ayrıca `declare` komutunu kullanmadan, dizide yer alacak ifadeleri parantez içine `dizi=(değer1 değer2 değer3 )` şeklinde alarak da dizi belirtebiliyoruz. Buradaki parantezler o değişkenin bir dizi olduğunu otomatik olarak belirtiyor.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ declare -a dizi=(a b c d e f)

┌──(taylan㉿linuxdersleri)-[~]
└─$ declare -p dizi 
declare -a dizi=([0]="a" [1]="b" [2]="c" [3]="d" [4]="e" [5]="f")

┌──(taylan㉿linuxdersleri)-[~]
└─$ dizi2=(z x c v b)

┌──(taylan㉿linuxdersleri)-[~]
└─$ declare -p dizi2
declare -a dizi2=([0]="z" [1]="x" [2]="c" [3]="v" [4]="b")
```

Dizilerin kullanımına en basit örnek alışveriş listesi olarak verilebilir.

Örneğin ben **liste** isimli bir değişken tanımlayıp bu değişkenin içerisine istediğim sayıda değer atayabilir ve atadığım değerleri tek tek çağırabilirim. Örnek olması için; konsola `liste=(su süt çay elma ekmek)` şeklinde komutumu girerek, **liste** isimli değişkene birden fazla değer atamış oluyorum.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ liste=(su süt çay elma ekmek)

┌──(taylan㉿linuxdersleri)-[~]
└─$ declare -p liste 
declare -a liste=([0]="su" [1]="süt" [2]="çay" [3]="elma" [4]="ekmek")
```

Böylelikle her bir değere **0 dan başlayarak** sırasıyla birer index numarası atanmış oldu. Yani örneğin **su** ifadesi ilk değer olduğu için **0** index numarasını almışken, 3. sıradaki **çay** değerinin index numarası **2** olmuş oldu.

Bizler de sıralı şekilde atanan bu index değerleri sayesinde istediğimiz değerleri diziden çağırabiliyoruz.

Örneğin dizide yer alan ilk değeri çağırmak istersem konsola `echo ${liste[0]}` komutunu girmem yeterli oluyor.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ echo ${liste[0]}
su
```

Gördüğünüz gibi **0** index numarası ile ilk değerimizi ekran bastırmış olduk.

Bu işlemi aynı şekilde diğer değerlerimizi tek tek bastırmak için de kullanabiliriz.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ echo ${liste[1]}
süt

┌──(taylan㉿linuxdersleri)-[~]
└─$ echo ${liste[2]}
çay

┌──(taylan㉿linuxdersleri)-[~]
└─$ echo ${liste[3]}
elma

┌──(taylan㉿linuxdersleri)-[~]
└─$ echo ${liste[4]}
ekmek
```

Eğer tüm değişkenleri tek sefer bastırmak istersek `*` ya da `@` işaretini kullanabiliriz.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ echo ${liste[*]} 
su süt çay elma ekmek

┌──(taylan㉿linuxdersleri)-[~]
└─$ echo ${liste[@]} 
su süt çay elma ekmek
```

Tanımlanmış olan dizi elemanının kaç karakterden oluştuğunu öğrenmek için **`#`** simgesini kullanarak, komutumuzu `echo ${#dizi[değişken indexi]}` şeklinde giriyoruz.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ echo ${liste[0]} 
su

┌──(taylan㉿linuxdersleri)-[~]
└─$ echo ${#liste[0]} 
2

┌──(taylan㉿linuxdersleri)-[~]
└─$ echo ${liste[3]} 
elma

┌──(taylan㉿linuxdersleri)-[~]
└─$ echo ${#liste[3]} 
4
```

Üstelik bu kullanım sadece diziler için değil, değişkenler için de geçerlidir.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ deneme="deneme metni"

┌──(taylan㉿linuxdersleri)-[~]
└─$ echo ${#deneme} 
12
```

Eğer komutumuzda index numarası ile herhangi bir dizi elemanı belirtmezsek varsayılan olarak dizide yer alan ilk eleman işleme alınıyor.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ deneme="deneme metni"

┌──(taylan㉿linuxdersleri)-[~]
└─$ echo ${#deneme} 
12
```

Ayrıca dizi içerisinde kaç tane değişken olduğunu öğrenmek için de `#` simgesini ile birlikte index numarası kısmında `*` simgesini kullanmamız yeterli.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ echo ${#liste[*]} 
5

┌──(taylan㉿linuxdersleri)-[~]
└─$ declare -p liste 
declare -a liste=([0]="su" [1]="süt" [2]="çay" [3]="elma" [4]="ekmek")
```

## Sabit Değişken Tanımlamak

Şimdi ise tanımladığımız değişkenin değerinin, değiştirilemez şekilde sabit kalmasını nasıl sağlarız bunu görelim. Bu işlem için `readonly` komutunu ya da `declare` komutunun `r` parametresini kullanabiliyoruz.

Örneğin ben **sabit** isimli bir değişkenin değerini sabitlemek üzere konsola `readonly sabit="sabit değer"` şeklinde komutumu giriyorum. Daha sonra atadığım sabit değeri değiştirmeye çalışarak, değerin gerçekten sabit olup olmadığını teyit etmeye çalışıyorum.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ readonly sabit="sabit değer"

┌──(taylan㉿linuxdersleri)-[~]
└─$ declare -p sabit 
declare -r sabit="sabit değer"

┌──(taylan㉿linuxdersleri)-[~]
└─$ sabit="yeni değer"
bash: sabit: readonly variable
```

Ve gördüğünüz gibi **sabit** isimli değişkenimin değeri sabit olduğu için içerisine yeni bir değer atanamadı.

Ayrıca biliyorsunuz ki sabit değer atama işlemini `readonly` komutu yerine, `declare` komutu ile de gerçekleştirebilirdik. Hemen bu şekilde de bir örnek yapmak adına konsola `declare -r sabit1="sabit değer 1"` şeklinde de komutumu girip değişkenimin özelliğini `p` parametresi ile teyit ediyorum.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ declare -r sabit1="sabit değer 1"

┌──(taylan㉿linuxdersleri)-[~]
└─$ declare -p sabit1
declare -r sabit1="sabit değer 1"
```

Son olarak bu değerimi de değiştirmeye çalışarak değişkenimin sabit olup olmadığını teyit ediyorum.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ sabit1="yeni bir değer"
bash: sabit1: readonly variable
```

Ve yine gördüğünüz gibi atadığımız değişken sabit olduğundan yeni bir değer atanamadı.

**Sabit değişken tanımlarken dikkat edilmesi gereken nokta, sabit değişkenlerin bir kez tanımlandıktan sonra kesinlikle silinip, değiştirilemeyeceğidir**. Sabit değişken bir kez tanımlandıktan sonra sabit şekilde kalır. Bu durumu teyit etmek için değişkenimizin sabitlik özelliğini `declare +r` komutu ile kaldırmayı deneyelim.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ declare +r sabit
bash: declare: sabit: readonly variable

┌──(taylan㉿linuxdersleri)-[~]
└─$ declare +r sabit1
bash: declare: sabit1: readonly variable
```

Komutumuzu girdik ancak gördüğünüz gibi değişken sabit değere sahip olduğundan konsol bu işlemin mümkün olmadığını belirtiyor. Peki ama sabit değişkenler gerçekten sonsuza kadar tanımlandığı şekilde mi kalıyor ?

Aslında bu durum; yalnızca değişkenin tanımlandığı kabuk ortamında geçerli olduğundan, mevcut kabuk kapatıldığında tanımlanan tüm değişkenlerle birlikte sabit değişkenlerin de sıfırlanmasıyla sonuçlanır. Bu durumun daha net anlamak için lütfen okumaya devam edin.

# Değişkenlerin export Edilmesi

Bu kısıma kadar temel olarak değişkenleri nasıl tanımlayabileceğimizden ve tanımlama yaparken nelere dikkat etmemiz gerektiğinden bahsettik. Ancak henüz değinmediğimiz ve önemli olan başka bir konu da; değişkenlerin **export** edilmediği sürece yalnızca tanımlandıkları kabuk üzerinden çağırılabiliyor olduklarıdır.

Örneğin bir betik dosyasını çalıştırdığımızda mevcut **kabuk**(**shell**) bu işlem için **çatallama**(**fork**) yaparak bir **alt kabuk**(**subshell**) oluşturur ve betiği bu alt kabukta çalıştırır. Daha sonra görev tamamlanınca alt kabuk öldürülerek ana kabuğa dönülür. Böylelikle tek bir kabuk altında birden fazla alt kabuk oluşturularak aynı anda pek çok işlemin gerçekleştirilmesi mümkün olur. Kabuğun çalışma yapısını daha iyi anlamak adına aşağıdaki örnek çalışma şablonuna göz atabilirsiniz.

![env-on-new-shell]({{ site.url }}/egitim/kabuk-programlama/degiskenler/shell-fork.png){:class="responsive img-zoomable"}


İşte kabuğun çalışma yapısı böyle olduğundan, bizler herhangi bir değişken tanımladığımızda bu değişkenin alt kabuklarda da tanınmasını istiyorsak mutlaka `export` komutu ile değişkenimizi alt kabuklara ulaştırmalıyız.

Bu durumu gözlemlemek için çalışmakta olduğum kabuk üzerinde `degisken="yeni değer"` şeklinde bir değişken tanımlayıp konsola bastırıyorum.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ degisken="yeni değer"

┌──(taylan㉿linuxdersleri)-[~]
└─$ echo $degisken 
yeni değer
```

Tanımladığımız kabuk üzerinde değişkenimizi kolaylıkla bastırdık, şimdi de aynı değişkeni betik dosyası içerisinden çağırarak bastırmayı deneyelim. Bu işlem için **test.sh** isimli bir betik dosyası oluşturup, daha öncesinde tanımlamış olduğum değişkeni çağırmak üzere `echo $degisken` komutumu yazıyorum. Ayrıca betik dosyası içerisinde de `degisken1="deneme"` şeklinde yeni bir değişken tanımlayıp `echo $degisken1` komutu ile bu değişkenin çağırılmasını sağlıyorum.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ cat > test.sh
#!/bin/bash
  
echo $degisken
degisken1="deneme"
echo $degisken1
```

Çalıştırma yetkisi verelim.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ sudo chmod +x test.sh
[sudo] password for taylan:
```

Tanımlamaları yaptık şimdi de betik dosyamızı çalıştırarak sonuçları gözlemleyelim.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ ./test.sh

deneme

┌──(taylan㉿linuxdersleri)-[~]
└─$ bash test.sh

deneme
```

Gördüğünüz gibi betik dosyası içerisinde tanımlamış olduğum **degisken1** basılırken daha önce(mevcut kabuğum üzerinde) tanımlamış olduğum **degisken** basılmadı. Bunun nedeni başta da belirtiğim şekilde, tanımlanan değişkenlerin `export` edilmediği sürece yalnızca tanımlandığı kabuk üzerinde geçerli olmasıdır. Biz betik dosyasını çalıştırdığımızda bulunduğumuz kabuk altında hemen bir alt kabuk oluşturuldu ve betik dosyamız bu alt kabuk üzerinde yürütüldü. Dolayısı ile üst kabukta tanımlanmış olan değişken alt kabuğa `export` edilmediği için alt kabuk tarafından tanınamadı ve değeri basılamadı.

Şimdi aynı işlemi `export` ederek tekrarlayalım.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ echo $degisken 
yeni değer

┌──(taylan㉿linuxdersleri)-[~]
└─$ export degisken

┌──(taylan㉿linuxdersleri)-[~]
└─$ ./test.sh
yeni değer
deneme

┌──(taylan㉿linuxdersleri)-[~]
└─$ bash test.sh
yeni değer
deneme
```

Gördüğünüz gibi değişkenimizi `export` ettikten sonra alt kabukta çalıştırılan betik dosyası içerisinden de bu değişkeni çağırabildik. Böylelikle `export` komutunun işlevini test ederek görmüş olduk. Ayrıca `export` komutu yerine aynı işlem için `declare` komutunun `x` parametresini `declare -x degisken` şeklinde de kullanabilirdik.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ degisken1="değer"

┌──(taylan㉿linuxdersleri)-[~]
└─$ declare -p degisken1
declare -- degisken1="değer"

┌──(taylan㉿linuxdersleri)-[~]
└─$ declare -x degisken1

┌──(taylan㉿linuxdersleri)-[~]
└─$ declare -p degisken1
declare -x degisken1="değer"
```

# Değişkenlerin Sıfırlanması (unset)

Tanımladığımız değişkenleri sıfırlamak yani tanımsız hale getirmek istersek `unset` komutunu kullanabiliyoruz. Şimdi örnek olması açısından çeşitli değişkenleri sıfırlamayı deneyelim.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ degisken="değer"

┌──(taylan㉿linuxdersleri)-[~]
└─$ declare -p degisken
declare -- degisken="değer"

┌──(taylan㉿linuxdersleri)-[~]
└─$ unset degisken 

┌──(taylan㉿linuxdersleri)-[~]
└─$ declare -p degisken
bash: declare: degisken: not found
```

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ dizi=(bir iki üç dört)

┌──(taylan㉿linuxdersleri)-[~]
└─$ declare -p dizi 
declare -a dizi=([0]="bir" [1]="iki" [2]="üç" [3]="dört")

┌──(taylan㉿linuxdersleri)-[~]
└─$ unset dizi

┌──(taylan㉿linuxdersleri)-[~]
└─$ declare -p dizi
bash: declare: dizi: not found
```

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ readonly sabit="sabit değer"

┌──(taylan㉿linuxdersleri)-[~]
└─$ declare -p sabit 
declare -r sabit="sabit değer"

┌──(taylan㉿linuxdersleri)-[~]
└─$ unset sabit 
bash: unset: sabit: cannot unset: readonly variable
```

Gördüğünüz gibi **sabit değişkenler hariç,** değişken ve diziler `unset` komutu sayesinde kolaylıkla sıfırlanabiliyor. Sabit değişkenlerin sıfırlanması için, sabit değişkenin tanımlı olduğu kabuğun kapatılması gerek. O yüzden sabit değişkenler hariç, tanımlamış olduğunuz diğer değişkenleri tanımsız yapmak isterseniz `unset` komutunu kullanmanız yeterli.

# Sistemde Tanımlı Ortam(Çevre) Değişkenleri

Bu kısıma kadar kendimiz nasıl değişken tanımlarız bunu ele aldık. Şimdi de sistemde tanımlı olan değişkenlerden bahsederek anlatımlara devam edelim.

## Ortam Değişkenlerini Görüntülemek

Standart kabuk için tanımlı olan değişken değerlerini görmek için `env` komutunu kullanabilir ya da mevcut kabuk ortamındaki değişkenleri listelemek üzere `echo $` komutundan sonra iki kez tab tuşuna basabileceğinizi biliyorsunuz.

Değişkenler, genellikle spesifik amaçlar doğrultusunda belirli değerlerin tekrar tekrar ulaşılabilir olması için tanımlanırlar. Dolayısıyla gerçekleştirmek istediğiniz işlemler doğrultusunda hangi değişkenin hangi amaçla tanımlandığını bilmeniz faydalı olacaktır. Pek tabii ihtiyaç duymadığınız sürece sistem üzerinde tanımlı olan tüm değişkenlerin detaylı olarak ne için tanımlandıklarını ezberinizde tutmanız gerekmiyor. Yine de hazır yeri gelmişken, temel ve sık kullanılan değişkenlerden birkaçını da kısaca açıklayacak olursak:

**SHELL:** Mevcut kullanıcı için tanımlı olan varsayılan kabuk programının değerini verir.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ echo $SHELL
/usr/bin/bash

┌──(taylan㉿linuxdersleri)-[~]
└─$ su root
Password: 
┌──(root㉿linuxdersleri)-[/home/taylan]
└─# echo $SHELL
/usr/bin/zsh
```

**PATH:** Konsola komut girildiğinde, bu komutu temsil eden aracın dosyaların aranacağı dizinleri belirtir. Bu sayede kabuk harici bir komut çalıştıracağında sırasıyla hangi dizinlere bakması gerektiğini bilir.

**HOME:** Mevcut kullanıcının ev dizinini verir.

```bash
┌──(taylan㉿linuxdersleri)-[~]                                                         
└─$ echo $HOME                                                                         
/home/taylan

┌──(taylan㉿linuxdersleri)-[~]
└─$ su root                                                                            
Password: 
┌──(root㉿linuxdersleri)-[/home/taylan]
└─# echo $HOME
/root
```

## PATH Hakkında

Eğer temel Linux bilgisine sahipseniz PATH değişkeninin çok önemli olduğunu mutlaka biliyorsunuzdur. Ben yine de çok kısaca tekrar ele almak istiyorum.

Öncelikle `echo $PATH` komutu ile mevcut kabuktaki PATH değişken değerini öğrenelim.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/local/games:/usr/games:/home/taylan/.local/bin/
```

Çıktının bize gösterdiği yani konsolun demek istediği şu:

**Konsoldan girilen herhangi bir komutu çalıştırabilmem için sırasıyla bu** /usr/local/sbin: /usr/local/bin: /usr/sbin: /usr/bin: /sbin: /bin: /usr/local/games: /usr/games: /home/taylan/.local/bin/ **dizinlere bakmam gerek. Eğer verilen komutun çalıştırılabilir dosyası bu dizinlerin içerisinde ise çalıştırırım, yoksa çalıştıramam.**

Çıktıda görülen iki nokta üst üste (:) işareti ile ayrılmış dizinlere **PATH(yol)** ortam değişkeni deniyor.

Hazır yeri gelmişken gelin **PATH** yoluna ekli olmayan bir programı bu yola ekleyip konsoldan vereceğimiz bir komutla direk olarak çalışmasını sağlayalım. Yani örneğin ben konsola `nano` yazdığımda dosya konumu belirtmeme gerek kalmadan **nano** programı otomatik olarak açılıyorsa, bu **PATH** yolu üzerinde tanımlı olmasındandır. 

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ which nano
/usr/bin/nano
```

Bakın nano aracı ***/usr/bin*** dizini altında, yani **PATH** yolundaki bir dizindeymiş. Dolayısıyla kabuğa yalnızca ismini girdiğimde PATH yolundan bu dosya ismi ile eşleşen ilk dosya çalıştırılıyor.

Örnek olması açısında biz de daha önce yazmış olduğumuz **selam.sh** isimli betik dosyamızı bu şekilde istenilen konumdan ismi ile çalıştırılabilir kılalım. Adım adım ilerleyelim;

Benim çalıştırmak istediğim dosya daha önce yazmış olduğum **selam.sh** isimli betik dosyası.

Ben bu dosyanın bulunduğu konumdayken dosyayı `./selam.sh` komutu ile çalıştırabiliyorum

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ ls -l selam.sh 
-rwxr-xr-x 1 taylan taylan 33 Jan 23 09:13 selam.sh

┌──(taylan㉿linuxdersleri)-[~]
└─$ ./selam.sh 
selamlar
```

Ancak dosyanın bulunduğu dizin dışından herhangi bir konumdayken bu dosyamı doğrudan çalıştıramıyorum.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ cd /etc/

┌──(taylan㉿linuxdersleri)-[/etc]
└─$ ls -l selam.sh
ls: cannot access 'selam.sh': No such file or directory

┌──(taylan㉿linuxdersleri)-[/etc]
└─$ ./selam.sh 
bash: ./selam.sh: No such file or directory
```

Yapmamız gereken, dosyamızın bulunduğu konumu **PATH** yoluna eklemek ya da dosyamızı **PATH** yolu üzerinde yer alan bir konuma taşımak olacak. Bu sayede konsola `selam.sh` komutunu girdiğimizde **PATH** yolu taranacak ve dosyamız bu yol üzerindeki herhangi bir konumda ise bulunup çalıştırılacak. Her iki şekilde de bu durumu test edelim.

Öncelikle PATH yolunu kontrol edelim ve bu yola selam.sh dosyasını taşıyalım.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/local/games:/usr/games:/home/taylan/.local/bin/

┌──(taylan㉿linuxdersleri)-[~]
└─$ sudo mv selam.sh /usr/local/bin/
[sudo] password for taylan: 
```

Şimdi herhangi bir çalışma konumundan, `selam.sh` komutu ile ilgili betik dosyasını çalıştırmayı deneyebiliriz. 

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ selam.sh
selamlar

┌──(taylan㉿linuxdersleri)-[~]
└─$ cd /etc/

┌──(taylan㉿linuxdersleri)-[/etc]
└─$ selam.sh 
selamlar
```

Gördüğünüz gibi betik dosyam PATH yolu üzerinde bulunan bir konuma eklenince herhangi bir konumdan, ismi girilerek çalıştırılabilir oldu.

Aynı şekilde dosyamızın bulunduğu konumu **PATH** yoluna ekleyerek de her yerden ulaşılabilir kılabiliriz. Ekleme işlemi için, bash kabuğunun açılırken okuduğu bir konfigürasyon dosyasında bu tanımlamayı gerçekleştirmemiz gerekiyor. Fakat bundan önce, bu tanımlamanın hangi kapsamda olabileceğine değinmemiz gerekiyor. Tanımlama kapsamlarını da temelde üç kategoride ele alabiliriz.

- kabuğa özel **:** yalnızca açık olan mevcut kabuktaki uygulamalar için geçerli
- **kullanıcıya özel:** yalnızca tek kullanıcı için geçerli olan ve o kullanıcının her oturum açtığında kullanabildiği
- **sistem geneli :** sisteme öntanımlı olarak ayarlanmış tüm kullanıcılar tarafından sürekli kullanılabilir

Gelin şimdi teker teker kullanımlarına değinelim.

## Mevcut Kabuğa Özel

**Sadece o an kullanmakta olduğumuz kabuğa özel olan ve kabuğu kapattıktan sonra sıfırlanan ortam değişkenidir.** Aşağıdaki örnek ile adım adım açıklayalım bu durumu:

Mevcut kabuğumda `isim="taylan"` şeklinde bir değişken tanımlayıp, bu değişkeni bastırıyorum.

```bash
┌──(taylan㉿linuxdersleri)-[/etc]
└─$ isim="taylan"

┌──(taylan㉿linuxdersleri)-[/etc]
└─$ echo $isim 
taylan
```

Daha sonra yeni bir konsol açarak **isim** değişkenini konsola bastırmayı deniyorum.

![env-on-new-shell]({{ site.url }}/egitim/kabuk-programlama/degiskenler/env-on-new-shell.png){:class="responsive img-zoomable"}

Gördüğünüz gibi yeni açmış olduğum konsoldaki çıktı boş oldu. Bunun nedeni, tanımladığım değişkenin yalnızca tanımlandığı kabuk üzerinden çağırılabileceğidir. 

Hatta bu değişkeni **export** etmediğimizde alt kabuklarda dahi bastırılamadığını sizler de biliyorsunuz.

```bash
┌──(taylan㉿linuxdersleri)-[/etc]
└─$ echo $isim 
taylan

┌──(taylan㉿linuxdersleri)-[/etc]
└─$ bash #bash komutu ile alt kabuk başlatıyorum.
┌──(taylan㉿linuxdersleri)-[/etc]
└─$ echo $isim
```

Ben `bash` komutunu girdiğimde, mevcut kabuğun altında yeni bir kabuk başlatıldı. Ve bu alt kabuk üzerinden, üstteki kabukta tanımlı olan ama export edilmemiş olan değişken değerine ulaşamadığımızı görmüş olduk. Bu tür tanımlamalar “**mevcut kabuğa özel**” olan sınıftadır.

## Kullanıcıya (Oturuma) Özel

BASH, her oturum açtığımızda tüm ayarlarını ve davranışlarını kullanıcıya özel olan ve kullanıcının ana dizininde bulunan ***.bashrc*** isimli gizli bir dosyadan okuyor. Yani eğer bizler mevcut oturumumuzdaki değişkenler üzerinde kalıcı değişiklik yapmak istiyorsak; değişiklikleri ***.bashrc*** isimli dosyaya eklememiz gerekiyor ki, her oturum açtığımızda sistem burada yaptığımız değişiklikleri otomatik olarak görüp sisteme tanımlayabilsin.

Örnek olması açısında bu sefer de `soyisim="bildik"` değişkenini **yalnızca taylan kullanıcısına özel** olarak tanımlamayı ele alıyorum.

Öncelikle ilgili kullanıcının kendi ev dizininde bulunan ***.bashrc*** dosyasını açmak üzere `nano ~/.bashrc` komutunu girelim. 

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ nano /home/taylan/.bashrc
```

Not: Benim kullanıcı hesabımın ev dizini ***/home/taylan*** olduğu için ben uzun uzadıya aşağıdaki şekilde girdim. Siz dilerseniz mevcut kullanıcı hesabının ev dizini temsil etmek için yalnızca tilde `~` işaretini de kullanabilirsiniz tabii.

Komutumuzu girdikten sonra karşımıza konsol ekranı içerisinde ***.bashrc*** dosyasının içeriği geliyor. Klavyedeki yön tuşlarını kullanarak en alt satıra inelim ve taylan kullanıcısına özel olarak tanımlamak istediğimiz değişkeni `export soyisim="bildik"` şeklinde girip, Ctrl + X tuş kombinasyonu ile yaptığımız değişikliği kaydedelim.

```bash
export soyisim="bildik"
```

Artık böylelikle değişiklik yaptığımız bu taylan kullanıcı kullanıcısı tarafından bir bash kabuğu başlatıldığında, bu konfigürasyon dosyasında tanımladığımız **soyisim** değişkeni geçerli olacak.

Ancak dosyada değişikliği yaptığımız anda değişken sisteme hemen tanımlanmıyor. Bunun nedeni ***.bashrc*** dosyasının oturum açılırken okunmasıdır. Yani yaptığımız değişikliklerin geçerli olabilmesi için oturumun kapatılıp tekrar açılması ya da alternatifi olan `source` komutunun `source ~/.bashrc` şeklinde kullanılması gerekiyor.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ source ~/.bashrc
```

Şimdi **taylan** kullanıcı hesabında ve başka bir kullanıcı hesabı olan **ali** kullanıcı hesabında **soyisim** değişkenini bastırmayı deneyelim.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ echo $soyisim 
bildik

┌──(taylan㉿linuxdersleri)-[~]
└─$ su - ali
Password: 
┌──(ali㉿linuxdersleri)-[~]
└─$ echo $soyisim

┌──(ali㉿linuxdersleri)-[~]
└─$
```

Gördüğünüz gibi ilgili tanımlama yalnızca taylan kullanıcı hesabı üzerinden erişilebilir durumda.

Hatta root kullanıcı hesabındayken birden fazla kabuk oturumu üzerinden bile **soyisim** değişkenini çağırabiliyorum. Hatırlarsanız yalnızca kabuğa özel olarak tanımladığımız değişkeni yalnızca tanımlandığı kabuk üzerinde bastırabiliyorken, kullanıcıya özel olarak tanımlanmış değişkeni kullanıcı hesabında açtığımız tüm kabuk oturumları üzerinden bastırabiliyoruz. Çünkü tüm bu oturumlar taylan kullanıcı hesabı tarafından başlatılıyor. 

![env-on-new-shell]({{ site.url }}/egitim/kabuk-programlama/degiskenler/env-on-new-shell2.png){:class="responsive img-zoomable"}

## Sistem Genelinde

Eğer yaptığımız değişiklik bütün kullanıcı oturumlarında aynı şekilde geçerli olsun istiyorsak, değişkenin sistemde her oturum açıldığında okunan bir dosyada bulunması gerekiyor. Bu yüzden tanımlayacağımız değişkeni ***/etc*** dizini altında yer alan ***bash.bashrc*** dosyasına uygun şekilde eklemeliyiz.

Öncelikle dosyamızı açmak üzere konsola `sudonano /etc/bash.bashrc` komutunu girelim.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ sudo nano /etc/bash.bashrc
[sudo] password for taylan:
```

Bu kez de örnek olması için `lokasyon="istanbul"` değişkenini ***bash.bashrc*** dosyamıza ekleyip kaydedelim.

```bash
export lokasyon="istanbul"
```

Sıra geldi değişikliklerin sistem tarafından tanınmasına. Yapılan değişikliğin sistem bütününde geçerli olabilmesi için daha önce de bahsi geçen `source` komutunu ***bash.bashrc*** dosyası için `source /etc/bash.bashrc` şeklinde kullanalım.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ source /etc/bash.bashrc

taylan@linuxdersleri:~$
```

Ardından değişikliklerin geçerli olup olmadığını denemek için birden fazla kullanıcı hesabında **lokason** değişkenini bastırmayı deneyelim.

```bash
taylan@linuxdersleri:~$ whoami
taylan

taylan@linuxdersleri:~$ echo $lokasyon 
istanbul

taylan@linuxdersleri:~$ su - ali
Password: 
┌──(ali㉿linuxdersleri)-[~]
└─$ whoami
ali

┌──(ali㉿linuxdersleri)-[~]
└─$ echo $lokasyon 
istanbul
```

Çıkıtları dikkatlice inceleyecek olursanız, tüm kullanıcıların ortak olarak **lokasyon** değişkenin değeri olan “istanbul” verisine ulaşabildiğini görebilirsiniz. Dolayısıyla sistem genelindeki bash kabuklarında geçerli olacak bir tanımlamayı nasıl gerçekleştirebileceğimizi de teyit etmiş olduk.

Bu bilgiler ışığında eğer PATH değişkenine yeni değer tanımlayarak, PATH yoluna istediğimiz bir dizin adresini eklemek istersek tek yapmamız gereken uygun konfigürasyon dosyasında tekrar tanımlama yapmak. 

Örneğin yalnızca sizin kullanıcı hesabınız için yeni bir PATH yolu tanımlamak için ~/.bashrc dosyasına aşağıdaki şekilde yeni dizin adresini ekleyebilirsiniz.

```bash
export PATH="$PATH:/yeni/dizin/adresi"
```

PATH yoluna yeni dizin eklemek ve PATH yolu hakkında daha fazla detay için [buraya](http://localhost:4000/egitim/temel-linux/kabuk-nasil-calisir/index.html#path-yolu) göz atın.

Ayrıca değişiklikleri geri almak isterseniz eklediğiniz ifadeyi ilgili dosyadan silin ve sistemi `source ilgili_dosya_adı` şeklindeki komut bütünü ile yeniden konfigüre edin, böylelikle bütün değişiklikler sıfırlanmış olacaktır.