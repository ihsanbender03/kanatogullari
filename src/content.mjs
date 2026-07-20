// =========================================================
//  Kanatoğulları Turizm — İçerik & yapı verisi (tek kaynak)
//  Tüm metin, SEO ve sayfa verileri burada. build.mjs bunu HTML'e çevirir.
// =========================================================

export const site = {
  name: "Kanatoğulları Turizm",
  shortName: "Kanatoğulları",
  domain: "https://kanatogullari.com.tr",
  tagline: "Güvenli ve Konforlu Yolculuk",
  foundedYears: 30,
  city: "Afyonkarahisar",
  region: "İç Ege / İç Anadolu",
  phone: "+90 (272) 214 47 20",
  phoneHref: "+902722144720",
  whatsapp: "902722144720",
  email: "kanatogullari@hotmail.com",
  email2: "kanatogullari@kanatogullari.com.tr",
  address: "Dairecep Mah. Gazlıgöl Cad. No:35 Merkez, Afyonkarahisar",
  addressShort: "Dairecep Mah. Gazlıgöl Cad. No:35, Merkez / Afyonkarahisar",
  postalCode: "03000",
  mapQuery: "Kanatoğulları Turizm Afyonkarahisar",
  hours: "Pazartesi–Pazar, 7/24 operasyon",
  social: {
    instagram: "https://www.instagram.com/kanatogullarigroup",
    facebook: "https://www.facebook.com/kanatogullarigroup",
  },
  geo: { lat: "38.7570", lng: "30.5387" },
};

// Kurumsal istatistikler (hero + strip)
export const stats = [
  { value: 30, suffix: "+", label: "Yıllık sektör tecrübesi" },
  { value: 1000000, suffix: "+", label: "Güvenle taşınan yolcu" },
  { value: 50, suffix: "+", label: "Bakımlı araçlık filo" },
  { value: 7, suffix: "/24", label: "Kesintisiz operasyon", raw: true },
];

// Ana menü sırası + hizmet alt menüsü content.services'ten türetilir
export const nav = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Kurumsal", href: "/kurumsal/" },
  { label: "Hizmetlerimiz", href: "/hizmetlerimiz/", children: "services" },
  { label: "Araç Filomuz", href: "/arac-filomuz/" },
  { label: "Belgelerimiz", href: "/belgelerimiz/" },
  { label: "İletişim", href: "/iletisim/" },
];

// ---------------------------------------------------------
//  HİZMETLER
// ---------------------------------------------------------
export const services = [
  {
    slug: "havalimani-yolcu-transferi",
    icon: "plane",
    title: "Havalimanı Yolcu Transferi",
    menu: "Havalimanı Yolcu Transferi",
    short: "Zamanında, konforlu ve güvenli havalimanı ulaşım çözümleri sunuyoruz.",
    metaTitle: "Havalimanı Transfer | Afyon & Zafer Havalimanı Karşılama",
    metaDesc:
      "Kanatoğulları Turizm ile Afyonkarahisar ve Zafer Havalimanı transfer hizmeti. Uçuş takipli karşılama, konforlu VIP araçlar ve dakiklik odaklı, güvenli havalimanı ulaşımı.",
    lead:
      "Uçuşunuzu takip eden operasyon ekibimiz ve bakımlı VIP araçlarımızla; havalimanı ile otel, ev veya iş adresiniz arasında zamanında, konforlu ve güvenli transfer sağlıyoruz.",
    features: [
      { icon: "clock", title: "Uçuş takipli karşılama", text: "Uçuş saatinizi anlık takip eder, rötar veya erken inişte planı otomatik günceller, bekleme derdi yaşatmayız." },
      { icon: "shield", title: "Güvenli ve sigortalı", text: "Zorunlu koltuk ve seyahat sigortalı, düzenli bakımdan geçen araçlarla yola çıkarsınız." },
      { icon: "crown", title: "VIP konfor", text: "Mercedes Vito / V-Class sınıfı geniş, klimalı ve temiz araçlarla ilk dakikadan itibaren rahat edersiniz." },
      { icon: "users", title: "Profesyonel şoförler", text: "Tecrübeli, güler yüzlü ve güzergâha hâkim sürücülerimiz kapıdan kapıya hizmet verir." },
    ],
    benefits: [
      "Karşılama tabelası ile isimli karşılama",
      "Bagaj yükleme ve taşıma desteği",
      "Grup ve bireysel transfer seçenekleri",
      "7/24 rezervasyon ve operasyon",
      "Şehir içi ve şehirlerarası havalimanı transferi",
    ],
    routes: ["Afyon şehir merkezi ↔ Zafer Havalimanı (AFS)", "Afyonkarahisar ↔ Esenboğa (Ankara)", "Otel ve termal tesis transferleri", "Kurumsal ekip ve delegasyon karşılama"],
  },
  {
    slug: "vip-transfer",
    icon: "crown",
    title: "VIP Transfer",
    menu: "VIP Transfer",
    short: "Üst segment araçlar ve özel hizmet anlayışıyla premium transfer deneyimi.",
    metaTitle: "VIP Transfer | Lüks Araçlarla Prestijli Ulaşım",
    metaDesc:
      "VIP standartlarda konforlu ve prestijli transfer. Kanatoğulları Turizm; üst segment Mercedes araçlar, özel şoför ve gizlilik odaklı hizmetle iş ve özel seyahatlerinize değer katar.",
    lead:
      "İş görüşmeleri, özel davetler ve misafir ağırlamalarında; üst segment araçlarımız, deneyimli özel şoförlerimiz ve ayrıntıya önem veren hizmet anlayışımızla prestijli bir ulaşım deneyimi sunuyoruz.",
    features: [
      { icon: "crown", title: "Üst segment filo", text: "Mercedes V-Class ve business sınıfı araçlarla imajınıza yakışan bir yolculuk." },
      { icon: "shield", title: "Gizlilik ve güven", text: "Misafirleriniz ve iş bağlantılarınız için diskre, güvenli ve kesintisiz hizmet." },
      { icon: "star", title: "Kişiye özel hizmet", text: "Karşılama, ikram, güzergâh ve zamanlama tümüyle size göre planlanır." },
      { icon: "clock", title: "Dakiklik garantisi", text: "Kritik randevularınızda saniyesine kadar planlı, kusursuz operasyon." },
    ],
    benefits: [
      "Business ve delegasyon karşılama",
      "Düğün, nişan ve özel gün transferleri",
      "Çok günlü kurumsal ağırlama programları",
      "Araç içi su ve ikram seçeneği",
      "Türkçe / İngilizce iletişim kurabilen şoför talebi",
    ],
    routes: ["Kurumsal misafir ağırlama", "Etkinlik ve fuar transferleri", "Şehirlerarası özel şoförlü seyahat", "Özel gün ve organizasyon transferleri"],
  },
  {
    slug: "personel-tasimaciligi",
    icon: "users",
    title: "Personel Taşımacılığı",
    menu: "Personel Taşımacılığı",
    short: "Fabrika ve kurumlar için güvenli, düzenli ve takipli personel servisi.",
    metaTitle: "Personel Taşımacılığı | Fabrika & Kurumsal Servis",
    metaDesc:
      "Kanatoğulları Turizm ile kurumsal personel servisi: optimize güzergâhlar, düzenli araç bakımı, sigortalı ve takip edilebilir seferlerle işletmeniz için güvenilir personel taşımacılığı.",
    lead:
      "Fabrika, OSB ve kurumlar için; optimize edilmiş güzergâhlar, düzenli bakımlı araç filosu ve disiplinli operasyon ekibiyle güvenli, dakik ve ekonomik personel taşımacılığı çözümleri sunuyoruz.",
    features: [
      { icon: "shield", title: "Güvenlik önceliği", text: "Sigortalı araçlar, düzenli bakım ve deneyimli sürücülerle iş gücünüz güvende." },
      { icon: "map", title: "Optimize güzergâh", text: "Toplanma noktaları ve saatler, maliyet ve süre açısından en verimli şekilde planlanır." },
      { icon: "clock", title: "Vardiya uyumu", text: "Çok vardiyalı çalışma düzenine uygun, esnek ve dakik sefer planlaması." },
      { icon: "users", title: "Yüksek kapasite", text: "Minibüsten otobüse geniş filo ile her ölçekte kuruma çözüm." },
    ],
    benefits: [
      "Sözleşmeli kurumsal servis anlaşmaları",
      "Vardiya bazlı esnek sefer planı",
      "Araç ve sürücü yedekleme garantisi",
      "Toplu iş sağlığı ve güvenliği standartları",
      "Düzenli raporlama ve iletişim",
    ],
    routes: ["OSB ve fabrika servisleri", "Kurumsal ofis personel servisi", "Çok vardiyalı sefer planları", "Etkinlik ve proje bazlı personel taşıma"],
  },
  {
    slug: "ogrenci-tasimaciligi",
    icon: "student",
    title: "Öğrenci Taşımacılığı",
    menu: "Öğrenci Taşımacılığı",
    short: "Güvenli, düzenli ve denetimli öğrenci taşıma hizmetleri.",
    metaTitle: "Öğrenci Servisi | Güvenli Okul Taşımacılığı",
    metaDesc:
      "Rehber personelli, denetimli ve sigortalı öğrenci servisi. Kanatoğulları Turizm ile okul taşımacılığında güvenlik, dakiklik ve veli iletişimi ön planda.",
    lead:
      "Öğrencilerin okul ile ev arasındaki yolculuğunda güvenlik her şeyden önce gelir. Rehber personel, denetimli araçlar ve deneyimli sürücülerimizle velilerimize huzur, öğrencilerimize güvenli bir yolculuk sunuyoruz.",
    features: [
      { icon: "shield", title: "Rehber personel", text: "Her araçta öğrencilere refakat eden rehber personel ile ekstra güvenlik." },
      { icon: "medal", title: "Mevzuata tam uyum", text: "Okul servis araçları yönetmeliğine uygun, denetimli ve belgeli araçlar." },
      { icon: "clock", title: "Dakik alma-bırakma", text: "Planlı güzergâh ve sabit saatlerle düzenli okul ulaşımı." },
      { icon: "users", title: "Veli iletişimi", text: "Alındı-bırakıldı bilgilendirmesi ve açık iletişim kanalı." },
    ],
    benefits: [
      "Emniyet kemeri ve yaş grubuna uygun oturma düzeni",
      "Deneyimli ve referanslı sürücü kadrosu",
      "Araç içi hijyen ve düzenli dezenfeksiyon",
      "Okul ve kurum anlaşmalı servis",
      "Sigortalı ve takip edilebilir seferler",
    ],
    routes: ["Okul servis güzergâhları", "Özel eğitim kurumu taşımacılığı", "Kurs ve etüt merkezi servisi", "Spor kulübü ve etkinlik ulaşımı"],
  },
  {
    slug: "ozel-tur-hizmetleri",
    icon: "map",
    title: "Özel Tur Hizmetleri",
    menu: "Özel Tur Hizmetleri",
    short: "Kişiye özel planlanan turlar ile keyifli ve sorunsuz seyahat deneyimi.",
    metaTitle: "Özel Tur Hizmetleri | Kişiye Özel Gezi Organizasyonu",
    metaDesc:
      "Termal, kültür ve doğa turları için kişiye özel organizasyon. Kanatoğulları Turizm; konforlu araçlar, deneyimli sürücüler ve baştan sona planlı programlarla keyifli tur deneyimi sunar.",
    lead:
      "Termal tatilden kültür ve doğa gezilerine; grubunuzun beklentisine göre baştan sona planlanan, konforlu araçlar ve deneyimli ekiple yürütülen kişiye özel tur organizasyonları düzenliyoruz.",
    features: [
      { icon: "map", title: "Kişiye özel program", text: "Güzergâh, konaklama ve zamanlama tamamen grubunuzun isteğine göre kurgulanır." },
      { icon: "crown", title: "Konforlu araçlar", text: "Uzun yolda bile yormayan, klimalı ve bakımlı araçlarla seyahat." },
      { icon: "users", title: "Deneyimli ekip", text: "Bölgeyi tanıyan sürücüler ve talep hâlinde rehberlik desteği." },
      { icon: "star", title: "Sorunsuz operasyon", text: "Tek elden koordinasyonla siz sadece gezinin keyfini çıkarırsınız." },
    ],
    benefits: [
      "Termal ve sağlık turları",
      "Kültür, inanç ve tarih gezileri",
      "Doğa, yayla ve fotoğraf turları",
      "Kurumsal ve dernek gezileri",
      "Konaklama ve program koordinasyonu",
    ],
    routes: ["Afyon termal turları", "Frigya ve tarihî rota gezileri", "Kurumsal moral gezileri", "Okul ve dernek gezi organizasyonları"],
  },
  {
    slug: "gezi-tur-ve-rehberlik-hizmetleri",
    icon: "compass",
    title: "Gezi Tur ve Rehberlik Hizmetleri",
    menu: "Gezi Tur ve Rehberlik Hizmetleri",
    short: "Rehberlik desteğiyle planlı, bilgilendirici ve keyifli gezi organizasyonları.",
    metaTitle: "Gezi Tur ve Rehberlik | Rehber Eşliğinde Turlar",
    metaDesc:
      "Rehber eşliğinde planlı gezi turları. Kanatoğulları Turizm; kültür ve doğa rotalarında bilgilendirici, güvenli ve konforlu rehberli tur organizasyonları düzenler.",
    lead:
      "Gezdiğiniz yeri gerçekten tanımak için rehberlik fark yaratır. Deneyimli rehberler ve konforlu araçlarımızla; kültür, tarih ve doğa rotalarında bilgilendirici ve keyifli gezi organizasyonları sunuyoruz.",
    features: [
      { icon: "compass", title: "Uzman rehberlik", text: "Bölgenin tarihine ve kültürüne hâkim rehberlerle dolu dolu bir gezi." },
      { icon: "map", title: "Planlı rota", text: "Zaman kaybı olmadan, en doğru sırayla kurgulanmış gezi programı." },
      { icon: "shield", title: "Güvenli seyahat", text: "Bakımlı araçlar ve deneyimli sürücülerle güven içinde gezin." },
      { icon: "users", title: "Grup organizasyonu", text: "Okul, dernek ve kurum grupları için özel planlama." },
    ],
    benefits: [
      "Türkçe rehberlik hizmeti",
      "Kültür ve inanç turu programları",
      "Grup büyüklüğüne göre araç seçimi",
      "Giriş, konaklama ve yemek koordinasyonu",
      "Esnek, isteğe göre şekillenen program",
    ],
    routes: ["Rehberli kültür turları", "Okul eğitim gezileri", "Dernek ve topluluk turları", "Şehir turu ve karşılama programları"],
  },
  {
    slug: "arac-kiralama",
    icon: "car",
    title: "Araç Kiralama",
    menu: "Araç Kiralama",
    short: "Şoförlü veya şoförsüz, ihtiyacınıza uygun bakımlı araç kiralama seçenekleri.",
    metaTitle: "Araç Kiralama | Şoförlü & Şoförsüz Bakımlı Araçlar",
    metaDesc:
      "Günlük, haftalık ve uzun dönem araç kiralama. Kanatoğulları Turizm; bakımlı, sigortalı araçlar ve şoförlü / şoförsüz esnek seçeneklerle Afyonkarahisar'da güvenilir kiralama sunar.",
    lead:
      "Kısa süreli ihtiyaçtan uzun dönem kuruma; bakımlı ve sigortalı araçlarımızı şoförlü ya da şoförsüz olarak kiralayabilir, ulaşım ihtiyacınızı esnek ve ekonomik biçimde karşılayabilirsiniz.",
    features: [
      { icon: "car", title: "Geniş araç seçeneği", text: "Binek araçtan VIP minibüse kadar farklı ihtiyaçlara uygun filo." },
      { icon: "shield", title: "Bakımlı ve sigortalı", text: "Düzenli bakımdan geçen, temiz ve sigortalı araçlarla güvenli kiralama." },
      { icon: "clock", title: "Esnek süre", text: "Günlük, haftalık, aylık ve uzun dönem kiralama seçenekleri." },
      { icon: "users", title: "Şoförlü seçenek", text: "İsteğe bağlı deneyimli şoför ile sürüşü bize bırakın." },
    ],
    benefits: [
      "Günlük / haftalık / aylık kiralama",
      "Kurumsal uzun dönem anlaşmaları",
      "Şoförlü veya şoförsüz kullanım",
      "Temiz, bakımlı ve sigortalı araçlar",
      "Şeffaf ve rekabetçi fiyatlandırma",
    ],
    routes: ["Bireysel kısa dönem kiralama", "Kurumsal filo kiralama", "Etkinlik ve organizasyon araçları", "VIP şoförlü kiralama"],
  },
  {
    slug: "catering",
    icon: "catering",
    title: "Catering",
    menu: "Catering – Yemek Hizmetleri",
    short: "Organizasyonlarınıza özel, kaliteli ve profesyonel catering hizmeti.",
    metaTitle: "Catering & Yemek Hizmetleri | Organizasyon Catering",
    metaDesc:
      "Toplu yemek ve organizasyon catering çözümleri. Kanatoğulları Turizm; hijyen standartlarına uygun, kaliteli ve profesyonel catering hizmetiyle etkinliklerinize değer katar.",
    lead:
      "Kurumsal etkinlikten özel organizasyona; hijyen standartlarına uygun mutfak, kaliteli malzeme ve profesyonel servis ekibiyle davetlerinizi ve toplantılarınızı sorunsuz şekilde ağırlıyoruz.",
    features: [
      { icon: "catering", title: "Kaliteli menüler", text: "Etkinliğinizin türüne göre hazırlanan, damak zevkine uygun zengin menü seçenekleri." },
      { icon: "shield", title: "Hijyen standardı", text: "Gıda güvenliği ilkelerine uygun hazırlık, taşıma ve servis." },
      { icon: "users", title: "Profesyonel servis", text: "Deneyimli servis ekibiyle davetlerinizde kusursuz ağırlama." },
      { icon: "star", title: "Organizasyona özel", text: "Kişi sayısı ve konsepte göre esnek, ölçeklenebilir çözümler." },
    ],
    benefits: [
      "Kurumsal toplantı ve etkinlik catering'i",
      "Özel gün ve organizasyon menüleri",
      "Toplu yemek çözümleri",
      "Menü ve konsept danışmanlığı",
      "Servis ekipmanı ve personel desteği",
    ],
    routes: ["Kurumsal etkinlik catering", "Açılış ve tanıtım organizasyonları", "Özel gün ve davetler", "Toplu yemek hizmeti"],
  },
];

// Araç filosu (gerçek araç görselleri ile)
export const fleet = [
  { name: "Mercedes V-Class / Vito", cap: "1–8 kişi", img: "/assets/img/fleet/vito.webp", tags: ["VIP Transfer", "Havalimanı", "Deri koltuk", "Klima"], desc: "Üst segment VIP transfer ve havalimanı karşılamada konforun standardı olan lüks aracımız." },
  { name: "Mercedes E-Class", cap: "1–4 kişi", img: "/assets/img/fleet/mercedes-eclass.webp", tags: ["VIP", "Business", "Özel şoför"], desc: "Business karşılama ve özel transferler için prestijli binek aracımız." },
  { name: "Mercedes Travego", cap: "40–46 kişi", img: "/assets/img/fleet/travego.webp", tags: ["Otobüs", "Uzun yol", "Tur"], desc: "Kalabalık gruplar ve uzun yol organizasyonları için tam donanımlı lüks otobüsümüz." },
  { name: "Temsa Prestij SX", cap: "27–31 kişi", img: "/assets/img/fleet/temsa-prestij.webp", tags: ["Midibüs", "Gezi turu", "Kurumsal"], desc: "Orta ölçekli gruplar ve gezi turları için konforlu ve ekonomik midibüsümüz." },
  { name: "Otokar Sultan", cap: "27–31 kişi", img: "/assets/img/fleet/otokar-sultan.webp", tags: ["Midibüs", "Engelli erişimi", "Servis"], desc: "Engelli erişim rampalı, personel ve öğrenci servisine uygun donanımlı midibüsümüz." },
  { name: "Isuzu Novo Ultra", cap: "27–29 kişi", img: "/assets/img/fleet/isuzu-novo.webp", tags: ["Midibüs", "Personel", "Öğrenci"], desc: "Personel ve öğrenci taşımacılığında güvenilir, ekonomik midibüs sınıfımız." },
  { name: "VW Transporter / Caravelle", cap: "1–8 kişi", img: "/assets/img/fleet/transporter.webp", tags: ["Grup transfer", "Konfor", "Kiralama"], desc: "Grup transferi ve kiralama için çok amaçlı, konforlu minivan aracımız." },
  { name: "Audi (Binek)", cap: "1–4 kişi", img: "/assets/img/fleet/audi.webp", tags: ["VIP", "Kiralama", "Şehir içi"], desc: "Şoförlü/şoförsüz kiralama ve VIP şehir içi ulaşım için üst sınıf binek aracımız." },
];

// Belgeler (gerçek resmi belge görselleri ile — portre/manzara karışık, contain ile gösterilir)
export const documents = [
  { name: "Seyahat Acentası İşletme Belgesi (A Grubu)", img: "/assets/img/docs/seyahat-acentasi.webp", desc: "T.C. Kültür ve Turizm Bakanlığı onaylı A Grubu seyahat acentası işletme belgesi." },
  { name: "D2 Yetki Belgesi", img: "/assets/img/docs/d2-yetki.webp", desc: "Ulaştırma Bakanlığı — yurt içi tarifesiz yolcu taşımacılığı yetki belgesi." },
  { name: "TSE Hizmet Yeterlilik Belgesi", img: "/assets/img/docs/tse-hyb.webp", desc: "Türk Standardları Enstitüsü onaylı hizmet yeterlilik belgesi." },
  { name: "İkinci El Kara Taşıtı Ticareti Belgesi", img: "/assets/img/docs/kara-tasiti.webp", desc: "Afyonkarahisar Valiliği — motorlu kara taşıtı ticareti yetki belgesi." },
  { name: "ISO 9001:2015 Kalite Yönetim Sistemi", img: "/assets/img/docs/iso-9001.webp", desc: "Uluslararası kalite yönetim sistemi sertifikası (RQSCERT)." },
  { name: "ISO Yönetim Sistemi Belgesi", img: "/assets/img/docs/iso-2.webp", desc: "Uluslararası yönetim sistemi sertifikası." },
  { name: "ISO Yönetim Sistemi Belgesi", img: "/assets/img/docs/iso-3.webp", desc: "Uluslararası yönetim sistemi sertifikası." },
];

// Neden biz (ana sayfa + kurumsal)
export const whyUs = [
  { icon: "medal", title: "30 yıla yakın tecrübe", text: "Afyonkarahisar merkezli olarak personel, öğrenci ve VIP taşımacılıkta köklü bir geçmiş." },
  { icon: "shield", title: "Güvenlik önceliği", text: "Sigortalı, düzenli bakımlı araçlar ve deneyimli sürücülerle her yolculukta güven." },
  { icon: "clock", title: "Dakiklik odaklı operasyon", text: "Kesintisiz transfer için planlı, disiplinli ve takip edilebilir operasyon yönetimi." },
  { icon: "crown", title: "VIP konfor standardı", text: "Bakımlı ve konforlu araçlarla güvenli, zamanında ve rahat ulaşım." },
];

// Ana sayfa hero slaytları (firmanın kendi profesyonel görselleri — metin görsele gömülü)
export const heroSlides = [
  { img: "/assets/img/hero/vip-transfer.webp", alt: "Lüks ve konforlu VIP transfer hizmeti — siyah Mercedes VIP araç", link: "/vip-transfer/" },
  { img: "/assets/img/hero/personel.webp", alt: "Zamanında, güvenli ve profesyonel personel taşımacılığı — Kanatoğulları otobüs filosu", link: "/personel-tasimaciligi/" },
  { img: "/assets/img/hero/catering.webp", alt: "Özel catering hizmetleri — profesyonel yemek organizasyonu", link: "/catering/" },
];

// Çalıştığımız kurumlar / referanslar
export const references = [
  { name: "Afjet", logo: "/assets/img/refs/afjet.webp" },
  { name: "Afyon Çimento", logo: "/assets/img/refs/afyoncimento.webp" },
  { name: "Bahçeşehir Koleji", logo: "/assets/img/refs/bahcesehir.webp" },
  { name: "Eskişehir", logo: "/assets/img/refs/eskisehir.webp" },
  { name: "Yavuzoğlu Koleji", logo: "/assets/img/refs/yavuzoglu.png" },
];

// Hizmet görselleri (elimizdeki gerçek fotoğraflar; olmayan yerde premium placeholder)
const serviceImages = {
  "havalimani-yolcu-transferi": "/assets/img/photos/havalimani.webp",
  "vip-transfer": "/assets/img/photos/vip.webp",
  "personel-tasimaciligi": "/assets/img/hero/personel.webp",
  "catering": "/assets/img/hero/catering.webp",
  "ogrenci-tasimaciligi": "/assets/img/photos/ogrenci.webp",
  "ozel-tur-hizmetleri": "/assets/img/photos/tur.webp",
  "gezi-tur-ve-rehberlik-hizmetleri": "/assets/img/photos/rehber.webp",
  "arac-kiralama": "/assets/img/photos/arac-kiralama.webp",
};
for (const s of services) s.image = serviceImages[s.slug] || null;

// Kurumsal değerler
export const values = [
  { icon: "shield", title: "Güven", text: "Verdiğimiz her sözün arkasında dururuz; yolcularımızın güvenliği önceliğimizdir." },
  { icon: "clock", title: "Dakiklik", text: "Zamanın değerini biliriz; planlı operasyonla söz verdiğimiz saatte oradayız." },
  { icon: "star", title: "Konfor", text: "Bakımlı ve temiz araçlarla her yolculuğu keyifli bir deneyime dönüştürürüz." },
  { icon: "medal", title: "Deneyim", text: "30 yıla yakın tecrübemizi her seferde hizmet kalitesine yansıtırız." },
];
