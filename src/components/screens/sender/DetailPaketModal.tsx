import React, { useState } from 'react';
import {
  X,
  Package,
  QrCode,
  AlertTriangle,
  User,
  MapPin,
  Clock,
  CreditCard,
  Ban,
  CheckCircle2,
} from 'lucide-react';
import { StatusBadge } from '../../common/StatusBadge';
import { PackageItem } from '../../../types';

interface DetailPaketModalProps {
  packageItem: PackageItem | null;
  isOpen: boolean;
  onClose: () => void;
  onCancelPackage: (packageId: string, alasan: string) => void;
  onOpenKonfirmasiTerima: (pkg: PackageItem) => void;
}

export const DetailPaketModal: React.FC<DetailPaketModalProps> = ({
  packageItem,
  isOpen,
  onClose,
  onCancelPackage,
  onOpenKonfirmasiTerima,
}) => {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [alasanBatal, setAlasanBatal] = useState('');

  if (!isOpen || !packageItem) return null;

  // Cancellation only allowed if package has not been picked up yet (Paket Terdaftar)
  const canCancel = packageItem.status === 'Paket Terdaftar';

  const handleConfirmCancel = () => {
    if (!alasanBatal.trim()) {
      alert('Alasan pembatalan wajib diisi.');
      return;
    }
    onCancelPackage(packageItem.id, alasanBatal);
    setShowCancelDialog(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex flex-col justify-end">
      <div className="w-full bg-[#0f172a] border-t border-slate-800 rounded-t-3xl max-h-[92vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <span className="font-mono text-xs text-teal-400 font-bold block">{packageItem.resi}</span>
            <h3 className="text-sm font-bold text-white">Detail Informasi Paket</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs">
          {/* Status badge and progress */}
          <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-slate-400 uppercase">Status Pengiriman</div>
              <StatusBadge status={packageItem.status} size="sm" className="mt-1" />
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-400 uppercase">Estimasi Tiba</div>
              <div className="font-bold text-white mt-0.5">{packageItem.estimasiTiba}</div>
            </div>
          </div>

          {/* QR Code Resi Preview */}
          <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex items-center gap-3">
            <div className="w-16 h-16 bg-white p-1 rounded-xl flex items-center justify-center shrink-0">
              <QrCode className="w-14 h-14 text-slate-950" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase">Barcode Resi Scan</span>
              <div className="font-mono font-bold text-white text-xs">{packageItem.resi}</div>
              <div className="text-[11px] text-teal-300 mt-1">
                PIN Serah Terima: <strong className="font-mono">{packageItem.kodeSerahTerima}</strong>
              </div>
            </div>
          </div>

          {/* Pengirim & Penerima Info */}
          <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Pengirim (Asal)</span>
              <div className="font-bold text-white mt-0.5">{packageItem.pengirim.nama}</div>
              <div className="text-[11px] text-slate-400">{packageItem.pengirim.hp}</div>
              <div className="text-[11px] text-slate-300 mt-0.5">{packageItem.pengirim.alamat}</div>
            </div>

            <div className="border-t border-slate-800 pt-2">
              <span className="text-[10px] text-teal-400 uppercase font-semibold">Penerima (Tujuan)</span>
              <div className="font-bold text-white mt-0.5">{packageItem.penerima.nama}</div>
              <div className="text-[11px] text-slate-400">{packageItem.penerima.hp}</div>
              <div className="text-[11px] text-slate-300 mt-0.5">{packageItem.penerima.alamat}</div>
            </div>
          </div>

          {/* Detail Barang & Biaya */}
          <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-white uppercase border-b border-slate-800 pb-1.5">
              Spesifikasi Kargo & Biaya
            </div>
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-400">Isi Barang:</span>
              <strong className="text-white">{packageItem.detail.isi}</strong>
            </div>
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-400">Berat & Dimensi:</span>
              <span>
                {packageItem.detail.beratKg} kg ({packageItem.detail.panjangCm}×{packageItem.detail.lebarCm}×{packageItem.detail.tinggiCm} cm)
              </span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-400">Layanan:</span>
              <span className="font-semibold text-teal-400">{packageItem.layanan}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-400">Metode Pembayaran:</span>
              <span>{packageItem.pembayaran.metode} ({packageItem.pembayaran.lunas ? 'Lunas' : 'Belum Lunas'})</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-800 font-bold text-sm">
              <span className="text-white">Total Tagihan:</span>
              <span className="font-mono text-teal-400">
                Rp {packageItem.pembayaran.total.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* Actions: Penerima PIN Confirmation / Cancel Option */}
          <div className="space-y-2 pt-1">
            <button
              onClick={() => {
                onClose();
                onOpenKonfirmasiTerima(packageItem);
              }}
              className="w-full h-11 rounded-xl bg-teal-500/15 border border-teal-500/40 text-teal-300 font-semibold flex items-center justify-center gap-2 hover:bg-teal-500/25 transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Buka Konfirmasi Terima (Sisi Penerima)</span>
            </button>

            {canCancel && (
              <button
                onClick={() => setShowCancelDialog(true)}
                className="w-full h-11 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 font-semibold flex items-center justify-center gap-2 hover:bg-rose-500/20 transition-colors cursor-pointer"
              >
                <Ban className="w-4 h-4" />
                <span>Batalkan Pengiriman</span>
              </button>
            )}

            {!canCancel && packageItem.status !== 'Dibatalkan' && packageItem.status !== 'Terkirim' && (
              <p className="text-[10px] text-slate-400 text-center">
                Paket telah dalam proses penjemputan/pengantaran dan tidak dapat dibatalkan mandiri.
              </p>
            )}
          </div>
        </div>

        {/* Modal Konfirmasi Batal dengan Wajib Isi Alasan */}
        {showCancelDialog && (
          <div className="absolute inset-0 bg-black/90 p-4 flex flex-col justify-center items-center z-50">
            <div className="w-full max-w-sm bg-slate-900 border border-rose-500/40 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <AlertTriangle className="w-5 h-5" />
                <span>Batalkan Pengiriman Paket?</span>
              </div>
              <p className="text-xs text-slate-300">
                Pengembalian dana akan otomatis diteruskan kembali ke Saldo LogiTrack Anda.
              </p>
              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1">
                  Alasan Pembatalan (Wajib):
                </label>
                <textarea
                  rows={2}
                  value={alasanBatal}
                  onChange={(e) => setAlasanBatal(e.target.value)}
                  placeholder="Contoh: Kesalahan input alamat, perubahan jadwal produksi, dll."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs resize-none focus:outline-none focus:border-rose-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => setShowCancelDialog(false)}
                  className="py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Kembali
                </button>
                <button
                  onClick={handleConfirmCancel}
                  className="py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer"
                >
                  Ya, Batalkan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
