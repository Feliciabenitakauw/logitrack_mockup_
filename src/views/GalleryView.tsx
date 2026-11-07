import React from 'react';
import { ExternalLink, Smartphone } from 'lucide-react';
import { PackageItem, CourierTask, UserRole } from '../types';

// Import all screens
import {
  SplashScreen,
  OnboardingScreen,
  LoginScreen,
  RegisterScreen,
  OtpVerificationScreen,
} from '../components/screens/auth/AuthScreens';
import { SenderHome } from '../components/screens/sender/SenderHome';
import { CekOngkirModal } from '../components/screens/sender/CekOngkirModal';
import { KirimPaketFlow } from '../components/screens/sender/KirimPaketFlow';
import { ResiTerbitModal } from '../components/screens/sender/ResiTerbitModal';
import { JadwalJemputView } from '../components/screens/sender/JadwalJemputView';
import { LacakView } from '../components/screens/sender/LacakView';
import { DetailPaketModal } from '../components/screens/sender/DetailPaketModal';
import { KonfirmasiTerimaModal } from '../components/screens/sender/KonfirmasiTerimaModal';
import { RiwayatView } from '../components/screens/sender/RiwayatView';
import { SaldoView } from '../components/screens/sender/SaldoView';
import {
  NotifikasiView,
  AkunView,
  BantuanModal,
} from '../components/screens/sender/SenderExtraScreens';
import {
  CourierTasksView,
  CourierTaskDetailView,
  CourierHandoverView,
} from '../components/screens/courier/CourierScreens';
import { AdminDashboard } from '../components/screens/admin/AdminDashboard';
import { COURIER_TASKS } from '../data/mockData';

interface GalleryViewProps {
  packages: PackageItem[];
  saldo: number;
  unreadCount: number;
  showNewBadge: boolean;
  onOpenScreenInDevice: (screenId: string) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({
  packages,
  saldo,
  unreadCount,
  showNewBadge,
  onOpenScreenInDevice,
}) => {
  const samplePkg = packages[0];
  const sampleTask = COURIER_TASKS[0];

  const galleryItems = [
    // GROUP A: MASUK
    {
      id: '1_splash',
      no: '01',
      title: 'Splash Screen',
      group: 'A. Masuk',
      desc: 'Logo LogiTrack & tagline ekspedisi darat',
      component: <SplashScreen onStart={() => {}} />,
    },
    {
      id: '2_onboarding',
      no: '02',
      title: 'Onboarding 3 Slide',
      group: 'A. Masuk',
      desc: 'Slide edukasi 4 langkah kirim, peta live & kode PIN',
      component: <OnboardingScreen onFinish={() => {}} onSkip={() => {}} />,
    },
    {
      id: '3_login',
      no: '03',
      title: 'Login Pengguna & Demo',
      group: 'A. Masuk',
      desc: 'Form email/HP, show/hide password, chip demo peran',
      component: <LoginScreen onLogin={() => {}} onGoToRegister={() => {}} onGoToOtp={() => {}} />,
    },
    {
      id: '4_register',
      no: '04',
      title: 'Daftar Akun Baru',
      group: 'A. Masuk',
      desc: 'Form pendaftaran, radio peran Pengirim/Kurir, persetujuan S&K',
      component: <RegisterScreen onRegisterSuccess={() => {}} onBackToLogin={() => {}} />,
    },
    {
      id: '5_otp',
      no: '05',
      title: 'Verifikasi Kode OTP',
      group: 'A. Masuk',
      desc: '6 kotak angka PIN dengan hitung mundur kirim ulang',
      component: <OtpVerificationScreen onVerified={() => {}} onBack={() => {}} />,
    },

    // GROUP B: PENGIRIM
    {
      id: '6_beranda',
      no: '06',
      title: 'Beranda Pengirim',
      group: 'B. Pengirim',
      desc: 'Kartu saldo teal, 4 aksi cepat, paket aktif & jemput hari ini',
      component: (
        <SenderHome
          packages={packages}
          unreadNotifsCount={unreadCount}
          showNewBadge={showNewBadge}
          onNavigateTab={() => {}}
          onOpenCekOngkir={() => {}}
          onOpenJadwalJemput={() => {}}
          onOpenSaldo={() => {}}
          onOpenNotifikasi={() => {}}
          onOpenBantuan={() => {}}
          onSelectPackage={() => {}}
        />
      ),
    },
    {
      id: '7_cek_ongkir',
      no: '07',
      title: 'Cek Ongkir & Volumetrik',
      group: 'B. Pengirim',
      desc: 'Kalkulator P×L×T÷5000, 3 layanan & breakdown bottom-sheet',
      component: (
        <div className="relative h-full flex flex-col justify-end bg-slate-950">
          <CekOngkirModal
            isOpen={true}
            onClose={() => {}}
            onSelectServiceToSend={() => {}}
          />
        </div>
      ),
    },
    {
      id: '8_kirim_paket',
      no: '08',
      title: 'Kirim Paket (Stepper 4)',
      group: 'B. Pengirim',
      desc: 'Alamat, detail muatan, layanan & pembayaran instan',
      component: (
        <KirimPaketFlow
          onSuccessOrder={() => {}}
          onCancel={() => {}}
        />
      ),
    },
    {
      id: '9_pembayaran',
      no: '09',
      title: 'Pembayaran QRIS / VA',
      group: 'B. Pengirim',
      desc: 'QRIS dinamis countdown 15 menit & nomor rekening VA',
      component: (
        <div className="p-4 space-y-3 bg-[#020617] h-full flex flex-col justify-center">
          <div className="p-3 bg-slate-900 rounded-2xl border border-teal-500/40 text-center space-y-2">
            <span className="text-xs font-bold text-white">Pembayaran QRIS Ekspedisi</span>
            <div className="w-32 h-32 mx-auto bg-white p-2 rounded-xl flex items-center justify-center">
              <span className="font-mono text-[9px] text-slate-900 font-bold">QRIS-LOGITRACK</span>
            </div>
            <div className="text-[11px] text-teal-400 font-bold">Total: Rp 143.000</div>
          </div>
        </div>
      ),
    },
    {
      id: '10_resi_terbit',
      no: '10',
      title: 'Resi Terbit & Label QR',
      group: 'B. Pengirim',
      desc: 'Label thermal cetak QR, barcode, nomor resi & PIN terima',
      component: (
        <div className="relative h-full flex flex-col justify-end bg-slate-950">
          <ResiTerbitModal
            packageItem={samplePkg}
            isOpen={true}
            onClose={() => {}}
            onGoToJadwalJemput={() => {}}
            onGoToLacak={() => {}}
          />
        </div>
      ),
    },
    {
      id: '11_jadwal_jemput',
      no: '11',
      title: 'Jadwal Jemput [BARU]',
      group: 'B. Pengirim',
      desc: 'Slot jam penjemputan, live tracking 4 tahap & eskalasi 30 menit',
      component: (
        <JadwalJemputView
          packageItem={packages[1]}
          showNewBadge={showNewBadge}
          onBack={() => {}}
          onSaveSchedule={() => {}}
        />
      ),
    },
    {
      id: '12_lacak',
      no: '12',
      title: 'Lacak Peta Interaktif',
      group: 'B. Pengirim',
      desc: 'Peta darat SVG responsif, ETA tiba, profil kurir & timeline',
      component: (
        <LacakView
          packages={packages}
          selectedResi={samplePkg.resi}
          showNewBadge={showNewBadge}
          onSelectPackage={() => {}}
        />
      ),
    },
    {
      id: '13_detail_paket',
      no: '13',
      title: 'Detail Paket & Pembatalan',
      group: 'B. Pengirim',
      desc: 'Spesifikasi kargo, PIN terima & pembatalan dengan alasan wajib',
      component: (
        <div className="relative h-full flex flex-col justify-end bg-slate-950">
          <DetailPaketModal
            packageItem={samplePkg}
            isOpen={true}
            onClose={() => {}}
            onCancelPackage={() => {}}
            onOpenKonfirmasiTerima={() => {}}
          />
        </div>
      ),
    },
    {
      id: '14_konfirmasi_terima',
      no: '14',
      title: 'Konfirmasi Terima (Penerima)',
      group: 'B. Pengirim',
      desc: 'Input 6 kotak PIN, penilaian kondisi (Baik/Penyok/Rusak)',
      component: (
        <div className="relative h-full flex flex-col justify-end bg-slate-950">
          <KonfirmasiTerimaModal
            packageItem={samplePkg}
            isOpen={true}
            onClose={() => {}}
            onSuccessConfirm={() => {}}
          />
        </div>
      ),
    },
    {
      id: '15_riwayat',
      no: '15',
      title: 'Riwayat Pengiriman',
      group: 'B. Pengirim',
      desc: 'Pencarian resi, filter status chip & kartu paket',
      component: (
        <RiwayatView
          packages={packages}
          onSelectPackage={() => {}}
        />
      ),
    },
    {
      id: '16_saldo',
      no: '16',
      title: 'Saldo & Mutasi [BARU]',
      group: 'B. Pengirim',
      desc: 'Kartu saldo Rp 1.250.000, 8 mutasi masuk/keluar, Top Up & Tarik',
      component: (
        <SaldoView
          saldo={saldo}
          showNewBadge={showNewBadge}
          onBack={() => {}}
          onTopUp={() => {}}
          onWithdraw={() => {}}
        />
      ),
    },
    {
      id: '17_notifikasi',
      no: '17',
      title: 'Notifikasi Aktivitas',
      group: 'B. Pengirim',
      desc: 'Daftar pembaruan kurir, status belum dibaca & tandai dibaca',
      component: (
        <NotifikasiView
          notifications={[
            {
              id: 'n1',
              judul: 'Kurir Menuju Lokasi Penjemputan',
              pesan: 'Kurir Andi Saputra menuju Gudang Pluit slot 13-15.',
              waktu: '10m lalu',
              dibaca: false,
              kategori: 'transaksi',
              resi: 'LGT-20261107-9014',
            },
            {
              id: 'n2',
              judul: 'Paket Mendekati Alamat Penerima',
              pesan: 'Paket tujuan Surabaya sedang diantar oleh kurir.',
              waktu: '45m lalu',
              dibaca: false,
              kategori: 'transaksi',
            },
          ]}
          onMarkAllRead={() => {}}
          onBack={() => {}}
        />
      ),
    },
    {
      id: '18_akun',
      no: '18',
      title: 'Akun & Profil Pengirim',
      group: 'B. Pengirim',
      desc: 'Profil Felicia, buku alamat, rekening bank, PWA & logout',
      component: (
        <AkunView
          onLogout={() => {}}
          onOpenBantuan={() => {}}
        />
      ),
    },
    {
      id: '19_bantuan',
      no: '19',
      title: 'Bantuan & Lapor Kendala',
      group: 'B. Pengirim',
      desc: 'Pilih paket, kategori kendala, foto bukti & nomor tiket',
      component: (
        <div className="relative h-full flex flex-col justify-end bg-slate-950">
          <BantuanModal
            isOpen={true}
            onClose={() => {}}
            packages={packages}
          />
        </div>
      ),
    },

    // GROUP C: KURIR
    {
      id: '20_kurir_tugas',
      no: '20',
      title: 'Kurir: Tugas Hari Ini',
      group: 'C. Kurir',
      desc: 'Ringkasan jemput & antar, tombol kirim lokasi GPS real-time',
      component: (
        <CourierTasksView
          onSelectTask={() => {}}
          showNewBadge={showNewBadge}
        />
      ),
    },
    {
      id: '21_kurir_detail',
      no: '21',
      title: 'Kurir: Detail Tugas',
      group: 'C. Kurir',
      desc: 'Alamat kontak, tombol navigasi rute & transisi 4 tahapan status',
      component: (
        <CourierTaskDetailView
          task={sampleTask}
          onBack={() => {}}
          onProceedHandover={() => {}}
          onUpdateStatus={() => {}}
        />
      ),
    },
    {
      id: '22_kurir_serah_terima',
      no: '22',
      title: 'Kurir: Serah Terima',
      group: 'C. Kurir',
      desc: 'Scan barcode, 6 digit PIN, foto bertanda air GPS & fallback gagal',
      component: (
        <CourierHandoverView
          task={sampleTask}
          onBack={() => {}}
          onComplete={() => {}}
          onFailReport={() => {}}
          showNewBadge={showNewBadge}
        />
      ),
    },

    // GROUP D: ADMIN
    {
      id: '23_admin_dashboard',
      no: '23',
      title: 'Admin: Dashboard Armada',
      group: 'D. Admin',
      desc: 'KPI logistik, penugasan kurir & pencatatan kendala operasional',
      component: (
        <AdminDashboard
          packages={packages}
          onAssignCourier={() => {}}
          onRecordIncident={() => {}}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-6 md:p-8">
      {/* Gallery Header */}
      <div className="max-w-7xl mx-auto mb-8 border-b border-slate-800 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs text-teal-400 font-mono uppercase tracking-widest mb-1">
              Dokumentasi & Pratinjau Presentasi
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Galeri Seluruh 23 Layar Mockup LogiTrack
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Pratinjau lengkap desain aplikasi mobile ekspedisi darat LogiTrack (390×844 px).
              Dikelompokkan rapi untuk keperluan tangkapan layar, evaluasi UX, dan presentasi klien.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-slate-200">23 dari 23 Layar Siap Digunakan</span>
          </div>
        </div>
      </div>

      {/* Grid of 23 Screens */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col bg-slate-900/80 border border-slate-800 hover:border-teal-500/50 rounded-3xl p-3.5 transition-all shadow-lg hover:shadow-teal-500/10 group"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-400 font-mono text-[10px] font-bold flex items-center justify-center">
                  {item.no}
                </span>
                <div>
                  <h3 className="font-bold text-xs text-white leading-tight">{item.title}</h3>
                  <span className="text-[10px] text-slate-400">{item.group}</span>
                </div>
              </div>
              <button
                onClick={() => onOpenScreenInDevice(item.id)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-teal-300 hover:bg-slate-700 transition-colors cursor-pointer"
                title="Buka Interaktif di Bingkai HP"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[11px] text-slate-400 line-clamp-1 mb-2.5">{item.desc}</p>

            {/* Mini Phone Frame (Scaled Mockup 320 x 520) */}
            <div className="relative w-full h-[540px] bg-[#020617] rounded-[36px] border-4 border-slate-800 overflow-hidden flex flex-col shadow-inner">
              {/* Mini Notch / Dynamic Island */}
              <div className="w-full h-7 bg-[#020617] pt-1.5 px-4 flex items-center justify-between shrink-0 z-20">
                <span className="text-[10px] font-semibold text-slate-400 font-mono">09:41</span>
                <div className="w-16 h-3.5 bg-black rounded-full" />
                <span className="text-[9px] text-slate-400 font-bold">94%</span>
              </div>

              {/* Miniature Screen Content */}
              <div className="relative flex-1 overflow-y-auto no-scrollbar bg-[#020617] flex flex-col">
                {item.component}
              </div>

              {/* Bottom Home Indicator */}
              <div className="w-full h-3 bg-[#020617] flex items-center justify-center shrink-0">
                <div className="w-20 h-0.5 bg-slate-700 rounded-full" />
              </div>
            </div>

            {/* Open Button */}
            <button
              onClick={() => onOpenScreenInDevice(item.id)}
              className="mt-3 w-full py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-teal-500/20 text-slate-300 hover:text-teal-300 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Buka di Bingkai HP</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
