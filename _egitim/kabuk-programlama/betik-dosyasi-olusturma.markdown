---
sitemap: true
layout: tutorial
title:  "Betik Dosyası Oluşturma"
modified: 2024-01-19
author: Taylan Özgür Bildik
coursetitle: "Temel Bash Kabuk Programlama Eğitimi"
excerpt: "Betik dosyalarını nasıl oluşturup çalıştırabileceğimizi ele alıyoruz."
tags: [kabuk-programlama,]
categories: [kabuk-programlama]
tutorial: 2
cover: girizgah.webp
toc: true 
---


## shebang ile Çalışma Ortamının Belirtilmesi

Bash script yazarken ilk olarak dosyanın başına unix sistemlerinde "<strong class="text-danger">shebang</strong>" olarak geçen "<strong class="text-danger">#!</strong>" tanımını, <strong class="text-success">betiğin çalıştırılacağı ortamı</strong> da belirterek "**#!/bin/bash**" şeklinde eklememiz gerekiyor.

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
<span class="kirmizi">#!</span><span class="yesil">/usr/bin/bash</span>

<span class="kirmizi">shebang</span><span class="yesil">çalışma ortamı</span>
</code></pre></div></div>

İlk satıra eklenen bu ifade, sonraki alt satırların hangi çalışma ortamı tarafından yorumlanacağını bildiren standart bir tanımdır. Dosya açıldığında ilk olarak buraya bakılır ve dosyanın çalıştırılabilir ortamının mevcut olup olmadığına karar verilir. İlgili ortam sistemde yüklü ise dosya bu ortam üzerinden çalıştırılır. Dolayısıyla komutların doğru yorumlanabilmesi için her bash script dosyasında bu tanım mutlaka bulunmalıdır.

### env ile Ortamın Otomatik Bulunması

Ayrıca bu kullanımın dışında çalıştırılacak ortamı `#!/usr/bin/env bash` şeklinde belirtmeniz de mümkün. Bu kullanım ile bash ortamının sistemde kurulu olduğu konum otomatik olarak bulunup betik dosyası bu ortam üzerinden çalıştırılıyor. Bu neden gerekli diyecek olursanız; istisnai durumlarda bash ortamı bizim ilk olarak belirtiğimiz konum olan **/bin/bash** konumunda yer almayabiliyor. Bu gibi durumlarda betik dosyamızın çalıştırılacağı bash ortamının sistem üzerinde nerede kurulu olduğunu tayin etme işini `env` aracı üstleniyor. `env` aracı, çevre değişkenlerini sorgulayarak bash ortamının sistem üzerinde yüklü olduğu konumu kolayca bulabiliyor.

Peki ama `env` komutu tüm sistemlerde ***/usr/bin/*** altında mı ? Yani `env` komutunun konumu da sistemden sisteme göre değişmiyor mu ? Çok nadir durumlar dışında hayır değişmiyor, çünkü pek çok betik dosyası bu yöntem ile çalıştırılacak ortamı belirtiyor. Sistemler de bu durumu göz önünde bulundurarak env aracının dosyasını ***/usr/bin/*** dizinini altında tutuyor. Bu durumu gözlemlemek adına, farklı sistemler üzerinden bu durumu teyit etmeyi deneyebilirsiniz. Debian, Ubuntu, CentOS, MacOS, SUSE, RHEL, NetBSD, OpenBSD, FreeBSD, Solaris.. sistemlerinde ***/usr/bin/env*** konumunda yer alıyor.

Kafanızda soru işareti kalmaması adına biraz daha açıklamak istiyorum. Bahsi geçen `env` komutu İngilizce "**environment**" ifadesinin yani "**ortam**" ifadesinin kısaltmasından geliyor. Görevi de sistem üzerinde yüklü bulunan ortamlardan haberdar olup, gerektiğinde bu ortamların çalıştırılabilmesini sağlamaktır. Örneğin Python ile yazılmış bir programın çalışması için Python ortamına ihtiyacı vardır. Çünkü Python dili ile yazılmış komutları yalnızca Python ortamı anlamlandırıp, bilgisayarımıza aktarabilir. Eğer sistemimizde Python ortamı yüklü ise bizler bu ortamın nerede bulunduğunu bilmeye ihtiyaç duymadan `env python` komutu ile gerekli ortamın açılmasını sağlayabiliriz. Çünkü Python çalışma ortamı farklı sistemlerde farklı konumlarda bulunuyor olabilir ve ayrıca dosyanın Python ortamı ile çalışması gerektiğini de `env` sayesinde özellikle bildirmiş oluyoruz. 

İşte bizler de yazmış olduğumuz aracın tüm sistemlerde kendi çalışma ortamını otomatik olarak bulunup çalıştırılabilmesi için `env` komutundan faydalanıyoruz. Bu sayede eğer sistem üzerinde bash ortamı yüklü ise `env` komutu gidip bash ortamını bulup çalıştırıyor. Yani bu kullanım, yazmış olduğumuz betik dosyalarının tüm Linux sistemlerinde ortak olarak çalıştırılabilmesi için diğer bir deyişle betik dosyamızın “taşınabilir” bir dosya olması için elzemdir. Dolayısıyla komutların doğru yorumlanabilmesi için her bash script dosyasında mutlaka bulunmalıdır.

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
<span class="kirmizi">#!</span><span class="mavi">/usr/bin/env</span> <span class="yesil">bash</span>

<span class="kirmizi">shebang</span><span class="mavi">çalışma ortamının dosya konumunu bulur</span><span class="yesil">çalışma ortamı</span>
</code></pre></div></div>

Program çalıştırıldığında sistem tarafından öncelikle ilk satır okunur ve ilk satırda geçen kabuk diline göre program ilgili kabuk dili aracılığı ile çalıştırılır dedik.

## Çalışma Ortamı Belirtilmezse

Şayet ilk satıra hiç bir ifade eklemezseniz, sistem varsayılan olarak mevcut kabuk üzerinden script dosyasını çalıştırmayı dener. Yani aslında mevcut sisteminizde kullanılan kabuk bash ise, "**#!/usr/bin/env bash**" ifadesini betik dosyanıza eklemeseniz dahi betik dosyanız, sistemde varsayılan kabuk bash olduğundan sorunsuz şekilde çalışacaktır. Ancak yine de yazmış olduğunuz betik dosyasının, diğer sistemlerde de doğru şekilde çalıştırılabilmesi için "**#! /usr/bin/env bash**" yani "shebang" ifadesini betik dosyanızın başına eklemiş olmanız **son derece önemlidir**. Zira çoğu Linux dağıtımı bash kabuğunu varsayılan olarak kullanıyor olsa da, istisnai durumlarda farklı kabukların varsayılan olarak kullanıldığı da olabiliyor. Örneğin sizin bash için yazdığınız betik dosyası, varsayılan çalışma ortamı zsh olan bir sistemde çalıştırıldığında eğer başında bu betik dosyasının bash ortamında çalışmaya uygun olduğunu belirten shebang ifadesi yoksa doğru şekilde çalışmayacaktır. Çünkü sistem dosyayı açtığında, özellikle bir çalışma ortamı belirtilmediğini görecek ve varsayılan kabuk(örneğimizdeki kabuk zsh) üzerinden çalıştırmayı deneyecektir.

Ayrıca shebang ifadesinin satır başına eklenmesi, biraz da "clean code" denilen "düzenli(temiz) kod" yazma kültürünün bir parçasıdır. Bu gibi alışkanlıklar uzun vadede verimli çalışmalar ortaya koymak adına oldukça önemli. Siz veya betik dosyanızı paylaştığınız diğer insanlar dosyayı açıp baktıklarında bash kabuğu için yazılmış olduğunu bu sayede kolayca fark edebilir. İlerleyen zamanlarda kendi yazmış olduğunuz betikleri açıp incelediğinizde ya da diğer insanların yazmış olduğu kapsamlı betik içeriklerini incelerken bu gibi düzenli çalışmaların, programın çalışma yapısını anlamada ne kadar kolaylık sağladığını sizler de görmüş olacaksınız.

## Betik(Script) Dosyasının Oluşturulması

Evet, script içerisinde kullanılan kabuk program çeşidini diğer bir deyişle gerekli çalışma ortamını dosyamızın en başına yazdığımıza göre artık script yazmaya tamamen hazırız.

İlk scriptimize, konsol ekranına çıktı basan standart bir örnek ile başlayalım istiyorum. Aksi halde başımıza taş falan yağabilir :)

Bunun için konsola çıktı basan komutumuz olan `echo` komutunu kullanacağız. Örneğin ben konsola `echo "selamlar"` yazarsam, çıktı olarak **selamlar** ifadesi konsola basılmış olacak.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ echo "selamlar"
selamlar
```

İşte bu komutu betik dosyamızın içerisine yazıp kaydedersek, betik dosyamızı her çalıştırdığımızda konsol ekranına **selamlar** ifadesi otomatik olarak basılacaktır.

Hemen test etmek için `echo "selamlar"` komutumu betik dosyamın içerisine yazıp, dosyamı "**selam.sh**" ismi ile kaydediyorum.

```bash
#!/usr/bin/env bash

echo "selamlar"
```

### .sh Uzantısı Hakkında

Dosyamı kaydederken dosya isminin sonuna **.sh** dosya uzantısını eklemem mecburi olmasa da, biraz önce bahsettiğimiz düzenli çalışma adına önemli bir ayrıntı olduğu için ekledim.
Aslında betik dosyamız, uygun çalışma ortamına sahip olduğu sürece sonunda "**sh"** uzantısı olmadan da çalışabilir. Ancak ileride hangi dosyaların betik dosyası olduğunu anlama konusunda, dosyaların sonlarındaki "**sh"** ifadeleri bizlere yardımcı olacağı için özellikle belirtilmesi önemlidir. Zira Linux sistemlerinde dosyayı çalıştırırken dosyanın uzantısının bir önemi yoktur. İlgili dosyanın çalıştırılması için gereken ortam sistemde yüklü ise dosya çalıştırılır. Yine de bu gibi uzantıları eklemek, dosyanın daha sonra kolay bulunabilmesi adına sınıflandırmaya katkı sunar.

Bu durumu daha iyi anlamak adına, yüzlerce dosyanın bulunduğu bir klasör ve bu klasördeki dosyaların hiç birinde ayırt edici uzantı bulunmadığı bir durum hayal edin. Böyle bir durumda hangi dosyanın betik dosyası olduğunu anlamanın tek yolu, dosyaların her birini tek tek açarak içlerine bakmayı gerektirir. Bu işi otomatik yapan araçları kullanabilirsiniz ancak bu yine de verimsiz bir yöntemdir. En ideal yöntem dosya isimlerinin sonunda dosya türlerini belirterek, dosyaları kolay sınıflandırabilir kılmaktır.

Daha somut bir örnek görmek adına örneğin; içerisinde bir çok dosyanın bulunduğu bir dizindeyken, konsola `ls *.sh` gibi kısacık bir komut girerek sonunda **.sh** ifadesi geçen tüm betik dosyalarını tek seferde listeleyebiliriz.

Herhangi bir uzantı belirtmeden listeme yaptığımda:

```bash
┌──(taylan㉿linuxdersleri)-[/boot/grub/i386-pc]
└─$ ls
915resolution.mod     date.mod             gcry_whirlpool.mod        memdisk.mod          pcidump.mod         testspeed.mod
acpi.mod              datetime.mod         gdb.mod                   memrw.mod            pci.mod             tftp.mod
adler32.mod           diskfilter.mod       geli.mod                  minicmd.mod          pgp.mod             tga.mod
affs.mod              disk.mod             gettext.mod               minix2_be.mod        plan9.mod           time.mod
afs.mod               div.mod              gfxmenu.mod               minix2.mod           play.mod            trig.mod
ahci.mod              div_test.mod         gfxterm_background.mod    minix3_be.mod        png.mod             tr.mod
all_video.mod         dm_nv.mod            gfxterm_menu.mod          minix3.mod           priority_queue.mod  truecrypt.mod
aout.mod              drivemap.mod         gfxterm.mod               minix_be.mod         probe.mod           true.mod
archelp.mod           echo.mod             gptsync.mod               minix.mod            procfs.mod          udf.mod
ata.mod               efiemu32.o           gzio.mod                  mmap.mod             progress.mod        ufs1_be.mod
at_keyboard.mod       efiemu64.o           halt.mod                  moddep.lst           pxechain.mod        ufs1.mod
backtrace.mod         efiemu.mod           hashsum.mod               modinfo.sh           pxe.mod             ufs2.mod
bfs.mod               ehci.mod             hdparm.mod                morse.mod            raid5rec.mod        uhci.mod
biosdisk.mod          elf.mod              hello.mod                 mpi.mod              raid6rec.mod        usb_keyboard.mod
bitmap.mod            eval.mod             help.mod                  msdospart.mod        random.mod          usb.mod
bitmap_scale.mod      exfat.mod            hexdump.mod               mul_test.mod         rdmsr.mod           usbms.mod
blocklist.mod         exfctest.mod         hfs.mod                   multiboot2.mod       read.mod            usbserial_common.mod
boot.img              ext2.mod             hfspluscomp.mod           multiboot.mod        reboot.mod          usbserial_ftdi.mod
boot.mod              extcmd.mod           hfsplus.mod               nativedisk.mod       regexp.mod          usbserial_pl2303.mod
bsd.mod               f2fs.mod             http.mod                  net.mod              reiserfs.mod        usbserial_usbdebug.mod
bswap_test.mod        fat.mod              hwmatch.mod               newc.mod             relocator.mod       usbtest.mod
btrfs.mod             file.mod             iorw.mod                  nilfs2.mod           romfs.mod           vbe.mod
bufio.mod             font.mod             iso9660.mod               normal.mod           scsi.mod            verifiers.mod
cat.mod               freedos.mod          jfs.mod                   ntfscomp.mod         search_fs_file.mod  vga.mod
cbfs.mod              fshelp.mod           jpeg.mod                  ntfs.mod             search_fs_uuid.mod  vga_text.mod
cbls.mod              fs.lst               keylayouts.mod            ntldr.mod            search_label.mod    video_bochs.mod
cbmemc.mod            functional_test.mod  keystatus.mod             odc.mod              search.mod          video_cirrus.mod
cbtable.mod           gcry_arcfour.mod     ldm.mod                   offsetio.mod         sendkey.mod         video_colors.mod
cbtime.mod            gcry_blowfish.mod    legacycfg.mod             ohci.mod             serial.mod          video_fb.mod
chain.mod             gcry_camellia.mod    legacy_password_test.mod  part_acorn.mod       setjmp.mod          videoinfo.mod
cmdline_cat_test.mod  gcry_cast5.mod       linux16.mod               part_amiga.mod       setjmp_test.mod     video.lst
cmosdump.mod          gcry_crc.mod         linux.mod                 part_apple.mod       setpci.mod          video.mod
cmostest.mod          gcry_des.mod         loadenv.mod               part_bsd.mod         sfs.mod             videotest_checksum.mod
cmp.mod               gcry_dsa.mod         loopback.mod              part_dfly.mod        shift_test.mod      videotest.mod
cmp_test.mod          gcry_idea.mod        lsacpi.mod                part_dvh.mod         signature_test.mod  wrmsr.mod
command.lst           gcry_md4.mod         lsapm.mod                 part_gpt.mod         sleep.mod           xfs.mod
configfile.mod        gcry_md5.mod         lsmmap.mod                partmap.lst          sleep_test.mod      xnu.mod
core.img              gcry_rfc2268.mod     ls.mod                    part_msdos.mod       spkmodem.mod        xnu_uuid.mod
cpio_be.mod           gcry_rijndael.mod    lspci.mod                 part_plan.mod        squash4.mod         xnu_uuid_test.mod
cpio.mod              gcry_rmd160.mod      luks.mod                  part_sun.mod         strtoull_test.mod   xzio.mod
cpuid.mod             gcry_rsa.mod         lvm.mod                   part_sunpc.mod       syslinuxcfg.mod     zfscrypt.mod
crc64.mod             gcry_seed.mod        lzopio.mod                parttool.lst         tar.mod             zfsinfo.mod
cryptodisk.mod        gcry_serpent.mod     macbless.mod              parttool.mod         terminal.lst        zfs.mod
crypto.lst            gcry_sha1.mod        macho.mod                 password.mod         terminal.mod        zstd.mod
crypto.mod            gcry_sha256.mod      mda_text.mod              password_pbkdf2.mod  terminfo.mod
cs5536.mod            gcry_sha512.mod      mdraid09_be.mod           pata.mod             test_blockarg.mod
ctz_test.mod          gcry_tiger.mod       mdraid09.mod              pbkdf2.mod           testload.mod
datehook.mod          gcry_twofish.mod     mdraid1x.mod              pbkdf2_test.mod      test.mod
```

"**.sh**" uzantısını belirerek listeleme yaptığımda:

```bash
┌──(taylan㉿linuxdersleri)-[/boot/grub/i386-pc]
└─$ ls *.sh
modinfo.sh
```

Gördüğünüz gibi “**.sh**” uzantısı sayesinde kalabalıktan uzak, aradığım dosya türünü listelemiş oldum.

Ayrıca dosyalara uzantı eklemek, dosyayı çalıştırabilecek olan programların dosyaları kolay algılayabilmesini de sağlar. Örneğin kullanmakta olduğunuz editör destekliyorsa, bash programlamaya özel renklendirme ve programlamayı kolaylaştıran bir takım araçlar "**sh"** uzantısı sayesinde bu program üzerinde aktif olur.

Basit bir örnek olması açısından sonu "**sh"** ile biten ve bitmeyen iki dosyayı editör üzerinde açarak karşılaştırma yapabilirsiniz. Test etmek için nano editörünü kullanabilirsiniz. Bu duruma ek olarak dosya uzantıları, özellikle grafiksel arayüz kullanımında, dosyanın üzerine tıklandığında çalıştırılabilir olan araç ile doğrudan açılması gibi kolaylıklar da sağlar.

Yani kısacası dosyamı, sonunda "**.sh"** uzantısı olmadan da kaydetsem çalışacaktır. Ancak bu dosya uzantısını ekleyerek kazanacağım olumlu özellikler düşünüldüğünde, eklemeden kaydetmek oldukça mantıksız olacaktır. 

### Doğru Dosya İsimlendirmesi

Ayrıca dosya isimlerinizde mümkün oldukça **Türkçe karakter** ve **kelimeler arasında boşluk** kullanımından kaçınmanızı öneririm. Zira kimi sistemlerde Türkçe karakter ve boşluk karakterinden doğacak sorunlar yüzünden betik dosyanız çalıştırılamayabilir.

Aşağıdaki kullanımlar global isimlendirmeye <strong class="text-danger">uygun olmayanlara</strong> birkaç örnektir.

<pre class="kirmizi text-danger">
betik_dosyasi.sh 
merhaba_dunya.sh
hello_world.sh
test_betigi.sh
betik.sh
</pre>

Yukarıdaki örneklerde hem Türkçe karakter hem de kelimeler arası boşluk var ve bu tür isimlendirmeler, global yani herkes tarafından kullanılabilir betik dosyaları için son derece yanlış isim tercihlerdir.

<strong class="text-success">Uygun olanlara</strong> örnek vermek gerekirse:

<pre class="yesil text-success">
betik_dosyasi.sh
merhaba_dunya.sh
hello_world.sh
test_betigi.sh
betik.sh
</pre>


## Betik Dosyalarını Çalıştırmak

Yazmış olduğumuz betik dosyasını çalıştırmanın birden fazla yolu bulunmaktadır. Bunlardan ilki ve en basiti, konsola `bash betik_dosyası_adı` şeklinde komut vermektir. 

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ bash selam.sh 
selamlar
```

Burada yapmış olduğumuz işlem, betik yazarken kullanmış olduğumuz kabuk dilini yani betiğin çalışabileceği ortamı doğrudan belirtmektir. 

Ayrıca betik dosyamızı `./betik` komutuyla da çalıştırabiliriz. Aslında bu kullanım ilkine oranla daha sık tercih edilen bir yöntemdir. Hatta betik dosyalarını çalıştırmak için doğru olan temel kullanım yöntemimiz budur.

Ancak bu kullanımda diğer kullanımdan farklı olarak, dosyamızın çalıştırma yetkisinin bulunması gerekiyor. Aksi takdirde gördüğünüz gibi dosyamız **erişim yetkisi hatası**("Permission denied") belirterek çalıştırılamıyor. 

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ ./selam.sh
bash: ./selam.sh: Permission denied
```

Hatta durumu teyit etmek üzere `ls -la` komutu ile dosyamızın yetkilerini inceleyecek olursak, dosyamızda çalıştırma yetkisinin bulunmadığını görebiliriz.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ ls -la selam.sh 
-rw-r--r-- 1 taylan taylan 37 Jan 19 04:28 selam.sh
```

Neticede betik dosyamız şuan sadece okunup/yazılabilir bir metin belgesinden ibaret. Bu sorunu aşmak için dosyamıza `chmod` komutu ile gereken çalıştırma yetkisini vermemiz gerekiyor.

Ben tüm kullanıcılara çalıştırma yetkisi vermek için konsola `chmod +x selam.sh` komutunu giriyorum. Normalde elbette bu betik dosyası için yalnızca gerçekten bu betik dosyasını çalıştırması gerekenleri kapsayacak şekilde yetki tanımlanması daha doğru bir yaklaşımdır. Ancak biz şimdilik kafa karıştırmamak adına tüm kullanıcılara çalıştırma yetkisini tanımlayalım.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ chmod +x selam.sh 
```

İşlemin ardından `ls -la` komutu ile dosyamızın aldığı yetkiyi teyit edebiliriz.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ ls -la selam.sh 
-rwxr-xr-x 1 taylan taylan 37 Jan 19 04:28 selam.sh
```

Çıktılardan da anlayabileceğimiz gibi dosyamız artık çalıştırılabilir durumda. Hemen dosyamızı çalıştırarak bu durumu kesin olarak teyit edelim.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ ./selam.sh 
selamlar
```

Ve gördüğünüz gibi betik dosyamız aldığı yetki sayesinde sorunsuz şekilde çalışmış oldu. Eğer yetkilendirme işlemini ve işlemde kullanılan komut bütününü anlamadıysanız temel Linux bilginizi tazelemeniz gerekebilir. Zira benim özellikle ayrıntılı olarak anlatmadığım tüm konular temel Linux bilgisi kapsamındaki konulardır. Lütfen eğitimden maksimum verimi alabilmek adına temel Linux bilginiz olduğundan emin olarak eğitime devam edin.

Dosyamızı çalıştırdık ancak, dosyamızı çalıştırmak üzere girmiş olduğumuz komutun çalışma yapısını daha iyi anlamak adına, kullanmış olduğumuz `./` ifadesini de ayrıca açıklamak istiyorum.

Komutumuzda kullandığımız `.`(nokta) ifadesi, şu anda bulunmakta olduğumuz mevcut dizini temsil ediyor.

Noktadan sonra kullanmış olduğumuz `/`(slash-taksim) ifadesi ise bulunduğumuz konumdaki betik dosyasına ulaşıp çalıştırmamızı sağlıyor.

Yani ***/home/taylan/selam.sh*** konumunda bulunan betiği çalıştırmak için benim konsola `./selamlar.sh` şeklinde yazmamla `/home/taylan/selam.sh` şeklinde yazmam aslında aynı şeyi ifade ediyor. Bu örnekte ben kendi ev dizinim olan **/home/taylan** dizinindeyken komut girdiğim için **nokta** ifadesi bu ***/home/taylan*** konumunu temsil ediyor. 

Kabuğa taksim işareti `/` ile bir dosyanın tam konumu belirtildiğinde, kabuk bu dosyanın uygun ortamda çalıştırılmasını sağlar. Yani kabuğa tam konumu belirtilmiş ve çalıştırılma yetkisi olan tüm dosyalar kabuğun gözünde "**çalıştırılacak dosya**" sınıfındadır.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ ./selam.sh 
selamlar

┌──(taylan㉿linuxdersleri)-[~]
└─$ /home/taylan/selam.sh 
selamlar

┌──(taylan㉿linuxdersleri)-[~]
└─$ ~/selam.sh 
selamlar
```

Şu ana kadar her şey harika gitti ve betik dosyamızı iki farklı yoldan nasıl çalıştırabileceğimizi görmüş olduk.

### `bash betik.sh` ile `./betik.sh` Arasındaki Fark Nedir ?

Peki ama ilk ele aldığımız yöntemde, `bash` komutu ile aynı dosyamızı çalıştırma yetkisi bulunmamasına rağmen nasıl çalıştırabilmiştik ?

Yani `bash selamlar.sh` ile `./selamlar.sh` kullanımları arasındaki yetki almayı gerektiren fark neydi ?

Bu durumun nedeni: bash komutuna bir dosyayı argüman olarak verdiğimizde, halihazırda temel işlevlerini kullanmaya yetkili olduğumuz bash yazılımının bu dosyayı doğrudan işlemesini istemiş olmamızdandır. Yani benim komut girmeye yetkili olduğum bash yazılımına elle komutları girmek yerine bunları bir dosya üzerinden doğrudan bash yazılımına aktarmam temelde aynıdır.

Yani tekrar ifade etmek gerekirse;`bash` komutunu kullandığımızda konsola, "***bu bir bash kabuk betiğidir, bu betiği doğrudan bash ortamında çalıştırabilirsin***" diyor olmamızdır. Halihazırda bash kabuğunu çalıştırma yetkimiz olduğundan(nitekim şu an ona emir veriyoruz), bu dosya için ekstra çalıştırma yetkisine ihtiyaç duymadan bash üzerinden çalıştırabildik. Kabuğa bash [selamlar.sh](http://selamlar.sh) komutu girdiğimde; mevcut kabuğum bash aracını çalıştırmak istediğimi çekirdeğe bildiriyor, çekirdekte çalıştırma yetkim olduğu için bash aracını "selamlar.sh" argümanı ile çalıştırmama izin veriyor. Argüman olarak "selamlar.sh" dosyasını alan bash aracı en nihayetinde betiği alıp çalıştırıyor.

Öte yandan kabuğa `./betik` şeklinde emir verdiğimizde, "*al bu dosyayı uygun ortam hangisi ise onda çalıştır*" demiş oluyoruz. Kabukta; "*madem dosyanın çalıştırılmasını istiyorsun o zaman dosyanın çalıştırılabilirlik durumuna bakayım ona göre çalıştırılmasını sağlayayım*" diyor. Eğer dosyanın çalıştırılma yetkisi yoksa dosya içeriği henüz okunmadan "erişim engellendi" hatası ile işlemi iptal ediyor. Dosyanın çalıştırılabilirlik yetkisi varsa hangi ortamda çalıştırılacağını öğrenmek için dosyanın ilk satırı okunuyor. Eğer bizler ilk satırı boş bırakmışsak yani "shebang" tanımını eklemediysek, sistemde varsayılan olarak kullanılan kabuk dili aracılığı ile dosyamız çalıştırılıyor. Şayet ilk satırda başka bir kabuk dili veya çalışma ortamı belirtmişsek de dosyanın bu ortam çalıştırılması sağlanıyor. Hatta bu durumu teyit etmek üzere, dosyamızın başına alakasız bir çalışma ortamı ekleyip, sonucu gözlemleyebiliriz.

Dosyamın başına çalıştırılacak ortam olarak gerçekte var olmayan ***/usr/bin/deneme*** şeklinde bir ifade ekleyip kaydediyorum.

```bash
#!/usr/bin/deneme

echo "selamlar"
```

Ve dosyamı `./selamlar.sh` şeklinde çalıştırmayı deniyorum.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ ./selam.sh 
bash: ./selam.sh: cannot execute: required file not found
```

Bu işlemin sonucunda konsol bana "cannot execute: required file not found" şeklinde çıktı basarak, shebang kısmında belirtilen ortamın sistemde mevcut olmadığını belirtmiş oldu.

Aynı dosyayı `bash selamlar.sh` komutu ile çalıştırdığımda ise, sistem dosyanın shebang kısmında yer alan ortamın ne olduğuna bakmadan doğrudan bash ortamında dosyayı çalıştırıyor.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ bash selam.sh 
selamlar
```

Umarım buradaki örnekler `bash betik.sh` ile `./betik.sh` kullanım farkını net biçimde izah edebilmiştir.

En nihayetinde ilk betik dosyamızı oluşturup sorunsuzca çalıştırmayı başardık. Üstelik anlatım sırasında hangi işlemin neden gerçekleştiğini de sırasıyla öğrenmiş olduk.

<p class="mavi">
<strong>ℹ️ Ek Açıklama:</strong> Anlatımlar sırasında tıpkı bu bölümde olduğu gibi kullanacağımız yapıları ve bu yapıların tepkilerini anında gözlemeyebilmek için öncelikle konsol üzerinden etkileşimli şekilde ele alıyor olacağız. Zaten anlatımlara devam ettikçe öğrendiğimiz yapıları nasıl betik dosyası içerisinde bir bütün halinde kullanabileceğimizi de öğrenmiş olacağız. Özetle bu eğitim her ne kadar betik oluşturmak üzerine olsa da öğrenme aşamasında genellikle doğrudan sonuçları görebileceğimiz etkileşimli kabuk yani konsol üzerinden ilerliyor olacağız.
</p>

<p class="sari">
<strong>⚠️ Yazar Notu:</strong> Anlatımlar sonuç odaklı bir yol izlemekten ziyade temeli sağlam oluşturmak üzere ilerlediğinden kimi kısımlardaki anlatımlar belki biraz uzun olarak gözükebilir. Ancak eğitim sürecinde yer alan anlatımların, konuyu iyi bir biçimde kavramanız ve kolay öğrenmeniz için bulunduğunu lütfen unutmayın. Yani tüm gayretimiz "ne" olduğundan ziyade "neden" olduğunu kavrayabilmektir. Bu sayede öğrendiğimiz bilgiler bizim için gerçekten anlamlı ve kalıcı olabilir. Ve çok daha önemlisi merak duygunuzu tetikleyerek daha derinlemesine araştırma yapmanızı sağlayabilir. Eğitmen olarak bana inanmıyorsanız bile sadece güvenin ve eğitim sonunda kararınızı kendiniz verin. Özetle anlatımı yapılan hiç bir konuyu ben özellikle belirtmediğim sürece doğrudan geçmenizi tavsiye etmem.(Ara vermek ya da sıkılıp daha sonrası için bırakmayı kast etmiyorum. Bir daha okumamak üzere doğrudan atlamaktan bahsediyorum.)
</p>