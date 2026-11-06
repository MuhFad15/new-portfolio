/* ==========================================================================
   script.js  |  dipakai bersama oleh index.html dan katalog.html
   --------------------------------------------------------------------------
   PETA FILE INI (cari tulisan di dalam tanda kutip dengan Ctrl+F)
     const EMAIL                          email tujuan form Contact (baris di bawah komentar ini)
     const menu                           daftar menu di navigasi atas ("Navigasi")
     "ISI ABOUT / SKILL / EXPERIENCE"     tabel About, daftar Skill (+ tag), daftar Experience
     "const RATES"                        nama dan jumlah percikan tiap rate 0-5 popup project
     "initBanner"                         banner katalog yang bisa digeser (isinya dari projects.js)
     "HERO_WORDS"                         kata yang diketik bergantian di bawah nama (Home)
     "initHero"                           animasi hero Home: huruf nama, jaring bintang, parallax kursor / gyroscope
   YANG TIDAK ADA DI SINI (ubah di tempat lain)
     - Card project, tipe katalog, banner, rate  -> projects.js
     - Warna, font, animasi popup                -> src/input.css
     - Teks Home, judul About, kontak            -> index.html
   Contoh kode siap salin untuk semua itu: CONTOH-KODE.txt
   ========================================================================== */
const EMAIL = 'email@kamu.com';

/* Kata yang diketik bergantian di bawah nama di Home. Tambah / ubah / hapus bebas, tiap kata dalam tanda kutip dan dipisah koma.
   Cuma satu kata = tidak bergantian, hanya diketik sekali. */
const HERO_WORDS = ['Student in Abu Dzar', 'Web Developer', 'Future Game Developer'];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const store = { get(k){ try { return localStorage.getItem(k) } catch (e) { return null } }, set(k, v){ try { localStorage.setItem(k, v) } catch (e) {} } };

/* Halaman mana yang sedang dibuka? (katalog.html punya elemen #grid) */
const onCatalog = !!$('#grid');
const onAbout = !!$('#about-page');   // tentang.html
const home = (onCatalog || onAbout) ? 'index.html' : '';   // awalan link menu: dari katalog, menu menuju index.html#...

/* Navigasi */
/* Menu atas. Tulisan harus sama dengan id section di index.html (HOME = id="home", dst). Hapus satu kata = menu itu hilang. */
/* NAV UTAMA = sama di SEMUA halaman: ['TULISAN', 'file.html'], urutan di sini = urutan tab.
   NAV BAGIAN (#subnav) = baris kedua KHUSUS index.html, untuk loncat antar bagian halaman:
   ['huruf', 'TULISAN', 'id section di index.html']. Hapus satu baris = tab itu hilang. */
const idxMenu = [['A', 'TENTANG', 'about'], ['B', 'KEMAMPUAN', 'skill'], ['C', 'PROJECT', 'project'], ['D', 'PENGALAMAN', 'experience'], ['E', 'KONTAK', 'contact']];
const pages = [['INDEX', 'index.html'], ['PROFIL', 'tentang.html'], ['DATA DIRI', 'data-diri.html'], ['KATALOG', 'katalog.html']];
const cur = location.pathname.split('/').pop() || 'index.html';
$('#nav').innerHTML = pages.map(([t, h]) => `<li><a href="${h}" class="nv"${h === cur ? ' data-active="true" aria-current="page"' : ''}>${t}</a></li>`).join('');
$('#mobile').innerHTML = pages.map(([t, h]) => `<li><a href="${h}" class="block py-3 text-sm font-semibold tracking-wider"${h === cur ? ' aria-current="page"' : ''}>${t}</a></li>`).join('');
const burger = $('#burger'), mob = $('#mobile');
burger.onclick = () => { const h = mob.classList.toggle('hidden'); burger.setAttribute('aria-expanded', !h); };
$$('#mobile a').forEach(a => a.onclick = () => { mob.classList.add('hidden'); burger.setAttribute('aria-expanded', 'false'); });
const subnav = $('#subnavList');
if (subnav) {
  subnav.innerHTML = idxMenu.map(([k, t, id]) => `<a href="#${id}"><b>${k}</b>${t}</a>`).join('');
  const links = $$('#subnavList a');
  const spy = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(l => l.dataset.active = l.getAttribute('href') === '#' + e.target.id); }), { rootMargin: '-45% 0px -50% 0px' });
  $$('main section').forEach(s => spy.observe(s));
}
if ($('#theme')) $('#theme').onclick = () => { const d = document.documentElement.classList.toggle('dark'); store.set('theme', d ? 'dark' : 'light'); };

/* Kartu profil di home: ketuk / Enter untuk membalik (di desktop cukup hover) */
const flip = $('#flip');
if (flip) {
  const toggleFlip = () => flip.dataset.flip = flip.dataset.flip !== 'true';
  flip.onclick = toggleFlip;
  flip.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFlip(); } };
}

/* ==========================================================================
   ISI ABOUT / SKILL / EXPERIENCE  (hanya dipakai di index.html)
   --------------------------------------------------------------------------
   ATURAN UMUM (berlaku untuk ketiganya)
     - Satu baris data = satu pasang kurung siku  [ ... ]
     - Isi teks selalu diapit tanda kutip ' '
     - Antar baris dipisah koma  ,   (baris terakhir tidak wajib koma)
     - Teks yang mengandung tanda kutip tunggal (misal Fadhli's) tulis  \'  atau apit dengan " "
     - Urutan di daftar = urutan tampil di halaman
     - Halaman kosong / error setelah mengedit? 99% karena koma atau tanda kutip kurang. Cek baris yang baru kamu ubah.
   Contoh siap salin untuk semuanya ada di file CONTOH-KODE.txt
   ========================================================================== */
if ($('#spec')) {

  /* ---------- ABOUT (tabel Nama / Tinggal / Keluarga / Cita-cita) ----------
     Format satu baris :  ['Judul kiri', 'Isi kanan']
     MENAMBAH  : tambah satu baris baru di dalam daftar, contoh  ['Hobi','Ngoding dan desain'],
     MENGHAPUS : hapus satu baris [ ... ] sampai komanya
     MENGUBAH  : ganti teks di dalam tanda kutip */
  const about = [
    ['Nama', 'Muhammad Fadhli'],
    ['Tinggal', 'Regensi 2, Kec. Cibitung, Kab. Bekasi'],
    ['Keluarga', 'Tinggal bersama orang tua, dan merasa bahagia'],
    ['Cita-cita', 'Menjadi developer, entah game maupun web']
  ];
  const line = 'grid grid-cols-[6.5rem_1fr] gap-4 border-b border-mist py-4 last:border-b-0 dark:border-edge';
  $('#spec').innerHTML = about.map(([a, b]) => `<div class="${line}"><dt class="text-sage dark:text-fog">${a}</dt><dd class="font-medium">${b}</dd></div>`).join('');

  /* ---------- SKILL (kartu dengan bar persen) ----------
     Format satu baris :  ['Nama', 'Keterangan singkat', angka 0-100, 'Tag (boleh dihilangkan)']
                           1       2                    3            4
       1 Nama        : judul skill
       2 Keterangan  : kalimat kecil di bawah judul
       3 Angka       : panjang bar. 0 = kosong, 100 = penuh. TANPA tanda kutip
       4 Tag         : label kecil kuning di sebelah nama, misal 'Belajar', 'Baru', 'Mahir'.
                       Mau tanpa tag? hapus bagian ke-4 (dan koma sebelumnya), atau isi ''.
     MENAMBAH SKILL : tambah satu baris baru, contoh   ['JavaScript', 'Membuat halaman jadi interaktif.', 40, 'Belajar'],
     MENAMBAH TAG   : tambahkan teks tag sebagai bagian ke-4 di baris skill itu
     MENGHAPUS TAG  : hapus bagian ke-4 (atau ubah jadi '')
     MENGHAPUS SKILL: hapus satu baris [ ... ] sampai komanya
     Nama skill bebas, tidak harus bahasa pemrograman (contoh: 'Great Idea'). Tag dengan teks apa saja akan tampil. */
  const skills = [
    ['HTML', 'Menyusun struktur halaman.', 85],
    ['CSS', 'Mengatur tampilan dan tata letak.', 80],
    ['Tailwind', 'Sedang dipelajari.', 55, 'Belajar'],
    ['Figma', 'Lagi Study.', 60]
  ];
  const tagOf = t => t ? ` <span class="ml-1 rounded-full bg-gold px-2 py-0.5 align-middle text-xs font-semibold text-night dark:bg-sun">${esc(t)}</span>` : '';
  $('#skills').innerHTML = skills.map(([n, d, v, tag]) => `<div class="rounded-2xl border border-mist bg-paper p-5 dark:border-edge dark:bg-night"><div class="flex items-baseline justify-between"><h3 class="font-display text-lg font-bold">${esc(n)}${tagOf(tag)}</h3><span class="text-sm text-sage dark:text-fog">${v}%</span></div><p class="text-sm text-sage dark:text-fog">${esc(d)}</p><div class="mt-3 h-2 rounded-full bg-mist dark:bg-edge"><div class="bar h-full w-0 rounded-full bg-pine transition-[width] duration-1000 ease-out motion-reduce:transition-none dark:bg-aqua" data-w="${v}"></div></div></div>`).join('');
  new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { $$('.bar').forEach(b => b.style.width = b.dataset.w + '%'); o.disconnect(); } }), { threshold: .3 }).observe($('#skills'));

  /* ---------- EXPERIENCE (daftar pengalaman) ----------
     Format satu baris :  ['Waktu', 'Judul', 'Keterangan']
     Waktu bebas: 'Sekarang', '2025', 'Jan 2026', '2024 - 2025'
     MENAMBAH  : tambah satu baris baru, contoh  ['2026','Membuat portofolio','Dibuat dengan HTML dan Tailwind CSS.'],
     MENGHAPUS : hapus satu baris [ ... ] sampai komanya */
  const exp = [
    ['Sekarang', 'Siswa SMA Plus Abu Dzar', 'Belajar di sekolah sambil mengembangkan kemampuan web.'],
    ['Sekarang', 'Belajar Tailwind CSS', 'Membuat tampilan website langsung dengan class utility.'],
    ['Sebelumnya', 'Belajar HTML dan CSS', 'Dasar membuat halaman website.']
  ];
  $('#exp').innerHTML = exp.map(([y, t, d]) => `<div class="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-mist py-5 last:border-b-0 dark:border-edge"><p class="text-sm font-semibold text-gold dark:text-sun">${y}</p><div><h3 class="font-display text-lg font-bold">${t}</h3><p class="mt-1 text-sage dark:text-fog">${d}</p></div></div>`).join('');
}

/* ==========================================================================
   CARD PROJECT, POPUP, FILTER  (datanya dari projects.js)
   ========================================================================== */
const items = PROJECTS;
let saved = new Set(JSON.parse(store.get('saved') || '[]'));
const heart = on => `<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" fill-opacity="${on ? 1 : 0}" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-4.6-9.3-9A5.4 5.4 0 0 1 12 6a5.4 5.4 0 0 1 9.3 6c-2.3 4.4-9.3 9-9.3 9z"/></svg>`;
const bg = ok => ok ? 'bg-pine dark:bg-[#2A2018]' : 'bg-[#cacacb]';

/* Isi gambar card: tulisan (cadangan) + gambar yang menutup penuh. Tulisan hilang sendiri setelah gambar termuat. */
const labelOf = p => p.label || (p.ready ? 'FHY' : 'Coming Soon');
const holder = p => p.ready
  ? `<span class="font-display text-5xl font-extrabold text-sun">${esc(labelOf(p))}</span>`
  : `<span class="px-2 text-center font-mont text-xl font-bold text-[#3d4654]">${esc(labelOf(p))}</span>`;
const media = (p, zoom) => `<span class="absolute inset-0 grid place-items-center">${holder(p)}</span>` + (p.image
  ? `<img src="${esc(p.image)}" alt="" draggable="false" onload="this.previousElementSibling.remove()" onerror="this.remove()" class="absolute inset-0 h-full w-full object-cover ${zoom ? 'transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none' : ''}" style="object-position:${esc(p.imagePos || 'center')}">`
  : '');
const linkBtn = (p, cls, close) => { const h = p.link || 'index.html'; return `<a href="${esc(h)}" ${/^https?:\/\//i.test(h) ? 'target="_blank" rel="noopener"' : ''} ${close ? 'data-close' : ''} class="${cls}">${esc(p.linkText || 'Lihat project')}</a>`; };

/* Rate 0-5 dibaca dari projects.js (rate: 3). 0 = SECRET. Kosong / salah isi = 3. */
const rateOf = p => {
  if (p.rate === undefined || p.rate === null || p.rate === '') return 3;
  const n = Math.round(Number(p.rate));
  return Number.isNaN(n) ? 3 : Math.min(5, Math.max(0, n));
};

/* Satu-satunya bentuk card. mode: 'grid' (katalog), 'teaser' (home, ringkas), 'popup' (di dalam popup, bentuk SAMA)
   Khusus popup dengan rate 5: card dibungkus bingkai holografik + lapisan kilau (lihat .holo-* di src/input.css). */
function card(p, mode = 'grid') {
  const on = saved.has(p.id), ok = p.ready, compact = mode === 'teaser', pop = mode === 'popup';
  const rt = -1, sec = false, holo = false;   // efek rate / holografik dihapus   // rate 5 dan Secret memakai kartu holografik
  const chip = ok ? (holo ? 'bg-aqua/15 text-aqua' : 'bg-pine/10 text-pine dark:bg-aqua/15 dark:text-aqua') : (holo ? 'bg-edge text-fog' : 'bg-mist text-sage dark:bg-edge dark:text-fog');
  const saveCls = holo ? 'border-frost text-frost aria-pressed:text-night' : 'border-ink dark:border-frost dark:aria-pressed:border-sun dark:aria-pressed:bg-sun';
  const html = `<article class="${holo ? '' : 'fcard '}group relative flex flex-col rounded-3xl border border-mist bg-white p-3 transition hover:border-gold hover:shadow-xl hover:shadow-pine/10 dark:border-edge dark:bg-panel dark:hover:border-sun ${pop ? 'shadow-2xl' : ''}">
  <span class="fd-tab">No. ${esc(p.id)}</span>
  ${holo ? '<div class="holo-slot">' : ''}<div class="relative aspect-[4/5] overflow-hidden rounded-2xl ${bg(ok)} ${holo ? 'holo-img' : ''}">
    ${pop ? media(p, false) + (sec ? '<span class="sec-imgerr" aria-hidden="true"><b>ERROR</b><i>IMAGE_NOT_FOUND 0xFAD0</i></span>' : '') : `<button data-open="${esc(p.id)}" class="absolute inset-0 block" aria-label="Lihat detail ${esc(p.title)}">${media(p, true)}</button>`}
    <span class="pointer-events-none absolute left-2.5 top-2.5 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-[#3d4654]">${esc(p.category)}</span>
    <button data-save="${esc(p.id)}" data-kind="heart" class="absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-[#3d4654] transition aria-pressed:bg-gold aria-pressed:text-night" aria-pressed="${on}" aria-label="Simpan ${esc(p.title)}">${heart(on)}</button>
    ${pop ? '' : '<span class="pointer-events-none absolute inset-x-2.5 bottom-2.5 translate-y-[150%] rounded-full bg-ink py-2 text-center text-sm font-semibold text-paper transition-transform duration-300 group-hover:translate-y-0 motion-reduce:transition-none dark:bg-frost dark:text-night">Lihat cepat</span>'}
    ${holo ? `<span class="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent pb-2 pt-8 text-center font-display text-[11px] font-extrabold uppercase tracking-[.35em] text-sun ${sec ? 'sec-text' : ''}">${sec ? '? Secret ?' : '★ 5 Star ★'}</span>` : ''}
  </div>${holo ? '</div>' : ''}
  <div class="flex flex-1 flex-col px-1.5 pt-3">
    <div class="flex flex-wrap items-start justify-between gap-1.5"><h3 class="font-display text-base font-bold leading-tight">${esc(p.title)}</h3><span class="whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold ${chip}">${ok ? 'Tersedia' : 'Coming Soon'}</span></div>
    ${compact ? '' : `<p class="mt-1.5 ${pop ? '' : 'line-clamp-2'} text-sm text-sage dark:text-fog">${esc(p.desc)}</p><p class="mt-2 text-xs text-sage dark:text-fog">No. ${esc(p.id)}, ${esc(p.tools)}</p>
    <div class="mt-auto pt-4">${ok ? linkBtn(p, 'block rounded-full bg-pine py-2.5 text-center text-sm font-semibold text-white transition hover:opacity-90 dark:bg-aqua dark:text-night', pop) : `<button data-save="${esc(p.id)}" data-kind="text" aria-pressed="${on}" class="w-full rounded-full border py-2.5 text-sm font-semibold transition aria-pressed:border-gold aria-pressed:bg-gold aria-pressed:text-night ${saveCls}">${on ? 'Tersimpan' : 'Simpan ke daftar'}</button>`}</div>`}
  </div>
  </article>`;
  return holo ? `<div class="holo-frame ${sec ? 'holo-secret' : ''}">${html}</div>` : html;
}

/* ==========================================================================
   POPUP GACHA  (rate 0 = Secret, 1 sampai 5)
   Rate dibaca dari projects.js. Tampilan tiap rate ada di src/input.css (TABEL RATE),
   jumlah percikan tiap rate ada di tabel RATES di bawah ini.
   ========================================================================== */
const RATES = {
  0: { name: 'Secret', sparks: 18 },   // rate 0 = SECRET (urutan fase animasinya ada di PHASES di bawah)
  1: { name: '1 Star', sparks: 0  },
  2: { name: '2 Star', sparks: 5  },
  3: { name: '3 Star', sparks: 10 },
  4: { name: '4 Star', sparks: 14 },
  5: { name: '5 Star', sparks: 10 }
};

/* Sesuaikan dengan perangkat */
const calm = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const DEV = {
  touch: matchMedia('(hover: none) and (pointer: coarse)').matches,                          // HP / tablet
  lite: (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 2      // perangkat ringan: efek dikurangi
};
if (DEV.lite) document.documentElement.dataset.fx = 'lite';

const SPARKS = (n, rainbow) => Array.from({ length: n }, (_, i) => `<i class="gacha-spark" style="--a:${Math.round(i * 360 / n + (i % 2 ? 6 : 0))}deg;--d0:${4 + (i % 3)}rem;--d1:${(rainbow ? 12 : 9) + (i % 4) * 2}rem${rainbow ? `;--c:hsl(${Math.round(i * 360 / n)} 100% 65%)` : ''}"></i>`).join('');
const CHARGE = (n, rainbow) => `<div class="gacha-charge" aria-hidden="true">${Array.from({ length: n }, (_, i) => `<i style="--a:${Math.round(i * 360 / n * 2.7) % 360}deg;--r:${11 + (i % 4) * 2}rem;--k:${((i % (n / 2 | 0 || 1)) * 1.4 / (n / 2 | 0 || 1)).toFixed(2)};--h:${rainbow ? Math.round(i * 360 / n) : 42}"></i>`).join('')}</div>`;
const FX = (r, n) => {
  if (r < 4) return '';
  const rings = r === 5 ? [[0, 5], [.12, 7.5], [.26, 10]] : [[0, 3.5]];
  const floats = r === 5 ? `<div class="fx-floats">${Array.from({ length: Math.round(5 * n) }, (_, i) => `<i class="fx-float" style="--x:${(i * 37 + 6) % 96}%;--t:${((i * .55) % 5).toFixed(2)}s;--ft:${(4 + (i % 3)).toFixed(1)}s;--sz:${(.55 + (i % 3) * .2).toFixed(2)}rem;--h:${Math.round(i * 360 / 14)}">✦</i>`).join('')}</div>` : '';
  return `<div class="gacha-fx" aria-hidden="true">${r === 5 ? '<i class="fx-rays"></i><i class="fx-beam"></i>' : ''}${floats}${rings.map(([d, s]) => `<i class="fx-ring" style="--rd:${d}s;--rs:${s}"></i>`).join('')}<i class="fx-flash"></i></div>`;
};

/* Lapisan berlapis di sekitar kartu: tiap lapisan bergeser berbeda mengikuti gyroscope / kursor (parallax),
   jadi kartu terasa punya kedalaman. d = kedalaman (px pergeseran). Negatif = di belakang, positif = di depan. */
const SL = (cls, d, inner = '') => `<div class="sl ${cls}" style="--d:${d}" aria-hidden="true"><i></i>${inner}</div>`;
const SHARDS = (n, glyphs) => `<span class="sl-shards">${Array.from({ length: n }, (_, i) => `<b style="--x:${[-16, 104, -10, 98, -18, 108, 92, -6][i % 8]}%;--y:${(8 + i * 13) % 92}%;--s:${(.7 + (i % 4) * .25).toFixed(2)}rem;--dl:${(i * .37).toFixed(2)}s;--h:${Math.round(i * 47) % 360}">${glyphs[i % glyphs.length]}</b>`).join('')}</span>`;
function layers(r, n) {
  if (r === 0) return {
    back: SL('sl-shadow', -30) + (DEV.lite ? '' : SL('sl-stars', -42)) + SL('sl-ring', -24) + (DEV.lite ? '' : SL('sl-hex', -12)) + SL('sl-rgbc', 20) + SL('sl-rgbm', -20),
    front: SL('sl-near', 52, SHARDS(Math.round(8 * n) || 4, ['✦', '◆', '✧', '▲', '◇']))
  };
  return { back: '', front: '' };   // rate 1-5 tampil persis seperti semula, lapisan tambahan khusus Secret
}

/* ---------- SECRET (rate 0): fase animasi ----------
   Urutan seperti gacha anime: tampak seperti tarikan 5 bintang -> glitch -> ERROR -> WARNING (alarm + target)
   -> layar PUTIH (flash) -> kartu berputar banyak kali sambil glitch, mengecil dan menyerap cahaya (partikel + garis tersedot),
   lalu membesar lagi memperlihatkan kartu. Setelah selesai, tiap beberapa detik
   kartu glitch: gambar hilang dan berganti tulisan ERROR sebentar.
   Tiap fase = data-phase di .gacha-wrap, tampilannya diatur di src/input.css (cari  data-phase ).
   Angka = milidetik sejak popup dibuka. Mau lebih cepat / lambat? ubah angkanya, dan --dur rate 0 di TABEL RATE (src/input.css)
   dibuat sedikit lebih besar dari fase reveal + 1500. Klik kartu = lewati semuanya. */
const PHASES = [['fake', 0], ['glitch', 1900], ['error', 2800], ['warn', 4400], ['impact', 5200], ['reveal', 5550]];
const ERR_LINES = ['> pull.result = 5 STAR  [ok]', '> verifying rate ........ [ok]', '> ERROR: RATE_OVERFLOW (5 < ?)', '> entity.unknown DETECTED', '> rollback ........... FAILED', '> OVERRIDE: SECRET_ENTITY_'];
const rnd = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };   // acak tetap (hasil selalu sama)
const DEBRIS = n => Array.from({ length: Math.round(28 * n) }, (_, i) => {   // partikel yang tersedot ke kartu
  const a = i / (28 * n) * Math.PI * 2 + rnd(i + 5) * .4, d = 260 + rnd(i + 9) * 380;
  return `<b style="--dx:${(Math.cos(a) * d).toFixed(0)}px;--dy:${(Math.sin(a) * d).toFixed(0)}px;--s:${(.5 + rnd(i + 2) * 1.1).toFixed(2)}rem;--dl:${(rnd(i + 3) * .8).toFixed(2)}s;--h:${[180, 300, 50, 0][i % 4]};--rt:${Math.round(rnd(i) * 720 - 360)}deg"></b>`;
}).join('');
const SECFX = n => `<div class="gacha-fx sec-fx" aria-hidden="true">
  <i class="sec-dim"></i><i class="sec-alarm"></i><i class="sec-scanfx"></i>
  <i class="fx-rays sec-rays"></i>
  <div class="sec-meteors">${Array.from({ length: Math.round(24 * n) }, (_, i) => `<i class="mt${i % 2 ? ' x' : ''}" style="--x:${(30 + (i * 29) % 90)}%;--y:${-8 + (i * 17) % 55}%;--L:${(9 + (i % 5) * 3)}rem;--t:${((i * .31) % 2.4).toFixed(2)}s;--sp:${(.75 + (i % 4) * .2).toFixed(2)}s"></i>`).join('')}</div>
</div>
<div class="gacha-fx sec-top" aria-hidden="true">
  <div class="sec-warn"><b class="wb"></b><span>⚠ WARNING ⚠</span><small>UNKNOWN ENTITY APPROACHING</small><b class="wb"></b></div>
  <i class="sec-comet"></i>
  <div class="sec-err"><div class="sec-err-bar"><span>⚠ SYSTEM ERROR 0xFAD0</span><span>✕</span></div><pre>${ERR_LINES.map((l, i) => `<span class="ln" style="--i:${i}">${esc(l)}</span>`).join('')}</pre></div>
  <i class="sec-white"></i><i class="sec-burst"></i>
  <div class="sec-debris">${DEBRIS(n)}</div>
  <i class="sec-impact"></i>
  ${[[0, 5], [.14, 8], [.3, 11]].map(([d, s]) => `<i class="fx-ring" style="--rd:${d}s;--rs:${s}"></i>`).join('')}
</div>`;   // dua lapisan layar: yang pertama di belakang kartu (gelap, sinar, meteor), .sec-top di depan kartu (komet, jendela error, ledakan)

/* Popup ala gacha: card yang SAMA dengan di grid, hanya ditambah animasi
   (muncul menghadap belakang, berputar, lalu terbuka). Animasinya ada di src/input.css (gacha-*). */
function popup(p) {
  const r = rateOf(p), R = RATES[r], n = DEV.lite ? .5 : 1, sec = r === 0, L = layers(r, n);
  const stars = Array.from({ length: 5 }, (_, i) => `<i class="${i < r ? 'on' : ''}" style="--i:${i}">★</i>`).join('');
  const gold = Array.from({ length: 5 }, (_, i) => `<i class="on" style="--i:${i}">★</i>`).join('');
  const hint = (DEV.touch ? 'Miringkan HP atau geser kartunya' : 'Gerakkan kursor di atas kartu') + (r === 5 || sec ? '. Ketuk kartu: gambar keluar dari kartu' : '');
  const rank = sec
    ? `<div class="gacha-rank sec-rank mt-4" role="img" aria-label="Rate secret"><div class="rk-stack">
         <div class="rk-fake flex flex-col items-center gap-1"><span class="gacha-stars">${gold}</span><span class="gacha-rname font-display text-xs font-bold uppercase tracking-[.3em] text-white/90">5 Star</span></div>
         <div class="rk-real flex flex-col items-center gap-1"><span class="rk-q">?</span><span class="gacha-rname font-display text-xs font-bold uppercase tracking-[.3em] text-white/90">${R.name}</span></div></div></div>`
    : `<div class="gacha-rank mt-4 flex flex-col items-center gap-1" role="img" aria-label="Rate ${r} dari 5, ${R.name}">
        <span class="gacha-stars">${stars}</span>
        <span class="gacha-rname font-display text-xs font-bold uppercase tracking-[.3em] text-white/90">${R.name}</span>
      </div>`;
  return `<div class="gacha-wrap" data-rate="${r}"${sec ? ' data-phase="fake"' : ''}>
    ${sec ? SECFX(n) : FX(r, n)}
    <div id="popFit" class="gacha-fit">
      <div class="gacha-stage relative">
        <div class="gacha-aura"></div>
        ${L.back}
        <div class="gacha-card relative">
          <div class="gacha-tilt">
            <div class="gacha-inner">
              <div class="gacha-front">${card(p, 'popup')}</div>
              <div class="gacha-back"><span class="relative font-display text-6xl font-extrabold text-sun">FHY</span>${sec ? '<span class="sec-q">?</span>' : ''}</div>
            </div>
          </div>
          <div class="gacha-flash"></div>
        </div>
        ${L.front}
        ${r >= 4 || sec ? CHARGE(Math.round((sec ? 14 : r === 5 ? 9 : 8) * n), r === 5 || sec) : ''}
        ${SPARKS(Math.round(R.sparks * n), r === 5 || sec)}
      </div>
      ${rank}
      <p class="gacha-hint mt-2 text-xs text-white/60">${hint}</p>
      <button data-close class="gacha-close mt-3 rounded-full bg-white/90 px-6 py-2 text-sm font-semibold text-ink">Tutup</button>
    </div>
  </div>`;
}
/* Kecilkan popup kalau layar kurang tinggi, supaya tidak perlu scroll (di layar besar boleh sedikit diperbesar) */
function fitPopup() {
  const wrap = $('#dlg .gacha-wrap'), fit = $('#popFit');
  if (!wrap || !fit) return;
  fit.style.transform = ''; wrap.style.height = '';
  const h = fit.offsetHeight, vh = window.visualViewport ? visualViewport.height : innerHeight;
  const s = Math.min(1, (vh - 24) / h);   /* hanya mengecil kalau layar kurang tinggi, tidak pernah diperbesar */
  fit.style.transformOrigin = 'top center';
  fit.style.transform = s !== 1 ? `scale(${s})` : '';
  wrap.style.height = Math.ceil(h * s) + 'px';
  /* titik tengah kartu (px layar): pusat cahaya, cincin, dan pilar rate 4-5 */
  const r = $('.gacha-stage', wrap).getBoundingClientRect();
  wrap.style.setProperty('--cx', (r.left + r.width / 2) + 'px');
  wrap.style.setProperty('--cy', (r.top + r.height / 2) + 'px');
}

/* ==========================================================================
   GYROSCOPE  (jalan setelah animasi popup selesai)
   HP        : kartu ikut kemiringan HP (gyroscope). iPhone meminta izin sekali saat kartu diketuk.
   Laptop    : kartu ikut arah kursor.
   Cadangan  : HP tanpa gyroscope / izin ditolak = geser kartu dengan jari.
   ========================================================================== */
const tilt = { w: null, el: null, raf: 0, cx: 0, cy: 0, tx: 0, ty: 0, max: 7, base: null, gyro: false, drag: false, lock: 0, off: [] };
const clamp = v => Math.max(-1, Math.min(1, v));
let pop = null;

/* iOS 13+: izin sensor gerak HARUS diminta di dalam ketukan pengguna, jadi dipanggil dari openPopup() */
function askMotion() {
  const D = window.DeviceOrientationEvent;
  if (D && typeof D.requestPermission === 'function') { try { return D.requestPermission().catch(() => 'denied'); } catch (e) { return Promise.resolve('denied'); } }
  return Promise.resolve('granted');
}
function kick() { if (!tilt.raf) tilt.raf = requestAnimationFrame(stepTilt); }
function stepTilt() {
  tilt.raf = 0;
  if (!tilt.w) return;
  const k = DEV.touch && +tilt.w.dataset.rate !== 5 ? .11 : .07;   // kehalusan: HP sedikit lebih responsif
  tilt.cx += (tilt.tx - tilt.cx) * k; tilt.cy += (tilt.ty - tilt.cy) * k;
  tilt.el.style.transform = `rotateX(${(-tilt.cy * tilt.max).toFixed(2)}deg) rotateY(${(tilt.cx * tilt.max).toFixed(2)}deg)`;
  const s = tilt.w.style;
  s.setProperty('--mx', (50 + tilt.cx * 50).toFixed(1) + '%');
  s.setProperty('--my', (50 + tilt.cy * 50).toFixed(1) + '%');
  s.setProperty('--tiltx', tilt.cx.toFixed(3)); s.setProperty('--tilty', tilt.cy.toFixed(3));
  s.setProperty('--g', Math.min(1, Math.hypot(tilt.cx, tilt.cy) * .9 + .1).toFixed(2));
  if (Math.abs(tilt.tx - tilt.cx) > .002 || Math.abs(tilt.ty - tilt.cy) > .002) tilt.raf = requestAnimationFrame(stepTilt);
}
function stopTilt() {
  cancelAnimationFrame(tilt.raf); tilt.raf = 0;
  tilt.off.splice(0).forEach(f => f());
  if (tilt.w) tilt.w.classList.remove('gacha-tilting');
  tilt.w = tilt.el = null; tilt.base = null; tilt.gyro = tilt.drag = false;
}
/* Kemiringan maksimal kartu (derajat). HP dibuat lebih besar karena gerak tangan di HP kecil dan kartunya kecil.
   Laptop (kursor) tetap lebih kalem. Urutan: rate 1-4 | rate 5 | rate 0 (Secret) */
const gyroMax = rate => (DEV.touch ? [16, 10, 10, 10, 10, 10] : [11, 7, 7, 7, 7, 10])[rate === 0 ? 0 : rate] || 7;
function startTilt(w) {
  if (tilt.w === w || calm()) return;
  stopTilt();
  const el = $('.gacha-tilt', w), stage = $('.gacha-stage', w);
  if (!el || !stage) return;
  Object.assign(tilt, { w, el, cx: 0, cy: 0, tx: 0, ty: 0, max: gyroMax(+w.dataset.rate) });
  w.classList.add('gacha-tilting');
  const on = (t, ev, fn, o) => { t.addEventListener(ev, fn, o); tilt.off.push(() => t.removeEventListener(ev, fn, o)); };
  const aim = (e, d) => { const r = stage.getBoundingClientRect(); tilt.tx = clamp((e.clientX - r.left - r.width / 2) / d); tilt.ty = clamp((e.clientY - r.top - r.height / 2) / d); kick(); };
  const rest = () => { tilt.tx = tilt.ty = 0; kick(); };

  /* kursor (laptop) dan jari (cadangan kalau tidak ada gyroscope) */
  on(window, 'pointermove', e => {
    if (e.pointerType !== 'touch') aim(e, 440);
    else if (tilt.drag && !tilt.gyro) { if (Math.hypot(e.clientX - tilt.sx, e.clientY - tilt.sy) > 8) tilt.moved = true; aim(e, stage.offsetWidth * .7); }
  });
  on(stage, 'pointerdown', e => {
    if (e.pointerType !== 'touch' || tilt.gyro) return;
    tilt.drag = true; tilt.sx = e.clientX; tilt.sy = e.clientY; tilt.moved = false; try { stage.setPointerCapture(e.pointerId); } catch (_) {}
    aim(e, stage.offsetWidth * .7);
  });
  const up = e => { if (e.pointerType === 'touch' && tilt.drag) { tilt.drag = false; if (tilt.moved) tilt.lock = performance.now(); rest();   /* hanya geseran yang memblokir klik, ketukan biasa tetap jalan */ } };
  on(window, 'pointerup', up); on(window, 'pointercancel', up);
  on(document.documentElement, 'mouseleave', () => { if (!tilt.gyro) rest(); });

  /* gyroscope: beta = depan-belakang, gamma = kiri-kanan. Titik netral = posisi HP saat kartu terbuka. */
  const LIM = +tilt.w.dataset.rate === 5 ? 45 : 30;   // rate 5 tetap seperti semula (45); lainnya 30. Derajat miring HP untuk mencapai kemiringan maksimal (makin kecil = makin peka)
  const onOri = e => {
    if (e.beta == null || e.gamma == null) return;                    // laptop mengirim nilai kosong, abaikan
    if (!tilt.base) tilt.base = { b: e.beta, g: e.gamma };
    tilt.gyro = true;
    const t = tilt.base;
    let db = e.beta - t.b, dg = e.gamma - t.g;
    if (db > LIM) { t.b += db - LIM; db = LIM; } else if (db < -LIM) { t.b += db + LIM; db = -LIM; }   // netral ikut bergeser kalau HP
    if (dg > LIM) { t.g += dg - LIM; dg = LIM; } else if (dg < -LIM) { t.g += dg + LIM; dg = -LIM; }   // dimiringkan sangat jauh
    const ang = ((screen.orientation ? screen.orientation.angle : (window.orientation || 0)) + 360) % 360;   // HP diputar (landscape)
    const [x, y] = ang === 90 ? [db, -dg] : ang === 270 ? [-db, dg] : ang === 180 ? [-dg, -db] : [dg, db];
    tilt.tx = -clamp(x / LIM); tilt.ty = -clamp(y / LIM); kick();   // kartu "melayang diam", layar yang miring
  };
  if ('DeviceOrientationEvent' in window) {
    (pop && pop.perm ? pop.perm : Promise.resolve('granted')).then(st => { if (st === 'granted' && tilt.w === w) on(window, 'deviceorientation', onOri); });
    const reset = () => { tilt.base = null; };
    on(window, 'orientationchange', reset);
    if (screen.orientation) on(screen.orientation, 'change', reset);
  }
}

/* animasi selesai (atau dilewati): kartu bisa diklik dan mulai ikut gerakan perangkat */
function finishPopup(w, skip) {
  if (!w.isConnected || w.classList.contains('gacha-done')) return;
  if (skip) w.classList.add('gacha-skip');
  if (pop && pop.ph) { pop.ph.forEach(clearTimeout); pop.ph = []; }
  if (w.dataset.phase) w.dataset.phase = 'done';      // Secret: loncat ke keadaan akhir
  w.classList.add('gacha-done');
  startTilt(w);
}
function clearPop() { if (pop) { clearTimeout(pop.t); (pop.ph || []).forEach(clearTimeout); } }
function openPopup(p) {
  clearPop(); stopTilt();
  const perm = askMotion();
  $('#dlgBody').innerHTML = popup(p);
  $('#dlg').showModal();
  fitPopup();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitPopup);
  const w = $('#dlg .gacha-wrap');
  const dur = (parseFloat(getComputedStyle(w).getPropertyValue('--dur')) || 2.1) * 1000;   // lama animasi dibaca dari src/input.css
  pop = { perm, ph: [], t: setTimeout(() => finishPopup(w), calm() ? 0 : dur + 80) };
  if (w.dataset.phase && !calm()) pop.ph = PHASES.slice(1).map(([name, ms]) => setTimeout(() => { if (w.isConnected) w.dataset.phase = name; }, ms));   // Secret: ganti fase sesuai jadwal
}
addEventListener('resize', () => { if ($('#dlg').open) fitPopup(); });

/* sinkronkan tombol Simpan (hati / teks) tanpa membangun ulang popup */
function syncSave(root) {
  $$('[data-save]', root).forEach(b => { const on = saved.has(b.dataset.save); b.setAttribute('aria-pressed', on); if (b.dataset.kind === 'heart') b.innerHTML = heart(on); else b.textContent = on ? 'Tersimpan' : 'Simpan ke daftar'; });
}

const state = { cat: 'Semua', st: 'Semua status', q: '', sort: 'no' };
const ico = { Semua: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z', Website: 'M3 5h18v11H3zM8 20h8M12 16v4', Design: 'M12 3a9 9 0 1 0 0 18c1.4 0 2-.9 2-1.9 0-1-.7-1.4-.7-2.3 0-.9.7-1.5 1.7-1.5H17a4 4 0 0 0 4-4c0-4.4-4-8.3-9-8.3zM7.5 11.5h.01M10 7.8h.01M14.5 7.8h.01', Tersimpan: 'M12 21s-7-4.6-9.3-9A5.4 5.4 0 0 1 12 6a5.4 5.4 0 0 1 9.3 6c-2.3 4.4-9.3 9-9.3 9z', _lain: 'M3 12l9-9h9v9l-9 9zM16 8h.01' };
const tile = 'flex flex-col items-center gap-1.5 rounded-2xl border border-mist bg-white p-4 text-sm font-medium transition hover:border-pine aria-pressed:border-pine aria-pressed:bg-pine aria-pressed:text-white dark:border-edge dark:bg-panel dark:hover:border-aqua dark:aria-pressed:border-aqua dark:aria-pressed:bg-aqua dark:aria-pressed:text-night';
const chipCls = 'shrink-0 whitespace-nowrap rounded-full border border-mist px-4 py-2 text-sm transition hover:border-pine aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper dark:border-edge dark:hover:border-aqua dark:aria-pressed:border-frost dark:aria-pressed:bg-frost dark:aria-pressed:text-night';
function render() {
  if ($('#teaser')) $('#teaser').innerHTML = items.slice(0, 4).map(p => card(p, 'teaser')).join('');
  if ($('#grid')) {
    const cats = ['Semua', ...new Set([...(typeof CATEGORIES !== 'undefined' ? CATEGORIES : []), ...items.map(p => p.category)]), 'Tersimpan'];   // tipe dari CATEGORIES (projects.js)
    $('#tiles').innerHTML = cats.map(c => { const n = c === 'Semua' ? items.length : c === 'Tersimpan' ? saved.size : items.filter(p => p.category === c).length; return `<button data-cat="${esc(c)}" aria-pressed="${state.cat === c}" class="${tile}"><svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"><path d="${ico[c] || ico._lain}"/></svg><span>${esc(c)}</span><span class="text-xs opacity-70">${n} item</span></button>`; }).join('');
    $('#sts').innerHTML = ['Semua status', 'Tersedia', 'Coming Soon'].map(c => `<button data-st="${c}" aria-pressed="${state.st === c}" class="${chipCls}">${c}</button>`).join('');
    let list = items.filter(p => (state.cat === 'Semua' || p.category === state.cat || (state.cat === 'Tersimpan' && saved.has(p.id))) && (state.st === 'Semua status' || (state.st === 'Tersedia') === p.ready) && p.title.toLowerCase().includes(state.q));
    if (state.sort === 'az') list.sort((a, b) => a.title.localeCompare(b.title));
    $('#grid').innerHTML = list.map(p => card(p)).join('');
    $('#count').textContent = list.length + ' dari ' + items.length + ' item';
    $('#empty').classList.toggle('hidden', list.length > 0);
  }
  const b = $('#badge'); if (b) { b.textContent = saved.size; b.classList.toggle('hidden', !saved.size); }
}
if (onCatalog) {
  $('#q').oninput = e => { state.q = e.target.value.trim().toLowerCase(); render(); $('#q').focus(); };
  $('#sort').onchange = e => { state.sort = e.target.value; render(); };
  $('#reset').onclick = () => { Object.assign(state, { cat: 'Semua', st: 'Semua status', q: '', sort: 'no' }); $('#q').value = ''; $('#sort').value = 'no'; render(); };
}
document.addEventListener('click', e => {
  const c = e.target.closest('[data-cat]'), st = e.target.closest('[data-st]'), h = e.target.closest('[data-save]'), o = e.target.closest('[data-open]');
  if (c) { state.cat = c.dataset.cat; render(); }
  if (st) { state.st = st.dataset.st; render(); }
  if (h) { const id = h.dataset.save; saved.has(id) ? saved.delete(id) : saved.add(id); store.set('saved', JSON.stringify([...saved])); render(); syncSave($('#dlg')); }
  if (o) { const p = items.find(x => x.id === o.dataset.open); if (p) openPopup(p); }
  if (e.target.closest('[data-close]')) $('#dlg').close();
  const hf = e.target.closest('.holo-frame');
  if (hf && !e.target.closest('a,button') && hf.closest('.gacha-wrap').classList.contains('gacha-done') && performance.now() - tilt.lock > 350) {
    const n = (+hf.dataset.n || 0) + 1;                       // rate 5: tiap ketukan = bentuk baru
    hf.dataset.n = n; hf.dataset.mode = n % 3; hf.dataset.skin = n % 4;   // mode 0 normal, 1 gambar melompat keluar, 2 gambar keluar ke samping
    const r = hf.getBoundingClientRect(), sc = r.width / hf.offsetWidth || 1, W = hf.offsetWidth;
    const room = Math.max(0, Math.min(r.left, innerWidth - r.right) / sc - 6);         // sisa ruang di samping kartu (menyesuaikan layar)
    hf.style.setProperty('--ox', (W * .11 + Math.min(W * .3, room)).toFixed(0) + 'px');
    hf.classList.remove('holo-pop'); void hf.offsetWidth; hf.classList.add('holo-pop');
  }
  const sk = e.target.closest('.gacha-stage'); if (sk && !h) finishPopup(sk.closest('.gacha-wrap'), true);
});
$('#dlg').addEventListener('click', e => { if (performance.now() - tilt.lock < 350) return; /* lepas jari setelah menggeser kartu, jangan menutup */ if (e.target === e.currentTarget || e.target.classList.contains('gacha-wrap')) e.currentTarget.close(); });
$('#dlg').addEventListener('close', () => { clearPop(); pop = null; stopTilt(); $('#dlgBody').innerHTML = ''; });

/* ==========================================================================
   BANNER KATALOG  (kotak persegi panjang di atas katalog.html, bisa digeser)
   Isinya dari BANNERS di projects.js. Geser dengan jari / trackpad, tarik dengan mouse, tombol panah, atau titik.
   Gambar: lebar ditekan pas kotak, tinggi hanya bagian atas yang diambil (lihat class .banner-img di bawah).
   ========================================================================== */
function initBanner() {
  const root = $('#banner');
  if (!root) return;
  const list = (typeof BANNERS !== 'undefined' && BANNERS.length) ? BANNERS : [{ title: 'Katalog project', link: 'index.html', linkText: 'Lihat portofolio' }];
  const n = list.length, multi = n > 1;
  const btn = 'inline-block rounded-full bg-sun px-6 py-3 text-sm font-semibold text-night transition hover:opacity-90';
  const slide = (b, i) => {
    const link = b.link ? `href="${esc(b.link)}" ${/^https?:\/\//i.test(b.link) ? 'target="_blank" rel="noopener"' : ''}` : '';
    const label = `aria-roledescription="slide" aria-label="${i + 1} dari ${n}"`;
    if (b.image) {
      const text = (b.title || b.desc) ? `<div class="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-6 pb-10 pt-24 text-white md:px-12 md:pb-12">${b.title ? `<h2 class="font-display text-2xl font-extrabold leading-tight sm:text-3xl md:text-4xl">${esc(b.title)}</h2>` : ''}${b.desc ? `<p class="mt-2 max-w-md text-sm text-white/85 md:text-base">${esc(b.desc)}</p>` : ''}${b.link && b.linkText ? `<span class="${btn} pointer-events-auto mt-4">${esc(b.linkText)}</span>` : ''}</div>` : '';
      const img = `<img src="${esc(b.image)}" alt="${esc(b.title || '')}" draggable="false" onerror="this.remove()" class="banner-img" style="object-position:${esc(b.imagePos || 'top')}">`;
      const cls = 'relative block h-full w-full min-w-full shrink-0 snap-center select-none overflow-hidden bg-pine dark:bg-[#2A2018]';
      return b.link ? `<a ${link} ${label} class="${cls}">${img}${text}</a>` : `<div ${label} class="${cls}">${img}${text}</div>`;
    }
    const tag = b.tag || b.tagSmall ? `<div class="absolute bottom-6 left-6 rounded-2xl bg-white px-4 py-3 text-ink shadow-xl">${b.tagSmall ? `<p class="text-xs text-sage">${esc(b.tagSmall)}</p>` : ''}${b.tag ? `<p class="font-display font-bold">${esc(b.tag)}</p>` : ''}</div>` : '';
    return `<div ${label} class="grid h-full w-full min-w-full shrink-0 snap-center select-none overflow-hidden bg-pine text-white dark:bg-[#2A2018] md:grid-cols-[1.3fr_1fr]">
      <div class="flex flex-col justify-center p-8 pb-14 md:px-16 md:py-10">
        ${b.label ? `<p class="text-sm text-white/70">${esc(b.label)}</p>` : ''}
        <h1 class="mt-2 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-6xl">${esc(b.title)}</h1>
        ${b.desc ? `<p class="mt-4 max-w-sm text-white/80">${esc(b.desc)}</p>` : ''}
        ${b.link ? `<a ${link} class="${btn} mt-7 self-start">${esc(b.linkText || 'Lihat')}</a>` : ''}
      </div>
      <div class="relative hidden place-items-center bg-black/20 md:grid"><span class="font-display text-8xl font-extrabold text-sun lg:text-9xl">FHY</span>${tag}</div>
    </div>`;
  };
  const arrow = (dir, d) => `<button data-b="${dir}" aria-label="${dir === 'prev' ? 'Banner sebelumnya' : 'Banner berikutnya'}" class="absolute top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-ink shadow-lg transition hover:bg-white md:grid ${dir === 'prev' ? 'left-3' : 'right-3'}"><svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg></button>`;
  root.setAttribute('aria-roledescription', 'carousel');
  root.innerHTML = `<div id="bTrack" class="banner-track flex h-[26rem] snap-x snap-mandatory overflow-x-auto sm:h-[24rem] md:h-[24rem] ${multi ? 'md:cursor-grab' : ''}">${list.map(slide).join('')}</div>`
    + (multi ? arrow('prev', 'M15 5l-7 7 7 7') + arrow('next', 'M9 5l7 7-7 7')
      + `<div class="absolute inset-x-0 bottom-3 flex justify-center gap-2">${list.map((_, i) => `<button data-b="${i}" aria-label="Ke banner ${i + 1}" class="h-2 w-2 rounded-full bg-white/60 shadow ring-1 ring-black/10 transition-all aria-[current=true]:w-6 aria-[current=true]:bg-white"></button>`).join('')}</div>` : '');
  if (!multi) return;

  const track = $('#bTrack'), dots = $$('[data-b]', root).filter(b => /^\d+$/.test(b.dataset.b));
  let cur = 0, timer = 0, down = false, moved = false, sx = 0, sl = 0, lastX = 0;
  const go = i => { cur = (i + n) % n; track.scrollTo({ left: cur * track.clientWidth, behavior: 'smooth' }); };
  const mark = () => { cur = Math.round(track.scrollLeft / track.clientWidth) || 0; dots.forEach((d, i) => d.setAttribute('aria-current', i === cur)); };
  mark();
  let tick = 0; track.addEventListener('scroll', () => { cancelAnimationFrame(tick); tick = requestAnimationFrame(mark); }, { passive: true });
  root.addEventListener('click', e => { const b = e.target.closest('[data-b]'); if (!b) return; const v = b.dataset.b; go(v === 'prev' ? cur - 1 : v === 'next' ? cur + 1 : +v); play(); });

  /* tarik dengan mouse (di HP / trackpad geser biasa sudah bawaan browser) */
  track.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse' || e.button !== 0) return; down = true; moved = false; sx = lastX = e.clientX; sl = track.scrollLeft; });
  addEventListener('pointermove', e => {
    if (!down) return;
    const dx = e.clientX - sx;
    if (!moved && Math.abs(dx) > 5) { moved = true; track.style.scrollSnapType = 'none'; track.classList.add('md:cursor-grabbing'); }
    if (moved) { track.scrollLeft = sl - dx; lastX = e.clientX; }
  });
  const release = () => {
    if (!down) return; down = false;
    track.style.scrollSnapType = ''; track.classList.remove('md:cursor-grabbing');
    if (moved) { const dx = lastX - sx, w = track.clientWidth, base = Math.round(sl / w); go(Math.max(0, Math.min(n - 1, Math.abs(dx) > w * .12 ? base + (dx < 0 ? 1 : -1) : base))); }   // tarik > 12% lebar = pindah banner
  };
  addEventListener('pointerup', release); addEventListener('pointercancel', release);
  track.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);   // lepas tarikan jangan membuka link banner

  /* geser otomatis: berhenti saat kursor di atas / disentuh / tab tidak aktif */
  const every = typeof BANNER_AUTOPLAY === 'number' ? BANNER_AUTOPLAY : 5500;
  const stop = () => { clearInterval(timer); timer = 0; };
  const play = () => { stop(); if (every > 0 && !matchMedia('(prefers-reduced-motion: reduce)').matches && !document.hidden) timer = setInterval(() => { if (!down) go(cur + 1); }, every); };
  ['pointerenter', 'focusin', 'touchstart'].forEach(ev => root.addEventListener(ev, stop, { passive: true }));
  ['pointerleave', 'focusout'].forEach(ev => root.addEventListener(ev, play));
  root.addEventListener('touchend', () => setTimeout(play, 4000), { passive: true });
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : play());
  play();
}

/* Form ke email (index.html) */
if ($('#form')) $('#form').onsubmit = e => { e.preventDefault(); location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Pesan dari ' + $('#n').value)}&body=${encodeURIComponent($('#m').value)}`; $('#toast').classList.remove('hidden'); };

/* ==========================================================================
   HERO HOME (initHero)  -  tampilan di src/input.css bagian HERO, isinya di index.html
   1. Huruf nama dipecah satu-satu (kelas .ch) supaya muncul bergantian dan melompat saat disentuh.
   2. Kata di bawah nama diketik bergantian (HERO_WORDS).
   3. Jaring bintang di canvas #heroNet: titik bergerak pelan, garis menyambung kalau berdekatan, dan mengejar kursor.
   4. Parallax: kursor (laptop) atau kemiringan HP (Android) mengisi --px --py di .hero; tiap lapisan .px bergeser beda.
   Semua berhenti saat hero tidak terlihat. "Reduce motion" = semuanya diam.
   ========================================================================== */
function initHero() {
  const hero = $('#home.hero');
  if (!hero) return;
  const still = calm();

  /* 1. pecah huruf nama */
  let n = 0;
  $$('[data-split]', hero).forEach(el => { el.innerHTML = [...el.textContent].map(c => `<span class="ch" style="--i:${n++}">${esc(c)}</span>`).join(''); });

  /* 2. mesin ketik */
  const role = $('#heroRole');
  if (role && !still && HERO_WORDS.length) {
    let w = 0, i = 0, del = false;
    role.textContent = '';
    const tick = () => {
      const word = HERO_WORDS[w];
      if (!document.hidden) { i += del ? -1 : 1; role.textContent = word.slice(0, i); }
      let ms = del ? 35 : 75;
      if (!del && i >= word.length) { if (HERO_WORDS.length < 2) return; del = true; ms = 1700; }
      else if (del && i <= 0) { del = false; w = (w + 1) % HERO_WORDS.length; ms = 350; }
      setTimeout(tick, ms);
    };
    setTimeout(tick, 900);
  }
  if (still) return;

  /* 3. jaring bintang */
  const cv = $('#heroNet'), ctx = cv && cv.getContext('2d');
  const dots = [], mouse = { x: -999, y: -999 };
  let W = 0, H = 0, dpr = 1, seen = true, raf = 0;
  const size = () => {
    const r = hero.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio || 1, 1.5); W = r.width; H = r.height;
    cv.width = W * dpr; cv.height = H * dpr;
    const want = Math.min(DEV.lite ? 26 : 64, Math.round(W * H / 16000));
    while (dots.length < want) dots.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: .8 + Math.random() * 1.4 });
    dots.length = want;
  };
  const draw = () => {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
    for (const d of dots) {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0 || d.x > W) d.vx *= -1;
      if (d.y < 0 || d.y > H) d.vy *= -1;
    }
    ctx.lineWidth = 1;
    for (let a = 0; a < dots.length; a++) {
      const p = dots[a];
      for (let b = a + 1; b < dots.length; b++) {
        const q = dots[b], dx = p.x - q.x, dy = p.y - q.y, dist = dx * dx + dy * dy;
        if (dist < 16900) { ctx.strokeStyle = `rgba(255,122,85,${(1 - dist / 16900) * .45})`; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
      }
      const mx = p.x - mouse.x, my = p.y - mouse.y, md = mx * mx + my * my;
      if (md < 32400) { ctx.strokeStyle = `rgba(245,193,61,${(1 - md / 32400) * .8})`; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); p.x += mx * .004; p.y += my * .004; }
      ctx.fillStyle = 'rgba(160,240,230,.85)'; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
    }
  };

  /* 4. parallax */
  const g = { tx: 0, ty: 0, x: 0, y: 0, base: null };
  const setT = (x, y) => { g.tx = Math.max(-1, Math.min(1, x)); g.ty = Math.max(-1, Math.min(1, y)); };
  hero.addEventListener('pointermove', e => {
    const r = hero.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    mouse.x = x; mouse.y = y;
    hero.style.setProperty('--mx', x + 'px'); hero.style.setProperty('--my', y + 'px');
    if (e.pointerType !== 'touch') setT(x / r.width * 2 - 1, y / r.height * 2 - 1);
  });
  hero.addEventListener('pointerleave', () => { mouse.x = mouse.y = -999; setT(0, 0); });
  addEventListener('deviceorientation', e => {   // Android: kemiringan HP. Laptop mengirim nilai kosong, diabaikan
    if (!DEV.touch || e.beta == null || e.gamma == null) return;
    if (!g.base) g.base = { b: e.beta, g: e.gamma };
    setT((e.gamma - g.base.g) / 22, (e.beta - g.base.b) / 22);
  });

  const frame = () => {
    raf = 0;
    if (!seen || document.hidden) return;
    g.x += (g.tx - g.x) * .08; g.y += (g.ty - g.y) * .08;
    hero.style.setProperty('--px', g.x.toFixed(3)); hero.style.setProperty('--py', g.y.toFixed(3));
    if (ctx) draw();
    raf = requestAnimationFrame(frame);
  };
  const go = () => { if (!raf && seen && !document.hidden) raf = requestAnimationFrame(frame); };
  new IntersectionObserver(es => { seen = es[0].isIntersecting; go(); }).observe(hero);
  document.addEventListener('visibilitychange', go);
  if (cv && ctx) { size(); new ResizeObserver(size).observe(hero); }
  go();
}

render();
initBanner();
initHero();

/* ==========================================================================
   EFEK HALUS UNTUK HERO v2 + HALAMAN TENTANG
   - .rv muncul pelan saat discroll (atur jeda dengan style="--n:1,2,3")
   - [data-count="projects"] otomatis berisi jumlah project di projects.js
   - menu loncat di tentang.html menyala sesuai bagian yang sedang dibaca
   ========================================================================== */
(function () {
  const c = $('[data-count="projects"]');
  if (c && typeof PROJECTS !== 'undefined') c.textContent = PROJECTS.length;
  const rv = $$('.rv');
  if (rv.length) {
    if (!('IntersectionObserver' in window) || calm()) rv.forEach(e => e.classList.add('in'));
    else { const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 }); rv.forEach(e => io.observe(e)); }
  }
  const jump = $$('.ab-jump a');
  if (jump.length) {
    const map = new Map(jump.map(a => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) jump.forEach(a => a.dataset.on = a === map.get(e.target.id)); }), { rootMargin: '-40% 0px -55% 0px' });
    map.forEach((a, id) => { const t = document.getElementById(id); if (t) io.observe(t); });
  }
})();


/* ==========================================================================
   POPUP PROJECT = berkas. Urutan: map biru muncul sedikit dari bawah layar, lalu berkas project keluar dari dalam map.
   Fungsi di bawah ini menggantikan popup lama (gacha / rate dihapus). Tampilan + waktu: src/input.css, bagian "POPUP BERKAS".
   Mau ganti warna map? --pf di .pf. Tulisan di map: cari  pf-front  di bawah. Ditutup: tombol Tutup, klik area gelap, Esc.
   ========================================================================== */
function popup(p) {
  return `<div class="pf-rise"><div class="pf"><i class="pf-fd pf-back" aria-hidden="true"></i><div class="pf-sheet">${card(p, 'popup')}</div>
    <div class="pf-fd pf-front"><span>Arsip project<b>No. ${esc(p.id)}</b></span><button data-close type="button" class="pf-x">Tutup</button></div></div></div>`;
}
function fitPopup() {
  const e = $('#dlg .pf'); if (!e) return;
  const vh = window.visualViewport ? visualViewport.height : innerHeight;
  e.style.setProperty('--s', Math.min(1, (vh - 24) / (e.offsetHeight + 140)).toFixed(3));
}
function openPopup(p) {
  $('#dlgBody').innerHTML = popup(p);
  $('#dlg').showModal();
  fitPopup();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitPopup);
}
function closePop() {
  const d = $('#dlg'), e = $('#dlg .pf-rise');
  if (!d.open) return;
  if (!e || calm()) return d.close();
  if (e.classList.contains('pf-out')) return;
  e.classList.add('pf-out'); setTimeout(() => d.close(), 820);   // lama sama dengan animasi keluar di input.css
}
$('#dlg').addEventListener('cancel', e => { e.preventDefault(); closePop(); });
$('#dlg').addEventListener('click', e => { if (e.target.closest('[data-close]') || e.target === e.currentTarget) { e.stopImmediatePropagation(); closePop(); } }, true);
