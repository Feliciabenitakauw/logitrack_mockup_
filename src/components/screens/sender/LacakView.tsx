import React, { useState } from 'react';
import {
  Search,
  QrCode,
  Truck,
  PhoneCall,
  MessageSquare,
  Clock,
  MapPin,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { SvgMapTracker } from '../../common/SvgMapTracker';
import { StatusBadge, NewBadge } from '../../common/StatusBadge';
import { PackageItem } from '../../../types';

interface LacakViewProps {
  packages: PackageItem[];
  selectedResi?: string;
  showNewBadge: boolean;
  onSelectPackage: (pkg: PackageItem) => void;
}

export const LacakView: React.FC<LacakViewProps> = ({
  packages,
  selectedResi = 'LGT-20261107-8821',
  showNewBadge,
  onSelectPackage,
}) => {
  const [resiInput, setResiInput] = useState(selectedResi);
  const [currentPkg, setCurrentPkg] = useState<PackageItem>(() => {
    return packages.find((p) => p.resi === selectedResi) || packages[0];
  });
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = packages.find(
      (p) => p.resi.toLowerCase().trim() === resiInput.toLowerCase().trim()
    );
    if (found) {
      setCurrentPkg(found);
    } else {
      alert(`Resi ${resiInput} tidak ditemukan. Silakan pilih dari daftar paket aktif.`);
    }
    setSearched(true);
  };

  return (
    <div className="flex-1 flex flex-col p-4 space-y-4 pb-6 overflow-y-auto text-xs">
      {/* 1. Header & Resi Search Bar */}
      <div>
        <h2 className="text-base font-bold text-white mb-2">Lacak Posisi Pengiriman</h2>
        <form onSubmit={handleSearch} className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={resiInput}
              onChange={(e) => setResiInput(e.target.value)}
              placeholder="Masukkan nomor resi LGT-..."
              className="w-full h-11 pl-9 pr-10 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-teal-400 uppercase"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <button
              type="button"
              onClick={() => alert('Membuka kamera untuk memindai barcode resi...')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-teal-400 cursor-pointer"
              title="Scan Barcode"
            >
              <QrCode className="w-4 h-4" />
            </button>
          </div>
          <button
            type="submit"
            className="h-11 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
          >
            Lacak
          </button>
        </form>
      </div>

      {/* 2. Interactive SVG Route Map */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-200">Peta Live Armada Darat</span>
            <NewBadge show={showNewBadge} />
          </div>
          <span className="text-[10px] text-teal-400 font-mono">Pembaruan: Baru saja</span>
        </div>
        <SvgMapTracker
          asal={currentPkg.pengirim.kota}
          tujuan={currentPkg.penerima.kota}
          estimasiTiba={currentPkg.estimasiTiba}
          kurirNama={currentPkg.kurir?.nama || 'Andi Saputra'}
          platNomor={currentPkg.kurir?.platNomor || 'B 4821 TRL'}
        />
      </div>

      {/* 3. KARTU ETA [BARU] & KONDISI JALUR */}
      <div className="p-3.5 bg-slate-900 rounded-2xl border border-teal-500/30 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-teal-400" />
            <span className="font-bold text-white text-xs">Estimasi Waktu Tiba (ETA)</span>
            <NewBadge show={showNewBadge} />
          </div>
          <span className="font-mono font-bold text-teal-300">{currentPkg.estimasiTiba}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-800 text-[11px]">
          <div>
            <span className="text-slate-400 block text-[10px]">Sisa Jarak</span>
            <strong className="text-white font-mono">42 km</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Lalu Lintas</span>
            <strong className="text-emerald-400">Lancar</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Cuaca Jalur</span>
            <strong className="text-slate-200">Cerah 29°C</strong>
          </div>
        </div>
      </div>

      {/* 4. KARTU KURIR PENANGGUNG JAWAB */}
      {currentPkg.kurir && (
        <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-sm">
              {currentPkg.kurir.nama.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white">{currentPkg.kurir.nama}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold">
                  ★ 4.9
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Plat: <span className="text-slate-200 font-mono">{currentPkg.kurir.platNomor}</span> · Kurir Lapangan
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => alert(`Memanggil kurir ${currentPkg.kurir?.nama} (${currentPkg.kurir?.hp})...`)}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-teal-300 cursor-pointer"
              title="Telepon Kurir"
            >
              <PhoneCall className="w-4 h-4" />
            </button>
            <button
              onClick={() => alert(`Membuka obrolan WhatsApp dengan kurir ${currentPkg.kurir?.nama}...`)}
              className="p-2.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 cursor-pointer"
              title="Chat Kurir"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 5. TIMELINE STATUS PENGIRIMAN */}
      <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="font-bold text-white uppercase tracking-wider text-xs">
            Riwayat Perjalanan Paket
          </span>
          <StatusBadge status={currentPkg.status} size="sm" />
        </div>

        <div className="space-y-4 pt-1">
          {currentPkg.timeline.map((event, idx) => (
            <div key={idx} className="flex items-start gap-3 relative">
              <div className="flex flex-col items-center">
                <div
                  className={`w-3.5 h-3.5 rounded-full mt-0.5 ${
                    idx === 0
                      ? 'bg-teal-400 ring-4 ring-teal-400/20'
                      : 'bg-slate-700'
                  }`}
                />
                {idx < currentPkg.timeline.length - 1 && (
                  <div className="w-0.5 h-full min-h-[36px] bg-slate-800 my-1" />
                )}
              </div>

              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className={`font-semibold ${idx === 0 ? 'text-teal-300' : 'text-slate-200'}`}>
                    {event.status}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{event.waktu}</span>
                </div>
                <div className="text-[11px] text-slate-300 font-medium">{event.lokasi}</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{event.keterangan}</p>
                <div className="text-[10px] text-slate-400 pt-0.5">Petugas: {event.petugas}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
