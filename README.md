# Kanatoğulları Turizm — Web Sitesi

Afyonkarahisar merkezli Kanatoğulları Turizm için **saf HTML/CSS/JS** ile yeniden yazılmış,
SEO odaklı, hızlı ve premium kurumsal web sitesi. WordPress bağımlılığı yoktur.

## Teknoloji
- Bağımlılıksız küçük bir **Node üretici** (`build.mjs`) tek bir tasarım sisteminden
  statik HTML üretir. Çıktı `public/` klasörüdür.
- Çalışma zamanında **hiçbir framework yoktur** — sadece bir küçük `main.js`.
- Klasör bazlı URL yapısı eski WordPress URL'leriyle **birebir aynıdır** (SEO korunur).

## Komutlar
```bash
npm run build   # public/ klasörünü üretir
npm run serve   # http://localhost:4321 önizleme
npm run dev     # build + serve
```

## İçerik nasıl düzenlenir?
Tüm metinler, hizmetler, iletişim ve SEO verileri tek dosyadadır:
**`src/content.mjs`** → düzenle → `npm run build` → `public/` güncellenir.

## Yayınlama (cPanel)
1. `npm run build`
2. `public/` klasörünün **içindeki** tüm dosyaları sunucudaki `public_html/`
   klasörüne yükleyin (`.htaccess` dahil).
3. Eski WordPress dosyalarını temizleyin/kaldırın (bkz. güvenlik notu).

## Yapılacaklar (görsel & içerik)
- `assets/img/` içine gerçek fotoğraflar eklenmeli: hero (VIP araç), filo fotoğrafları,
  belgeler, kurumsal görsel. Placeholder alanları otomatik yerini alır.
- `og-default.jpg`, `apple-touch-icon.png`, `icon-192/512.png` eklenmeli.

## Güvenlik notu
Eski WordPress sitesinin `sitemap.xml` dosyası spam (kumar) içeriğine yönlendiriyordu →
site büyük olasılıkla **hacklenmişti**. Yeni site yüklendikten sonra eski WP kurulumu
tamamen kaldırılmalı ki spam/enjeksiyon devam etmesin.
