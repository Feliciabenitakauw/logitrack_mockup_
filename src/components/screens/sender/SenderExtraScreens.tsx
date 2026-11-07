import React, { useState } from 'react';
import {
  Bell,
  CheckCheck,
  ChevronRight,
  User,
  MapPin,
  CreditCard,
  Lock,
  Globe,
  Download,
  HelpCircle,
  LogOut,
  X,
  Camera,
  AlertTriangle,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { CURRENT_USER, SAVED_ADDRESSES, SAVED_BANK_ACCOUNTS } from '../../../data/mockData';
import { NotificationItem, PackageItem } from '../../../types';

// ==========================================
// 17. NOTIFIKASI SCREEN
// ==========================================
export const NotifikasiView: React.FC<{
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onBack: () => void;
  onSelectResi?: (resi: string) => void;
}> = ({ notifications, onMarkAllRead, onBack, onSelectResi }) => {
  return (
    <div className="flex-1 flex flex-col p-4 space-y-3 pb-6 overflow-y-auto text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div>
          <h2 className="text-base font-bold text-white">Notifikasi</h2>
          <p className="text-[11px] text-slate-400">Pembaruan kurir dan aktivitas pengiriman</p>
        </div>
        <button
          onClick={onMarkAllRead}
          className="flex items-center gap-1 text-[11px] text-teal-400 hover:underline cursor-pointer"
        >
          <CheckCheck className="w-3.5 h-3.5" />
          <span>Tandai semua dibaca</span>
        </button>
      </div>

      <div className="space-y-2 pt-1">
        {notifications.map((item) => (
          <div
            key={item.id}
            onClick={() => item.resi && onSelectResi?.(item.resi)}
            className={`p-3 rounded-2xl border transition-all cursor-pointer ${
              item.dibaca
                ? 'bg-slate-900/60 border-slate-800 text-slate-400'
                : 'bg-slate-900 border-teal-500/40 text-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                {!item.dibaca && <span className="w-2 h-2 rounded-full bg-teal-400 shrink-0" />}
                <h4 className="font-bold text-xs text-white">{item.judul}</h4>
              </div>
              <span className="text-[10px] text-slate-400 whitespace-nowrap">{item.waktu}</span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">{item.pesan}</p>
            {item.resi && (
              <div className="mt-2 text-[10px] text-teal-400 font-mono flex items-center gap-1">
                <span>Resi: {item.resi}</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 18. AKUN & PROFIL SCREEN
// ==========================================
export const AkunView: React.FC<{
  onLogout: () => void;
  onOpenBantuan: () => void;
}> = ({ onLogout, onOpenBantuan }) => {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);

  return (
    <div className="flex-1 flex flex-col p-4 space-y-4 pb-6 overflow-y-auto text-xs">
      {/* Profile Header */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3.5">
        <div className="w-14 h-14 rounded-full border-2 border-teal-500/50 overflow-hidden bg-slate-800 shrink-0">
          <img
            src={CURRENT_USER.avatar}
            alt={CURRENT_USER.nama}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-bold text-white">{CURRENT_USER.nama}</h3>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-teal-500/20 text-teal-300 font-semibold">
              Terverifikasi
            </span>
          </div>
          <div className="text-[11px] text-slate-400">{CURRENT_USER.email}</div>
          <div className="text-[11px] text-slate-400">{CURRENT_USER.hp}</div>
          <div className="text-[10px] text-teal-400 mt-0.5">{CURRENT_USER.perusahaan}</div>
        </div>
      </div>

      {/* Menu List */}
      <div className="space-y-1 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden p-1">
        <button
          onClick={() => setShowAddressModal(true)}
          className="w-full p-3 flex items-center justify-between hover:bg-slate-800/80 rounded-xl transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center gap-3 text-slate-300">
            <MapPin className="w-4 h-4 text-teal-400" />
            <span>Alamat Tersimpan (3 Gudang & Cabang)</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </button>

        <button
          onClick={() => setShowBankModal(true)}
          className="w-full p-3 flex items-center justify-between hover:bg-slate-800/80 rounded-xl transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center gap-3 text-slate-300">
            <CreditCard className="w-4 h-4 text-teal-400" />
            <span>Rekening Bank & Pembayaran</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </button>

        <button
          onClick={() => alert('Fitur PIN Transaksi & Biometrik aktif.')}
          className="w-full p-3 flex items-center justify-between hover:bg-slate-800/80 rounded-xl transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center gap-3 text-slate-300">
            <Lock className="w-4 h-4 text-teal-400" />
            <span>Keamanan Akun & PIN Transaksi</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </button>

        <button
          onClick={() => alert('Bahasa sistem: Bahasa Indonesia (Baku).')}
          className="w-full p-3 flex items-center justify-between hover:bg-slate-800/80 rounded-xl transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center gap-3 text-slate-300">
            <Globe className="w-4 h-4 text-teal-400" />
            <span>Bahasa Aplikasi (Indonesia)</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </button>

        <button
          onClick={() => alert('Aplikasi siap diinstal sebagai Progressive Web App (PWA).')}
          className="w-full p-3 flex items-center justify-between hover:bg-slate-800/80 rounded-xl transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center gap-3 text-slate-300">
            <Download className="w-4 h-4 text-teal-400" />
            <span>Pasang Aplikasi (PWA Android / iOS)</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </button>

        <button
          onClick={onOpenBantuan}
          className="w-full p-3 flex items-center justify-between hover:bg-slate-800/80 rounded-xl transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center gap-3 text-slate-300">
            <HelpCircle className="w-4 h-4 text-teal-400" />
            <span>Bantuan & Laporkan Masalah</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </button>

        <button
          onClick={onLogout}
          className="w-full p-3 flex items-center justify-between hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer text-left text-rose-400"
        >
          <div className="flex items-center gap-3 font-semibold">
            <LogOut className="w-4 h-4" />
            <span>Keluar dari Akun</span>
          </div>
          <ChevronRight className="w-4 h-4 text-rose-500/50" />
        </button>
      </div>

      {/* Address Book Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex flex-col justify-end">
          <div className="p-4 bg-[#0f172a] rounded-t-3xl border-t border-slate-800 max-h-[80vh] overflow-y-auto space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="text-sm font-bold text-white">Buku Alamat Tersimpan</h4>
              <button onClick={() => setShowAddressModal(false)} className="text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            {SAVED_ADDRESSES.map((addr) => (
              <div key={addr.id} className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between font-bold text-white">
                  <span>{addr.label}</span>
                  {addr.isDefault && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300">
                      Utama
                    </span>
                  )}
                </div>
                <div className="text-slate-300">{addr.penerima} ({addr.hp})</div>
                <div className="text-slate-400 text-[11px]">{addr.alamat}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bank Accounts Modal */}
      {showBankModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex flex-col justify-end">
          <div className="p-4 bg-[#0f172a] rounded-t-3xl border-t border-slate-800 max-h-[80vh] overflow-y-auto space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="text-sm font-bold text-white">Rekening Bank Terdaftar</h4>
              <button onClick={() => setShowBankModal(false)} className="text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            {SAVED_BANK_ACCOUNTS.map((bank) => (
              <div key={bank.id} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">{bank.bank}</div>
                  <div className="font-mono text-teal-300">{bank.nomor}</div>
                  <div className="text-slate-400 text-[10px]">a.n. {bank.atasNama}</div>
                </div>
                {bank.utama && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold">
                    Utama
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 19. BANTUAN & LAPORKAN MASALAH SCREEN
// ==========================================
export const BantuanModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  packages: PackageItem[];
}> = ({ isOpen, onClose, packages }) => {
  const [selectedResi, setSelectedResi] = useState(packages[0]?.resi || '');
  const [kendala, setKendala] = useState('Keterlambatan Armada');
  const [deskripsi, setDeskripsi] = useState('');
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deskripsi.trim()) {
      alert('Deskripsi kendala wajib diisi.');
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex flex-col justify-end">
      <div className="w-full bg-[#0f172a] border-t border-slate-800 rounded-t-3xl max-h-[92vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-teal-400" />
            <h3 className="text-sm font-bold text-white">Pusat Bantuan & Kendala</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-4 text-xs">
          {submitted ? (
            <div className="py-8 text-center space-y-3 animate-in zoom-in-95">
              <div className="w-14 h-14 rounded-full bg-teal-500/20 text-teal-400 mx-auto flex items-center justify-center border border-teal-500/40">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-white">Laporan Berhasil Terkirim!</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Nomor Tiket: <strong className="font-mono text-teal-300">#TIK-20261107-094</strong>. Tim operasional darat LogiTrack akan menindaklanjuti dalam waktu maksimal 30 menit.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                  1. Pilih Nomor Resi Terkait
                </label>
                <select
                  value={selectedResi}
                  onChange={(e) => setSelectedResi(e.target.value)}
                  className="w-full h-10 px-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-teal-400"
                >
                  {packages.map((p) => (
                    <option key={p.id} value={p.resi}>
                      {p.resi} · {p.penerima.kota} ({p.status})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                  2. Kategori Kendala
                </label>
                <select
                  value={kendala}
                  onChange={(e) => setKendala(e.target.value)}
                  className="w-full h-10 px-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-teal-400"
                >
                  <option value="Keterlambatan Armada">Keterlambatan Armada Darat</option>
                  <option value="Paket Rusak/Penyok">Kondisi Kemasan Rusak atau Penyok</option>
                  <option value="Kurir Belum Tiba">Kurir Belum Tiba Sesuai Slot</option>
                  <option value="Alamat Sulit Dicari">Alamat Sulit Ditemukan</option>
                  <option value="Pertanyaan Tarif">Pertanyaan Tarif & Faktur</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                  3. Deskripsi Masalah
                </label>
                <textarea
                  rows={3}
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  placeholder="Ceritakan detail kendala yang Anda alami..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs resize-none focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                  4. Lampirkan Foto Bukti
                </label>
                <div
                  onClick={() => setPhotoUploaded(!photoUploaded)}
                  className="p-3 bg-slate-950 rounded-xl border border-dashed border-slate-700 hover:border-teal-400 flex items-center justify-center gap-2 cursor-pointer transition-colors text-slate-400"
                >
                  <Camera className="w-4 h-4 text-teal-400" />
                  <span>{photoUploaded ? 'Foto Terlampir (Simulasi)' : 'Unggah Foto Resi / Kemasan'}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25 active:scale-[0.98] transition-transform cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Laporan Kendala</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
