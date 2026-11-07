import React, { useState } from 'react';
import { Search, Filter, PackageOpen, ChevronRight, Clock, ArrowRight } from 'lucide-react';
import { StatusBadge } from '../../common/StatusBadge';
import { PackageItem } from '../../../types';

interface RiwayatViewProps {
  packages: PackageItem[];
  onSelectPackage: (pkg: PackageItem) => void;
}

export const RiwayatView: React.FC<RiwayatViewProps> = ({ packages, onSelectPackage }) => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('Semua');

  const filtered = packages.filter((pkg) => {
    const matchSearch =
      pkg.resi.toLowerCase().includes(search.toLowerCase()) ||
      pkg.penerima.nama.toLowerCase().includes(search.toLowerCase()) ||
      pkg.penerima.kota.toLowerCase().includes(search.toLowerCase()) ||
      pkg.detail.isi.toLowerCase().includes(search.toLowerCase());

    if (!matchSearch) return false;

    if (filterStatus === 'Semua') return true;
    if (filterStatus === 'Aktif') {
      return (
        pkg.status === 'Paket Terdaftar' ||
        pkg.status === 'Dijemput' ||
        pkg.status === 'Di Gudang' ||
        pkg.status === 'Dalam Perjalanan' ||
        pkg.status === 'Sedang Diantar'
      );
    }
    if (filterStatus === 'Terkirim') return pkg.status === 'Terkirim';
    if (filterStatus === 'Gagal') return pkg.status === 'Gagal Kirim';
    if (filterStatus === 'Dibatalkan') return pkg.status === 'Dibatalkan';

    return true;
  });

  return (
    <div className="flex-1 flex flex-col p-4 space-y-3 pb-6 overflow-y-auto text-xs">
      {/* Header */}
      <div>
        <h2 className="text-base font-bold text-white mb-1">Riwayat Pengiriman</h2>
        <p className="text-[11px] text-slate-400">Daftar seluruh paket kargo dan ekspedisi Anda</p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari resi, nama penerima, atau kota..."
          className="w-full h-10 pl-9 pr-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-teal-400"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
      </div>

      {/* Filter Horizontal Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {['Semua', 'Aktif', 'Terkirim', 'Gagal', 'Dibatalkan'].map((f) => (
          <button
            key={f}
            onClick={() => setFilterStatus(f)}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              filterStatus === f
                ? 'bg-teal-500 text-slate-950 font-bold'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Packages List or Empty State */}
      {filtered.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-12 text-center select-none">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-3">
            <PackageOpen className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h4 className="text-sm font-bold text-white mb-1">Tidak Ada Paket Ditemukan</h4>
          <p className="text-xs text-slate-400 max-w-xs">
            Tidak ada riwayat pengiriman yang cocok dengan kata kunci atau filter status terpilih.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filtered.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => onSelectPackage(pkg)}
              className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-teal-300">{pkg.resi}</span>
                <StatusBadge status={pkg.status} size="sm" />
              </div>

              <div className="text-xs font-semibold text-white mb-1">{pkg.detail.isi}</div>

              <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Asal</span>
                  <span>{pkg.pengirim.kota}</span>
                </div>
                <div className="text-slate-600 text-xs">────────►</div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase">Tujuan</span>
                  <span>{pkg.penerima.kota}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                <span>{pkg.layanan} · {pkg.detail.beratKg} kg</span>
                <span className="font-mono font-semibold text-slate-200">
                  Rp {pkg.pembayaran.total.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
