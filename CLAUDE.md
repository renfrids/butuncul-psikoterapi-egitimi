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

## Sayfa akışı (brief'e göre, sırayla)

Hero → Tanıtım Videosu → Zorluklar → Nedir → Kimler İçin → Kazanımlar →
Eğitim İçeriği (müfredat akordeon) → Teoriden Uygulamaya (formülasyon) →
Uygulama & Süpervizyon → Fark → Galeri → Eğitmen → Tarih/Yer/Detaylar → SSS → Form.

> Not: Galeri, "Eğitim" sekmesinin sonuna (Fark'tan hemen sonra) taşındı —
> önceden Eğitmenler sekmesinin altındaydı.

> Not: Brief'te 13. sırada olan "Katılımcı Yorumları" bölümü müşteri talebiyle
> **çıkarıldı**. Tekrar eklenmemeli (aksi belirtilmedikçe).

## DOLDURULACAK / BAĞLANACAK (TODO)

Kod içinde `TODO` ve `[köşeli parantez]` ile işaretli. Brief ilkesi:
**kesinleşmemiş bilgiyi varsayım olarak ekleme** — gerçek bilgi gelince doldur.

1. **Form gönderimi** — `js/main.js` içindeki `leadForm` submit handler şu an demo (sadece
   başarı mesajı gösterir). Gerçek hedefe bağla. Seçenekler:
   - E-posta bildirimi (ör. Formspree / EmailJS / kendi SMTP endpoint'i)
   - Google Sheets (Apps Script web app'e `fetch` POST)
   - Kendi backend / CRM endpoint'i
   Müşteri hedefi henüz seçmedi — seçilince `fetch` ile POST ekle, KVKK onayını da gönder.
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
