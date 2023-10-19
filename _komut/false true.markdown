---
layout: komut
author: Taylan Özgür Bildik
title: "false ve true Komutları"
modified: 2021-04-14
excerpt: "Doğru ve yanlış durumların temsili için kullanılırlar."
tags: [bash, ]
categories: komutlar 
toc: true 
---


`false` komutu bash kabuğu içerisinde yerleşik olarak tanımlı olan komuttur. Temelde "**yanlış**", "**başarısızlık**" anlamına gelen “**1**” çıkış kodunu döndürmekten başka hiçbir şey yapmaz. Bash programlama yaparken başarısız bir komutun gerekli olduğu durumlarda bir yer tutucu olarak kullanılabilir. 

Denemek için kullanıcıdan 5  sayısından büyük bir tam sayı girmesini isteyelim, eğer 5 sayısından küçük girerse de `false` komutu yardımıyla “1” çıkış kodunu döndürmesini sağlayalım. 

```bash
read -p "Lütfen pozitif bir tam sayı girin:" sayi
if [[ $sayi -gt 5 ]]
        then
                echo "Girdiğiniz sayı:$sayi uygundur."
        else
                echo "Girdiğiniz sayı:$sayi uygun değil !"
                false
fi
```

Şimdi hem 5'ten büyük hem de küçük sayılar girip, `echo $?` komutu ile çıkış durumlarını kontrol edelim.

```bash
taylan@linuxdersleri:~$ bash betik.sh 
Lütfen pozitif bir tam sayı girin:10
Girdiğiniz sayı:10 uygundur.
taylan@linuxdersleri:~$ echo $?
0
taylan@linuxdersleri:~$ bash betik.sh 
Lütfen pozitif bir tam sayı girin:-10
Girdiğiniz sayı:-10 uygun değil !
taylan@linuxdersleri:~$ echo $?
1
taylan@linuxdersleri:~$
```

Aldığımız hata çıktılarına bakarak, `false` komutunun hatalı anlamında olan "1" çıkış değerini döndürdüğünü teyit edebiliyoruz. Daha farklı örnekler vermek de mümkün fakat temelde `false` komutunun görevi "1" değerini döndürmektir. Benzer şekilde `true` komutu da "0" çıkış değerini döndürerek aynı işlemin tersini yapar. Denemek için aynı örneği `true` komutunu kullanarak tekrar edebilirsiniz. 

Özetle olumsuz bir durum oluşturmak ya da temsil etmek için `false` komutunu, olumlu bir durum oluşturmak ya da temsil etmek içinse `true` komutunu kullanıyoruz.