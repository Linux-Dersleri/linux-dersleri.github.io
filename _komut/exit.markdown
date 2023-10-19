---
layout: komut
author: Taylan Özgür Bildik
title: "exit Komutu"
modified: 2021-04-14
excerpt: "Kabuğu sonlandırıp, çıkış kodu döndürülmesini sağlar."
tags: [bash, exit]
categories: komutlar 
toc: true 
---



Mevcut kabuktan çıkılmasını sağlar. En temel kullanımını denemek için öncelikle bash komutunu girip yeni bir alt kabuk başlatalım.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ ps f
    PID TTY      STAT   TIME COMMAND
  12275 pts/0    Ss     0:00 /usr/bin/bash
  12286 pts/0    S      0:00  \_ bash
  12297 pts/0    R+     0:00      \_ ps f
```

Mevcut bash kabuğu altında yeni bir alt bash kabuğunun başlatıldığını `ps f` komutu sayesinde teyit etmiş olduk. Şu anda başlatılmış olan alt bash kabuğunda çalışıyoruz. Bu kabuğu kapatarak çıkış yapmak için `exit` komutunu girmemiz yeterli.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ exit
exit

┌──(taylan㉿linuxdersleri)-[~]
└─$ ps f
    PID TTY      STAT   TIME COMMAND
  12275 pts/0    Ss     0:00 /usr/bin/bash
  12676 pts/0    R+     0:00  \_ ps f
```

`exit` komutu sayesinde çalışmakta olduğumuz mevcut kabuğu kapatmış olduk. İşte `exit` komutunun en temel kullanımı bu şekilde. Bu temel kullanım dışında `exit` komutu sayesinde, işlem sonlandırılırken döndürülecek olan çıkış kodunu belirtmemiz de mümkündür. 

## Çıkış Kodlarının Döndürülmesi | Exit Code

`exit` komutuyla birlikte argüman olarak girilen sayısal değer, kabuk kapatıldıktan sonra döndürülecek olan çıkış değerini temsil eder. Normal şartlarda kabuk üzerinden çalıştırmış olduğumuz komutlar çalışır ve çalışma işlemi bittiğinde eğer komut hatasız çalıştıysa “**0**” çıkış değerini döndürür. Fakat komutun çalıştırılması sonucunda ortaya hata ya da herhangi bir eksiklik çıktıysa çıkış kodları “**1**” ile “**255**” arasında bir değer olarak basılır. İşte bizler de `exit` komutu ile duruma göre mevcut sürecin sonlandırılıp, üretilmesi gereken çıkış kodunu spesifik olarak tanımlayabiliyoruz. Özellikle bash programlama yaparken sık kullanılan bir komuttur. 

Hemen denemek için basit bir betik dosyası oluşturup, işlem tamamlandıktan sonra çıkış değeri olarak “**111**” değerini döndürmesini sağlayalım.

```bash
read -p "Lütfen pozitif bir tam sayı girin:" sayi
if [[ $sayi -lt 0 ]]
        then
                exit 111
        else
                echo $sayi
fi

```

Betik dosyamızın çalışması bittiğinde döndürülmüş olan çıkış kodunu `echo $?` komutuyla öğrenebiliyoruz. Denemek için hem pozitif hem de negatif tam sayı girildiğinde üretilen çıkış kodlarına bakalım.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ ./betik.sh 
Lütfen pozitif bir tam sayı girin:5
5

┌──(taylan㉿linuxdersleri)-[~]
└─$ echo $?
0

┌──(taylan㉿linuxdersleri)-[~]
└─$ ./betik.sh 
Lütfen pozitif bir tam sayı girin:-5

┌──(taylan㉿linuxdersleri)-[~]
└─$ echo $?
111
```

Çıktılara göz attığımızda, negatif tam sayı koşulu sağlanınca `exit` komutu çalışıp 111 değerini çıkış değeri olarak döndürerek betiğin çalıştığı kabuğun kapatılmasını sağladığını teyit edebiliyoruz. 

Çıkış kodları sayesinde çeşitli koşul durumlarının tanımlanması ve işlemlerin çalışma durumları hakkında bilgi alınması mümkün oluyor.

Çıkış kodlarını bizler tanımlayabiliyoruz ancak yine de sistemimizde önceden tanımlı çıkış kodları da bulunuyor. Her ne kadar tüm sistemlerdeki çıkış kodları aynı olmasa da POSIX kapsamında pek çok ortak çıkış kodu mevcuttur. Örneğin Linux sistemindeki standartları görmek için çekirdeğin kaynak dosyalarında bulunan [errno.ho](https://github.com/torvalds/linux/blob/master/include/uapi/asm-generic/errno.h) dosyasına göz atabilirsiniz.

Ben "***errno.ho***" dosyasındaki tanımları tablo şeklinde aşağıya ekliyorum.

<table class="table table-dark table-striped"><thead><tr><th>Error Code</th><th>English Meaning</th><th>Turkish Meaning</th><th>Exit Code</th></tr></thead><tbody><tr><td>EDEADLK</td><td>Resource deadlock would occur</td><td>Kaynak kilidi oluşacaktı</td><td>35</td></tr><tr><td>ENAMETOOLONG</td><td>File name too long</td><td>Dosya adı çok uzun</td><td>36</td></tr><tr><td>ENOLCK</td><td>No record locks available</td><td>Kayıt kilidi yok</td><td>37</td></tr><tr><td>ENOSYS</td><td>Invalid system call number</td><td>Geçersiz sistem çağrı numarası</td><td>38</td></tr><tr><td>ENOTEMPTY</td><td>Directory not empty</td><td>Dizin boş değil</td><td>39</td></tr><tr><td>ELOOP</td><td>Too many symbolic links encountered</td><td>Çok fazla sembolik bağlantı bulundu</td><td>40</td></tr><tr><td>EWOULDBLOCK</td><td>Operation would block</td><td>İşlem engellenecekti</td><td>41</td></tr><tr><td>ENOMSG</td><td>No message of desired type</td><td>İstenilen türde mesaj yok</td><td>42</td></tr><tr><td>EIDRM</td><td>Identifier removed</td><td>Tanımlayıcı kaldırıldı</td><td>43</td></tr><tr><td>ECHRNG</td><td>Channel number out of range</td><td>Kanal numarası aralık dışında</td><td>44</td></tr><tr><td>EL2NSYNC</td><td>Level 2 not synchronized</td><td>Seviye 2 senkronize değil</td><td>45</td></tr><tr><td>EL3HLT</td><td>Level 3 halted</td><td>Seviye 3 durduruldu</td><td>46</td></tr><tr><td>EL3RST</td><td>Level 3 reset</td><td>Seviye 3 sıfırlandı</td><td>47</td></tr><tr><td>ELNRNG</td><td>Link number out of range</td><td>Bağlantı numarası aralık dışında</td><td>48</td></tr><tr><td>EUNATCH</td><td>Protocol driver not attached</td><td>Protokol sürücüsü bağlı değil</td><td>49</td></tr><tr><td>ENOCSI</td><td>No CSI structure available</td><td>CSI yapısı mevcut değil</td><td>50</td></tr><tr><td>EL2HLT</td><td>Level 2 halted</td><td>Seviye 2 durduruldu</td><td>51</td></tr><tr><td>EBADE</td><td>Invalid exchange</td><td>Geçersiz değiş tokuş</td><td>52</td></tr><tr><td>EBADR</td><td>Invalid request descriptor</td><td>Geçersiz istek tanımlayıcı</td><td>53</td></tr><tr><td>EXFULL</td><td>Exchange full</td><td>Değiş tokuş dolu</td><td>54</td></tr><tr><td>ENOANO</td><td>No anode</td><td>Anot yok</td><td>55</td></tr><tr><td>EBADRQC</td><td>Invalid request code</td><td>Geçersiz istek kodu</td><td>56</td></tr><tr><td>EBADSLT</td><td>Invalid slot</td><td>Geçersiz yuva</td><td>57</td></tr><tr><td>EDEADLOCK</td><td>(EDEADLK ile aynı)</td><td>Kaynak kilidi oluşacaktı</td><td>35</td></tr><tr><td>EBFONT</td><td>Bad font file format</td><td>Kötü font dosya biçimi</td><td>59</td></tr><tr><td>ENOSTR</td><td>Device not a stream</td><td>Cihaz bir akım değil</td><td>60</td></tr><tr><td>ENODATA</td><td>No data available</td><td>Veri yok</td><td>61</td></tr><tr><td>ETIME</td><td>Timer expired</td><td>Zamanlayıcı süresi doldu</td><td>62</td></tr><tr><td>ENOSR</td><td>Out of streams resources</td><td>Akım kaynakları tükenmiş</td><td>63</td></tr><tr><td>ENONET</td><td>Machine is not on the network</td><td>Makine ağda değil</td><td>64</td></tr><tr><td>ENOPKG</td><td>Package not installed</td><td>Paket kurulu değil</td><td>65</td></tr><tr><td>EREMOTE</td><td>Object is remote</td><td>Nesne uzakta</td><td>66</td></tr><tr><td>ENOLINK</td><td>Link has been severed</td><td>Bağlantı kesildi</td><td>67</td></tr><tr><td>EADV</td><td>Advertise error</td><td>Tanıtım hatası</td><td>68</td></tr><tr><td>ESRMNT</td><td>Srmount error</td><td>Srmount hatası</td><td>69</td></tr><tr><td>ECOMM</td><td>Communication error on send</td><td>Gönderimde iletişim hatası</td><td>70</td></tr><tr><td>EPROTO</td><td>Protocol error</td><td>Protokol hatası</td><td>71</td></tr><tr><td>EMULTIHOP</td><td>Multihop attempted</td><td>Çoklu atama girişiminde bulunuldu</td><td>72</td></tr><tr><td>EDOTDOT</td><td>RFS specific error</td><td>RFS özel hatası</td><td>73</td></tr><tr><td>EBADMSG</td><td>Not a data message</td><td>Veri mesajı değil</td><td>74</td></tr><tr><td>EOVERFLOW</td><td>Value too large for defined data type</td><td>Tanımlanan veri türü için değer çok büyük</td><td>75</td></tr><tr><td>ENOTUNIQ</td><td>Name not unique on network</td><td>Ağda benzersiz olmayan ad</td><td>76</td></tr><tr><td>EBADFD</td><td>File descriptor in bad state</td><td>Dosya tanımlayıcısı kötü durumda</td><td>77</td></tr><tr><td>EREMCHG</td><td>Remote address changed</td><td>Uzak adres değişti</td><td>78</td></tr><tr><td>ELIBACC</td><td>Can not access a needed shared library</td><td>Gerekli paylaşılan kitaplığa erişilemiyor</td><td>79</td></tr><tr><td>ELIBBAD</td><td>Accessing a corrupted shared library</td><td>Bozulmuş bir paylaşılan kitaplığa erişme</td><td>80</td></tr><tr><td>ELIBSCN</td><td>.lib section in a.out corrupted</td><td>a.out'taki .lib bölümü bozulmuş</td><td>81</td></tr><tr><td>ELIBMAX</td><td>Attempting to link in too many shared libraries</td><td>Çok fazla paylaşılan kitaplık bağlamaya çalışma</td><td>82</td></tr><tr><td>ELIBEXEC</td><td>Cannot exec a shared library directly</td><td>Bir paylaşılan kitaplığı doğrudan çalıştıramıyor</td><td>83</td></tr><tr><td>EILSEQ</td><td>Illegal byte sequence</td><td>Yasadışı bayt dizisi</td><td>84</td></tr><tr><td>ERESTART</td><td>Interrupted system call should be restarted</td><td>Kesilen sistem çağrısı yeniden başlatılmalı</td><td>85</td></tr><tr><td>ESTRPIPE</td><td>Streams pipe error</td><td>Akım boru hatası</td><td>86</td></tr><tr><td>EUSERS</td><td>Too many users</td><td>Çok fazla kullanıcı</td><td>87</td></tr><tr><td>ENOTSOCK</td><td>Socket operation on non-socket</td><td>Soket olmayan üzerinde soket işlemi</td><td>88</td></tr><tr><td>EDESTADDRREQ</td><td>Destination address required</td><td>Hedef adres gerekli</td><td>89</td></tr><tr><td>EMSGSIZE</td><td>Message too long</td><td>Mesaj çok uzun</td><td>90</td></tr><tr><td>EPROTOTYPE</td><td>Protocol wrong type for socket</td><td>Soket için yanlış türde protokol</td><td>91</td></tr><tr><td>ENOPROTOOPT</td><td>Protocol not available</td><td>Protokol mevcut değil</td><td>92</td></tr><tr><td>EPROTONOSUPPORT</td><td>Protocol not supported</td><td>Protokol desteklenmiyor</td><td>93</td></tr><tr><td>ESOCKTNOSUPPORT</td><td>Socket type not supported</td><td>Soket türü desteklenmiyor</td><td>94</td></tr><tr><td>EOPNOTSUPP</td><td>Operation not supported on transport endpoint</td><td>Taşıma uç noktasında desteklenmeyen işlem</td><td>95</td></tr><tr><td>EPFNOSUPPORT</td><td>Protocol family not supported</td><td>Protokol ailesi desteklenmiyor</td><td>96</td></tr><tr><td>EAFNOSUPPORT</td><td>Address family not supported by protocol</td><td>Protokol tarafından desteklenmeyen adres ailesi</td><td>97</td></tr><tr><td>EADDRINUSE</td><td>Address already in use</td><td>Adres zaten kullanılıyor</td><td>98</td></tr><tr><td>EADDRNOTAVAIL</td><td>Cannot assign requested address</td><td>İstenen adres atanamıyor</td><td>99</td></tr><tr><td>ENETDOWN</td><td>Network is down</td><td>Ağ kapalı</td><td>100</td></tr><tr><td>ENETUNREACH</td><td>Network is unreachable</td><td>Ağa erişilemiyor</td><td>101</td></tr><tr><td>ENETRESET</td><td>Network dropped connection because of reset</td><td>Sıfırlama nedeniyle ağ bağlantısı kesildi</td><td>102</td></tr><tr><td>ECONNABORTED</td><td>Software caused connection abort</td><td>Yazılım nedeniyle bağlantı kesildi</td><td>103</td></tr><tr><td>ECONNRESET</td><td>Connection reset by peer</td><td>Bağlantı akran tarafından sıfırlandı</td><td>104</td></tr><tr><td>ENOBUFS</td><td>No buffer space available</td><td>Tampon alanı yok</td><td>105</td></tr><tr><td>EISCONN</td><td>Transport endpoint is already connected</td><td>Taşıma uç noktası zaten bağlı</td><td>106</td></tr><tr><td>ENOTCONN</td><td>Transport endpoint is not connected</td><td>Taşıma uç noktası bağlı değil</td><td>107</td></tr><tr><td>ESHUTDOWN</td><td>Cannot send after transport endpoint shutdown</td><td>Taşıma uç noktası kapatıldıktan sonra gönderilemiyor</td><td>108</td></tr><tr><td>ETOOMANYREFS</td><td>Too many references: cannot splice</td><td>Çok fazla başvuru: kesmek mümkün değil</td><td>109</td></tr><tr><td>ETIMEDOUT</td><td>Connection timed out</td><td>Bağlantı zaman aşımına uğradı</td><td>110</td></tr><tr><td>ECONNREFUSED</td><td>Connection refused</td><td>Bağlantı reddedildi</td><td>111</td></tr><tr><td>EHOSTDOWN</td><td>Host is down</td><td>Ana bilgisayar kapalı</td><td>112</td></tr><tr><td>EHOSTUNREACH</td><td>No route to host</td><td>Ana bilgisayara yönlendirme yok</td><td>113</td></tr><tr><td>EALREADY</td><td>Operation already in progress</td><td>İşlem zaten devam ediyor</td><td>114</td></tr><tr><td>EINPROGRESS</td><td>Operation now in progress</td><td>İşlem şu anda devam ediyor</td><td>115</td></tr><tr><td>ESTALE</td><td>Stale file handle</td><td>Eski dosya tanımlayıcısı</td><td>116</td></tr><tr><td>EUCLEAN</td><td>Structure needs cleaning</td><td>Yapı temizlenmesi gerekiyor</td><td>117</td></tr><tr><td>ENOTNAM</td><td>Not a XENIX named type file</td><td>XENIX adlandırılmış türde bir dosya değil</td><td>118</td></tr><tr><td>ENAVAIL</td><td>No XENIX semaphores available</td><td>XENIX semaforları mevcut değil</td><td>119</td></tr><tr><td>EISNAM</td><td>Is a named type file</td><td>Adlandırılmış türde bir dosya</td><td>120</td></tr><tr><td>EREMOTEIO</td><td>Remote I/O error</td><td>Uzak G/Ç hatası</td><td>121</td></tr><tr><td>EDQUOT</td><td>Quota exceeded</td><td>Kotalama aşıldı</td><td>122</td></tr><tr><td>ENOMEDIUM</td><td>No medium found</td><td>Ortam bulunamadı</td><td>123</td></tr><tr><td>EMEDIUMTYPE</td><td>Wrong medium type</td><td>Yanlış ortam türü</td><td>124</td></tr><tr><td>ECANCELED</td><td>Operation Canceled</td><td>İşlem İptal Edildi</td><td>125</td></tr><tr><td>ENOKEY</td><td>Required key not available</td><td>Gerekli anahtar mevcut değil</td><td>126</td></tr><tr><td>EKEYEXPIRED</td><td>Key has expired</td><td>Anahtar süresi doldu</td><td>127</td></tr><tr><td>EKEYREVOKED</td><td>Key has been revoked</td><td>Anahtar iptal edildi</td><td>128</td></tr><tr><td>EKEYREJECTED</td><td>Key was rejected by service</td><td>Anahtar hizmet tarafından reddedildi</td><td>129</td></tr><tr><td>EOWNERDEAD</td><td>Owner died</td><td>Sahip öldü</td><td>130</td></tr><tr><td>ENOTRECOVERABLE</td><td>State not recoverable</td><td>Kurtarılamaz durum</td><td>131</td></tr><tr><td>ERFKILL</td><td>Operation not possible due to RF-kill</td><td>RF-kill nedeniyle mümkün olmayan işlem</td><td>132</td></tr><tr><td>EHWPOISON</td><td>Memory page has hardware error</td><td>Bellek sayfasında donanım hatası</td><td>133</td></tr></tbody></table>