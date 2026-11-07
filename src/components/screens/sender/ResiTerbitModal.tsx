import React, { useState } from 'react';
import {
  CheckCircle2,
  Copy,
  Check,
  Share2,
  Printer,
  Calendar,
  Compass,
  QrCode,
  X,
} from 'lucide-react';
import { PackageItem } from '../../../types';

interface ResiTerbitModalProps {
  packageItem: PackageItem;
  isOpen: boolean;
  onClose: () => void;
  onGoToJadwalJemput: (pkg: PackageItem) => void;
  onGoToLacak: (resi: string) => void;
}

export const ResiTerbitModal: React.FC<ResiTerbitModalProps> = ({
  packageItem,
  isOpen,
  onClose,
  onGoToJadwalJemput,
  onGoToLacak,
}) => {
  const [copied, setCopied] = useState(false);
  const [showPrintToast, setShowPrintToast] = useState(false);

  if (!isOpen) return null;

  const handleCopyResi = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    setShowPrintToast(true);
    setTimeout(() => setShowPrintToast(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex flex-col justify-end">
      <div className="w-full bg-[#0f172a] border-t border-slate-800 rounded-t-3xl max-h-[92vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Resi Berhasil Diterbitkan</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs">
          {/* Success Banner & Resi Copy Box */}
          <div className="p-3.5 bg-slate-900 rounded-2xl border border-teal-500/40 text-center space-y-2">
            <span className="text-[11px] text-teal-300 font-medium uppercase tracking-wider">
              Nomor Resi Resmi LogiTrack
            </span>
            <div className="flex items-center justify-center gap-2">
              <span className="font-mono text-lg font-extrabold text-white tracking-wider">
                {packageItem.resi}
              </span>
              <button
                onClick={handleCopyResi}
                className="p-1.5 rounded-lg bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 transition-colors cursor-pointer"
                title="Salin Resi"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            {copied && <span className="text-[10px] text-emerald-400 font-medium block">Nomor resi berhasil disalin!</span>}
          </div>

          {/* PRATINJAU LABEL QR SIAP CETAK (Thermal Label Mockup) */}
          <div className="p-4 bg-white text-slate-900 rounded-2xl shadow-xl space-y-3 font-sans border-2 border-slate-300 select-none">
            {/* Thermal Label Header */}
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                  LT
                </div>
                <span className="font-black text-sm tracking-tight">LOGITRACK</span>
              </div>
              <span className="font-mono font-bold text-xs px-2 py-0.5 border border-slate-900 uppercase">
                {packageItem.layanan}
              </span>
            </div>

            {/* QR Code and Barcode mockup */}
            <div className="flex items-center gap-3 py-1">
              <div className="w-20 h-20 bg-slate-100 border border-slate-800 p-1 flex items-center justify-center shrink-0">
                <QrCode className="w-18 h-18 text-slate-900" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="text-[10px] font-mono text-slate-500">KODE RESI & VERIFIKASI</div>
                <div className="font-mono font-bold text-xs">{packageItem.resi}</div>
                <div className="text-[11px] font-semibold text-slate-800">
                  PIN Terima: <span className="font-mono text-teal-700 font-extrabold">{packageItem.kodeSerahTerima}</span>
                </div>
                {/* Simulated Barcode Stripes */}
                <div className="w-full h-5 flex items-center gap-[2px] pt-1">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-full ${i % 3 === 0 ? 'w-[3px]' : i % 2 === 0 ? 'w-[1.5px]' : 'w-[1px]'} bg-slate-900`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Route & Package Info */}
            <div className="border-t-2 border-slate-900 pt-2 grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-[9px] text-slate-500 block uppercase font-bold">Pengirim</span>
                <strong className="block truncate">{packageItem.pengirim.nama}</strong>
                <span className="text-slate-600 block text-[10px]">{packageItem.pengirim.kota}</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-500 block uppercase font-bold">Penerima</span>
                <strong className="block truncate">{packageItem.penerima.nama}</strong>
                <span className="text-slate-600 block text-[10px]">{packageItem.penerima.kota}</span>
              </div>
            </div>

            <div className="border-t border-slate-300 pt-2 flex items-center justify-between text-[10px] text-slate-600">
              <span>Isi: <strong>{packageItem.detail.isi}</strong></span>
              <span>Berat: <strong>{packageItem.detail.beratKg} kg</strong></span>
            </div>
          </div>

          {/* Print Toast Simulation */}
          {showPrintToast && (
            <div className="p-2.5 rounded-xl bg-teal-500/20 border border-teal-500 text-teal-300 text-center text-xs animate-in fade-in">
              Mengirim instruksi cetak label ke printer thermal Bluetooth...
            </div>
          )}

          {/* 4 Action Buttons Grid */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handlePrint}
              className="h-11 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-teal-400" />
              <span>Cetak Label</span>
            </button>

            <button
              onClick={() => {
                navigator.clipboard?.writeText(packageItem.resi);
                alert(`Resi ${packageItem.resi} siap dibagikan via WhatsApp!`);
              }}
              className="h-11 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-teal-400" />
              <span>Bagikan Resi</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onGoToJadwalJemput(packageItem);
              }}
              className="h-11 rounded-xl bg-teal-500/15 border border-teal-500/40 text-teal-300 hover:bg-teal-500/25 font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Jadwal Jemput</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onGoToLacak(packageItem.resi);
              }}
              className="h-11 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Lacak Paket</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
