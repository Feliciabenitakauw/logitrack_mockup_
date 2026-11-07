import React from 'react';
import { Smartphone, LayoutGrid, Eye, EyeOff, User, Shield, Truck, AlertTriangle } from 'lucide-react';
import { UserRole } from '../../types';

export type SimulatorState = 'normal' | 'loading' | 'kosong' | 'offline';

interface TopControlBarProps {
  viewMode: 'device' | 'gallery';
  onChangeViewMode: (mode: 'device' | 'gallery') => void;
  activeRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  showNewBadge: boolean;
  onToggleNewBadge: () => void;
  simulatorState: SimulatorState;
  onChangeSimulatorState: (state: SimulatorState) => void;
  activeScreenId: string;
  onSelectScreen: (screenId: string) => void;
}

export const TopControlBar: React.FC<TopControlBarProps> = ({
  viewMode,
  onChangeViewMode,
  activeRole,
  onChangeRole,
  showNewBadge,
  onToggleNewBadge,
  simulatorState,
  onChangeSimulatorState,
  activeScreenId,
  onSelectScreen,
}) => {
  const screens = [
    { id: '1_splash', label: '1. Splash Screen', category: 'A. Masuk' },
    { id: '2_onboarding', label: '2. Onboarding (3 Slide)', category: 'A. Masuk' },
    { id: '3_login', label: '3. Login Pengguna', category: 'A. Masuk' },
    { id: '4_register', label: '4. Daftar Akun', category: 'A. Masuk' },
    { id: '5_otp', label: '5. Verifikasi OTP', category: 'A. Masuk' },
    { id: '6_beranda', label: '6. Beranda Pengirim', category: 'B. Pengirim' },
    { id: '7_cek_ongkir', label: '7. Cek Ongkir & Volumetrik', category: 'B. Pengirim' },
    { id: '8_kirim_paket', label: '8. Kirim Paket (Stepper 4)', category: 'B. Pengirim' },
    { id: '9_pembayaran', label: '9. Pembayaran QRIS/VA', category: 'B. Pengirim' },
    { id: '10_resi_terbit', label: '10. Resi Terbit & Label QR', category: 'B. Pengirim' },
    { id: '11_jadwal_jemput', label: '11. Jadwal Jemput [BARU]', category: 'B. Pengirim' },
    { id: '12_lacak', label: '12. Lacak Peta Interaktif', category: 'B. Pengirim' },
    { id: '13_detail_paket', label: '13. Detail Paket & Batal', category: 'B. Pengirim' },
    { id: '14_konfirmasi_terima', label: '14. Konfirmasi Terima (PIN)', category: 'B. Pengirim' },
    { id: '15_riwayat', label: '15. Riwayat Pengiriman', category: 'B. Pengirim' },
    { id: '16_saldo', label: '16. Saldo & Mutasi [BARU]', category: 'B. Pengirim' },
    { id: '17_notifikasi', label: '17. Notifikasi', category: 'B. Pengirim' },
    { id: '18_akun', label: '18. Akun & Profil', category: 'B. Pengirim' },
    { id: '19_bantuan', label: '19. Bantuan & Kendala', category: 'B. Pengirim' },
    { id: '20_kurir_tugas', label: '20. Kurir: Tugas Hari Ini', category: 'C. Kurir' },
    { id: '21_kurir_detail', label: '21. Kurir: Detail Tugas', category: 'C. Kurir' },
    { id: '22_kurir_serah_terima', label: '22. Kurir: Serah Terima', category: 'C. Kurir' },
    { id: '23_admin_dashboard', label: '23. Admin: Dashboard Armada', category: 'D. Admin' },
  ];

  return (
    <header className="w-full bg-[#0b1324] border-b border-slate-800 text-slate-200 px-4 py-3 shrink-0 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand & View Mode Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center font-bold text-slate-950 text-sm shadow-md">
              LT
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                LogiTrack
                <span className="text-[10px] font-normal text-teal-400 bg-teal-500/10 px-1.5 py-0.5 rounded border border-teal-500/30">
                  Mobile Preview
                </span>
              </h1>
              <p className="text-[11px] text-slate-400">Ekspedisi Darat Nusantara</p>
            </div>
          </div>

          <div className="h-6 w-[1px] bg-slate-800 hidden sm:block" />

          {/* Device Frame vs Gallery Grid Switcher */}
          <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => onChangeViewMode('device')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                viewMode === 'device'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>HP Interaktif</span>
            </button>
            <button
              onClick={() => onChangeViewMode('gallery')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                viewMode === 'gallery'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Galeri Layar (23 Layar)</span>
            </button>
          </div>
        </div>

        {/* Quick jump to screen selector */}
        {viewMode === 'device' && (
          <div className="flex items-center gap-2">
            <label className="text-[11px] text-slate-400 hidden md:block">Layar Langsung:</label>
            <select
              value={activeScreenId}
              onChange={(e) => onSelectScreen(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-teal-500"
            >
              {screens.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Roles & Simulation Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Role selector */}
          <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => onChangeRole('pengirim')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                activeRole === 'pengirim'
                  ? 'bg-slate-800 text-teal-300 font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Pengirim: Felicia"
            >
              <User className="w-3 h-3" />
              <span>Pengirim</span>
            </button>
            <button
              onClick={() => onChangeRole('kurir')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                activeRole === 'kurir'
                  ? 'bg-slate-800 text-teal-300 font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Kurir: Andi Saputra"
            >
              <Truck className="w-3 h-3" />
              <span>Kurir</span>
            </button>
            <button
              onClick={() => onChangeRole('admin')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                activeRole === 'admin'
                  ? 'bg-slate-800 text-teal-300 font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Admin Operasional"
            >
              <Shield className="w-3 h-3" />
              <span>Admin</span>
            </button>
          </div>

          {/* Condition / State simulator */}
          <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs">
            <span className="text-[10px] text-slate-400 px-1.5 hidden lg:inline">Kondisi:</span>
            {(['normal', 'loading', 'kosong', 'offline'] as SimulatorState[]).map((st) => (
              <button
                key={st}
                onClick={() => onChangeSimulatorState(st)}
                className={`px-2 py-1 rounded-md capitalize transition-all text-xs ${
                  simulatorState === st
                    ? 'bg-teal-500/20 text-teal-300 font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Toggle BARU Badge */}
          <button
            onClick={onToggleNewBadge}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              showNewBadge
                ? 'bg-teal-500/15 border-teal-500/40 text-teal-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-300'
            }`}
            title="Tampilkan / sembunyikan label BARU pada fitur inovasi"
          >
            {showNewBadge ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">Label</span> BARU
          </button>
        </div>
      </div>
    </header>
  );
};
