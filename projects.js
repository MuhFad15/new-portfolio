/* Dimuat oleh index.html dan katalog.html SEBELUM script.js. Jangan ganti urutannya.
   File ini hanya berisi DATA. Kalau ada error setelah mengedit, hampir selalu karena koma / tanda kutip. */

/* ==================================================================
   DAFTAR PROJECT  —  SEMUA CARD PROJECT DIATUR DI SINI
   ==================================================================
   Setiap project = satu blok { ... }. Urutan di daftar = urutan card di halaman.
   (4 project pertama juga tampil di bagian "Project" di index.html. Sisanya hanya di katalog.html.)

   MENGGANTI GAMBAR   : taruh gambarnya di folder images/, lalu isi  image: 'images/nama-file.jpg'
                        Landscape / portrait / kotak semua boleh, otomatis memenuhi card dan tidak gepeng.
                        Kalau image dikosongkan ('') atau file tidak ketemu, yang tampil tulisan (lihat label).
   MENGGANTI TULISAN  : label: 'Teks' = tulisan besar di tengah card saat belum ada gambar.
                        Kosongkan ('') = otomatis "FHY" (kalau ready: true) atau "Coming Soon" (kalau false).
   GAMBAR TERPOTONG?  : atur imagePos: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'left top' | '30% 20%'
   MENAMBAH CARD      : salin satu blok, tempel di bawah blok terakhir (jangan lupa koma setelah })
                        lalu ganti id (harus unik), title, dst.
   MENGHAPUS CARD     : hapus satu blok { ... }, sampai koma di ujungnya.
   rate               : 1 sampai 5 = tingkat kelangkaan card, menentukan animasi popup saat card diklik.
                        1 Star      : membalik sekali, sederhana
                        2 Star      : berputar 2x, percikan kecil
                        3 Star      : berputar 3x, kilatan + percikan
                        4 Star      : berputar 4x, gelombang kejut + layar bergetar
                        5 Star      : ANIMASI & MODEL KHUSUS (energi berkumpul, pilar cahaya, kartu holografik, ketuk kartu = ganti tema)
                        Setelah animasi selesai, semua rate bisa digerakkan dengan gyroscope (HP) / kursor (laptop).
                        Kalau rate dihapus = otomatis 3.
   ready              : true = status "Tersedia" (tombol buka project); false = "Coming Soon" (tombol simpan)
   category           : TIPE project di katalog. Pilih salah satu dari daftar CATEGORIES di bawah ('Website' atau 'Design').
                        Nama baru yang tidak ada di CATEGORIES tetap jalan (tombolnya muncul otomatis di akhir).
   link / linkText    : tujuan & tulisan tombol saat ready: true. Boleh halaman sendiri ('index.html')
                        atau link luar ('https://...'). Kalau link dihapus, tombol menuju index.html.
   ================================================================== */
/* ==================================================================
   TIPE KATALOG  —  tombol kotak di atas pencarian (Semua, Website, Design, Tersimpan)
   ==================================================================
   Ubah / tambah / hapus tipe di sini. Urutan di daftar = urutan tombol.
   Lalu di tiap project isi  category: 'NamaTipe'  (harus sama persis, huruf besar/kecil berpengaruh).
   Ikon tombol: 'Website' dan 'Design' sudah punya ikon sendiri, tipe baru memakai ikon label umum.
   Contoh menambah tipe:  const CATEGORIES = ['Website', 'Design', 'Aplikasi'];
   ================================================================== */
const CATEGORIES = ['Website', 'Design'];

/* ==================================================================
   BANNER KATALOG  —  kotak persegi panjang di paling atas halaman katalog (bisa digeser seperti banner toko online)
   ==================================================================
   Satu banner = satu blok { ... }. Urutan = urutan geser. Satu banner saja = tidak bisa digeser.
   Ada 2 jenis, ditentukan oleh isi image:

   1) BANNER GAMBAR  (image diisi, contoh  image: 'images/banner-1.jpg')
        - Lebar gambar DITEKAN pas selebar kotak, lalu tingginya yang diambil hanya bagian ATAS.
          Jadi taruh bagian terpenting gambar di atas. (Gambar yang terlalu pendek otomatis diperbesar sampai menutup kotak.)
        - Ukuran bebas. Disarankan landscape lebar, misal 1600 x 700 piksel.
        - Mau bagian lain yang diambil?  imagePos: 'center' atau 'bottom'  (bawaan 'top').
        - title / desc (boleh dikosongkan) = tulisan di atas gambar, di pojok kiri bawah.
        - link (boleh dikosongkan) = banner bisa diklik menuju alamat itu. linkText = tulisan tombol (kalau title / desc diisi).
   2) BANNER TULISAN  (image dikosongkan '')
        - Kotak hijau dengan tulisan besar dan huruf FHY, seperti tampilan awal.
        - label = tulisan kecil di atas judul, title = judul, desc = kalimat, link / linkText = tombol.
        - tag / tagSmall = kotak putih kecil di pojok kanan bawah (hanya terlihat di layar lebar). Kosongkan ('') untuk menghilangkannya.

   MENAMBAH BANNER   : (1) taruh gambar di folder images/  (2) salin satu blok { ... } di bawah, tempel setelah blok terakhir
                        (jangan lupa koma ,)  (3) ganti image: 'images/namafile.jpg' dan isi title / desc / link bila perlu.
                        MENGHAPUS: hapus satu blok { ... } sampai komanya.
   Banner pertama (kotak hijau "Katalog project Fadhli") adalah banner lama yang dipertahankan.

   Banner otomatis bergeser tiap beberapa detik (berhenti saat kursor di atasnya / disentuh).
   Waktu geser otomatis (milidetik, 0 = mati):  const BANNER_AUTOPLAY = 5500;
   ================================================================== */
const BANNER_AUTOPLAY = 5500;
const BANNERS = [
  {
    image: '',
    label: 'Koleksi 2026',
    title: 'Katalog project Fadhli',
    desc: 'Website dan desain yang sedang dan akan saya buat. Satu sudah tersedia, sisanya segera hadir.',
    link: 'index.html',
    linkText: 'Lihat portofolio',
    tagSmall: 'No. 001',
    tag: 'Portofolio Pribadi'
  },
  {
    image: './images/oldportfolio',
    imagePos: 'top',
    title: 'Old Portofolio',
    desc: 'Ini adalah portofolio web lamaku. Web ini terbilang kurang bagus karena designya',
    link: 'https://muhfad15.github.io/Portofolio/',
    linkText: 'Lihat'
  }
];

const PROJECTS = [
  {
    id: '001',
    rate: 5,
    title: 'Portofolio Pribadi',
    category: 'Website',
    ready: true,
    image: '',
    imagePos: 'center',
    label: '',
    link: 'index.html',
    linkText: 'Lihat portofolio',
    desc: 'Website yang sedang kamu lihat. Dibuat dengan HTML dan Tailwind CSS, responsif, dan punya mode gelap.',
    tools: 'HTML, Tailwind CSS'
  },
  {
    id: '002',
    rate: 4,
    title: 'Website Old Portofolio',
    category: 'Website',
    ready: true,
    image: './images/portfolio.webp',
    imagePos: 'center',
    label: '',
    link: 'https://muhfad15.github.io/Portofolio/',
    linktext: 'Lihat',
    desc: 'Ini adalah web portofolio lamaku.',
    tools: 'HTML, CSS'
  },
  {
    id: '004',
    rate: 4,
    title: 'Desain Poster',
    category: 'Design',
    ready: false,
    image: '',
    imagePos: 'center',
    label: '',
    desc: 'Poster dengan komposisi dan warna yang rapi, dibuat untuk melatih mata desain.',
    tools: 'Belum ditentukan'
  },
  {
    id: '005',
    rate: 1,
    title: 'Aplikasi Web',
    category: 'Website',
    ready: false,
    image: '',
    imagePos: 'center',
    label: '',
    desc: 'Aplikasi web dengan fitur interaktif.',
    tools: 'HTML, Tailwind CSS, JavaScript'
  },
  {
    id: '006',
    rate: 4,
    title: 'Desain Logo',
    category: 'Design',
    ready: false,
    image: '',
    imagePos: 'center',
    label: '',
    desc: 'Logo sederhana dengan identitas yang mudah diingat.',
    tools: 'Belum ditentukan'
  }
];
