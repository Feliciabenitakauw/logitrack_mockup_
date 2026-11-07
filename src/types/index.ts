export type PackageStatus =
  | 'Paket Terdaftar'
  | 'Dijemput'
  | 'Di Gudang'
  | 'Dalam Perjalanan'
  | 'Sedang Diantar'
  | 'Terkirim'
  | 'Gagal Kirim'
  | 'Dibatalkan';

export type UserRole = 'pengirim' | 'kurir' | 'admin';

export type ServiceType = 'Reguler' | 'Express' | 'Cargo';

export type PaymentMethod = 'Saldo' | 'Transfer' | 'QRIS' | 'COD';

export interface TimelineEvent {
  waktu: string;
  lokasi: string;
  petugas: string;
  status: PackageStatus;
  keterangan: string;
}

export interface PackageItem {
  id: string;
  resi: string;
  pengirim: {
    nama: string;
    hp: string;
    kota: string;
    alamat: string;
  };
  penerima: {
    nama: string;
    hp: string;
    kota: string;
    alamat: string;
  };
  detail: {
    isi: string;
    kategori: string;
    beratKg: number;
    panjangCm: number;
    lebarCm: number;
    tinggiCm: number;
    nilaiBarang: number;
  };
  layanan: ServiceType;
  pembayaran: {
    metode: PaymentMethod;
    total: number;
    ongkir: number;
    asuransi: number;
    biayaLayanan: number;
    lunas: boolean;
  };
  status: PackageStatus;
  kurir?: {
    nama: string;
    platNomor: string;
    hp: string;
    foto?: string;
  };
  estimasiTiba: string;
  progressPersen: number;
  jadwalJemput?: {
    tanggal: string;
    slot: string;
    tahap: 'Pesanan diterima' | 'Kurir ditugaskan' | 'Kurir menuju lokasi' | 'Dijemput';
    catatan?: string;
  };
  timeline: TimelineEvent[];
  kodeSerahTerima: string; // 6-digit PIN
  kondisiTerima?: 'Baik' | 'Penyok' | 'Rusak';
  alasanBatal?: string;
  alasanGagal?: string;
  fotoBukti?: string;
}

export interface BalanceMutation {
  id: string;
  tipe: 'masuk' | 'keluar';
  nominal: number;
  tanggal: string;
  keterangan: string;
  resiTerkait?: string;
  metode: string;
}

export interface CourierTask {
  id: string;
  tipe: 'jemput' | 'antar';
  packageId: string;
  resi: string;
  namaKontak: string;
  hpKontak: string;
  kota: string;
  alamat: string;
  slotWaktu: string;
  status: PackageStatus;
  urutan: number;
  barang: string;
  beratKg: number;
  cod?: number;
}

export interface NotificationItem {
  id: string;
  judul: string;
  pesan: string;
  waktu: string;
  dibaca: boolean;
  kategori: 'transaksi' | 'info' | 'promo';
  resi?: string;
}
