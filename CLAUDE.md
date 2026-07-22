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
> yapıldı — Hero'da onun yerine görsel/portre placeholder'ı duruyor (gerçek fotoğraf
> geldiğinde `.hero-visual .img-placeholder` değişecek).

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
2. **Tanıtım videosu** — `#video` placeholder; `js/main.js`'teki tıklama YouTube/Vimeo iframe
   gömecek şekilde değiştirilecek (video linki gelince).
3. **Görseller** — `assets/images/` altına: Banu İkincisoy portresi (hero + eğitmen bölümü),
   galeri kareleri. Hero ve eğitmen bölümündeki `.img-placeholder` blokları `<img>` ile değiştir.
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
