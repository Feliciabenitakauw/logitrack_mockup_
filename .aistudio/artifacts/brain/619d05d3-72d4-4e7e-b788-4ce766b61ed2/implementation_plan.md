# Rencana Implementasi Mockup Aplikasi Mobile LogiTrack

Mockup aplikasi mobile ekspedisi darat Indonesia **LogiTrack** dibangun menggunakan React + Vite + Tailwind CSS dengan rasio bingkai HP fisik (390×844) dan mode **Galeri Layar** berdampingan untuk presentasi dan tinjauan desain.

> [!IMPORTANT] Keputusan & Preferensi Desain yang Telah Dikonfirmasi
> - **Visualisasi Peta**: Peta interaktif SVG kustom bertema gelap dengan rute ekspedisi darat Indonesia, titik transit antarkota, dan marker posisi kurir hidup.
> - **Layar Awal Default**: Langsung memuat Beranda Pengirim dengan akses cepat pemilih peran (Pengirim / Kurir / Admin) dan tombol pratinjau alur Masuk/Onboarding.
> - **Integritas Data**: Menggunakan data dummy lokal di `src/data/mockData.ts` tanpa ketergantungan eksternal atau klaim tak terverifikasi.
> - **Indikator Desain**: Label "BARU" pada fitur inovasi yang dapat dihidup-matikan melalui toggle bilah kendali desain di luar bingkai HP.

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                            LOGITRACK APPLICATION                            │
├──────────────────────────────────────────────────────────────────────────────┤
│  Top Control Bar (Luar Bingkai HP):                                          │
│  [📱 Mode HP Interaktif | 🖼️ Galeri Layar (23 Layar)]   [Role: Pengirim/Kurir/Admin] │
│  [Toggle Badge BARU: ON/OFF]   [Kondisi: Normal | Loading | Kosong | Offline]│
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                 ┌──────────────────────────────────────┐                     │
│                 │      BINGKAI HP (390 x 844 px)       │                     │
│                 │  ┌────────────────────────────────┐  │                     │
│                 │  │ Dynamic Island / Notch + Status│  │                     │
│                 │  ├────────────────────────────────┤  │                     │
│                 │  │ Offline Banner (Bila mode off) │  │                     │
│                 │  ├────────────────────────────────┤  │                     │
│                 │  │                                │  │                     │
│                 │  │       ACTIVE SCREEN VIEW       │  │                     │
│                 │  │   (Transisi geser / bottom     │  │                     │
│                 │  │    navigasi aktif)             │  │                     │
│                 │  │                                │  │                     │
│                 │  ├────────────────────────────────┤  │                     │
│                 │  │ Bottom Navigation (4-5 tabs)   │  │                     │
│                 │  │ Home Indicator Bar             │  │                     │
│                 │  └────────────────────────────────┘  │                     │
│                 └──────────────────────────────────────┘                     │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. Ringkasan & Konsep Produk

LogiTrack adalah mockup aplikasi mobile komprehensif untuk pengiriman kargo dan paket darat di seluruh Indonesia. Mockup ini memadukan kemudahan pengirim ritel/UMKM, efisiensi kurir di lapangan dengan verifikasi kode serah-terima dan bukti foto bertanda air, serta dashboard admin operasional untuk penugasan kurir dan mitigasi kendala.

### Persona Pengguna
1. **Pengirim (Felicia)**: Melacak saldo, cek ongkir volumetrik, membuat pesanan dengan stepper 4 langkah, memantau rute kurir live di peta, dan memesan jadwal jemput paket.
2. **Kurir (Andi & Budi)**: Menerima daftar tugas jemput dan antar berurutan, memperbarui status pengiriman, mengirim koordinat GPS, serta melakukan serah terima via kode OTP 6 angka dan foto bukti.
3. **Admin Operasional**: Memantau KPI armada, menugaskan kurir melalui bottom-sheet interaktif, dan mencatat kendala logistik.

---

## 2. Struktur Desain & 23 Layar Mockup

### Palet Warna & Visual
- **Background Utama**: `#020617` (Deep Dark Slate)
- **Kartu & Surface**: `#0f172a` (Card Slate)
- **Garis & Pembatas**: `#1e293b` (Hairline Border)
- **Teks Utama**: `#e2e8f0` (High contrast slate)
- **Teks Sekunder**: `#94a3b8` (Muted slate)
- **Aksen Primer**: Gradien Teal `#14b8a6` → Emerald `#10b981`
- **Warna Status Baku**:
  - `Terkirim`: Emerald (`#10b981`)
  - `Sedang Diantar`: Teal (`#14b8a6`)
  - `Dalam Perjalanan`: Biru (`#3b82f6`)
  - `Gagal Kirim`: Merah (`#f43f5e`)
  - `Dibatalkan`: Abu-abu (`#64748b`)
  - `Paket Terdaftar` & `Dijemput`: Amber (`#f59e0b`)

### Daftar Lengkap 23 Layar yang Diimplementasikan
| No | Modul | Nama Layar | Fitur & Elemen Kunci |
|---|---|---|---|
| 1 | Masuk | **Splash Screen** | Logo LogiTrack, tagline "Kirim darat, terlacak sampai tujuan", animasi pulse lembut |
| 2 | Masuk | **Onboarding (3 Slide)** | Slide 1: Kirim dalam 4 langkah, Slide 2: Lacak di peta, Slide 3: Terima dengan kode aman, indikator dot & tombol Lewati/Mulai |
| 3 | Masuk | **Login** | Form email/HP, show/hide password, link lupa password, chip akses cepat demo (Pengirim/Kurir/Admin), validasi pesan error |
| 4 | Masuk | **Daftar Akun** | Input nama lengkap, email, nomor HP, kata sandi, radio peran Pengirim/Kurir, persetujuan S&K |
| 5 | Masuk | **Verifikasi OTP** | 6 kotak angka dengan auto-focus/key handling, hitung mundur kirim ulang 60s, tombol verifikasi |
| 6 | Pengirim | **Beranda** | Header sapaan Felicia, notif bell badge, kartu saldo gradient teal Rp 1.250.000 dengan toggle mata, 4 aksi cepat, ringkasan aktif, 2 kartu paket live progress, kartu info jemput hari ini |
| 7 | Pengirim | **Cek Ongkir** | Kota asal/tujuan, berat & dimensi P×L×T, 3 kartu layanan (Reguler, Express, Cargo), bottom sheet breakdown volumetrik (`P×L×T÷5000`), tarif zona & zero hidden fees |
| 8 | Pengirim | **Kirim Paket (Stepper)** | 4 langkah: (a) Pengirim & penerima + simpan alamat, (b) Detail paket & dimensi, (c) Layanan & metode bayar (Saldo/Transfer/QRIS/COD), (d) Konfirmasi ringkasan & tombol Terbitkan Resi |
| 9 | Pengirim | **Pembayaran** | Ringkasan order, pilihan metode, QRIS dinamis + countdown 15 menit, nomor VA transfer + tombol salin, atau potong saldo instan |
| 10 | Pengirim | **Resi Terbit** | Centang animasi, nomor resi `LGT-20261107-XXXX`, preview label QR siap cetak, tombol [Bagikan], [Cetak Label], [Jadwalkan Jemput], [Lacak] |
| 11 | Pengirim | **Jadwal Jemput** | Kalender tanggal, grid slot waktu (slot penuh dicoret), catatan kurir, tracker 4 tahap pasca-pesan, banner peringatan 30 menit dengan simulasi demo |
| 12 | Pengirim | **Lacak Paket** | Kolom resi & scanner QR, visualisasi peta darat SVG interaktif responsif dengan rute Jawa-Sumatera, kartu ETA, profil kurir (nama/plat/telepon/chat), timeline status |
| 13 | Pengirim | **Detail Paket** | Data lengkap penerima/pengirim, detail dimensi & isi, status pembayaran, QR resi, dialog pembatalan dengan alasan wajib bila belum dijemput |
| 14 | Pengirim | **Konfirmasi Terima** | Layar penerima: 6 digit kode keamanan serah terima, pilihan kondisi paket (Baik / Penyok / Rusak), catatan, upload foto paket, layar sukses |
| 15 | Pengirim | **Riwayat Pengiriman** | Kolom cari resi/penerima, filter chip status (Semua, Aktif, Terkirim, Gagal, Dibatalkan), kartu riwayat, state kosong berilustrasi |
| 16 | Pengirim | **Saldo & Dompet** | Saldo besar, 3 tab: Mutasi (8 transaksi berlabel masuk hijau/keluar merah), Top Up (chip 50rb, 100rb, 250rb, 500rb), Tarik Dana ke rekening bank |
| 17 | Pengirim | **Notifikasi** | Filter transaksi/promo, daftar notifikasi dengan titik belum dibaca, tombol "Tandai semua dibaca" |
| 18 | Pengirim | **Akun Profil** | Foto profil Felicia, nomor HP & email terverifikasi, menu: Alamat Tersimpan, Rekening Bank, Keamanan, Bahasa, Pasang PWA, Bantuan, Keluar |
| 19 | Pengirim | **Bantuan & Kendala** | Pemilih paket bermasalah, jenis kendala (Keterlambatan, Paket Rusak, Kurir Tidak Datang), deskripsi, upload foto, status tiket pelaporan |
| 20 | Kurir | **Tugas Kurir Hari Ini** | Ringkasan tugas (Jemput 3, Antar 5), daftar tugas berurutan, tombol "Kirim lokasi GPS saya" dengan status "Terakhir dikirim 2 menit lalu" |
| 21 | Kurir | **Detail Tugas Kurir** | Alamat lengkap penerima/pengirim, tombol Buka Navigasi & Telepon, tombol ubah tahapan (Dijemput → Di Gudang → Dalam Perjalanan → Sedang Diantar) |
| 22 | Kurir | **Serah Terima Paket** | Scan QR label, input 6 digit OTP penerima, ambil foto bukti bertanda air waktu & koordinat lokasi, pilihan kondisi, fallback alasan gagal (penerima tidak ada, alamat salah, ditolak) |
| 23 | Admin | **Dashboard Admin** | Kartu KPI armada (Total 6, Diantar 1, Gagal 1, Belum Ditugaskan 1), tabel/kartu paket terfilter, bottom-sheet "Tugaskan Kurir", modal "Catat Kendala" |

---

## 3. Arsitektur Komponen & Manajemen State

```
src/
├── data/
│   └── mockData.ts          # Pengguna, kurir, 6 paket, tarif zona, 8 mutasi saldo
├── types/
│   └── index.ts             # Definisi tipe TypeScript: Paket, Kurir, Mutasi, Layanan
├── components/
│   ├── frame/
│   │   ├── MobileDeviceFrame.tsx # Bingkai 390x844, notch, dynamic island, status bar
│   │   ├── TopControlBar.tsx     # Toggle mode HP / Galeri, peran, state (normal/loading/kosong/offline), toggle BARU
│   │   └── OfflineBanner.tsx     # Indikator koneksi offline di atas layar
│   ├── navigation/
│   │   ├── BottomNavSender.tsx   # Beranda, Kirim, Lacak, Riwayat, Akun
│   │   └── BottomNavCourier.tsx  # Tugas, Scan, Riwayat, Akun
│   ├── common/
│   │   ├── StatusBadge.tsx       # Badge status resmi & badge "BARU"
│   │   ├── EmptyState.tsx        # Tampilan kosong terarah
│   │   ├── SkeletonLoader.tsx    # Efek skeleton untuk mode loading
│   │   └── SvgMapTracker.tsx     # Peta SVG interaktif rute darat Indonesia
│   └── screens/
│       ├── auth/                 # Layar 1 - 5 (Splash, Onboarding, Login, Register, OTP)
│       ├── sender/               # Layar 6 - 19 (Beranda, Cek Ongkir, Kirim Stepper, Bayar, Resi, Jemput, Lacak, Detail, Konfirmasi, Riwayat, Saldo, Notif, Akun, Bantuan)
│       ├── courier/              # Layar 20 - 22 (Tugas Hari Ini, Detail Tugas, Serah Terima)
│       └── admin/                # Layar 23 (Dashboard Admin, Tugaskan Kurir, Catat Kendala)
└── views/
    ├── MobileView.tsx            # Penampil tunggal di dalam bingkai HP dengan navigasi mulus
    └── GalleryView.tsx           # Tampilan grid 23 layar berdampingan untuk tangkapan layar presentasi
```

---

## 4. Rincian Rumus & Logika Ekspedisi

- **Rumus Berat Dikenakan Biaya**:
  $$\text{Berat Volumetrik (kg)} = \frac{P \times L \times T}{5000}$$
  $$\text{Berat Tagihan} = \max(\text{Berat Aktual}, \text{Berat Volumetrik})$$
- **3 Pilihan Layanan**:
  - `Reguler`: Rp 12.000 / kg (Estimasi 2–3 hari)
  - `Express`: Rp 22.000 / kg (Estimasi 1 hari / Besok sampai)
  - `Cargo` (Min 10 kg): Rp 6.500 / kg (Estimasi 3–5 hari)
- **Kondisi Khusus**:
  - COD menghitung biaya penanganan otomatis (1.5% nilai barang).
  - Pembatalan paket dibatasi hanya untuk paket dengan status `Paket Terdaftar` (sebelum dijemput kurir).

---

## 5. Rencana Langkah Kerja

1. **Setup Konfigurasi & Metadata**: Perbarui `metadata.json` dan `index.html` dengan nama "LogiTrack" dan deskripsi profesional e-shipment Indonesia.
2. **Data & Model Data**: Susun `mockData.ts` dengan data Felicia, kurir Andi & Budi, 6 paket lintas pulau Jawa-Sumatera-Sulawesi, dan 8 mutasi saldo.
3. **Komponen Bingkai & Navigasi**: Bangun `MobileDeviceFrame.tsx`, `TopControlBar.tsx`, status bar jam/sinyal/baterai, serta navigasi bottom-bar.
4. **Implementasi Layar A-D**:
   - Modul A: Splash, Onboarding slider, Login, Register, OTP
   - Modul B: Beranda, Cek Ongkir, Stepper Kirim Paket, Bayar QRIS/VA, Resi QR, Jadwal Jemput, Lacak Peta SVG, Detail Paket, Terima OTP, Riwayat, Saldo, Notifikasi, Akun, Bantuan
   - Modul C: Tugas Kurir, Detail Tugas, Serah Terima + Foto Bukti
   - Modul D: Dashboard Admin, Modal Tugaskan & Catat Kendala
5. **Mode Galeri Layar**: Bangun `GalleryView.tsx` yang merender semua 23 layar secara rapi dalam grid responsif dengan label dan deskripsi tiap layar untuk bahan presentasi.
6. **Verifikasi & Build**: Uji kompilasi (`compile_applet` & `lint_applet`), pastikan interaksi tombol dan transisi berjalan bebas error.
