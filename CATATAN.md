# CATATAN: cara mengubah portofolio

> Mau contoh kode siap salin (tambah card, skill, tag, banner, dll)? Buka **`CONTOH-KODE.txt`**.

Catatan yang sama juga ada **di dalam file HTML** (komentar `<!-- ... -->` di bagian paling atas dan di tiap bagian), jadi kamu bisa membacanya langsung dari `index.html` / `katalog.html`.

Versi ini memakai **Tailwind CLI v4** (bukan CDN lagi). CSS-nya sudah dibuild ke `dist/output.css`, jadi **tetap bisa dibuka dengan klik dua kali `index.html`**, tanpa internet (kecuali font Google).

### Kalau mengubah class Tailwind atau CSS
Perlu Node.js (sekali saja: `npm install`), lalu:

```bash
npm install        # sekali saja, mengunduh Tailwind CLI
npm run dev        # build otomatis setiap kali file disimpan (saat mengedit)
npm run build      # build final yang diperkecil (jalankan sebelum upload)
```

Tailwind memindai `index.html`, `katalog.html`, `script.js`, dan `projects.js`, jadi class yang ditulis di dalam JS (card, popup) ikut dibuat. Mengganti **teks / gambar / rate** project di `projects.js` tidak perlu build. Yang perlu build hanya kalau kamu **menambah class Tailwind baru** atau mengedit `src/input.css`.

## Isi folder

| File / folder | Fungsinya |
|---|---|
| `index.html` | **Halaman utama** (Home, About, Skill, Project, Experience, Contact) |
| `katalog.html` | **Halaman katalog** semua project |
| `CONTOH-KODE.txt` | **Kumpulan kode siap salin** (tambah card, skill, tag, banner, pengalaman, tipe, rate, warna, deploy) |
| `vercel.json` | Pengaturan deploy Vercel (output = root) |
| `projects.js` | **Daftar project (card), tipe katalog (CATEGORIES), dan banner katalog (BANNERS).** Ganti gambar, tulisan, tambah, hapus di sini |
| `script.js` | Menu, tema gelap, popup, gyroscope, filter. Di dalamnya juga ada isi About, Skill, Experience, dan `EMAIL` |
| `src/input.css` | **Satu-satunya file CSS yang diedit:** tema Tailwind (warna, font, animasi) + animasi popup gacha (rate 0-5) + kartu holografik |
| `dist/output.css` | Hasil build. **Jangan diedit tangan**, dibuat ulang oleh `npm run build` |
| `package.json` | Daftar paket dan perintah `dev` / `build` |
| `images/` | **Taruh semua gambarmu di sini** |

---

## 1. Kartu profil di Home (foto ada di sisi belakang)

Kartu membalik saat kursor diarahkan (di HP: ketuk kartunya).

- **Depan:** tulisan FHY, nama, sekolah.
- **Belakang:** fotomu.

Mengganti foto:
1. Taruh fotomu di folder `images/` dengan nama `foto-profil.jpg`.
2. Selesai.

Lokasi di kode: `index.html`, cari `KARTU PROFIL DI HOME` (petunjuk lengkapnya tepat di atas kartu).

- **Ukuran bebas.** Landscape, portrait, atau kotak otomatis memenuhi kartu tanpa gepeng. Bagian yang berlebih dipotong.
- **Fotomu `.png` / `.webp`?** Ubah ekstensi di `src="images/foto-profil.jpg"`.
- **Wajah terpotong?** Di baris `<img>` itu, ganti `object-center` dengan `object-top`, `object-bottom`, `object-left`, `object-right`, `object-left-top`, atau `object-right-top`.
- **Mau tampil utuh tanpa terpotong?** Ganti `object-cover` jadi `object-contain`.
- Kalau foto belum ada, sisi belakang menampilkan petunjuk teks.
- **Jarak foto ke ujung kartu:** foto berada di dalam bingkai putih (`p-3`), sama seperti sisi depan. Mau lebih tipis / lebar? Ganti `p-3` di div sisi belakang (`p-2` = tipis, `p-4` = lebar).

---

## 2. Card project: semuanya di `projects.js`

Satu project = satu blok `{ ... }`:

```js
{
  id: '002',                       // nomor unik, tidak boleh sama dengan card lain
  title: 'Website Toko Online',    // judul card
  category: 'Website',             // tipe di katalog: 'Website' atau 'Design' (daftarnya di CATEGORIES)
  rate: 3,                         // 1 sampai 5 = kelangkaan card, menentukan animasi popup (lihat bagian 3)
  ready: false,                    // true = Tersedia, false = Coming Soon
  image: 'images/toko.jpg',        // gambar card ('' = tidak pakai gambar)
  imagePos: 'center',              // posisi gambar kalau terpotong
  label: '',                       // tulisan saat belum ada gambar
  desc: 'Katalog produk ...',      // deskripsi
  tools: 'HTML, Tailwind CSS'      // tools yang dipakai
},
```

### Mengganti gambar card
1. Taruh gambar di `images/` (contoh `toko.jpg`).
2. Di blok project-nya isi `image: 'images/toko.jpg'`.
3. Simpan, refresh browser.

- Landscape, portrait, atau kotak otomatis menyesuaikan card **dan** popup.
- Bagian penting terpotong? Atur `imagePos`: `'top'`, `'bottom'`, `'left'`, `'right'`, `'center'`, `'left top'`, atau persen `'30% 20%'`.
- Nama file harus **persis sama** (huruf besar/kecil dan ekstensi). Hindari spasi, pakai strip: `toko-online.jpg`.
- File tidak ketemu = card kembali menampilkan tulisan, bukan rusak.

### Mengganti tulisan "Coming Soon" / "FHY" di card
Isi `label`, contoh `label: 'Segera Rilis'`. Dikosongkan (`''`) = otomatis `FHY` (kalau `ready: true`) atau `Coming Soon` (kalau `false`). Tulisan hanya tampil kalau `image` kosong.

### Menjadikan project "Tersedia"
Ubah `ready: false` jadi `ready: true`, lalu tambahkan:
```js
link: 'https://github.com/username/nama-repo',   // link luar atau halaman sendiri
linkText: 'Buka project',                         // tulisan tombol
```

### Menambah card
1. Salin satu blok `{ ... }` utuh.
2. Tempel di bawah blok terakhir. **Pastikan ada koma `,` setelah blok sebelumnya.**
3. Ganti `id` (misal `'007'`, harus unik), `title`, `image`, dst.

Card baru otomatis muncul di katalog, bisa dicari, difilter, dan disimpan.

### Tipe katalog (Website / Design)
Tombol kotak di atas pencarian dibuat dari `CATEGORIES` di `projects.js`:

```js
const CATEGORIES = ['Website', 'Design'];     // urutan di sini = urutan tombol
```

- Di tiap project, isi `category: 'Design'` atau `category: 'Website'` (huruf harus sama persis).
- Mau tipe baru? Tambahkan namanya: `['Website', 'Design', 'Aplikasi']`, lalu pakai `category: 'Aplikasi'`.
- Mau mengganti nama tipe? Ubah di `CATEGORIES` **dan** di `category:` semua project yang memakainya.
- Tipe yang tidak ditulis di `CATEGORIES` tapi dipakai project tetap muncul otomatis di akhir.

### Banner katalog (kotak panjang di atas, bisa digeser)
Diatur di `projects.js`, bagian `BANNERS`. Digeser dengan jari di HP, ditarik dengan mouse di laptop, atau pakai tombol panah dan titik. Otomatis bergeser tiap 5,5 detik (`BANNER_AUTOPLAY`, `0` = mati), berhenti saat kursor di atasnya atau disentuh.

```js
{ image: 'images/banner-1.jpg', imagePos: 'top', title: 'Judul', desc: 'Kalimat', link: 'index.html', linkText: 'Lihat' },
{ image: '', label: 'Koleksi 2026', title: 'Banner tulisan', desc: '...', link: '...', linkText: '...' },
```

- **Banner gambar** (`image` diisi): lebar gambar **ditekan pas selebar kotak**, tingginya **hanya bagian atas** yang diambil, jadi taruh bagian terpenting di atas. Ukuran bebas, disarankan landscape lebar (misal 1600 x 700). Gambar yang lebih pendek dari kotak otomatis diperbesar sampai menutup kotak. `imagePos: 'center'` atau `'bottom'` untuk mengambil bagian lain.
- `title` dan `desc` pada banner gambar opsional (tulisan di pojok kiri bawah). `link` opsional: banner jadi bisa diklik.
- **Banner tulisan** (`image: ''`): kotak hijau dengan huruf FHY. `tag` / `tagSmall` = kotak putih kecil di kanan bawah.
- Satu banner saja = tidak bisa digeser. Tinggi kotak mengikuti ukuran layar (HP lebih tinggi).

**Menambah banner baru (langkah singkat)**
1. Taruh gambarnya di folder `images/`, misal `promo.jpg` (hindari spasi, pakai strip).
2. Buka `projects.js`, cari `const BANNERS = [`.
3. Salin satu blok `{ ... }` banner gambar, tempel di bawah blok terakhir. **Pastikan ada koma `,` setelah blok sebelumnya.**
4. Ganti `image: 'images/promo.jpg'`, lalu isi `title` / `desc` / `link` kalau mau (boleh dikosongkan).
5. Simpan dan refresh. Urutan di daftar = urutan geser. Menghapus banner: hapus satu blok `{ ... }` sampai komanya.

**Banner lama (kotak hijau "Katalog project Fadhli") tetap ada** sebagai banner pertama, dan tulisannya bisa diubah di blok pertama `BANNERS`. Tidak mau dipakai? Hapus blok itu.

### Menghapus card
Hapus satu blok `{ ... }` sampai koma di ujungnya.

### Urutan card
Sama dengan urutan di daftar. **4 project pertama** juga tampil di bagian "Project" di `index.html`.

### Kalau halaman jadi kosong / aneh setelah edit
Hampir selalu karena koma atau tanda kutip. Cek: setiap blok `{ }` dipisah koma, setiap teks diapit `' '`, blok terakhir tidak perlu koma. Kalau teksmu mengandung tanda kutip tunggal (misal `Fadhli's`), tulis `\'` atau apit teks itu dengan tanda kutip ganda `" "`.

---

## 3. Popup gacha: RATE 0 (Secret), 1 sampai 5 + gyroscope

Card yang diklik muncul sebagai popup dengan **bentuk yang sama persis** dengan card di katalog. Animasinya ditentukan oleh `rate` di `projects.js`:

```js
{ id: '001', rate: 5, title: '...', ... }   // rate 0 sampai 5. Dihapus = otomatis 3 (rate: 0 = Secret, bukan kosong)
```

| Rate | Nama | Animasi |
|---|---|---|
| 0 | **Secret** | **Paling gila.** Awalnya tampak seperti tarikan 5 bintang kuning, lalu **glitch**, muncul jendela **SYSTEM ERROR** yang mengetik sendiri, layar merah **WARNING** dengan target yang mengunci kartu, **layar putih (flash)**, lalu kartu **berputar 7 kali sambil glitch**, mengecil sambil menyerap cahaya (partikel dan garis tersedot ke kartu), lalu membesar lagi memperlihatkan kartunya. Setelah selesai, **tiap beberapa detik kartu glitch: gambar hilang dan jadi tulisan ERROR sebentar**. Kartu holografik dengan banyak lapisan (cincin, heksagon, bintang, bayangan, RGB) yang bergeser berbeda-beda saat gyroscope. Di bawah kartu bintang diganti **?** dan tulisan **Secret**. Ketuk kartu = gambar keluar dari kartu seperti rate 5 |
| 1 | 1 Star | Kartu membalik sekali, cahaya abu-abu, sederhana |
| 2 | 2 Star | Berputar 2x, percikan kecil, cahaya tosca |
| 3 | 3 Star | Berputar 3x, kilatan + percikan, cahaya biru |
| 4 | 4 Star | Berputar 4x, energi emas berkumpul, gelombang kejut, layar bergetar |
| 5 | **5 Star** | **Animasi dan model khusus:** energi pelangi berkumpul, kartu bergetar, berputar 6x, pilar cahaya + 3 gelombang kejut + kilatan layar penuh + layar menghentak, sinar pelangi berputar, bintang melayang. Kartunya jadi **holografik**: bingkai pelangi bergerak, kilau foil + glitter yang mengikuti kemiringan, pita "5 Star", dan kartu melayang pelan. **Interaktif:** ketuk / klik kartu = gambar melompat keluar dari kartu, ketuk lagi = gambar keluar ke samping, ketuk lagi = kembali. Tiap ketukan juga ganti warna tema (pelangi, emas, tosca, ungu) |

Di bawah kartu muncul bintang rate (menyala satu per satu) dan namanya. Warna bingkai sisi belakang kartu juga mengikuti rate, jadi kelangkaan sudah terlihat sebelum kartu terbuka.

Fase rate 0 (glitch, error, meteor, buka) diatur di `script.js`, tabel `PHASES` (milidetik), tampilannya di `src/input.css` bagian SECRET (cari `data-phase`). Tulisan jendela error ada di `ERR_LINES`.

**Klik kartu saat berputar** = animasi dilewati. Selama berputar isi kartu tidak bisa diklik. Layar pendek: popup otomatis dikecilkan supaya muat (layar desktop yang besar sedikit diperbesar). Ditutup dengan tombol Tutup, klik area gelap, atau Esc.

### Gyroscope (setelah animasi selesai, semua rate)

| Perangkat | Yang terjadi |
|---|---|
| HP / tablet | Kartu ikut kemiringan HP (gyroscope), kilau bergeser mengikuti. Posisi netral = posisi HP saat kartu terbuka. Layar diputar (landscape) juga didukung |
| iPhone / iPad | Safari meminta izin "Gerakan & Orientasi" **sekali** saat kartu diketuk. Kalau ditolak, kartu bisa digeser dengan jari |
| Laptop / PC | Kartu ikut arah kursor |
| HP tanpa sensor | Geser kartu dengan jari |
| Perangkat ringan (CPU 4 inti atau kurang / RAM kecil) | Jumlah percikan dikurangi, glitter dan bintang melayang dimatikan |
| "Reduce motion" aktif | Tanpa animasi dan tanpa gerak |

Gyroscope di browser butuh alamat **HTTPS** (GitHub Pages sudah HTTPS). Kalau dibuka lewat `file://` di HP, sebagian browser memblokirnya, dan kartu otomatis memakai geser jari.

### Mengubah animasi

Tabel pengaturan tiap rate ada di `src/input.css`, bagian **TABEL RATE** (satu baris per rate):

| Mau | Ubah |
|---|---|
| Animasi lebih lama / cepat | `--dur` (detik). Tombol Tutup, bintang, dan efek lain ikut menyesuaikan |
| Jumlah putaran | `--turns` (bilangan bulat, minimal 1) |
| Warna cahaya dan bingkai belakang | `--glow` (R, G, B) |
| Kuat kilatan di kartu / di seluruh layar | `--flash` / `--ff` (0 sampai 1) |
| Kuat getaran layar | `--qa` (0 = tidak bergetar) |
| Jumlah percikan | `script.js`, tabel `RATES` (`sparks`) |
| Nama tiap rate | `script.js`, tabel `RATES` (`name`) |
| Seberapa miring kartu | `script.js`, `gyroMax` (urutan rate 0 sampai 5; baris pertama = HP, baris kedua = laptop) |
| Kepekaan gyroscope HP | `script.js`, `LIM` (30 = HP cukup dimiringkan 30 derajat; makin kecil makin peka) |
| Gerak lapisan di sekitar kartu | `src/input.css`, variabel `--d` (kedalaman) pada `.sl-*` |
| Tampilan kartu holografik rate 5 | `src/input.css`, bagian KARTU HOLOGRAFIK |

## 3b. Hero (bagian Home)

Hero berlatar gelap berlapis: aurora bergerak, lantai grid, jaring bintang yang mengejar kursor, dan cahaya yang mengikuti kursor. Nama muncul huruf demi huruf (huruf yang disentuh melompat), kata di bawah nama **diketik bergantian**, kartu profil yang membalik tetap ada di kanan dengan chip HTML / CSS / JavaScript yang mengorbit, jendela kode kecil, bintang berputar, dan dua pita berjalan yang bersilang di bawah. Kursor (laptop) atau kemiringan HP (Android) menggeser tiap lapisan dengan kedalaman berbeda.

| Mau ubah | Di mana |
|---|---|
| Kata yang diketik bergantian | `script.js`, `HERO_WORDS` (satu kata = tidak bergantian) |
| Nama, kalimat perkenalan, tombol | `index.html`, bagian Home |
| Isi jendela kode kecil | `index.html`, cari `hero-code` |
| Tulisan melingkar di bintang | `index.html`, cari `hero-sticker` |
| Kata di pita berjalan | `index.html`, cari `hero-marquee` (ubah di dua tempat per pita) |
| Chip yang mengorbit | `index.html`, cari `hero-chip` (isi `<span>`, sudut pada `--a`) |
| Seberapa jauh tiap lapisan bergeser | `style="--d:..."` pada elemen berkelas `px` |
| Warna, kecepatan, bentuk | `src/input.css`, bagian HERO |
| Jumlah bintang di jaring | `script.js`, `initHero` (`64`, dan `26` untuk perangkat ringan) |

"Reduce motion" aktif = semua animasi hero diam. Perangkat ringan memakai bintang lebih sedikit.

## 4. Teks di halaman utama

| Mau ubah | Lokasi |
|---|---|
| Sapaan, nama, kalimat perkenalan | `index.html`, bagian Home |
| Tabel Nama / Tinggal / Keluarga / Cita-cita | `script.js`, cari `About` |
| Skill, persen bar, dan **tag** (misal "Belajar") | `script.js`, cari `const skills`. Format: `['Nama', 'Keterangan', 85, 'Tag']`, bagian ke-4 (tag) opsional |
| Experience | `script.js`, cari `Experience` |
| Email dan GitHub | `index.html` bagian Contact, dan `const EMAIL` di baris pertama `script.js` |
| Judul kotak hijau katalog | `katalog.html`, bagian hero |

Intro huruf FHY hanya tampil sekali per sesi browser, tidak diulang saat pindah antara halaman utama dan katalog.

---

## 4b. Menambah skill dan tag

Di `script.js`, cari `const skills`. Satu skill = satu baris:

```js
['Tailwind', 'Sedang dipelajari.', 55, 'Belajar'],
//  nama      keterangan            %    tag (opsional)
```

- **Tambah skill:** tambah satu baris baru di dalam daftar (jangan lupa koma).
- **Tambah tag:** isi bagian ke-4, misal `'Belajar'`, `'Baru'`, `'Mahir'`. Teksnya bebas.
- **Hapus tag:** hapus bagian ke-4 (atau isi `''`).
- **Hapus skill:** hapus satu baris `[ ... ]` sampai komanya.

Contoh lain untuk About dan Experience ada di `CONTOH-KODE.txt`.

## 5. Warna dan font (tema Tailwind)

Ada di `src/input.css`, blok `@theme` (bagian atas). Ubah kode warna di sana, lalu `npm run build`. Contoh: `--color-pine: #0E6B70;` dipakai sebagai class `bg-pine`, `text-pine`, dst.

## Sebelum upload ke GitHub

Jalankan `npm run build` dulu, lalu upload semua isi folder termasuk `images/` dan `dist/` (folder `node_modules/` tidak perlu diupload, sudah ada di `.gitignore`). Ganti `email@kamu.com` dan `github.com/username` dengan milikmu.

---
## Update: Hero v2 + halaman tentang.html
- Hero (index.html, section #home): status, nama, teks perkenalan, 3 tombol, statistik, kartu profil + chip info, strip stack. Angka "Project dibuat" otomatis dari projects.js.
- tentang.html: halaman profil lengkap (cerita, cara kerja, skill, perjalanan, tools, tujuan, FAQ). Teks bertanda "UBAH" adalah draf, ganti dengan ceritamu.
- Menu atas punya link PROFIL (script.js, baris `const pages`).
- CSS baru ada di akhir src/input.css (bagian "HERO v2 + HALAMAN TENTANG") dan sudah ditambahkan ke dist/output.css. Jalankan `npm run build` sekali di komputermu untuk merapikan output.

---
## Update: palet baru + halaman data-diri.html
- **Palet baru (cetak riso):** krem kertas, tinta cokelat-hitam, merah bata, kobalt, kuning mentega. Nama class lama (`pine`, `gold`, `aqua`, `sun`, `paper`, `night`, dst) **dipertahankan supaya semua file tetap jalan**, tapi isinya sudah diganti (lihat blok `@theme` di `src/input.css`). Jadi `pine` sekarang merah bata, `gold` kobalt, `aqua` jingga koral (untuk mode gelap), `sun` kuning mentega. Popup gacha rate 0-5 tidak diubah efeknya, hanya warna dasarnya yang ikut tema.
- **`data-diri.html`** = berkas biodata (kartu pelajar miring, 9 bagian isian, riwayat, catatan tempel, kelengkapan berkas, tombol cetak / simpan PDF). Link-nya ada di menu atas (`DATA DIRI`, `const pages` di `script.js`).
- **Isi data = `data-diri.js`**, bukan HTML. Penjelasan format ada di komentar tiap bagian (cara mengisi, menambah, menghapus). Mulai dari `TGL_LAHIR` (umur, zodiak, hari lahir terhitung otomatis) dan baris yang masih `''` (tampil "belum diisi").
- Kalau sudah lengkap dan siap online, ubah `SEMBUNYIKAN_KOSONG = true` supaya isian yang masih kosong tidak tampil di publik.
- Gaya: `src/input.css`, bagian "HALAMAN DATA DIRI" (class `dd-`). Sudah ditambahkan juga ke `dist/output.css`, jadi bisa langsung dibuka. `npm run build` sekali di komputermu untuk merapikan.
- Klik satu isian di halaman = tersalin ke clipboard. Kartu pelajar mengambil foto dari `images/foto-profil.jpg`.

## Update: kulit "berkas" di semua halaman
- Satu gaya di **semua halaman** (index, katalog, tentang, data-diri): kertas krem + grain, garis tinta 1.5px, bayangan keras, sudut kiri-atas lancip seperti map, dan **tab kuning** di atas tiap bagian. Aturannya ada di `src/input.css`, bagian "KULIT BERKAS" (paling bawah). Hapus bagian itu = tampilan kembali ke gaya sebelumnya.
- **Card project** sekarang berupa map dengan tab "Berkas No. 001" (teksnya dibuat di `script.js`, cari `fd-tab`). Hover = card terangkat dan bayangan berubah merah.
- **Popup gacha**: animasi rate 0-5 tidak diubah. Kartu biasa (rate 1-4) ikut kulit map; kartu holografik (rate 5 dan Secret) tetap memakai bingkai holo-nya.
- Judul bagian di index diberi tab otomatis (A / Profil, B / Kemampuan, dst). Mau ganti tulisannya: cari `h2::before` di bagian KULIT BERKAS.
- Garis dan bayangan semua halaman memakai satu variabel `--ln`. Mau garis lebih tipis / bayangan lebih kecil, ubah `1.5px` dan `5px` di bagian itu.

## Update: intro tangan (loading)
- Di `index.html` (elemen `data-veil`) intro huruf FHY diganti animasi **tangan kiri membawa berkas, lalu tangan kanan menerimanya**. Tampil sekali per sesi browser, ketuk layar = lewati, "Reduce motion" = tidak tampil.
- Lama dan urutan gerak: `src/input.css`, bagian "INTRO TANGAN" (`--hv` = durasi, persen di `@keyframes hv-l / hv-r / hv-file` = waktu). Gambar tangan dan map ada di SVG pada `index.html`, tulisan di map ada di dua `<text>` dalam `hv-file`.

## Update: Home sampul map + card map + intro tangan di semua halaman
- **Home diganti total:** sampul minimalis (nomor arsip, nama dengan stabilo kuning, tabel isian bertitik, 2 tombol) dan **map profil** di kanan (kertas kartu pelajar naik saat di-hover / diketuk). Di bawahnya ada tab penanda A-E untuk loncat ke bagian. Efek lama (aurora, bintang, jendela kode, pita berjalan) dibuang. Teks: `index.html` bagian Home. Gaya: `src/input.css`, "HOME SAMPUL MAP".
- **Card project = map manila** dengan tab nomor, kertas gambar yang menyembul, dan klip. Hover: kertas naik. Card rate 5 / Secret tetap memakai bingkai holo. Warna map: `--mn` / `--mnd` di `article.fcard`.
- **Skill dan Experience** memakai latar buku tulis bergaris.
- **Intro tangan** sekarang ada di semua halaman (sekali per sesi), dengan tangan berjari. Lihat catatan "INTRO TANGAN" sebelumnya untuk mengatur gerak.

## Update: popup berkas (tanpa gacha) + nav tab
- **Popup project** sekarang: map biru muncul dari bawah layar, lalu berkas project keluar dari dalam map; Tutup membalik urutannya. Efek gambling (rate, bintang, glitch, holografik, gyroscope) **tidak dipakai lagi**, jadi `rate:` di `projects.js` boleh diabaikan / dihapus. Kodenya: `script.js` bagian paling bawah ("POPUP PROJECT = berkas"), gaya + waktu: `src/input.css` "POPUP BERKAS".
- **Nav = tab pembatas map.** Di `index.html`: tab bagian A-E lalu link halaman lain. Di halaman lain: tab `INDEX` (kembali ke sampul) di paling kiri. Ubah di `script.js`, `idxMenu` (bagian index) dan `pages` (halaman).
