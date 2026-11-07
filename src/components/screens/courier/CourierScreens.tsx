import React, { useState } from 'react';
import {
  ClipboardList,
  Navigation,
  PhoneCall,
  QrCode,
  Camera,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  Send,
  Radio,
  FileText,
  User,
  Package,
} from 'lucide-react';
import { StatusBadge, NewBadge } from '../../common/StatusBadge';
import { COURIER_TASKS } from '../../../data/mockData';
import { CourierTask, PackageStatus } from '../../../types';

// ==========================================
// 20. TUGAS HARI INI (KURIR)
// ==========================================
export const CourierTasksView: React.FC<{
  onSelectTask: (task: CourierTask) => void;
  showNewBadge: boolean;
}> = ({ onSelectTask, showNewBadge }) => {
  const [tasks, setTasks] = useState<CourierTask[]>(COURIER_TASKS);
  const [gpsSentTime, setGpsSentTime] = useState('2 menit lalu');
  const [sendingGps, setSendingGps] = useState(false);

  const jemputCount = tasks.filter((t) => t.tipe === 'jemput').length;
  const antarCount = tasks.filter((t) => t.tipe === 'antar').length;

  const handleSendGps = () => {
    setSendingGps(true);
    setTimeout(() => {
      setSendingGps(false);
      setGpsSentTime('Baru saja');
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col p-4 space-y-3 pb-6 overflow-y-auto text-xs">
      {/* Header Kurir */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] text-teal-400 uppercase tracking-widest font-mono">
            Armada LogiTrack · Kurir Lapangan
          </span>
          <h2 className="text-base font-bold text-white">Tugas Kurir Hari Ini</h2>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 font-mono font-bold text-xs border border-teal-500/40">
          Andi Saputra
        </span>
      </div>

      {/* Ringkasan Tugas: Jemput 3, Antar 5 */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase">Tugas Jemput</span>
            <div className="text-xl font-bold font-mono text-amber-400 mt-0.5">{jemputCount}</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold">
            J
          </div>
        </div>

        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase">Tugas Antar</span>
            <div className="text-xl font-bold font-mono text-teal-400 mt-0.5">{antarCount}</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-teal-500/15 text-teal-400 flex items-center justify-center font-bold">
            A
          </div>
        </div>
      </div>

      {/* Tombol Kirim Lokasi GPS Saya */}
      <div className="p-3.5 bg-slate-900 rounded-2xl border border-teal-500/30 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="font-semibold text-white text-xs">Lokasi GPS Real-Time</div>
            <div className="text-[11px] text-slate-400">Terakhir dikirim: {gpsSentTime}</div>
          </div>
        </div>

        <button
          onClick={handleSendGps}
          disabled={sendingGps}
          className="px-3 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold text-xs active:scale-95 transition-transform cursor-pointer"
        >
          {sendingGps ? 'Mengirim...' : 'Kirim GPS'}
        </button>
      </div>

      {/* Daftar Tugas Berurutan */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Urutan Rute Pengiriman
          </span>
          <span className="text-[10px] text-teal-400">Dioptimalkan Berdasarkan Jarak</span>
        </div>

        {tasks.map((task, index) => {
          const isJemput = task.tipe === 'jemput';
          return (
            <div
              key={task.id}
              onClick={() => onSelectTask(task)}
              className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-500/40 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 font-mono text-[10px] font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      isJemput ? 'bg-amber-500/20 text-amber-300' : 'bg-teal-500/20 text-teal-300'
                    }`}
                  >
                    {isJemput ? 'Jemput Paket' : 'Antar Paket'}
                  </span>
                  <span className="font-mono text-slate-400 text-[10px]">{task.resi}</span>
                </div>
                <StatusBadge status={task.status} size="sm" />
              </div>

              <div className="font-bold text-white text-xs mb-0.5">{task.namaKontak}</div>
              <div className="text-[11px] text-slate-300 flex items-start gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{task.alamat}, {task.kota}</span>
              </div>

              <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>Slot: {task.slotWaktu}</span>
                </span>
                {task.cod && (
                  <span className="font-mono font-bold text-amber-400">
                    COD: Rp {task.cod.toLocaleString('id-ID')}
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 transition-colors" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ==========================================
// 21. DETAIL TUGAS KURIR
// ==========================================
export const CourierTaskDetailView: React.FC<{
  task: CourierTask;
  onBack: () => void;
  onProceedHandover: (task: CourierTask) => void;
  onUpdateStatus: (newStatus: PackageStatus) => void;
}> = ({ task, onBack, onProceedHandover, onUpdateStatus }) => {
  const [currentStatus, setCurrentStatus] = useState<PackageStatus>(task.status);

  const statuses: PackageStatus[] = ['Dijemput', 'Di Gudang', 'Dalam Perjalanan', 'Sedang Diantar'];

  const handleNextStatus = (next: PackageStatus) => {
    setCurrentStatus(next);
    onUpdateStatus(next);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#020617] text-slate-200">
      <div className="p-4 border-b border-slate-800 bg-[#0f172a] flex items-center justify-between shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>
        <span className="font-mono font-bold text-xs text-teal-400">{task.resi}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {/* Contact & Address Card */}
        <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">
              {task.tipe === 'jemput' ? 'Lokasi Penjemputan' : 'Lokasi Pengantaran'}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-mono">
              Urutan ke-{task.urutan}
            </span>
          </div>

          <div>
            <div className="text-sm font-bold text-white">{task.namaKontak}</div>
            <div className="text-[11px] text-slate-400 font-mono">{task.hpKontak}</div>
            <div className="text-xs text-slate-300 mt-1">{task.alamat}, {task.kota}</div>
          </div>

          {/* Quick Buttons: Navigation & Phone */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
            <button
              onClick={() => alert(`Membuka rute Google Maps menuju: ${task.alamat}...`)}
              className="py-2.5 px-3 rounded-xl bg-teal-500/15 border border-teal-500/40 text-teal-300 font-semibold flex items-center justify-center gap-1.5 cursor-pointer hover:bg-teal-500/25 transition-colors"
            >
              <Navigation className="w-4 h-4" />
              <span>Buka Navigasi</span>
            </button>
            <button
              onClick={() => alert(`Memanggil nomor ${task.hpKontak}...`)}
              className="py-2.5 px-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-semibold flex items-center justify-center gap-1.5 cursor-pointer hover:bg-slate-750 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-teal-400" />
              <span>Telepon Kontak</span>
            </button>
          </div>
        </div>

        {/* Cargo Detail */}
        <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 space-y-1.5">
          <div className="text-[10px] font-bold text-slate-400 uppercase">Informasi Muatan</div>
          <div className="text-xs font-semibold text-white">{task.barang}</div>
          <div className="text-[11px] text-slate-400">Berat: {task.beratKg} kg · Slot: {task.slotWaktu}</div>
          {task.cod && (
            <div className="mt-2 p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold flex justify-between items-center">
              <span>Wajib Tagih COD:</span>
              <span className="font-mono text-sm">Rp {task.cod.toLocaleString('id-ID')}</span>
            </div>
          )}
        </div>

        {/* Status Transition Buttons */}
        <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Perbarui Tahapan Tugas</span>
            <StatusBadge status={currentStatus} size="sm" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => handleNextStatus(st)}
                className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                  currentStatus === st
                    ? 'bg-teal-500/20 border-teal-500 text-teal-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-slate-800 bg-[#0f172a] shrink-0">
        <button
          onClick={() => onProceedHandover(task)}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25 active:scale-[0.98] transition-transform cursor-pointer"
        >
          <QrCode className="w-4 h-4" />
          <span>Lanjut ke Serah Terima Paket</span>
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 22. SERAH TERIMA PAKET (KURIR)
// ==========================================
export const CourierHandoverView: React.FC<{
  task: CourierTask;
  onBack: () => void;
  onComplete: () => void;
  onFailReport: (alasan: string) => void;
  showNewBadge: boolean;
}> = ({ task, onBack, onComplete, showNewBadge }) => {
  const [pinDigits, setPinDigits] = useState(['', '', '', '', '', '']);
  const [kondisi, setKondisi] = useState<'Baik' | 'Penyok' | 'Rusak'>('Baik');
  const [photoTaken, setPhotoTaken] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);
  const [alasanGagal, setAlasanGagal] = useState('Penerima tidak ada di tempat');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDigitChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newDigits = [...pinDigits];
    newDigits[index] = val;
    setPinDigits(newDigits);

    if (val && index < 5) {
      document.getElementById(`cour-pin-${index + 1}`)?.focus();
    }
  };

  const handleCompleteHandover = () => {
    const pin = pinDigits.join('');
    if (pin.length < 6) {
      alert('Masukkan 6 digit kode PIN verifikasi dari penerima.');
      return;
    }
    if (!photoTaken) {
      alert('Ambil foto bukti serah terima bertanda air terlebih dahulu.');
      return;
    }
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onComplete();
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#020617] text-slate-200">
      <div className="p-4 border-b border-slate-800 bg-[#0f172a] flex items-center justify-between shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>
        <span className="font-bold text-xs text-white">Serah Terima Paket</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {isSuccess ? (
          <div className="py-12 text-center space-y-3 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-white">Serah Terima Berhasil Diselesaikan!</h4>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Paket {task.resi} resmi berstatus Terkirim. Bukti bertanda air tersimpan di server.
            </p>
          </div>
        ) : (
          <>
            {/* Package details */}
            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-mono text-teal-400 font-bold block">{task.resi}</span>
                <div className="text-white font-semibold mt-0.5">{task.namaKontak}</div>
              </div>
              <button
                type="button"
                onClick={() => setPinDigits(['4', '9', '2', '8', '1', '7'])}
                className="px-2 py-1 rounded bg-teal-500/20 text-teal-300 text-[10px] font-bold border border-teal-500/40 cursor-pointer"
              >
                Isi PIN Cepat
              </button>
            </div>

            {/* 1. Input Kode 6 Digit */}
            <div>
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                1. Minta 6 Digit Kode Penerima (PIN)
              </label>
              <div className="flex items-center justify-between gap-1.5">
                {pinDigits.map((d, i) => (
                  <input
                    key={i}
                    id={`cour-pin-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={d}
                    onChange={(e) => handleDigitChange(i, e.target.value)}
                    className="w-11 h-12 text-center text-lg font-bold text-white bg-slate-950 border border-slate-700 rounded-xl focus:outline-none focus:border-teal-400"
                  />
                ))}
              </div>
            </div>

            {/* 2. Foto Bukti Bertanda Air [BARU] */}
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                  2. Foto Bukti Serah Terima
                </label>
                <NewBadge show={showNewBadge} />
              </div>

              <div
                onClick={() => setPhotoTaken(!photoTaken)}
                className={`p-4 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  photoTaken
                    ? 'bg-teal-500/10 border-teal-500 text-teal-300'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                }`}
              >
                <Camera className="w-8 h-8 mb-2" />
                <div className="font-semibold text-xs text-white">
                  {photoTaken ? 'Foto Bukti Berhasil Diambil' : 'Buka Kamera Serah Terima'}
                </div>
                <div className="text-[10px] text-slate-400 mt-1 max-w-[240px]">
                  Otomatis membubuhkan cap waktu & koordinat satelit GPS pada foto.
                </div>

                {/* Simulated Watermark Badge if taken */}
                {photoTaken && (
                  <div className="mt-3 p-2 rounded-lg bg-black/80 border border-slate-700 text-[9px] font-mono text-left w-full text-slate-300 space-y-0.5">
                    <div>WAKTU: 07 Nov 2026 15:42 WIB</div>
                    <div>LOKASI: -6.1342, 106.7912 (Pluit, Jakarta)</div>
                    <div>PETUGAS: Andi Saputra (B 4821 TRL)</div>
                  </div>
                )}
              </div>
            </div>

            {/* 3. Pilihan Kondisi Fisik Paket */}
            <div>
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                3. Pilihan Kondisi Paket
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Baik', 'Penyok', 'Rusak'] as const).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setKondisi(k)}
                    className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                      kondisi === k
                        ? 'bg-teal-500/20 border-teal-500 text-teal-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleCompleteHandover}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25 active:scale-[0.98] transition-transform cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Selesaikan Pengantaran</span>
              </button>

              <button
                onClick={() => setShowFailModal(true)}
                className="w-full h-11 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 font-semibold flex items-center justify-center gap-2 hover:bg-rose-500/20 transition-colors cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Pengantaran Gagal / Kendala Lapangan</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Modal Alasan Wajib Gagal Kirim */}
      {showFailModal && (
        <div className="fixed inset-0 z-50 bg-black/90 p-4 flex flex-col justify-center items-center">
          <div className="w-full max-w-sm bg-slate-900 border border-rose-500/40 rounded-2xl p-4 space-y-3 text-xs">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <AlertTriangle className="w-5 h-5" />
              <span>Laporkan Gagal Pengantaran</span>
            </div>
            <p className="text-slate-300">
              Pilih alasan baku kegagalan serah terima paket untuk catatan sistem:
            </p>
            <div className="space-y-2">
              {[
                'Penerima tidak ada di tempat / Rumah terkunci',
                'Alamat salah / Tidak dapat ditemukan',
                'Paket ditolak oleh penerima',
                'Nomor kontak tidak merespons setelah 3x upaya',
              ].map((alasan) => (
                <label
                  key={alasan}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer ${
                    alasanGagal === alasan
                      ? 'bg-rose-500/15 border-rose-500 text-rose-300 font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="alasan"
                    checked={alasanGagal === alasan}
                    onChange={() => setAlasanGagal(alasan)}
                    className="hidden"
                  />
                  <span>{alasan}</span>
                </label>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setShowFailModal(false)}
                className="py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  alert(`Status dicatat: Gagal Kirim (${alasanGagal})`);
                  setShowFailModal(false);
                  onComplete();
                }}
                className="py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold cursor-pointer"
              >
                Konfirmasi Gagal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
