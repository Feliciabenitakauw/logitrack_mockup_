import {
  PackageItem,
  BalanceMutation,
  CourierTask,
  NotificationItem,
  PackageStatus,
} from '../types';

export const CURRENT_USER = {
  nama: 'Felicia',
  email: 'felicia.benita@logitrack.id',
  hp: '0812-3456-7890',
  peran: 'pengirim' as const,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  perusahaan: 'CV Felicia Logistik Nusantara',
  saldo: 1250000,
};

export const COURIERS = [
  {
    id: 'kurir-1',
    nama: 'Andi Saputra',
    hp: '0813-8899-1234',
    platNomor: 'B 4821 TRL',
    wilayah: 'Jakarta Barat & Pusat',
    rating: '4.9',
    totalTerkirim: 1248,
  },
  {
    id: 'kurir-2',
    nama: 'Budi Santoso',
    hp: '0812-7711-5678',
    platNomor: 'B 3190 UTY',
    wilayah: 'Jakarta Selatan & Timur',
    rating: '4.8',
    totalTerkirim: 980,
  },
];

export const SAVED_ADDRESSES = [
  {
    id: 'addr-1',
    label: 'Gudang Utama Pluit',
    penerima: 'Felicia - Gudang',
    hp: '0812-3456-7890',
    kota: 'Jakarta Utara',
    alamat: 'Jl. Pluit Raya No. 42B, Penjaringan, Jakarta Utara, DKI Jakarta 14450',
    isDefault: true,
  },
  {
    id: 'addr-2',
    label: 'Rumah Kemang',
    penerima: 'Felicia Benita',
    hp: '0812-3456-7890',
    kota: 'Jakarta Selatan',
    alamat: 'Jl. Kemang Timur No. 18, Mampang Prapatan, Jakarta Selatan 12730',
    isDefault: false,
  },
  {
    id: 'addr-3',
    label: 'Cabang Toko Surabaya',
    penerima: 'Irfan Wicaksono',
    hp: '0818-0912-4321',
    kota: 'Surabaya',
    alamat: 'Jl. Raya Darmo Permai III No. 8, Dukuh Pakis, Surabaya, Jawa Timur 60226',
    isDefault: false,
  },
];

export const SAVED_BANK_ACCOUNTS = [
  {
    id: 'bank-1',
    bank: 'Bank Central Asia (BCA)',
    nomor: '8210-9923-41',
    atasNama: 'Felicia Benita',
    utama: true,
  },
  {
    id: 'bank-2',
    bank: 'Bank Mandiri',
    nomor: '137-00-881290-4',
    atasNama: 'Felicia Benita',
    utama: false,
  },
];

export const INITIAL_PACKAGES: PackageItem[] = [
  {
    id: 'pkg-1',
    resi: 'LGT-20261107-8821',
    pengirim: {
      nama: 'Felicia (Gudang Pluit)',
      hp: '0812-3456-7890',
      kota: 'Jakarta Utara',
      alamat: 'Jl. Pluit Raya No. 42B, Penjaringan, Jakarta Utara',
    },
    penerima: {
      nama: 'Irfan Wicaksono',
      hp: '0818-0912-4321',
      kota: 'Surabaya',
      alamat: 'Jl. Raya Darmo Permai III No. 8, Surabaya, Jawa Timur',
    },
    detail: {
      isi: 'Suku Cadang Mesin Konveyor',
      kategori: 'Mesin & Industri',
      beratKg: 6.5,
      panjangCm: 40,
      lebarCm: 30,
      tinggiCm: 25,
      nilaiBarang: 4850000,
    },
    layanan: 'Express',
    pembayaran: {
      metode: 'Saldo',
      total: 143000,
      ongkir: 143000,
      asuransi: 0,
      biayaLayanan: 0,
      lunas: true,
    },
    status: 'Sedang Diantar',
    kurir: {
      nama: 'Andi Saputra',
      platNomor: 'B 4821 TRL',
      hp: '0813-8899-1234',
    },
    estimasiTiba: 'Hari ini, 17:00 WIB',
    progressPersen: 85,
    kodeSerahTerima: '492817',
    timeline: [
      {
        waktu: '07 Nov 2026 · 14:15 WIB',
        lokasi: 'Hub Distribusi Surabaya Barat',
        petugas: 'Andi Saputra (Kurir Lapangan)',
        status: 'Sedang Diantar',
        keterangan: 'Paket sedang dibawa kurir menuju alamat penerima.',
      },
      {
        waktu: '07 Nov 2026 · 06:30 WIB',
        lokasi: 'Gudang Sortir Surabaya',
        petugas: 'Bambang Tri (Admin Sortir)',
        status: 'Di Gudang',
        keterangan: 'Paket tiba di gudang tujuan dan telah disortir.',
      },
      {
        waktu: '06 Nov 2026 · 21:00 WIB',
        lokasi: 'Lintas Pantura Jawa (Tol Cipali - Semarang)',
        petugas: 'Truk Ekspedisi Armada D-04',
        status: 'Dalam Perjalanan',
        keterangan: 'Paket dalam perjalanan lintas darat Jawa Tengah.',
      },
      {
        waktu: '06 Nov 2026 · 15:40 WIB',
        lokasi: 'Hub Transit Jakarta Utara',
        petugas: 'Rahmat Hidayat',
        status: 'Dijemput',
        keterangan: 'Paket berhasil dijemput dari pengirim.',
      },
      {
        waktu: '06 Nov 2026 · 11:00 WIB',
        lokasi: 'Sistem LogiTrack Jakarta',
        petugas: 'Sistem Otomatis',
        status: 'Paket Terdaftar',
        keterangan: 'Nomor resi dibuat oleh pengirim Felicia.',
      },
    ],
  },
  {
    id: 'pkg-2',
    resi: 'LGT-20261107-9014',
    pengirim: {
      nama: 'Felicia (Gudang Pluit)',
      hp: '0812-3456-7890',
      kota: 'Jakarta Utara',
      alamat: 'Jl. Pluit Raya No. 42B, Penjaringan, Jakarta Utara',
    },
    penerima: {
      nama: 'Dian Anggraini',
      hp: '0815-4432-8811',
      kota: 'Bandung',
      alamat: 'Jl. Dago Asri No. 12, Coblong, Kota Bandung, Jawa Barat',
    },
    detail: {
      isi: 'Pakaian Tekstil Katun (3 Box)',
      kategori: 'Pakaian & Tekstil',
      beratKg: 8.0,
      panjangCm: 35,
      lebarCm: 30,
      tinggiCm: 20,
      nilaiBarang: 2100000,
    },
    layanan: 'Reguler',
    pembayaran: {
      metode: 'QRIS',
      total: 96000,
      ongkir: 96000,
      asuransi: 0,
      biayaLayanan: 0,
      lunas: true,
    },
    status: 'Paket Terdaftar',
    kurir: {
      nama: 'Andi Saputra',
      platNomor: 'B 4821 TRL',
      hp: '0813-8899-1234',
    },
    estimasiTiba: '09 Nov 2026',
    progressPersen: 15,
    jadwalJemput: {
      tanggal: '07 Nov 2026',
      slot: '13:00 - 15:00 WIB',
      tahap: 'Kurir menuju lokasi',
      catatan: 'Pintu gerbang biru belakang pos satpam, klakson 1x.',
    },
    kodeSerahTerima: '618204',
    timeline: [
      {
        waktu: '07 Nov 2026 · 12:45 WIB',
        lokasi: 'Wilayah Penjaringan',
        petugas: 'Andi Saputra (Kurir Penjemput)',
        status: 'Paket Terdaftar',
        keterangan: 'Kurir menuju lokasi pengirim untuk penjemputan slot 13:00-15:00 WIB.',
      },
      {
        waktu: '07 Nov 2026 · 09:15 WIB',
        lokasi: 'Sistem LogiTrack Jakarta',
        petugas: 'Sistem Otomatis',
        status: 'Paket Terdaftar',
        keterangan: 'Pesanan jemputan paket dikonfirmasi. Resi aktif.',
      },
    ],
  },
  {
    id: 'pkg-3',
    resi: 'LGT-20261106-5120',
    pengirim: {
      nama: 'Percetakan Media Grafika',
      hp: '0821-9988-7711',
      kota: 'Semarang',
      alamat: 'Kawasan Industri Candi Blok 10, Semarang, Jawa Tengah',
    },
    penerima: {
      nama: 'Felicia Benita',
      hp: '0812-3456-7890',
      kota: 'Jakarta Selatan',
      alamat: 'Jl. Kemang Timur No. 18, Mampang Prapatan, Jakarta Selatan',
    },
    detail: {
      isi: 'Katalog & Buku Panduan Produk 120 Eksemplar',
      kategori: 'Percetakan & Kertas',
      beratKg: 14.0,
      panjangCm: 50,
      lebarCm: 40,
      tinggiCm: 30,
      nilaiBarang: 3200000,
    },
    layanan: 'Cargo',
    pembayaran: {
      metode: 'Transfer',
      total: 91000,
      ongkir: 91000,
      asuransi: 0,
      biayaLayanan: 0,
      lunas: true,
    },
    status: 'Dalam Perjalanan',
    kurir: {
      nama: 'Budi Santoso',
      platNomor: 'B 3190 UTY',
      hp: '0812-7711-5678',
    },
    estimasiTiba: 'Besok, 08 Nov 2026 · 10:00 WIB',
    progressPersen: 55,
    kodeSerahTerima: '782341',
    timeline: [
      {
        waktu: '07 Nov 2026 · 04:20 WIB',
        lokasi: 'Tol Trans Jawa KM 210 (Cirebon Barat)',
        petugas: 'Truk LogiTrack Armada C-12',
        status: 'Dalam Perjalanan',
        keterangan: 'Armada kargo transit melintasi ruas Cirebon menuju Hub Utama Jakarta.',
      },
      {
        waktu: '06 Nov 2026 · 18:00 WIB',
        lokasi: 'Gudang Pusat Semarang',
        petugas: 'Agus Purnomo',
        status: 'Di Gudang',
        keterangan: 'Barang telah dimuat ke armada kargo jalur darat malam.',
      },
      {
        waktu: '06 Nov 2026 · 14:10 WIB',
        lokasi: 'Hub Semarang Barat',
        petugas: 'Joko Susilo',
        status: 'Dijemput',
        keterangan: 'Paket berhasil dijemput dari percetakan.',
      },
    ],
  },
  {
    id: 'pkg-4',
    resi: 'LGT-20261105-3301',
    pengirim: {
      nama: 'Koperasi Kopi Karo',
      hp: '0811-6655-4433',
      kota: 'Medan',
      alamat: 'Jl. Sisingamangaraja No. 88, Medan Kota, Sumatera Utara',
    },
    penerima: {
      nama: 'Felicia (Gudang Pluit)',
      hp: '0812-3456-7890',
      kota: 'Jakarta Utara',
      alamat: 'Jl. Pluit Raya No. 42B, Penjaringan, Jakarta Utara',
    },
    detail: {
      isi: 'Biji Kopi Robusta & Arabika Sangrai (5 Kantong)',
      kategori: 'Makanan & Minuman',
      beratKg: 5.0,
      panjangCm: 30,
      lebarCm: 25,
      tinggiCm: 20,
      nilaiBarang: 1250000,
    },
    layanan: 'Reguler',
    pembayaran: {
      metode: 'COD',
      total: 135000,
      ongkir: 115000,
      asuransi: 0,
      biayaLayanan: 20000,
      lunas: true,
    },
    status: 'Terkirim',
    kurir: {
      nama: 'Andi Saputra',
      platNomor: 'B 4821 TRL',
      hp: '0813-8899-1234',
    },
    estimasiTiba: '06 Nov 2026',
    progressPersen: 100,
    kodeSerahTerima: '551980',
    kondisiTerima: 'Baik',
    fotoBukti: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
    timeline: [
      {
        waktu: '06 Nov 2026 · 16:10 WIB',
        lokasi: 'Gudang Pluit, Jakarta Utara',
        petugas: 'Andi Saputra',
        status: 'Terkirim',
        keterangan: 'Paket diterima oleh Felicia. Verifikasi PIN 6 angka valid.',
      },
      {
        waktu: '06 Nov 2026 · 09:30 WIB',
        lokasi: 'Hub Transit Jakarta Utara',
        petugas: 'Andi Saputra',
        status: 'Sedang Diantar',
        keterangan: 'Paket dibawa kurir untuk pengantaran akhir.',
      },
    ],
  },
  {
    id: 'pkg-5',
    resi: 'LGT-20261104-7742',
    pengirim: {
      nama: 'Felicia (Gudang Pluit)',
      hp: '0812-3456-7890',
      kota: 'Jakarta Utara',
      alamat: 'Jl. Pluit Raya No. 42B, Penjaringan, Jakarta Utara',
    },
    penerima: {
      nama: 'Syahril Baharuddin',
      hp: '0852-1100-7766',
      kota: 'Makassar',
      alamat: 'Jl. Somba Opu No. 90, Ujung Pandang, Kota Makassar, Sulawesi Selatan',
    },
    detail: {
      isi: 'Modem Router Industri & Antena Grid',
      kategori: 'Elektronik & Jaringan',
      beratKg: 4.2,
      panjangCm: 45,
      lebarCm: 25,
      tinggiCm: 15,
      nilaiBarang: 3800000,
    },
    layanan: 'Express',
    pembayaran: {
      metode: 'Saldo',
      total: 168000,
      ongkir: 168000,
      asuransi: 0,
      biayaLayanan: 0,
      lunas: true,
    },
    status: 'Gagal Kirim',
    kurir: {
      nama: 'Budi Santoso',
      platNomor: 'B 3190 UTY',
      hp: '0812-7711-5678',
    },
    estimasiTiba: '05 Nov 2026',
    progressPersen: 70,
    kodeSerahTerima: '903412',
    alasanGagal: 'Penerima tidak ada di tempat dan nomor telepon tidak merespons setelah 3 kali upaya hubungi.',
    timeline: [
      {
        waktu: '05 Nov 2026 · 17:35 WITA',
        lokasi: 'Jl. Somba Opu, Makassar',
        petugas: 'Kurir Mitra Makassar',
        status: 'Gagal Kirim',
        keterangan: 'Pengantaran ditunda. Rumah terkunci dan telepon tidak dijawab.',
      },
      {
        waktu: '05 Nov 2026 · 10:15 WITA',
        lokasi: 'Hub Makassar Pelabuhan',
        petugas: 'Armada Laut-Darat',
        status: 'Sedang Diantar',
        keterangan: 'Paket keluar gudang untuk percobaan kirim pertama.',
      },
    ],
  },
  {
    id: 'pkg-6',
    resi: 'LGT-20261103-1199',
    pengirim: {
      nama: 'Felicia (Gudang Pluit)',
      hp: '0812-3456-7890',
      kota: 'Jakarta Utara',
      alamat: 'Jl. Pluit Raya No. 42B, Penjaringan, Jakarta Utara',
    },
    penerima: {
      nama: 'PT Sinar Jaya Logam',
      hp: '031-5544-221',
      kota: 'Surabaya',
      alamat: 'Kawasan Industri Rungkut Blok B No. 3, Surabaya',
    },
    detail: {
      isi: 'Sampel Plat Baja Tipis 1mm',
      kategori: 'Material Bangunan',
      beratKg: 10.0,
      panjangCm: 60,
      lebarCm: 40,
      tinggiCm: 10,
      nilaiBarang: 850000,
    },
    layanan: 'Cargo',
    pembayaran: {
      metode: 'Transfer',
      total: 65000,
      ongkir: 65000,
      asuransi: 0,
      biayaLayanan: 0,
      lunas: false,
    },
    status: 'Dibatalkan',
    estimasiTiba: '-',
    progressPersen: 0,
    kodeSerahTerima: '124987',
    alasanBatal: 'Perubahan jadwal produksi pabrik oleh pengirim sebelum paket dijemput.',
    timeline: [
      {
        waktu: '03 Nov 2026 · 14:00 WIB',
        lokasi: 'Sistem LogiTrack Jakarta',
        petugas: 'Felicia (Pengirim)',
        status: 'Dibatalkan',
        keterangan: 'Pengirim membatalkan pesanan. Dana kembali ke saldo LogiTrack.',
      },
      {
        waktu: '03 Nov 2026 · 11:20 WIB',
        lokasi: 'Sistem LogiTrack Jakarta',
        petugas: 'Sistem Otomatis',
        status: 'Paket Terdaftar',
        keterangan: 'Resi didaftarkan oleh pengirim.',
      },
    ],
  },
];

export const INITIAL_MUTATIONS: BalanceMutation[] = [
  {
    id: 'mut-1',
    tipe: 'keluar',
    nominal: 143000,
    tanggal: '07 Nov 2026 · 10:14 WIB',
    keterangan: 'Ongkir Express Jakarta → Surabaya',
    resiTerkait: 'LGT-20261107-8821',
    metode: 'Saldo LogiTrack',
  },
  {
    id: 'mut-2',
    tipe: 'masuk',
    nominal: 500000,
    tanggal: '06 Nov 2026 · 19:30 WIB',
    keterangan: 'Top Up Saldo via BCA Virtual Account',
    metode: 'BCA VA',
  },
  {
    id: 'mut-3',
    tipe: 'keluar',
    nominal: 168000,
    tanggal: '04 Nov 2026 · 13:45 WIB',
    keterangan: 'Ongkir Express Jakarta → Makassar',
    resiTerkait: 'LGT-20261104-7742',
    metode: 'Saldo LogiTrack',
  },
  {
    id: 'mut-4',
    tipe: 'masuk',
    nominal: 65000,
    tanggal: '03 Nov 2026 · 14:02 WIB',
    keterangan: 'Pengembalian Dana Pembatalan Paket',
    resiTerkait: 'LGT-20261103-1199',
    metode: 'Refund Otomatis',
  },
  {
    id: 'mut-5',
    tipe: 'masuk',
    nominal: 1000000,
    tanggal: '01 Nov 2026 · 09:12 WIB',
    keterangan: 'Top Up Saldo via QRIS Mandiri',
    metode: 'QRIS',
  },
  {
    id: 'mut-6',
    tipe: 'keluar',
    nominal: 250000,
    tanggal: '29 Okt 2026 · 15:20 WIB',
    keterangan: 'Penarikan Dana ke Rekening BCA',
    metode: 'Transfer Bank BCA',
  },
  {
    id: 'mut-7',
    tipe: 'masuk',
    nominal: 350000,
    tanggal: '25 Okt 2026 · 16:40 WIB',
    keterangan: 'Pencairan COD Paket Terkirim',
    resiTerkait: 'LGT-20261025-4122',
    metode: 'Settlement COD',
  },
  {
    id: 'mut-8',
    tipe: 'keluar',
    nominal: 104000,
    tanggal: '22 Okt 2026 · 11:05 WIB',
    keterangan: 'Ongkir Reguler Jakarta → Yogyakarta',
    resiTerkait: 'LGT-20261022-9011',
    metode: 'Saldo LogiTrack',
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    judul: 'Kurir Menuju Lokasi Penjemputan',
    pesan: 'Kurir Andi Saputra sedang menuju ke Gudang Pluit untuk slot 13:00 - 15:00 WIB.',
    waktu: '10 menit lalu',
    dibaca: false,
    kategori: 'transaksi',
    resi: 'LGT-20261107-9014',
  },
  {
    id: 'notif-2',
    judul: 'Paket Mendekati Alamat Penerima',
    pesan: 'Paket LGT-20261107-8821 tujuan Surabaya sedang diantar oleh kurir lapangan.',
    waktu: '45 menit lalu',
    dibaca: false,
    kategori: 'transaksi',
    resi: 'LGT-20261107-8821',
  },
  {
    id: 'notif-3',
    judul: 'Top Up Saldo Berhasil',
    pesan: 'Saldo sebesar Rp 500.000 via BCA VA berhasil ditambahkan ke akun Anda.',
    waktu: 'Kemarin · 19:30 WIB',
    dibaca: true,
    kategori: 'transaksi',
  },
  {
    id: 'notif-4',
    judul: 'Jadwal Operasional Armada Darat',
    pesan: 'Penjemputan kargo jalur tol Trans Jawa tetap beroperasi normal selama akhir pekan.',
    waktu: '2 hari lalu',
    dibaca: true,
    kategori: 'info',
  },
];

export const COURIER_TASKS: CourierTask[] = [
  {
    id: 'task-1',
    tipe: 'jemput',
    packageId: 'pkg-2',
    resi: 'LGT-20261107-9014',
    namaKontak: 'Felicia (Gudang Pluit)',
    hpKontak: '0812-3456-7890',
    kota: 'Jakarta Utara',
    alamat: 'Jl. Pluit Raya No. 42B, Penjaringan',
    slotWaktu: '13:00 - 15:00 WIB',
    status: 'Paket Terdaftar',
    urutan: 1,
    barang: 'Pakaian Tekstil Katun (3 Box)',
    beratKg: 8.0,
  },
  {
    id: 'task-2',
    tipe: 'antar',
    packageId: 'pkg-1',
    resi: 'LGT-20261107-8821',
    namaKontak: 'Irfan Wicaksono',
    hpKontak: '0818-0912-4321',
    kota: 'Surabaya',
    alamat: 'Jl. Raya Darmo Permai III No. 8',
    slotWaktu: '14:00 - 17:00 WIB',
    status: 'Sedang Diantar',
    urutan: 2,
    barang: 'Suku Cadang Mesin Konveyor',
    beratKg: 6.5,
  },
  {
    id: 'task-3',
    tipe: 'jemput',
    packageId: 'pkg-7',
    resi: 'LGT-20261107-9912',
    namaKontak: 'Hendra Saputra',
    hpKontak: '0819-2233-4455',
    kota: 'Jakarta Barat',
    alamat: 'Komplek Duta Indah Iconic Blok C7, Grogol',
    slotWaktu: '15:30 - 17:00 WIB',
    status: 'Paket Terdaftar',
    urutan: 3,
    barang: 'Dokumen Legal & Kontrak Bisnis',
    beratKg: 1.2,
  },
  {
    id: 'task-4',
    tipe: 'antar',
    packageId: 'pkg-8',
    resi: 'LGT-20261107-6621',
    namaKontak: 'Ratna Dewi',
    hpKontak: '0817-4455-6677',
    kota: 'Jakarta Selatan',
    alamat: 'Jl. Radio Dalam Raya No. 34, Kebayoran Baru',
    slotWaktu: '16:00 - 18:00 WIB',
    status: 'Sedang Diantar',
    urutan: 4,
    barang: 'Kosmetik Organik & Skincare',
    beratKg: 2.5,
    cod: 185000,
  },
];

// Perhitungan tarif zona dasar
export function hitungBiayaKirim(
  panjangCm: number,
  lebarCm: number,
  tinggiCm: number,
  beratAktualKg: number,
  layanan: 'Reguler' | 'Express' | 'Cargo',
  kotaAsal: string = 'Jakarta',
  kotaTujuan: string = 'Surabaya'
) {
  const beratVolumetrik = (panjangCm * lebarCm * tinggiCm) / 5000;
  const beratDikenakan = Math.max(
    Math.round(beratAktualKg * 10) / 10,
    Math.round(beratVolumetrik * 10) / 10
  );

  // Tarif per kg berdasarkan zona & layanan
  let tarifPerKg = 12000; // default Reguler Jakarta-Jawa
  let estimasiHari = '2-3 hari';

  if (layanan === 'Express') {
    tarifPerKg = 22000;
    estimasiHari = '1 hari (Besok sampai)';
  } else if (layanan === 'Cargo') {
    tarifPerKg = 6500;
    estimasiHari = '3-5 hari';
  }

  // Minimum kargo 10 kg
  const beratPerhitungan = layanan === 'Cargo' ? Math.max(10, beratDikenakan) : Math.max(1, beratDikenakan);
  const ongkirTotal = Math.round(beratPerhitungan * tarifPerKg);

  return {
    beratAktualKg,
    beratVolumetrik: Math.round(beratVolumetrik * 10) / 10,
    beratDikenakan,
    beratPerhitungan,
    tarifPerKg,
    ongkirTotal,
    estimasiHari,
    biayaAdmin: 0,
    total: ongkirTotal,
  };
}

export const KOTA_LIST = [
  'Jakarta',
  'Bandung',
  'Semarang',
  'Surabaya',
  'Yogyakarta',
  'Malang',
  'Solo',
  'Medan',
  'Palembang',
  'Lampung',
  'Makassar',
  'Denpasar',
];

export const SLOT_JEMPUT = [
  { id: 'slot-1', waktu: '09:00 - 11:00 WIB', tersedia: false }, // penuh / lewat
  { id: 'slot-2', waktu: '11:00 - 13:00 WIB', tersedia: false }, // penuh
  { id: 'slot-3', waktu: '13:00 - 15:00 WIB', tersedia: true },
  { id: 'slot-4', waktu: '15:00 - 17:00 WIB', tersedia: true },
  { id: 'slot-5', waktu: '17:00 - 19:00 WIB', tersedia: true },
];
