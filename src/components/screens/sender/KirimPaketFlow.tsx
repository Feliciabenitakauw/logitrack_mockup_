import React, { useState } from 'react';
import {
  ChevronLeft,
  ArrowRight,
  User,
  Package,
  CreditCard,
  FileCheck2,
  Copy,
  Check,
  Shield,
  QrCode,
  AlertCircle,
  Truck,
} from 'lucide-react';
import { KOTA_LIST, hitungBiayaKirim, CURRENT_USER, SAVED_ADDRESSES } from '../../../data/mockData';
import { PackageItem, ServiceType, PaymentMethod } from '../../../types';

interface KirimPaketFlowProps {
  initialData?: {
    asal: string;
    tujuan: string;
    berat: number;
    panjang: number;
    lebar: number;
    tinggi: number;
    layanan: ServiceType;
  } | null;
  onSuccessOrder: (newPkg: PackageItem) => void;
  onCancel: () => void;
}

export const KirimPaketFlow: React.FC<KirimPaketFlowProps> = ({
  initialData,
  onSuccessOrder,
  onCancel,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Sender & Receiver
  const [pengirimNama, setPengirimNama] = useState('Felicia (Gudang Pluit)');
  const [pengirimHp, setPengirimHp] = useState('0812-3456-7890');
  const [pengirimKota, setPengirimKota] = useState(initialData?.asal || 'Jakarta Utara');
  const [pengirimAlamat, setPengirimAlamat] = useState(
    'Jl. Pluit Raya No. 42B, Penjaringan, Jakarta Utara'
  );

  const [penerimaNama, setPenerimaNama] = useState('Budi Pratama');
  const [penerimaHp, setPenerimaHp] = useState('0813-9988-7766');
  const [penerimaKota, setPenerimaKota] = useState(initialData?.tujuan || 'Surabaya');
  const [penerimaAlamat, setPenerimaAlamat] = useState(
    'Jl. Raya Darmo Permai III No. 8, Sukomanunggal, Surabaya'
  );
  const [simpanAlamat, setSimpanAlamat] = useState(true);

  // Step 2: Package details
  const [isiBarang, setIsiBarang] = useState('Peralatan Mesin Elektronik');
  const [kategori, setKategori] = useState('Mesin & Industri');
  const [beratKg, setBeratKg] = useState(initialData?.berat || 4.5);
  const [panjangCm, setPanjangCm] = useState(initialData?.panjang || 35);
  const [lebarCm, setLebarCm] = useState(initialData?.lebar || 25);
  const [tinggiCm, setTinggiCm] = useState(initialData?.tinggi || 20);
  const [nilaiBarang, setNilaiBarang] = useState(1500000);

  // Step 3: Service & Payment
  const [layanan, setLayanan] = useState<ServiceType>(initialData?.layanan || 'Reguler');
  const [metodeBayar, setMetodeBayar] = useState<PaymentMethod>('Saldo');

  // Step 4: Terms
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [copiedVa, setCopiedVa] = useState(false);
  const [countdownQris, setCountdownQris] = useState(899); // 15 mins

  // Calculation
  const calc = hitungBiayaKirim(panjangCm, lebarCm, tinggiCm, beratKg, layanan, pengirimKota, penerimaKota);
  const codFee = metodeBayar === 'COD' ? Math.round(nilaiBarang * 0.015) : 0;
  const grandTotal = calc.total + codFee;

  const handleCreatePackage = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newResi = `LGT-20261107-${randomSuffix}`;

    const newPkg: PackageItem = {
      id: `pkg-${Date.now()}`,
      resi: newResi,
      pengirim: {
        nama: pengirimNama,
        hp: pengirimHp,
        kota: pengirimKota,
        alamat: pengirimAlamat,
      },
      penerima: {
        nama: penerimaNama,
        hp: penerimaHp,
        kota: penerimaKota,
        alamat: penerimaAlamat,
      },
      detail: {
        isi: isiBarang,
        kategori,
        beratKg,
        panjangCm,
        lebarCm,
        tinggiCm,
        nilaiBarang,
      },
      layanan,
      pembayaran: {
        metode: metodeBayar,
        total: grandTotal,
        ongkir: calc.total,
        asuransi: 0,
        biayaLayanan: codFee,
        lunas: metodeBayar === 'Saldo' || metodeBayar === 'QRIS' || metodeBayar === 'Transfer',
      },
      status: 'Paket Terdaftar',
      estimasiTiba: calc.estimasiHari,
      progressPersen: 10,
      kodeSerahTerima: `${Math.floor(100000 + Math.random() * 900000)}`,
      timeline: [
        {
          waktu: 'Hari ini · Baru saja',
          lokasi: `Hub Ekspedisi ${pengirimKota}`,
          petugas: 'Sistem LogiTrack Terpadu',
          status: 'Paket Terdaftar',
          keterangan: 'Pesanan kirim dibuat oleh pengirim. Resi telah diterbitkan.',
        },
      ],
    };

    onSuccessOrder(newPkg);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#020617] text-slate-200">
      {/* Top Bar with Step indicator */}
      <div className="p-4 border-b border-slate-800 bg-[#0f172a] shrink-0">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => {
              if (step > 1) setStep((s) => (s - 1) as any);
              else onCancel();
            }}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{step === 1 ? 'Batal' : 'Kembali'}</span>
          </button>
          <span className="text-xs font-semibold text-teal-400">Langkah {step} dari 4</span>
        </div>

        {/* 4 Steps Visual Indicators */}
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { num: 1, label: 'Alamat' },
            { num: 2, label: 'Paket' },
            { num: 3, label: 'Layanan' },
            { num: 4, label: 'Bayar' },
          ].map((s) => (
            <div key={s.num} className="flex flex-col gap-1">
              <div
                className={`h-1.5 rounded-full transition-all ${
                  step >= s.num ? 'bg-teal-400' : 'bg-slate-800'
                }`}
              />
              <span
                className={`text-[10px] text-center font-medium ${
                  step === s.num ? 'text-teal-300' : 'text-slate-400'
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {/* ========================================================= */}
        {/* STEP 1: PENGIRIM & PENERIMA */}
        {/* ========================================================= */}
        {step === 1 && (
          <div className="space-y-4">
            {/* Pengirim Card */}
            <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2.5">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
                <User className="w-4 h-4" />
                <span>Data Pengirim (Asal)</span>
              </div>
              <div>
                <label className="text-[11px] text-slate-400">Nama Pengirim</label>
                <input
                  type="text"
                  value={pengirimNama}
                  onChange={(e) => setPengirimNama(e.target.value)}
                  className="w-full h-9 px-3 mt-1 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-400">Nomor HP</label>
                  <input
                    type="tel"
                    value={pengirimHp}
                    onChange={(e) => setPengirimHp(e.target.value)}
                    className="w-full h-9 px-3 mt-1 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400">Kota Asal</label>
                  <select
                    value={pengirimKota}
                    onChange={(e) => setPengirimKota(e.target.value)}
                    className="w-full h-9 px-2.5 mt-1 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  >
                    {KOTA_LIST.map((k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[11px] text-slate-400">Alamat Lengkap Jemput</label>
                <textarea
                  rows={2}
                  value={pengirimAlamat}
                  onChange={(e) => setPengirimAlamat(e.target.value)}
                  className="w-full p-2.5 mt-1 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs resize-none"
                />
              </div>
            </div>

            {/* Penerima Card */}
            <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
                  <User className="w-4 h-4" />
                  <span>Data Penerima (Tujuan)</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const sample = SAVED_ADDRESSES[2];
                    setPenerimaNama(sample.penerima);
                    setPenerimaHp(sample.hp);
                    setPenerimaKota(sample.kota);
                    setPenerimaAlamat(sample.alamat);
                  }}
                  className="text-[11px] text-teal-400 hover:underline cursor-pointer"
                >
                  Pilih Alamat Tersimpan
                </button>
              </div>

              <div>
                <label className="text-[11px] text-slate-400">Nama Penerima</label>
                <input
                  type="text"
                  value={penerimaNama}
                  onChange={(e) => setPenerimaNama(e.target.value)}
                  className="w-full h-9 px-3 mt-1 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-400">Nomor HP</label>
                  <input
                    type="tel"
                    value={penerimaHp}
                    onChange={(e) => setPenerimaHp(e.target.value)}
                    className="w-full h-9 px-3 mt-1 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400">Kota Tujuan</label>
                  <select
                    value={penerimaKota}
                    onChange={(e) => setPenerimaKota(e.target.value)}
                    className="w-full h-9 px-2.5 mt-1 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  >
                    {KOTA_LIST.map((k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400">Alamat Lengkap Pengantaran</label>
                <textarea
                  rows={2}
                  value={penerimaAlamat}
                  onChange={(e) => setPenerimaAlamat(e.target.value)}
                  className="w-full p-2.5 mt-1 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs resize-none"
                />
              </div>

              <label className="flex items-center gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={simpanAlamat}
                  onChange={(e) => setSimpanAlamat(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-teal-500"
                />
                <span className="text-[11px] text-slate-300">Simpan ke Buku Alamat Saya</span>
              </label>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 2: DETAIL PAKET */}
        {/* ========================================================= */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
                <Package className="w-4 h-4" />
                <span>Deskripsi & Dimensi Paket</span>
              </div>

              <div>
                <label className="text-[11px] text-slate-400">Nama / Isi Barang</label>
                <input
                  type="text"
                  value={isiBarang}
                  onChange={(e) => setIsiBarang(e.target.value)}
                  className="w-full h-9 px-3 mt-1 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400">Kategori Barang</label>
                <select
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  className="w-full h-9 px-2.5 mt-1 bg-slate-950 border border-slate-700 rounded-xl text-white"
                >
                  <option value="Mesin & Industri">Mesin & Industri</option>
                  <option value="Pakaian & Tekstil">Pakaian & Tekstil</option>
                  <option value="Elektronik & Gadget">Elektronik & Gadget</option>
                  <option value="Makanan & Minuman">Makanan & Minuman</option>
                  <option value="Dokumen & Cetakan">Dokumen & Cetakan</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-400">Berat Aktual (kg)</label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="number"
                    step="0.5"
                    min="0.1"
                    value={beratKg}
                    onChange={(e) => setBeratKg(parseFloat(e.target.value) || 0)}
                    className="w-24 h-9 px-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono font-bold"
                  />
                  <span className="text-slate-400">Kilogram</span>
                </div>
              </div>

              <div>
                <div className="text-[11px] text-slate-400 mb-1">Dimensi Luar (Panjang × Lebar × Tinggi)</div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400">P (cm)</span>
                    <input
                      type="number"
                      value={panjangCm}
                      onChange={(e) => setPanjangCm(parseInt(e.target.value) || 0)}
                      className="w-full h-9 px-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-center"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400">L (cm)</span>
                    <input
                      type="number"
                      value={lebarCm}
                      onChange={(e) => setLebarCm(parseInt(e.target.value) || 0)}
                      className="w-full h-9 px-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-center"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400">T (cm)</span>
                    <input
                      type="number"
                      value={tinggiCm}
                      onChange={(e) => setTinggiCm(parseInt(e.target.value) || 0)}
                      className="w-full h-9 px-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-center"
                    />
                  </div>
                </div>
              </div>

              {/* Volumetric calculation preview */}
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px] space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Berat Volumetrik (P×L×T÷5000):</span>
                  <span className="text-slate-200 font-mono font-semibold">{calc.beratVolumetrik} kg</span>
                </div>
                <div className="flex justify-between font-semibold text-teal-400">
                  <span>Berat Dikenakan Biaya:</span>
                  <span className="font-mono">{calc.beratDikenakan} kg</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400">Perkiraan Nilai Barang (Rp)</label>
                <input
                  type="number"
                  value={nilaiBarang}
                  onChange={(e) => setNilaiBarang(parseInt(e.target.value) || 0)}
                  className="w-full h-9 px-3 mt-1 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                  placeholder="Rp 1.000.000"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Nilai proteksi dan acuan perhitungan COD bila menggunakan bayar di tempat.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 3: LAYANAN & PEMBAYARAN */}
        {/* ========================================================= */}
        {step === 3 && (
          <div className="space-y-4">
            {/* Service Selection */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                Pilih Jenis Layanan
              </label>

              {(['Reguler', 'Express', 'Cargo'] as ServiceType[]).map((srv) => {
                const srvCalc = hitungBiayaKirim(panjangCm, lebarCm, tinggiCm, beratKg, srv, pengirimKota, penerimaKota);
                return (
                  <div
                    key={srv}
                    onClick={() => setLayanan(srv)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      layanan === srv
                        ? 'bg-teal-500/15 border-teal-500/60 shadow-md'
                        : 'bg-slate-900 border-slate-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-white text-xs">
                        <span>{srv}</span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          · {srvCalc.estimasiHari}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {srv === 'Reguler'
                          ? 'Standar jalur darat'
                          : srv === 'Express'
                          ? 'Prioritas armada besok tiba'
                          : 'Partai kargo hemat min. 10kg'}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-teal-400 text-xs">
                        Rp {srvCalc.ongkirTotal.toLocaleString('id-ID')}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Payment Method */}
            <div className="space-y-2 pt-2">
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                Metode Pembayaran
              </label>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'Saldo', label: 'Saldo LogiTrack', desc: 'Instan potong saldo' },
                  { id: 'QRIS', label: 'QRIS Dinamis', desc: 'Gopay, OVO, BCA' },
                  { id: 'Transfer', label: 'Transfer VA', desc: 'BCA, Mandiri, BRI' },
                  { id: 'COD', label: 'COD (Bayar Ditempat)', desc: '+1.5% biaya admin' },
                ].map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setMetodeBayar(m.id as PaymentMethod)}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                      metodeBayar === m.id
                        ? 'bg-teal-500/15 border-teal-500/60 text-teal-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="font-bold text-xs text-white">{m.label}</div>
                    <div className="text-[10px] text-slate-400 leading-tight mt-0.5">{m.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Summary */}
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Ongkir ({calc.beratDikenakan} kg × Rp {calc.tarifPerKg.toLocaleString('id-ID')})</span>
                <span className="font-mono text-slate-200">Rp {calc.ongkirTotal.toLocaleString('id-ID')}</span>
              </div>
              {metodeBayar === 'COD' && (
                <div className="flex justify-between text-amber-400">
                  <span>Biaya Penanganan COD (1.5%)</span>
                  <span className="font-mono">Rp {codFee.toLocaleString('id-ID')}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>Biaya Asuransi</span>
                <span className="font-mono text-emerald-400 font-semibold">Gratis (Standar)</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800 font-bold text-sm text-white">
                <span>Total Pembayaran</span>
                <span className="font-mono text-teal-400">Rp {grandTotal.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 4: KONFIRMASI RINGKASAN & ACTION */}
        {/* ========================================================= */}
        {step === 4 && (
          <div className="space-y-4">
            {/* Summary card */}
            <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Ringkasan Kirim</span>
                <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-bold">
                  {layanan}
                </span>
              </div>

              <div className="text-xs space-y-1">
                <div className="text-slate-400">Rute Pengiriman:</div>
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <span>{pengirimKota}</span>
                  <span className="text-teal-400">────►</span>
                  <span>{penerimaKota}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-slate-400">
                <div>
                  <span>Penerima:</span>
                  <div className="font-medium text-slate-200">{penerimaNama}</div>
                  <div className="text-[10px]">{penerimaHp}</div>
                </div>
                <div>
                  <span>Paket:</span>
                  <div className="font-medium text-slate-200">{isiBarang}</div>
                  <div className="text-[10px]">{calc.beratDikenakan} kg (Volumetrik)</div>
                </div>
              </div>
            </div>

            {/* Payment instructions based on method */}
            {metodeBayar === 'QRIS' && (
              <div className="p-3.5 bg-slate-900 rounded-2xl border border-teal-500/40 text-center space-y-2">
                <div className="text-xs font-bold text-white flex items-center justify-center gap-1.5">
                  <QrCode className="w-4 h-4 text-teal-400" />
                  <span>Scan QRIS untuk Menyelesaikan Pesanan</span>
                </div>
                {/* Simulated QR Code box */}
                <div className="w-36 h-36 mx-auto bg-white p-2 rounded-xl flex items-center justify-center shadow-lg">
                  <div className="w-full h-full border-2 border-slate-900 flex flex-col items-center justify-center bg-slate-100">
                    <QrCode className="w-24 h-24 text-slate-900" />
                    <span className="text-[8px] font-mono text-slate-800 font-bold">LOGITRACK-QRIS</span>
                  </div>
                </div>
                <div className="text-[11px] text-amber-400">
                  Berlaku 14:59 menit · Total: <strong>Rp {grandTotal.toLocaleString('id-ID')}</strong>
                </div>
              </div>
            )}

            {metodeBayar === 'Transfer' && (
              <div className="p-3.5 bg-slate-900 rounded-2xl border border-teal-500/40 space-y-2">
                <div className="text-xs font-bold text-white">Nomor Virtual Account BCA</div>
                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="font-mono text-sm font-bold text-teal-300">8210-9923-4188</span>
                  <button
                    onClick={() => {
                      setCopiedVa(true);
                      setTimeout(() => setCopiedVa(false), 2000);
                    }}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
                  >
                    {copiedVa ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedVa ? 'Tersalin' : 'Salin'}</span>
                  </button>
                </div>
                <div className="text-[10px] text-slate-400">
                  Transfer tepat <strong>Rp {grandTotal.toLocaleString('id-ID')}</strong> sebelum verifikasi.
                </div>
              </div>
            )}

            {metodeBayar === 'Saldo' && (
              <div className="p-3 bg-teal-500/10 rounded-2xl border border-teal-500/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-teal-300">Saldo LogiTrack Anda</div>
                  <div className="text-[11px] text-slate-400">
                    Sisa saldo setelah transaksi: Rp {(CURRENT_USER.saldo - grandTotal).toLocaleString('id-ID')}
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-white">
                  -Rp {grandTotal.toLocaleString('id-ID')}
                </span>
              </div>
            )}

            {/* Terms checkbox */}
            <label className="flex items-start gap-2 pt-1 text-[11px] text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 rounded border-slate-700 bg-slate-900 text-teal-500"
              />
              <span>
                Saya menyatakan isi paket sesuai ketentuan kargo darat dan menyetujui ketentuan penerbitan resi.
              </span>
            </label>
          </div>
        )}
      </div>

      {/* Fixed Bottom Action Button */}
      <div className="p-4 border-t border-slate-800 bg-[#0f172a] shrink-0">
        {step < 4 ? (
          <button
            onClick={() => setStep((s) => (s + 1) as any)}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25 active:scale-[0.98] transition-transform cursor-pointer"
          >
            <span>Lanjutkan Langkah {step + 1}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleCreatePackage}
            disabled={!agreeTerms}
            className={`w-full h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-transform cursor-pointer ${
              agreeTerms
                ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-teal-500/25 active:scale-[0.98]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Terbitkan Resi LogiTrack</span>
          </button>
        )}
      </div>
    </div>
  );
};
