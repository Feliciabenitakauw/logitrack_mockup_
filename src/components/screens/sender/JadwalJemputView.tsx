import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Truck,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  QrCode,
  PhoneCall,
  ShieldAlert,
} from 'lucide-react';
import { NewBadge } from '../../common/StatusBadge';
import { SLOT_JEMPUT } from '../../../data/mockData';
import { PackageItem } from '../../../types';

interface JadwalJemputViewProps {
  packageItem?: PackageItem | null;
  showNewBadge: boolean;
  onBack: () => void;
  onSaveSchedule: (slot: string, catatan: string) => void;
}

export const JadwalJemputView: React.FC<JadwalJemputViewProps> = ({
  packageItem,
  showNewBadge,
  onBack,
  onSaveSchedule,
}) => {
  const [selectedDate, setSelectedDate] = useState('07 Nov 2026');
  const [selectedSlot, setSelectedSlot] = useState('13:00 - 15:00 WIB');
  const [catatanKurir, setCatatanKurir] = useState(
    packageItem?.jadwalJemput?.catatan || 'Pintu gerbang biru belakang pos satpam, klakson 1x.'
  );
  const [isBooked, setIsBooked] = useState(!!packageItem?.jadwalJemput);
  const [tahap, setTahap] = useState<
    'Pesanan diterima' | 'Kurir ditugaskan' | 'Kurir menuju lokasi' | 'Dijemput'
  >(packageItem?.jadwalJemput?.tahap || 'Kurir menuju lokasi');
  const [simulatedEscalation, setSimulatedEscalation] = useState(false);

  const dates = [
    { label: 'Hari Ini', date: '07 Nov 2026' },
    { label: 'Besok', date: '08 Nov 2026' },
    { label: 'Lusa', date: '09 Nov 2026' },
  ];

  const handleBook = () => {
    setIsBooked(true);
    setTahap('Kurir menuju lokasi');
    onSaveSchedule(selectedSlot, catatanKurir);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#020617] text-slate-200">
      {/* Top Header */}
      <div className="p-4 border-b border-slate-800 bg-[#0f172a] flex items-center justify-between shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>
        <div className="flex items-center gap-1">
          <span className="text-xs font-bold text-white">Jadwal Jemput Paket</span>
          <NewBadge show={showNewBadge} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {/* Banner Garansi Penjemputan Otomatis */}
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-amber-300">
          <ShieldAlert className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
          <div className="space-y-1">
            <div className="font-semibold text-xs text-amber-200">Protokol Penjemputan Tepat Waktu</div>
            <p className="text-[11px] leading-relaxed text-amber-300/90">
              Jika kurir belum tiba 30 menit setelah slot berakhir, tim operasional LogiTrack otomatis
              dihubungi untuk eskalasi prioritas.
            </p>
          </div>
        </div>

        {/* Status 4 Tahap Penjemputan (Setelah Dipesan) */}
        {isBooked ? (
          <div className="p-4 bg-slate-900 rounded-2xl border border-teal-500/40 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-white text-xs">Status Penjemputan Langsung</span>
              <span className="text-[10px] text-teal-400 font-mono">Slot: {selectedSlot}</span>
            </div>

            {/* Stepper 4 stages */}
            <div className="space-y-3 pt-1">
              {[
                { stage: 'Pesanan diterima', label: '1. Pesanan Diterima', desc: 'Sistem mencatat slot penjemputan' },
                { stage: 'Kurir ditugaskan', label: '2. Kurir Ditugaskan', desc: 'Andi Saputra (B 4821 TRL)' },
                { stage: 'Kurir menuju lokasi', label: '3. Kurir Menuju Lokasi', desc: 'Estimasi tiba 15 menit lagi' },
                { stage: 'Dijemput', label: '4. Paket Dijemput', desc: 'Scan barcode & serah terima' },
              ].map((item, index) => {
                const stagesOrder = ['Pesanan diterima', 'Kurir ditugaskan', 'Kurir menuju lokasi', 'Dijemput'];
                const currentIndex = stagesOrder.indexOf(tahap);
                const isPassed = index <= currentIndex;
                const isCurrent = index === currentIndex;

                return (
                  <div key={item.stage} className="flex items-start gap-3">
                    <div className="relative flex flex-col items-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isCurrent
                            ? 'bg-teal-400 text-slate-950 ring-4 ring-teal-400/20'
                            : isPassed
                            ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                            : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {isPassed ? '✓' : index + 1}
                      </div>
                      {index < 3 && (
                        <div
                          className={`w-0.5 h-6 mt-1 ${
                            index < currentIndex ? 'bg-teal-400' : 'bg-slate-800'
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className={`font-semibold ${isPassed ? 'text-white' : 'text-slate-500'}`}>
                        {item.label}
                      </div>
                      <div className="text-[10px] text-slate-400">{item.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Kurir Card */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between mt-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
                  A
                </div>
                <div>
                  <div className="font-semibold text-white">Andi Saputra</div>
                  <div className="text-[10px] text-slate-400">Plat B 4821 TRL · Honda Vario Kargo</div>
                </div>
              </div>
              <button
                onClick={() => alert('Menghubungi Kurir Andi: 0813-8899-1234')}
                className="p-2 rounded-lg bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 cursor-pointer"
                title="Telepon Kurir"
              >
                <PhoneCall className="w-4 h-4" />
              </button>
            </div>

            {/* Demo Simulation Button for 30m Late Escalation */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setSimulatedEscalation(true)}
                className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-amber-300 font-medium text-[11px] flex items-center justify-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Simulasikan Kurir Terlambat 30 Menit (Demo)</span>
              </button>

              {simulatedEscalation && (
                <div className="mt-2 p-3 bg-rose-500/15 border border-rose-500/40 rounded-xl text-rose-300 text-[11px] space-y-1 animate-in fade-in">
                  <div className="font-bold flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>Eskalasi Operasional Berhasil Dijalankan</span>
                  </div>
                  <p className="text-slate-300">
                    Sistem otomatis mengarahkan armada cadangan terdekat ke lokasi Anda. Tiket eskalasi #ESK-9042 aktif dipantau admin.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : null}

        {/* Date Selector */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">
            1. Pilih Tanggal Penjemputan
          </label>
          <div className="grid grid-cols-3 gap-2">
            {dates.map((d) => (
              <button
                key={d.date}
                type="button"
                onClick={() => setSelectedDate(d.date)}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  selectedDate === d.date
                    ? 'bg-teal-500/20 border-teal-500 text-teal-300 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <span className="block text-[10px] uppercase">{d.label}</span>
                <span className="block text-xs font-semibold text-white mt-0.5">{d.date}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Slot Grid (Slot penuh dicoret) */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">
            2. Pilih Slot Jam
          </label>
          <div className="grid grid-cols-2 gap-2">
            {SLOT_JEMPUT.map((s) => (
              <button
                key={s.id}
                type="button"
                disabled={!s.tersedia}
                onClick={() => setSelectedSlot(s.waktu)}
                className={`p-3 rounded-xl border text-left transition-all relative ${
                  !s.tersedia
                    ? 'bg-slate-900/40 border-slate-800/50 text-slate-600 line-through cursor-not-allowed'
                    : selectedSlot === s.waktu
                    ? 'bg-teal-500/20 border-teal-500 text-teal-300 font-bold shadow-md cursor-pointer'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 cursor-pointer'
                }`}
              >
                <div className="text-xs">{s.waktu}</div>
                <div className="text-[10px] mt-0.5">
                  {!s.tersedia ? 'Slot Penuh / Lewat' : 'Tersedia'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Catatan untuk kurir */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">
            3. Catatan Lokasi untuk Kurir
          </label>
          <textarea
            rows={2}
            value={catatanKurir}
            onChange={(e) => setCatatanKurir(e.target.value)}
            placeholder="Petunjuk akses, warna pagar, atau nomor telepon alternatif..."
            className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs resize-none focus:outline-none focus:border-teal-400"
          />
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 border-t border-slate-800 bg-[#0f172a] shrink-0">
        <button
          onClick={handleBook}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25 active:scale-[0.98] transition-transform cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          <span>{isBooked ? 'Perbarui Jadwal Jemput' : 'Konfirmasi Jadwal Jemput'}</span>
        </button>
      </div>
    </div>
  );
};
