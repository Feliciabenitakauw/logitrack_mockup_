import React, { useState } from 'react';
import {
  Bell,
  Eye,
  EyeOff,
  PlusCircle,
  Calculator,
  Compass,
  QrCode,
  ArrowUpRight,
  ArrowDownLeft,
  History,
  ChevronRight,
  Clock,
  Truck,
  HelpCircle,
  Package,
} from 'lucide-react';
import { StatusBadge, NewBadge } from '../../common/StatusBadge';
import { CURRENT_USER } from '../../../data/mockData';
import { PackageItem } from '../../../types';

interface SenderHomeProps {
  packages: PackageItem[];
  unreadNotifsCount: number;
  showNewBadge: boolean;
  onNavigateTab: (tab: any) => void;
  onOpenCekOngkir: () => void;
  onOpenJadwalJemput: () => void;
  onOpenSaldo: () => void;
  onOpenNotifikasi: () => void;
  onOpenBantuan: () => void;
  onSelectPackage: (pkg: PackageItem) => void;
}

export const SenderHome: React.FC<SenderHomeProps> = ({
  packages,
  unreadNotifsCount,
  showNewBadge,
  onNavigateTab,
  onOpenCekOngkir,
  onOpenJadwalJemput,
  onOpenSaldo,
  onOpenNotifikasi,
  onOpenBantuan,
  onSelectPackage,
}) => {
  const [hideBalance, setHideBalance] = useState(false);

  // Active packages (excluding Terkirim & Dibatalkan)
  const activePackages = packages.filter(
    (p) => p.status !== 'Terkirim' && p.status !== 'Dibatalkan'
  );
  const transitCount = packages.filter(
    (p) => p.status === 'Dalam Perjalanan' || p.status === 'Sedang Diantar'
  ).length;
  const waitingPickupCount = packages.filter((p) => p.status === 'Paket Terdaftar').length;

  return (
    <div className="flex-1 flex flex-col p-4 space-y-4 pb-6">
      {/* 1. Header Sapaan & Notif Bell */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-teal-500/40 overflow-hidden bg-slate-800">
            <img
              src={CURRENT_USER.avatar}
              alt={CURRENT_USER.nama}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">Selamat datang kembali,</div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
              <span>Halo, {CURRENT_USER.nama}</span>
              <span className="text-xs">👋</span>
            </h2>
          </div>
        </div>

        <button
          onClick={onOpenNotifikasi}
          className="relative w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          title="Notifikasi"
        >
          <Bell className="w-5 h-5" />
          {unreadNotifsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-md">
              {unreadNotifsCount}
            </span>
          )}
        </button>
      </div>

      {/* 2. KARTU SALDO LOGITRACK (Gradient Teal) [BARU] */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800 p-4 text-white shadow-xl shadow-teal-900/20 border border-teal-400/30">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1">
            <span className="text-xs text-teal-100 font-medium">Saldo LogiTrack</span>
            <NewBadge show={showNewBadge} className="bg-white/20 text-white border-white/30" />
          </div>
          <button
            onClick={() => setHideBalance(!hideBalance)}
            className="text-teal-200 hover:text-white p-1 cursor-pointer transition-colors"
            title={hideBalance ? 'Tampilkan saldo' : 'Sembunyikan saldo'}
          >
            {hideBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        <div className="text-2xl font-extrabold tracking-tight mb-4 font-mono">
          {hideBalance ? '••••••••' : `Rp ${CURRENT_USER.saldo.toLocaleString('id-ID')}`}
        </div>

        {/* 3 Buttons: Top Up, Tarik, Mutasi */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-teal-500/40">
          <button
            onClick={onOpenSaldo}
            className="flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-sm text-xs font-semibold tracking-wide transition-all active:scale-95 cursor-pointer"
          >
            <ArrowDownLeft className="w-3.5 h-3.5 text-teal-200" />
            <span>Top Up</span>
          </button>
          <button
            onClick={onOpenSaldo}
            className="flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-sm text-xs font-semibold tracking-wide transition-all active:scale-95 cursor-pointer"
          >
            <ArrowUpRight className="w-3.5 h-3.5 text-teal-200" />
            <span>Tarik</span>
          </button>
          <button
            onClick={onOpenSaldo}
            className="flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-sm text-xs font-semibold tracking-wide transition-all active:scale-95 cursor-pointer"
          >
            <History className="w-3.5 h-3.5 text-teal-200" />
            <span>Mutasi</span>
          </button>
        </div>
      </div>

      {/* 3. AKSI CEPAT 4 IKON */}
      <div className="grid grid-cols-4 gap-2.5">
        <button
          onClick={() => onNavigateTab('kirim')}
          className="flex flex-col items-center p-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-500/40 transition-all active:scale-95 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-teal-500/15 text-teal-400 flex items-center justify-center mb-1.5 group-hover:bg-teal-500/25 transition-colors">
            <PlusCircle className="w-5 h-5 stroke-[2]" />
          </div>
          <span className="text-[11px] font-medium text-slate-200 text-center leading-tight">
            Kirim Paket
          </span>
        </button>

        <button
          onClick={onOpenCekOngkir}
          className="flex flex-col items-center p-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-500/40 transition-all active:scale-95 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center mb-1.5 group-hover:bg-blue-500/25 transition-colors">
            <Calculator className="w-5 h-5 stroke-[2]" />
          </div>
          <span className="text-[11px] font-medium text-slate-200 text-center leading-tight">
            Cek Ongkir
          </span>
        </button>

        <button
          onClick={() => onNavigateTab('lacak')}
          className="flex flex-col items-center p-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-500/40 transition-all active:scale-95 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-1.5 group-hover:bg-amber-500/25 transition-colors">
            <Compass className="w-5 h-5 stroke-[2]" />
          </div>
          <span className="text-[11px] font-medium text-slate-200 text-center leading-tight">
            Lacak Resi
          </span>
        </button>

        <button
          onClick={() => onNavigateTab('lacak')}
          className="flex flex-col items-center p-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-500/40 transition-all active:scale-95 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center mb-1.5 group-hover:bg-purple-500/25 transition-colors">
            <QrCode className="w-5 h-5 stroke-[2]" />
          </div>
          <span className="text-[11px] font-medium text-slate-200 text-center leading-tight">
            Scan QR
          </span>
        </button>
      </div>

      {/* 4. KARTU INFO JEMPUT HARI INI [BARU] */}
      <div
        onClick={onOpenJadwalJemput}
        className="p-3.5 rounded-2xl bg-slate-900 border border-teal-500/40 flex items-center justify-between cursor-pointer hover:bg-slate-850 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-500/15 text-teal-400 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-white">Jemput Hari Ini: Slot 13–15</span>
              <NewBadge show={showNewBadge} />
            </div>
            <div className="text-[11px] text-teal-300">Kurir Andi Saputra menuju lokasi Anda</div>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 transition-colors" />
      </div>

      {/* 5. RINGKASAN STATUS PENGIRIMAN */}
      <div className="grid grid-cols-3 gap-2">
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider">Paket Aktif</div>
          <div className="text-lg font-bold text-teal-400 font-mono">{activePackages.length}</div>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider">Perjalanan</div>
          <div className="text-lg font-bold text-blue-400 font-mono">{transitCount}</div>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider">Tunggu Jemput</div>
          <div className="text-lg font-bold text-amber-400 font-mono">{waitingPickupCount}</div>
        </div>
      </div>

      {/* 6. PAKET AKTIF (2 KARTU LIVE) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-slate-200 tracking-wide uppercase">
            Paket Sedang Berjalan
          </h3>
          <button
            onClick={() => onNavigateTab('riwayat')}
            className="text-[11px] text-teal-400 hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>Semua Paket</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {activePackages.slice(0, 2).map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => onSelectPackage(pkg)}
              className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-teal-300">{pkg.resi}</span>
                <StatusBadge status={pkg.status} size="sm" />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300 mb-2.5">
                <div className="font-semibold">{pkg.pengirim.kota}</div>
                <div className="text-slate-500 text-[10px]">────────►</div>
                <div className="font-semibold">{pkg.penerima.kota}</div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
                <div
                  className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${pkg.progressPersen}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>Estimasi: {pkg.estimasiTiba}</span>
                </div>
                {pkg.kurir && (
                  <span className="text-slate-300 font-medium">Kurir: {pkg.kurir.nama}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. PINTASAN BANTUAN */}
      <div
        onClick={onOpenBantuan}
        className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between cursor-pointer hover:bg-slate-850 text-xs text-slate-400 transition-colors"
      >
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-teal-400" />
          <span>Pusat Bantuan & Lapor Kendala Logistik</span>
        </div>
        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
      </div>
    </div>
  );
};
