import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Camera,
  AlertCircle,
  Package,
} from 'lucide-react';
import { PackageItem } from '../../../types';

interface KonfirmasiTerimaModalProps {
  packageItem: PackageItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccessConfirm: (packageId: string, kondisi: 'Baik' | 'Penyok' | 'Rusak', catatan: string) => void;
}

export const KonfirmasiTerimaModal: React.FC<KonfirmasiTerimaModalProps> = ({
  packageItem,
  isOpen,
  onClose,
  onSuccessConfirm,
}) => {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [kondisi, setKondisi] = useState<'Baik' | 'Penyok' | 'Rusak'>('Baik');
  const [catatan, setCatatan] = useState('Paket diterima dalam kondisi tersegel baik.');
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !packageItem) return null;

  const handleDigitChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = val;
    setDigits(newDigits);

    if (val && index < 5) {
      document.getElementById(`rcv-digit-${index + 1}`)?.focus();
    }
  };

  const handleAutoFill = () => {
    const code = packageItem.kodeSerahTerima;
    setDigits(code.split(''));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pin = digits.join('');
    if (pin.length < 6) {
      alert('Masukkan 6 digit kode keamanan serah terima.');
      return;
    }
    setIsSuccess(true);
    setTimeout(() => {
      onSuccessConfirm(packageItem.id, kondisi, catatan);
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex flex-col justify-end">
      <div className="w-full bg-[#0f172a] border-t border-slate-800 rounded-t-3xl max-h-[92vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-400" />
            <h3 className="text-sm font-bold text-white">Konfirmasi Penerimaan Paket</h3>
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
          {isSuccess ? (
            <div className="py-8 text-center space-y-3 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-white">Paket Berhasil Dikonfirmasi Diterima!</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Status paket {packageItem.resi} telah diperbarui menjadi "Terkirim". Terima kasih telah menggunakan LogiTrack.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Package summary chip */}
              <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-mono text-teal-300 font-bold block">{packageItem.resi}</span>
                  <div className="text-slate-300 mt-0.5">{packageItem.detail.isi}</div>
                </div>
                <button
                  type="button"
                  onClick={handleAutoFill}
                  className="px-2 py-1 rounded bg-teal-500/20 text-teal-300 text-[10px] font-bold border border-teal-500/40 cursor-pointer"
                >
                  Isi PIN Otomatis ({packageItem.kodeSerahTerima})
                </button>
              </div>

              {/* 6-digit PIN input */}
              <div>
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                  1. Masukkan 6 Digit Kode Penerima (PIN)
                </label>
                <div className="flex items-center justify-between gap-1.5">
                  {digits.map((d, i) => (
                    <input
                      key={i}
                      id={`rcv-digit-${i}`}
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

              {/* Pilihan Kondisi Paket */}
              <div>
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-2">
                  2. Kondisi Fisik Paket Saat Diterima
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'Baik', label: 'Baik & Utuh', desc: 'Kemasan rapi' },
                    { id: 'Penyok', label: 'Penyok / Tergores', desc: 'Kotak cacat' },
                    { id: 'Rusak', label: 'Rusak / Sobek', desc: 'Isi terdampak' },
                  ].map((k) => (
                    <button
                      key={k.id}
                      type="button"
                      onClick={() => setKondisi(k.id as any)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        kondisi === k.id
                          ? k.id === 'Baik'
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                            : 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="text-xs">{k.label}</div>
                      <div className="text-[10px] opacity-75">{k.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Catatan Penerima */}
              <div>
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                  3. Catatan Penerima
                </label>
                <textarea
                  rows={2}
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs resize-none focus:outline-none focus:border-teal-400"
                />
              </div>

              {/* Foto Bukti Barang */}
              <div>
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                  4. Foto Bukti Kondisi Paket (Opsional)
                </label>
                <div
                  onClick={() => setPhotoUploaded(!photoUploaded)}
                  className="p-3 bg-slate-950 rounded-xl border border-dashed border-slate-700 hover:border-teal-400 flex items-center justify-center gap-2 cursor-pointer transition-colors text-slate-400"
                >
                  <Camera className="w-4 h-4 text-teal-400" />
                  <span>
                    {photoUploaded ? 'Foto Bukti Terunggah (Simulasi)' : 'Ketuk untuk Ambil / Unggah Foto'}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25 active:scale-[0.98] transition-transform cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Konfirmasi Paket Diterima</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
