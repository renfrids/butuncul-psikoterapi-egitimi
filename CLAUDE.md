# CLAUDE.md — Proje Bağlamı

Bu dosya Claude Code içindir. Projenin ne olduğunu, nasıl çalıştığını ve nelerin
doldurulması/bağlanması gerektiğini özetler. Değişiklik yapmadan önce bunu oku.

## Proje nedir?

**Bütüncül Terapiler Enstitüsü** çatısı altında, **Banu İkincisoy** tarafından verilen
**Bütüncül Psikoterapi Eğitimi** için tek sayfalık bir tanıtım/açılış sayfası (landing page).

- **Amaç:** Reklamdan gelen psikolog, psikolojik danışman ve ilgili meslek gruplarının
  eğitime ilgisini artırmak ve **bilgi / ön başvuru formunu** doldurmalarını sağlamak.
- **Dönüşüm hedefi:** Sayfa içindeki form (`#form`). **Ödeme sayfadan ALINMAZ** — form yalnızca
  iletişim/bilgi talebidir, sonrasında ekip geri dönüş yapar.
- **Dil:** Türkçe.
- **Ton:** Güven veren, uzman, destekleyici, empatik, derinlikli; abartılı vaatlerden uzak,
  akademik sınırları koruyan. Kullanıcının mesleki zorlanmalarını yargılamadan görünür kılar.

## Teknoloji

Build adımı yok. Saf **statik HTML + CSS + JS**.

- Önizleme: `index.html`'i tarayıcıda aç, veya VS Code'da **Live Server** eklentisiyle çalıştır.
- Harici bağımlılık: yalnızca Google Fonts (Fraunces + Hanken Grotesk), `<head>` içinde.

## Dosya yapısı

```
index.html          → tüm sayfa iskeleti (bölümler sırayla, HTML yorumlarıyla ayrılmış)
css/styles.css      → tüm stiller; en üstte :root tasarım tokenları
js/main.js          → menü, akordeonlar, sticky bar, form (demo), video placeholder
assets/
  logo-navy.png     → açık zeminler için (header)
  logo-white.png    → koyu zeminler için (footer)
  logo-source.pdf   → orijinal logo
  images/           → gerçek fotoğraflar buraya (portre, galeri, vb.)
```

## Tasarım sistemi (css/styles.css → :root)

Renkler markanın logosundan türetildi (derin indigo-lacivert + sıcak bej + ölçülü okr):

| Token           | Değer      | Kullanım                          |
|-----------------|------------|-----------------------------------|
| `--bg`          | `#F7F3EA`  | ana zemin (kırık beyaz/bej)       |
| `--bg-alt`      | `#EFE7D7`  | dönüşümlü bölüm zemini (kum)       |
| `--surface`     | `#FDFBF6`  | kart yüzeyi                       |
| `--brand`       | `#2B3150`  | ana lacivert (buton, vurgu)       |
| `--brand-deep`  | `#1C1E33`  | en koyu lacivert (başlık, footer) |
| `--brand-soft`  | `#5B6182`  | yumuşak lacivert-gri              |
| `--clay`        | `#A9773F`  | sıcak okr vurgu (az kullanılır)   |
| `--ink`         | `#2A2620`  | gövde metni                       |
| `--muted`       | `#6E6558`  | ikincil metin                     |

- **Başlık fontu:** Fraunces (serif) · **Gövde:** Hanken Grotesk (sans).
- **İmza öğe:** terapistin *iç sesi* — italik alıntılar ("Bir şeyi kaçırıyor olabilir miyim?").
  Hero, ağrı noktası kartları ve alıntı bloklarında tekrar eder. Korunmalı.
- Renk değiştirmek için tokenları değiştir; bileşenler otomatik güncellenir.

## Navigasyon: TEK sayfa, sekme yok

Önemli: Sayfa artık **tek kesintisiz kaydırma** ile çalışıyor — eskiden bir "sekme" sistemi
vardı (Ana Sayfa / Hakkımızda / Eğitim / Eğitmenler / S.S.S. tıklanınca farklı bir "görünüm"
açılıp diğerleri gizleniyordu, `js/main.js`'te `showHome()`/`showTab()` ile). Bu sistem
**13.07.2026 revizyonuyla tamamen kaldırıldı** — müşteri talebiyle tüm bölümler artık tek
bir sayfada üst üste akıyor, üst menüdeki linkler sadece ilgili bölüme kaydırıyor
(native anchor scroll + `scroll-margin-top`, JS'te ayrı bir yönlendirme mantığı yok).
Yeni bir bölüm eklerken tab-panel/home-view kavramlarını **geri getirme** — artık yok.

## Sayfa akışı (sırayla)

Hero (tag/kicker/hook başlık + açıklama, sağda görsel) → Tanıtım Videosu (`#video`, ayrı
bölüm) → Kazanımlar → Zorluklar → Hakkımızda → Nedir → Kimler İçin → Müfredat →
Formülasyon (Teoriden Uygulamaya) → Süpervizyon → Fark → Galeri →
**Eğitmen Banu İkincisoy Hakkında** (yeni, Banu'ya özel odak bölümü) → Eğitmenlerimiz
(7 kişilik ekip grid'i) → Detaylar → Katılımcı Yorumları → SSS → Form.

> Not: "Eğitmen Banu İkincisoy Hakkında" ile "Eğitmenlerimiz" **iki ayrı bölüm** —
> ilki sadece Banu'nun (eğitmenin) detaylı biyografisi/tanıtımı, ikincisi 7 kişilik
> tüm eğitmen kadrosunun kısa kartları. Eğitmenlerimiz grid'indeki Banu kartı artık
> kısa/basit (diğer kartlarla aynı format), detaylı biyografi yalnızca üstteki
> Banu bölümünde. Bunları tekrar birleştirme.

> Not: Tanıtım videosu Hero'nun içinden çıkarılıp tekrar ayrı bir bölüm (`#video`)
> yapıldı — Hero'daki görsel yeri artık gerçek fotoğrafla dolu (`.hero-visual .portrait img`,
> bkz. TODO madde 2 altındaki not).

> Not (27.07.2026): Hero başlık hiyerarşisi **hem mobil hem masaüstünde** değişti —
> `<h1>` ("Bütüncül Psikoterapi Eğitimi") artık küçük/bold/uppercase bir etiket
> gibi (`.hero h1` base kuralı, `css/styles.css`), büyük/daktilo-efektli başlık
> artık **kanca cümlesi** (`.hero-hook-overlay`, `js/main.js`'teki typewriter
> IIFE `.hero-hook-overlay`'i hedefliyor, h1 değil). Bu ikisi evrensel (media
> query dışı, base stil).

> Not (27.07.2026, yalnızca mobil, ≤860px): Bunun dışında mobilde hero düzeni
> masaüstünden farklı — `css/styles.css`'teki `@media (max-width:860px)` hero
> bloğunda `display:contents` + `order` tekniğiyle sıralama değişiyor: eyebrow
> etiket → küçük h1 etiketi → büyük kanca cümlesi → **otomatik oynayan sessiz
> video** (`#heroVideoMobile`, `js/main.js`'te ayrı bir IIFE ile
> `<video muted autoplay loop playsinline>` JS'le ekleniyor, dokununca ses açılıp
> controls çıkıyor) → tek CTA butonu (`.btn-ghost` "Tanıtımı İzle" mobilde
> gizli) → subtitle → fact kartları. Fotoğraf (`.portrait`) ve ayrı `#video`
> bölümü mobilde `display:none` — masaüstünde ikisi de (fotoğraf + tıkla-oynat
> video bölümü) birebir eskisi gibi çalışmaya devam ediyor, bu kısım SADECE
> mobil görünüm için.

> Not: "Katılımcı Yorumları" bölümü daha önce müşteri talebiyle çıkarılmıştı;
> 13.07.2026 revizyon PDF'i ile tekrar istendi ve placeholder olarak eklendi
> (Detaylar ile SSS arasında). Gerçek yorum/video içeriği gelince `[Katılımcı adı]`
> ve "Yorum metni eklenecek." yer tutucuları doldurulacak.

## DOLDURULACAK / BAĞLANACAK (TODO)

Kod içinde `TODO` ve `[köşeli parantez]` ile işaretli. Brief ilkesi:
**kesinleşmemiş bilgiyi varsayım olarak ekleme** — gerçek bilgi gelince doldur.

1. ~~Form gönderimi~~ — **TAMAMLANDI.** `leadForm`, `netlify/functions/submit-lead.js`
   Netlify Function'ına POST ediyor; bu function Formspree'ye (`mkodwnvn`) iletiyor ve
   başarılıysa Meta Conversions API'ye de gönderiyor (bkz. "Meta Pixel / Conversions API"
   bölümü aşağıda).
2. ~~Tanıtım videosu~~ — **TAMAMLANDI (27.07.2026).** Önce YouTube denendi ama embed'de
   yükleyen hesabın adı ("Dilara Sipahi") videonun altında göründüğü için **kendi
   sunucumuzda barındırmaya geçildi**. Kaynak `.mov` (HEVC, 1920x1080, 131MB) idi;
   tarayıcı uyumluluğu ve boyut için ffmpeg ile H.264 MP4'e, 1280x720'ye, ~12MB'a
   dönüştürüldü (`assets/video/tanitim-video.mp4`). Kapak görseli videodan çıkarılan
   bir kare (`assets/images/tanitim-poster.jpg`). `#videoFrame` tıklanınca `<video>`
   etiketi DOM'a ekleniyor (`js/main.js`) — sayfa ilk yüklenirken video indirilmiyor.
   Yeni video eklenecekse aynı ffmpeg komutunu kullan: `-c:v libx264 -preset slow
   -crf 26 -c:a aac -b:a 128k -movflags +faststart`, HEVC/.mov kaynaklar MUTLAKA
   böyle dönüştürülmeli, doğrudan konulmamalı (tarayıcı uyumsuzluğu).
3. **Görseller** — **Galeri TAMAMLANDI** (27.07.2026, 8 gerçek fotoğraf `assets/images/galeri-*.jpg`).
   **Hero portresi TAMAMLANDI** (27.07.2026, `assets/images/hero-portre.jpg`, `.hero-visual .portrait`
   içinde gerçek `<img>`) — elimizdeki fotoğraf geniş açı/doğal kare olsa da müşteri onayıyla
   kullanıldı. Hâlâ eksik: `#egitmen` (Banu İkincisoy Hakkında) ve `Eğitmenlerimiz` grid'indeki
   7 kartın **yakın çekim portre** fotoğrafları — elimizdeki diğer fotoğraflar da geniş açı/doğal
   kareler, birebir portre değil, bu yüzden o placeholder'lar henüz değiştirilmedi.
4. **Eğitmen biyografisi** — `#egitmen` bölümündeki `[köşeli parantez]` metinler gerçek
   akademik geçmiş, uzmanlık, deneyim, üyeliklerle doldurulacak.
5. **Müfredat** — `#icerik` akordeonundaki M5 ve sonrası kesin müfredata göre. Programda
   olmayan modül eklenmez.
6. **Tarih / yer / ücret / kontenjan / sertifika / süpervizyon detayları** — `#detaylar`
   kartları ve ilgili SSS yanıtları (`netleştirilecek` placeholder'ları).

## Meta Pixel / Conversions API (22.07.2026 kuruldu)

- Pixel ID: `1573209434143007`, temel kod `index.html` `<head>`'de (PageView otomatik).
- `Lead` eventi **hem** tarayıcıdan (Pixel) **hem** sunucudan (CAPI) gönderilir — Meta'nın
  önerdiği çift kanal + dedup yöntemi. Backend akışı: form → `submit-lead` function →
  Formspree'ye ilet → başarılıysa SHA-256 ile hash'lenmiş kullanıcı verisiyle Meta CAPI'ye
  gönder → aynı `event_id`'yi frontend'e döndür → `js/main.js` bu ID ile `fbq('track','Lead',...)`
  çağırır (yalnızca form başarıyla kaydedildikten sonra, buton tıklamasında değil).
  **Önemli:** Tarayıcıdaki bu Pixel çağrısı kişisel veri (e-posta/telefon/ad) İÇERMEZ —
  yalnızca kategori/ID bilgisi taşır; hash'lenmiş hassas veri yalnızca sunucudaki CAPI
  çağrısında yer alır. Bu ayrımı bozup birini kaldırma (13.07-22.07.2026 arasında bir ara
  yalnızca-sunucu denenmişti, dedup/dogrulama zorlaştığı için Pixel+CAPI ikilisine geri dönüldü).
- `META_ACCESS_TOKEN` yalnızca Netlify environment variable'da (asla kodda/git'te değil).
- **Eksik/bilinen sınır:** `submission_id` bazlı kalıcı (backend'de saklanan) çift-gönderim
  engeli yok — şu an yalnızca submit butonunun geçici disable edilmesi var. İleride
  Netlify Blobs ile eklenebilir.
- Telefon alanı (`#tel`) özel doğrulama içerir: `0` ile başlayan yerel (11 hane) veya `90`/`+90`
  ile başlayan uluslararası (12 hane) formatları kabul eder; yalnızca önek yoksa (çıplak 10
  hane) `#telError` ile alan altında kırmızı uyarı gösterir — native tarayıcı balonu yerine.

## SSS

`#sss` bölümü **brief'teki 15 sorunun tamamını, aynı sırayla** içerir. Soru ekleme/çıkarma
yapılacaksa müşteriyle teyit et. Kesin cevabı olmayanlar placeholder olarak bırakıldı.

## İçerik ilkeleri (brief'ten)

- Ana CTA ("Bilgi Al" / "Eğitim Hakkında Bilgi Al") sayfa boyunca aynı dille tekrar eder;
  kullanıcı her yerden forma ulaşabilmeli (üst menü + hero + sticky alt çubuk + footer).
- Korku/yetersizlik hissini artıran sert ifade yok; zorlanmalar mesleğin doğal parçası olarak sunulur.
- Sayfada ödeme yok.

## Kalite tabanı

Mobil uyumlu, klavye odak görünür, `prefers-reduced-motion` destekli. Yeni bileşen
eklerken bu standardı koru.
