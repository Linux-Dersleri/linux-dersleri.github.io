module Jekyll
  class LegacyRedirectPage < Page
    def initialize(site, base, from_path, to_url)
      @site = site
      @base = base

      parts = from_path.sub(%r{^/}, '').split('/')
      @name = parts.pop
      @dir = parts.join('/')
      @dir = '/' if @dir.empty?

      process(@name)
      self.data = {
        'layout' => 'redirect',
        'permalink' => from_path,
        'redirect_to' => to_url,
        'robots' => 'noindex, follow'
      }
      self.content = ''
    end
  end

  class LegacyRedirectGenerator < Generator
    safe true
    priority :lowest

    REDIRECTS = {
      '/hakkinda.html' => '/hakkında.html',
      '/docs/temel_linux/1.html' => '/egitim/temel-linux/girizgah/',
      '/docs/temel_linux/2.html' => '/egitim/temel-linux/gerekli-ortamın-kurulması/',
      '/docs/temel_linux/3.html' => '/egitim/temel-linux/linux-nedir/',
      '/docs/temel_linux/4.html' => '/egitim/temel-linux/linux-kısayolları/',
      '/docs/temel_linux/5.html' => '/egitim/temel-linux/yardım-alma-komutları/',
      '/docs/temel_linux/6.html' => '/egitim/temel-linux/bilgi-alma-komutları/',
      '/docs/temel_linux/7.html' => '/egitim/temel-linux/dizinlerde-gezinmek/',
      '/docs/temel_linux/8.html' => '/egitim/temel-linux/dizinlerde-gezinmek/',
      '/docs/temel_linux/9.html' => '/egitim/temel-linux/metinsel-verileri-islemek/',
      '/docs/temel_linux/10.html' => '/egitim/temel-linux/arşivleme-sıkıştırma/',
      '/docs/temel_linux/11.html' => '/egitim/temel-linux/kullanıcı-ve-grup-yönetimi/',
      '/docs/temel_linux/12.html' => '/egitim/temel-linux/kullanıcı-ve-grup-yönetimi/',
      '/docs/temel_linux/13.html' => '/egitim/temel-linux/işlem-yönetimi/',
      '/docs/temel_linux/14.html' => '/egitim/temel-linux/disk-yönetimi/',
      '/docs/temel_linux/15.html' => '/egitim/temel-linux/servis-yönetimi/',
      '/docs/temel_linux/16.html' => '/egitim/temel-linux/kopyalama-taşıma-silme-işlemleri/',
      '/docs/temel_linux/17.html' => '/egitim/temel-linux/paket-yönetimi/',
      '/docs/temel_linux/18.html' => '/egitim/temel-linux/kabuk-genisletmeleri/',
      '/docs/temel_linux/19.html' => '/egitim/temel-linux/temel-ağ-komutları/',
      '/docs/temel_linux/20.html' => '/egitim/temel-linux/metin-editoru/',
      '/docs/temel_linux/21.html' => '/egitim/temel-linux/temel-ağ-komutları/',
      '/docs/temel_linux/22.html' => '/egitim/temel-linux/servis-yönetimi/',
      '/docs/temel_linux/23.html' => '/egitim/temel-linux/log-kayıtları-hakkında/',
      '/docs/temel_linux/24.html' => '/linux-arayuzunu-ozellestirmek'
    }.freeze

    def generate(site)
      REDIRECTS.each do |from_path, to_url|
        site.pages << LegacyRedirectPage.new(site, site.source, from_path, to_url)
      end
    end
  end
end
