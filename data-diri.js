/* ==========================================================================
   data-diri.js  |  ISI HALAMAN data-diri.html  (dimuat setelah script.js)
   --------------------------------------------------------------------------
   Semua isian ada di file ini. Isi dengan datamu sendiri, tidak perlu build Tailwind.
     TGL_LAHIR            tanggal lahir, umur + zodiak + hari lahir terhitung otomatis
     SEMBUNYIKAN_KOSONG   true = isian kosong disembunyikan (pakai ini kalau sudah online)
     BERKAS               semua bagian (A sampai J) dan isiannya
     CATATAN_TEMPEL       kertas kuning kecil di akhir halaman
     RIWAYAT              daftar perjalanan di akhir halaman
   Kartu pelajar di atas mengambil nama, panggilan, lahir, dan nomor arsip dari data di bawah.
   ========================================================================== */

/* ---------- PENGATURAN DASAR ----------
   TGL_LAHIR : format 'TAHUN-BULAN-TANGGAL', contoh '2009-04-17'. Kosong ('') = umur dan zodiak tidak tampil.
   SEMBUNYIKAN_KOSONG : false = isian kosong tampil sebagai "belum diisi" (enak untuk mengisi), true = hilang. */
const TGL_LAHIR = '';
const SEMBUNYIKAN_KOSONG = false;

/* ---------- ISI BERKAS ----------
   Satu bagian = satu blok { ... }.  Satu isian = satu baris :  ['Label kiri', 'Isi kanan']
   MENGISI    : tulis teks di antara tanda kutip kedua, contoh  ['Hobi', 'Menggambar dan ngoding'],
   KOSONG     : '' = tampil sebagai "belum diisi" (atau hilang kalau SEMBUNYIKAN_KOSONG = true)
   BANYAK ISI : pakai daftar, contoh  ['Makanan favorit', ['Nasi goreng', 'Mie ayam']],  muncul sebagai label kecil
   MENAMBAH   : tambah satu baris baru di dalam rows (jangan lupa koma)
   MENGHAPUS  : hapus satu baris [ ... ] sampai komanya
   BAGIAN BARU: salin satu blok { ... } utuh, ganti id (huruf kecil, tanpa spasi), kode, judul, dan rows
   Baris bertanda AUTO dihitung dari TGL_LAHIR, jangan diisi tangan. */
const BERKAS = [
  { id: 'identitas', kode: 'A', judul: 'Identitas', rows: [
    ['Nama lengkap', 'Muhammad Fadhli'],
    ['Nama panggilan', 'Fadhli'],
    ['Dikenal juga sebagai', 'DHLY'],
    ['Tempat lahir', 'Bekasi'],
    ['Tanggal lahir', '15 Juni 2010'],
    ['Umur', '16'],
    ['Hari lahir', 'Rahasia'],
    ['Kesukaan', 'Imajinasi'],
    ['Jenis kelamin', 'Lanang'],
    ['Agama', 'Islam'],
    ['Kewarganegaraan', 'Indonesia'],
    ['Golongan darah', '0'],
    ['Tinggi / berat', 'Secret']
  ] },
  { id: 'alamat', kode: 'B', judul: 'Alamat & kontak', rows: [
    ['Alamat', 'Regensi 2, Kec. Cibitung, Kab. Bekasi'],
    ['Provinsi', 'Jawa Barat'],
    ['Kode pos', 'lupa'],
    ['Email', 'fadhil1506@student.abudzar.sch.id'],
    ['WhatsApp', 'rahasia boy'],
    ['Instagram', 'rahasia boy'],
    ['GitHub', 'MuhFad15'],
    ['Cara terbaik dihubungi', 'Lewat form Contact di halaman utama']
  ] },
  { id: 'sekolah', kode: 'C', judul: 'Pendidikan', rows: [
    ['Sekolah sekarang', 'SMA Plus Abu Dzar'],
    ['Kelas', '10B'],
    ['Jurusan', '.'],
    ['Tahun masuk', '2026'],
    ['Pelajaran favorit', 'IT'],
    ['Ekskul / organisasi', '.'],
    ['SMP', 'Baitul Ilmi'],
    ['SD', 'Baitul Ilmi'],
    ['Belajar mandiri', ['HTML', 'CSS', 'Tailwind CSS', 'Figma']]
  ] },
  { id: 'keluarga', kode: 'D', judul: 'Keluarga & lingkungan', rows: [
    ['Tinggal bersama', 'Orang tua'],
    ['Anak ke', '1'],
    ['Saudara', '3'],
    ['Hewan peliharaan', 'Belum punya'],
    ['Kota yang ingin dikunjungi', 'Makkah']
  ] },
  { id: 'suka', kode: 'E', judul: 'Kesukaan', rows: [
    ['Makanan', 'Yg penting makan'],
    ['Minuman', 'Yg penting minum'],
    ['Warna', 'Semua'],
    ['Film / serial', 'Belum ada'],
    ['Game', 'Minecraft'],
    ['Olahraga', 'Bulu Tangkis'],
    ['Tidak suka', 'Berbuat maksiat']
  ] },
  { id: 'kebiasaan', kode: 'F', judul: 'Kebiasaan', rows: [
    ['Jam paling produktif', 'Pagi ampe siang'],
    ['Teman ngoding', 'Blum ada'],
    ['Cara belajar', 'Coba dulu, salah, perbaiki, ulangi'],
    ['Prinsip di tiap project', 'Struktur dulu, nyaman di HP, rapikan detail kecil'],
    ['Kelemahan', 'Secret bro'],
    ['Kekuatan', 'Selalu ada ide baru']
  ] },
  { id: 'alat', kode: 'G', judul: 'Perangkat & alat', rows: [
    ['Laptop / PC', 'Loq essentials'],
    ['HP', 'Blum punya'],
    ['Editor kode', '.'],
    ['Browser', 'Edge'],
    ['Alat sehari-hari', ['HTML5', 'CSS3', 'Tailwind CLI', 'npm', 'Vercel']]
  ] },
  { id: 'bahasa', kode: 'H', judul: 'Bahasa', rows: [
    ['Sehari-hari', 'Indonesia'],
    ['Daerah', 'Jawa'],
    ['Asing', 'Blum']
  ] },
  { id: 'target', kode: 'I', judul: 'Target', rows: [
    ['Cita-cita', 'Developer web dan game'],
    ['Sedang dipelajari', ['Tailwind CSS', 'Figma']],
    ['Jangka pendek', 'Menguasai JavaScript dan Tailwind'],
    ['Jangka menengah', 'Mengerjakan project nyata untuk orang lain'],
    ['Jangka panjang', 'Membuat sesuatu yang dipakai dan dinikmati banyak orang']
  ] }
];

/* ---------- CATATAN TEMPEL (kertas kuning kecil) ----------
   Satu catatan = satu baris teks. Kosongkan ('') kalau mau jadi kertas "tulis di sini".
   MENAMBAH : tambah baris baru (koma di ujung)  |  MENGHAPUS : hapus barisnya  |  Miringnya diatur otomatis */
const CATATAN_TEMPEL = [
  'Masih tahap belajar, dan tidak ditutup-tutupi.',
  'Tiap project dianggap latihan serius.',
  'Cek tampilan di layar HP dulu, baru laptop.',
  'Apa kek dah gedhe'
];

/* ---------- RIWAYAT (daftar perjalanan) ----------
   Format satu baris :  ['Penanda', 'Judul', 'Keterangan singkat']
   Penanda bebas: tahun, "Awal", "Sekarang". Urutan di sini = urutan tampil. */
const RIWAYAT = [
  ['Awal', 'Mengenal HTML dan CSS', 'Heading, gambar, link, lalu mulai mengatur warna dan tata letak.'],
  ['Lanjut', 'Belajar Tailwind CSS', 'Pindah ke class utility, jauh lebih cepat untuk bereksperimen.'],
  ['Sekarang', 'Sekolah dan membangun portofolio', 'HTML, Tailwind CLI, dan JavaScript di SMA Plus Abu Dzar.'],
  ['Nanti', 'Project nyata dan game', 'Menggarap sesuatu yang dipakai orang lain, lalu menjajal game development.']
];

/* ==========================================================================
   MESIN RENDER (bagian bawah ini tidak perlu diubah)
   ========================================================================== */
(function () {
  const body = $('#dd-body');
  if (!body) return;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const tgl = TGL_LAHIR ? new Date(TGL_LAHIR + 'T00:00:00') : null;

  /* nilai AUTO: dihitung dari tanggal lahir dan EMAIL di script.js */
  const zod = [[1,20,'Capricorn'],[2,19,'Aquarius'],[3,21,'Pisces'],[4,20,'Aries'],[5,21,'Taurus'],[6,21,'Gemini'],[7,23,'Cancer'],[8,23,'Leo'],[9,23,'Virgo'],[10,23,'Libra'],[11,22,'Scorpio'],[12,22,'Sagittarius']];
  const auto = {
    tgl: () => tgl ? tgl.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '',
    hari: () => tgl ? tgl.toLocaleDateString('id-ID', { weekday: 'long' }) : '',
    umur: () => { if (!tgl) return ''; const n = new Date(); let u = n.getFullYear() - tgl.getFullYear(); if (n < new Date(n.getFullYear(), tgl.getMonth(), tgl.getDate())) u--; return u + ' tahun'; },
    zodiak: () => { if (!tgl) return ''; const m = tgl.getMonth() + 1, d = tgl.getDate(); return (zod.find(z => m < z[0] || (m === z[0] && d < z[1])) || zod[0])[2]; },
    email: () => (typeof EMAIL !== 'undefined' && EMAIL !== 'email@kamu.com') ? EMAIL : ''
  };
  const nilai = v => (typeof v === 'string' && v.startsWith('AUTO:')) ? auto[v.slice(5)]() : v;

  /* hitung kelengkapan, lalu buat HTML tiap bagian */
  let isi = 0, total = 0, i = 0;
  const baris = ([l, raw]) => {
    const v = nilai(raw), ada = Array.isArray(v) ? v.length > 0 : String(v).trim() !== '';
    total++; if (ada) isi++;
    if (!ada && SEMBUNYIKAN_KOSONG) return '';
    const dd = !ada ? '<span class="dd-kosong">belum diisi</span>' : Array.isArray(v) ? v.map(t => `<span class="dd-chip">${esc(t)}</span>`).join('') : esc(v);
    return `<div class="dd-r${ada ? '' : ' k'}" style="--i:${i++ % 12}"><dt>${esc(l)}</dt><dd${ada ? ' data-copy="' + esc(Array.isArray(v) ? v.join(', ') : v) + '"' : ''}>${dd}</dd></div>`;
  };
  const bagian = BERKAS.map((s, n) => {
    const rows = s.rows.map(baris).join('');
    return rows ? `<section class="dd-sec dd-rv" id="${s.id}" style="--t:${n % 2 ? '.35deg' : '-.35deg'}"><span class="dd-tab">${s.kode} <i>/</i> ${esc(s.judul)}</span><dl>${rows}</dl></section>` : '';
  }).join('');

  const notes = CATATAN_TEMPEL.map((t, n) => `<p class="dd-note${t ? '' : ' k'}" style="--t:${[-2.4, 1.8, -1, 2.6][n % 4]}deg">${t ? esc(t) : 'tulis fakta uniknya di sini'}</p>`).join('');
  const log = RIWAYAT.map(([a, b, c]) => `<li><span>${esc(a)}</span><div><b>${esc(b)}</b><p>${esc(c)}</p></div></li>`).join('');
  body.innerHTML = bagian
    + `<section class="dd-sec dd-rv" id="riwayat"><span class="dd-tab">J <i>/</i> Riwayat</span><ol class="dd-log">${log}</ol></section>`
    + (CATATAN_TEMPEL.length ? `<section class="dd-sec dd-rv" id="catatan"><span class="dd-tab">K <i>/</i> Catatan tempel</span><div class="dd-notes">${notes}</div></section>` : '');

  /* daftar isi di samping (menyala sesuai bagian yang sedang dibaca) */
  const ids = [...BERKAS.map(s => [s.id, s.kode, s.judul]), ['riwayat', 'J', 'Riwayat'], ['catatan', 'K', 'Catatan tempel']].filter(([id]) => $('#' + id));
  $('#dd-index').innerHTML = ids.map(([id, k, j]) => `<a href="#${id}"><b>${k}</b>${esc(j)}</a>`).join('');
  const links = $$('#dd-index a');
  const spy = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(a => a.dataset.on = a.getAttribute('href') === '#' + e.target.id); }), { rootMargin: '-35% 0px -60% 0px' });
  ids.forEach(([id]) => spy.observe($('#' + id)));

  /* kartu pelajar + MRZ (dua baris kode di bawah kartu, seperti paspor) */
  const nama = BERKAS[0].rows[0][1], pang = BERKAS[0].rows[1][1], th = new Date().getFullYear();
  const pad = s => (s + '<'.repeat(30)).slice(0, 30);
  const kata = nama.toUpperCase().split(/\s+/), mrz = pad('P<IDN' + kata.slice(-1) + '<<' + kata.slice(0, -1).join('<')) + '\n' + pad('FHY' + String(th) + '<' + String(nama.length * 7919).padStart(5, '0'));
  const f = { nama, panggilan: pang, lahir: tgl ? auto.tgl() : '—', arsip: 'FHY-' + th + '-001', mrz };
  $$('[data-f]').forEach(e => e.textContent = f[e.dataset.f]);
  $('#dd-tahun').textContent = th;

  /* meter kelengkapan */
  const p = total ? Math.round(isi / total * 100) : 0;
  if (SEMBUNYIKAN_KOSONG) $('#dd-meter').hidden = true;
  $('#dd-pct').textContent = p + '%'; $('#dd-bar').style.width = p + '%';

  /* muncul pelan saat discroll (sama seperti .rv di script.js, tapi untuk bagian yang dibuat lewat JS) */
  const rv = $$('.dd-rv');
  if (!('IntersectionObserver' in window) || calm()) rv.forEach(e => e.classList.add('in'));
  else { const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .08 }); rv.forEach(e => io.observe(e)); }

  /* klik isian = salin */
  const toast = $('#dd-toast'); let tm;
  body.addEventListener('click', e => {
    const d = e.target.closest('[data-copy]'); if (!d) return;
    (navigator.clipboard ? navigator.clipboard.writeText(d.dataset.copy) : Promise.reject()).catch(() => {}).finally(() => {
      toast.textContent = 'Tersalin: ' + d.dataset.copy; toast.dataset.on = 'true'; clearTimeout(tm); tm = setTimeout(() => toast.dataset.on = 'false', 1800);
    });
  });

  /* kartu miring mengikuti kursor (hanya perangkat dengan kursor, mati kalau "reduce motion") */
  const id = $('#dd-id');
  if (id && matchMedia('(hover:hover)').matches && !calm()) {
    id.parentNode.addEventListener('pointermove', e => { const r = id.getBoundingClientRect(); id.style.setProperty('--ry', ((e.clientX - r.left) / r.width - .5) * 14 + 'deg'); id.style.setProperty('--rx', (.5 - (e.clientY - r.top) / r.height) * 12 + 'deg'); id.style.setProperty('--hx', (e.clientX - r.left) / r.width * 100 + '%'); });
    id.parentNode.addEventListener('pointerleave', () => { id.style.setProperty('--rx', '0deg'); id.style.setProperty('--ry', '0deg'); });
  }
  $('#dd-print').onclick = () => window.print();
})();
