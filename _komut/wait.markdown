---
layout: komut
author: Taylan Özgür Bildik
title: "wait Komutu"
modified: 2021-04-14
excerpt: "İşlemler tamamlanana kadar beklenmesini sağlar."
tags: [bash, wait]
categories: komutlar 
toc: true 
---


İstisnalar hariç genellikle arkaplanda çalıştırılmış olan işlemlerin tamamlanmasını beklemek için `wait` komutunu kullanırız. Normalde bash kabuğu zaten tüm komutları sırasıyla çalıştırıp önceki komut çalışmasını bitirmeden bir sondaki komutu çalıştırmaz. Ancak işlemler arka planda çalıştırılırsa, bash kabuğu arka plandaki işlemlerin bitmesini beklemeden bir sonraki komutu çalıştıracaktır. Bu durumu gözlemlemek için `wait` komutu olmadan arka planda ve ön planda çalışan birkaç komut ekleyelim ve hangi komutun hangi sırayla çalıştırıldığına bakalım.

```bash
sleep 5 & echo "Ben arkaplanda çalışan 1. sırdaki komutum." &
sleep 3 & echo "Ben arkaplanda çalışan 2. sırdaki komutum." &
sleep 1 & echo "Ben arkaplanda çalışan 3. sırdaki komutum." &
echo "Ben önplanda çalışan ilk komutum."
echo "Ben önplanda çalışan ikinci komutum."
```

Betik dosyasını çalıştırdığımızda aldığımız çıktı aşağıdaki gibi oluyor.

```bash
taylan@linuxdersleri:~$ bash betik.sh 
Ben önplanda çalışan ilk komutum.
Ben önplanda çalışan ikinci komutum.
taylan@linuxdersleri:~$ Ben arkaplanda çalışan 3. sırdaki komutum.
Ben arkaplanda çalışan 2. sırdaki komutum.
Ben arkaplanda çalışan 1. sırdaki komutum.

taylan@linuxdersleri:~$
```

Gördüğünüz gibi arkaplanda çalışan komutlar beklenmeden önplandaki komutlar çalıştırıldı. Ayrıca arkaplandaki işlemlerin tamamlanma süreleri birbirinden farklı olduğu için arkaplandaki işlemler de sıralamadan bağımsız şekilde konsola çıktı bastırdı. 

İşte bu ve bunun gibi durumların önüne geçmek için `wait` komutu ile arkaplandaki işlemlerin bitmesini bekleyip daha sonraki komutların çalıştırılmasını sağlayabiliriz. Betik dosyamıza, arkaplandaki işlemlerin hemen ardından `wait` komutunu ekleyelim. 

```bash
sleep 5 & echo "Ben arkaplanda çalışan 1. sırdaki komutum." &
wait
sleep 3 & echo "Ben arkaplanda çalışan 2. sırdaki komutum." &
wait
sleep 1 & echo "Ben arkaplanda çalışan 3. sırdaki komutum." &
wait
echo "Ben önplanda çalışan ilk komutum."
echo "Ben önplanda çalışan ikinci komutum."
```

Bu değişikliğin ardından aldığımız çıktı aşağıdaki şekilde oldu;

```bash
taylan@linuxdersleri:~$ bash betik.sh 
Ben arkaplanda çalışan 1. sırdaki komutum.
Ben arkaplanda çalışan 2. sırdaki komutum.
Ben arkaplanda çalışan 3. sırdaki komutum.
Ben önplanda çalışan ilk komutum.
Ben önplanda çalışan ikinci komutum.
taylan@linuxdersleri:~$
```

Bizler burada özellikle işlem numarası belirtmedik fakat işlem numarası ya da iş numarası belirterek de ilgili arkaplan işleminin bitmesini bekleyebiliriz. Bizim örneğimizde olduğu gibi işlem numarası kullanılmadığında en son arkaplanda çalıştırılmış olan işlem beklenir. 

Aşağıda, **`sleep`** komutunu kullanarak basit bir örnekle **`wait`** komutunun işlem numarasıyla nasıl kullanılabileceğini gösteriyorum. Bu örnekte, iki farklı işlemi arka planda başlatıp **`wait`** komutuyla bitmelerini bekleyeceğiz:

```bash
#!/bin/bash

# İşlem 1'i arka planda başlat
sleep 5 &
process1=$!

# İşlem 2'yi arka planda başlat
sleep 3 &
process2=$!

echo "İşlem 1: $process1"
echo "İşlem 2: $process2"

# Her iki işlemin de bitmesini bekler
wait $process1
wait $process2

echo "Her iki işlem de tamamlandı."
```

Bu örnekte, her iki işlemi de arka planda çalıştırmak için **`&`** sembolünü kullanıyoruz. **`process1`** ve **`process2`** değişkenlerine her işlemin PID (işlem numarası) değerini atıyoruz. Ardından **`wait`** komutunu bu işlem numaralarıyla kullanarak her iki işlemin de tamamlanmasını bekliyoruz. 

`wait` komutu kullanıldığı yere göre kritik öneme sahip olabilir. Örneğin arkaplandaki bir işlemin sonunda bir klasör oluşturulacaksa ve daha sonra bu oluşturulan klasöre geçiş yapılacaksa tüm komutların sırasına uygun şekilde hareket etmesi gerekir. Aşağıdaki çıktıları inceleyerek `wait` komutunun önemini daha net görebilirsiniz.

```bash
#!/bin/bash

sleep 5 & mkdir yeni_dizin & #5 sn. dur ve klasör oluştur.
cd yeni_dizin #klasöre geçiş yap
pwd #bulunduğun dizin adresini bastır.
```

Betik dosyası çalıştırıldığında elde edilen çıktı;

```bash
taylan@taylan:~$ bash yeni.sh 
yeni.sh: satır 4: cd: yeni_dizin: Böyle bir dosya ya da dizin yok
/home/taylan
taylan@taylan:~$
```

Gördüğünüz gibi klasörün oluşturulması beklenmediği için devamındaki komutlar hata verdi.

Eğer `wait` komutunu eklersek, arkaplandaki klasör oluşturma sürecinin bitmesi bekleneceği için hata almadan ilgili dizine geçiş yapılabilir.