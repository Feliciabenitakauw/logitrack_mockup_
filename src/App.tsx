import React, { useState } from 'react';
import { MobileDeviceFrame } from './components/frame/MobileDeviceFrame';
import { TopControlBar, SimulatorState } from './components/frame/TopControlBar';
import { BottomNavSender, SenderTab } from './components/navigation/BottomNavSender';
import { BottomNavCourier, CourierTab } from './components/navigation/BottomNavCourier';
import { SkeletonLoader } from './components/common/SkeletonLoader';

// Data & Types
import {
  INITIAL_PACKAGES,
  INITIAL_NOTIFICATIONS,
  COURIER_TASKS,
  CURRENT_USER,
} from './data/mockData';
import { PackageItem, CourierTask, UserRole, PackageStatus, ServiceType } from './types';

// Screens
import {
  SplashScreen,
  OnboardingScreen,
  LoginScreen,
  RegisterScreen,
  OtpVerificationScreen,
} from './components/screens/auth/AuthScreens';
import { SenderHome } from './components/screens/sender/SenderHome';
import { CekOngkirModal } from './components/screens/sender/CekOngkirModal';
import { KirimPaketFlow } from './components/screens/sender/KirimPaketFlow';
import { ResiTerbitModal } from './components/screens/sender/ResiTerbitModal';
import { JadwalJemputView } from './components/screens/sender/JadwalJemputView';
import { LacakView } from './components/screens/sender/LacakView';
import { DetailPaketModal } from './components/screens/sender/DetailPaketModal';
import { KonfirmasiTerimaModal } from './components/screens/sender/KonfirmasiTerimaModal';
import { RiwayatView } from './components/screens/sender/RiwayatView';
import { SaldoView } from './components/screens/sender/SaldoView';
import {
  NotifikasiView,
  AkunView,
  BantuanModal,
} from './components/screens/sender/SenderExtraScreens';
import {
  CourierTasksView,
  CourierTaskDetailView,
  CourierHandoverView,
} from './components/screens/courier/CourierScreens';
import { AdminDashboard } from './components/screens/admin/AdminDashboard';
import { GalleryView } from './views/GalleryView';

export default function App() {
  // Global View Mode
  const [viewMode, setViewMode] = useState<'device' | 'gallery'>('device');
  const [activeRole, setActiveRole] = useState<UserRole>('pengirim');
  const [simulatorState, setSimulatorState] = useState<SimulatorState>('normal');
  const [showNewBadge, setShowNewBadge] = useState(true);

  // Data Store
  const [packages, setPackages] = useState<PackageItem[]>(INITIAL_PACKAGES);
  const [saldo, setSaldo] = useState<number>(1250000);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [courierTasks, setCourierTasks] = useState<CourierTask[]>(COURIER_TASKS);

  // Screen & Navigation States
  const [activeScreenId, setActiveScreenId] = useState<string>('6_beranda');
  const [senderTab, setSenderTab] = useState<SenderTab>('beranda');
  const [courierTab, setCourierTab] = useState<CourierTab>('tugas');

  // Selected Entities
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);
  const [selectedTask, setSelectedTask] = useState<CourierTask>(courierTasks[0]);
  const [selectedResiToTrack, setSelectedResiToTrack] = useState<string>('LGT-20261107-8821');

  // Modals
  const [isCekOngkirOpen, setIsCekOngkirOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isKonfirmasiTerimaOpen, setIsKonfirmasiTerimaOpen] = useState(false);
  const [isResiTerbitOpen, setIsResiTerbitOpen] = useState(false);
  const [isBantuanOpen, setIsBantuanOpen] = useState(false);
  const [latestIssuedPkg, setLatestIssuedPkg] = useState<PackageItem | null>(null);
  const [initialSendConfig, setInitialSendConfig] = useState<any>(null);

  const unreadNotifsCount = notifications.filter((n) => !n.dibaca).length;

  // Handlers for Role Switch
  const handleChangeRole = (role: UserRole) => {
    setActiveRole(role);
    if (role === 'pengirim') {
      setActiveScreenId('6_beranda');
      setSenderTab('beranda');
    } else if (role === 'kurir') {
      setActiveScreenId('20_kurir_tugas');
      setCourierTab('tugas');
    } else if (role === 'admin') {
      setActiveScreenId('23_admin_dashboard');
    }
  };

  // Direct Screen Navigation from Dropdown or Gallery
  const handleSelectScreenDirectly = (screenId: string) => {
    setActiveScreenId(screenId);
    setViewMode('device');

    // Auto-adjust role based on screen id prefix
    if (screenId.startsWith('20_') || screenId.startsWith('21_') || screenId.startsWith('22_')) {
      setActiveRole('kurir');
    } else if (screenId.startsWith('23_')) {
      setActiveRole('admin');
    } else {
      setActiveRole('pengirim');
    }

    // Tab synchronization
    if (screenId === '6_beranda') setSenderTab('beranda');
    else if (screenId === '8_kirim_paket') setSenderTab('kirim');
    else if (screenId === '12_lacak') setSenderTab('lacak');
    else if (screenId === '15_riwayat') setSenderTab('riwayat');
    else if (screenId === '18_akun') setSenderTab('akun');
    else if (screenId === '7_cek_ongkir') setIsCekOngkirOpen(true);
    else if (screenId === '10_resi_terbit') {
      setLatestIssuedPkg(packages[0]);
      setIsResiTerbitOpen(true);
    } else if (screenId === '13_detail_paket') {
      setSelectedPackage(packages[0]);
      setIsDetailOpen(true);
    } else if (screenId === '14_konfirmasi_terima') {
      setSelectedPackage(packages[0]);
      setIsKonfirmasiTerimaOpen(true);
    } else if (screenId === '19_bantuan') {
      setIsBantuanOpen(true);
    }
  };

  // Tab change handler for Sender
  const handleSenderTabChange = (tab: SenderTab) => {
    setSenderTab(tab);
    if (tab === 'beranda') setActiveScreenId('6_beranda');
    else if (tab === 'kirim') setActiveScreenId('8_kirim_paket');
    else if (tab === 'lacak') setActiveScreenId('12_lacak');
    else if (tab === 'riwayat') setActiveScreenId('15_riwayat');
    else if (tab === 'akun') setActiveScreenId('18_akun');
  };

  // Tab change handler for Courier
  const handleCourierTabChange = (tab: CourierTab) => {
    setCourierTab(tab);
    if (tab === 'tugas') setActiveScreenId('20_kurir_tugas');
    else if (tab === 'scan') setActiveScreenId('22_kurir_serah_terima');
    else if (tab === 'riwayat') setActiveScreenId('15_riwayat');
    else if (tab === 'akun') setActiveScreenId('18_akun');
  };

  // New package issued handler
  const handlePackageIssued = (newPkg: PackageItem) => {
    setPackages([newPkg, ...packages]);
    if (newPkg.pembayaran.metode === 'Saldo') {
      setSaldo((prev) => prev - newPkg.pembayaran.total);
    }
    setLatestIssuedPkg(newPkg);
    setIsResiTerbitOpen(true);
    setActiveScreenId('10_resi_terbit');
  };

  // Package cancellation
  const handleCancelPackage = (packageId: string, alasan: string) => {
    setPackages((prev) =>
      prev.map((p) => {
        if (p.id === packageId) {
          return {
            ...p,
            status: 'Dibatalkan' as PackageStatus,
            alasanBatal: alasan,
            progressPersen: 0,
            timeline: [
              {
                waktu: 'Hari ini · Baru saja',
                lokasi: 'Sistem LogiTrack Terpadu',
                petugas: 'Felicia (Pengirim)',
                status: 'Dibatalkan',
                keterangan: `Pengirim membatalkan paket. Alasan: ${alasan}. Dana kembali ke saldo.`,
              },
              ...p.timeline,
            ],
          };
        }
        return p;
      })
    );
    // Refund to balance
    const target = packages.find((p) => p.id === packageId);
    if (target) {
      setSaldo((prev) => prev + target.pembayaran.total);
    }
  };

  // Recipient PIN confirmation
  const handleConfirmReceived = (
    packageId: string,
    kondisi: 'Baik' | 'Penyok' | 'Rusak',
    catatan: string
  ) => {
    setPackages((prev) =>
      prev.map((p) => {
        if (p.id === packageId) {
          return {
            ...p,
            status: 'Terkirim' as PackageStatus,
            kondisiTerima: kondisi,
            progressPersen: 100,
            timeline: [
              {
                waktu: 'Hari ini · Baru saja',
                lokasi: p.penerima.alamat,
                petugas: 'Penerima Terverifikasi (PIN Valid)',
                status: 'Terkirim',
                keterangan: `Paket diterima dalam kondisi "${kondisi}". Catatan: ${catatan}`,
              },
              ...p.timeline,
            ],
          };
        }
        return p;
      })
    );
  };

  // Courier status change
  const handleCourierUpdateStatus = (newStatus: PackageStatus) => {
    if (!selectedTask) return;
    setPackages((prev) =>
      prev.map((p) => {
        if (p.id === selectedTask.packageId) {
          return {
            ...p,
            status: newStatus,
            timeline: [
              {
                waktu: 'Hari ini · Baru saja',
                lokasi: 'Jalur Operasional Armada Darat',
                petugas: 'Andi Saputra (Kurir)',
                status: newStatus,
                keterangan: `Kurir memperbarui tahapan ke ${newStatus}.`,
              },
              ...p.timeline,
            ],
          };
        }
        return p;
      })
    );
  };

  // Courier Handover complete
  const handleCourierHandoverComplete = () => {
    if (!selectedTask) return;
    handleConfirmReceived(selectedTask.packageId, 'Baik', 'Serah terima kurir sukses');
    setActiveScreenId('20_kurir_tugas');
  };

  // Admin Assign Courier
  const handleAdminAssignCourier = (packageId: string, courierName: string, plat: string) => {
    setPackages((prev) =>
      prev.map((p) => {
        if (p.id === packageId) {
          return {
            ...p,
            status: 'Sedang Diantar' as PackageStatus,
            kurir: {
              nama: courierName,
              platNomor: plat,
              hp: '0813-8899-1234',
            },
            timeline: [
              {
                waktu: 'Hari ini · Baru saja',
                lokasi: 'Hub Pusat Operasional',
                petugas: 'Admin Hub LogiTrack',
                status: 'Sedang Diantar',
                keterangan: `Paket ditugaskan ke armada kurir ${courierName} (${plat}).`,
              },
              ...p.timeline,
            ],
          };
        }
        return p;
      })
    );
  };

  // Admin Record Incident
  const handleAdminRecordIncident = (packageId: string, issue: string) => {
    setPackages((prev) =>
      prev.map((p) => {
        if (p.id === packageId) {
          return {
            ...p,
            timeline: [
              {
                waktu: 'Hari ini · Baru saja',
                lokasi: 'Pos Lapor Operasional Tol Trans-Jawa',
                petugas: 'Admin Lapangan',
                status: p.status,
                keterangan: `Pencatatan Kendala: ${issue}`,
              },
              ...p.timeline,
            ],
          };
        }
        return p;
      })
    );
  };

  // Active packages count for badges
  const activeCount = packages.filter(
    (p) => p.status !== 'Terkirim' && p.status !== 'Dibatalkan'
  ).length;

  // Decide what to render inside the phone screen
  const renderPhoneScreenContent = () => {
    // 1. Loading Skeleton Simulator
    if (simulatorState === 'loading') {
      return <SkeletonLoader />;
    }

    // 2. Empty State Simulator
    if (simulatorState === 'kosong') {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-3">
            📦
          </div>
          <h3 className="text-base font-bold text-white mb-1">Belum Ada Data Pengiriman</h3>
          <p className="text-xs text-slate-400 max-w-xs leading-relaxed mb-4">
            Anda belum memiliki riwayat paket atau jadwal jemput aktif di akun ini.
          </p>
          <button
            onClick={() => {
              setSimulatorState('normal');
              setActiveScreenId('8_kirim_paket');
            }}
            className="py-2.5 px-4 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs"
          >
            Mulai Kirim Paket Sekarang
          </button>
        </div>
      );
    }

    // 3. Normal & Offline Screens
    switch (activeScreenId) {
      // Group A: Masuk
      case '1_splash':
        return (
          <SplashScreen
            onStart={() => {
              setActiveScreenId('2_onboarding');
            }}
          />
        );
      case '2_onboarding':
        return (
          <OnboardingScreen
            onFinish={() => setActiveScreenId('3_login')}
            onSkip={() => setActiveScreenId('3_login')}
          />
        );
      case '3_login':
        return (
          <LoginScreen
            onLogin={(role) => handleChangeRole(role)}
            onGoToRegister={() => setActiveScreenId('4_register')}
            onGoToOtp={() => setActiveScreenId('5_otp')}
          />
        );
      case '4_register':
        return (
          <RegisterScreen
            onRegisterSuccess={() => setActiveScreenId('5_otp')}
            onBackToLogin={() => setActiveScreenId('3_login')}
          />
        );
      case '5_otp':
        return (
          <OtpVerificationScreen
            onVerified={() => {
              setActiveScreenId('6_beranda');
              setActiveRole('pengirim');
            }}
            onBack={() => setActiveScreenId('3_login')}
          />
        );

      // Group B: Pengirim
      case '6_beranda':
        return (
          <SenderHome
            packages={packages}
            unreadNotifsCount={unreadNotifsCount}
            showNewBadge={showNewBadge}
            onNavigateTab={handleSenderTabChange}
            onOpenCekOngkir={() => setIsCekOngkirOpen(true)}
            onOpenJadwalJemput={() => setActiveScreenId('11_jadwal_jemput')}
            onOpenSaldo={() => setActiveScreenId('16_saldo')}
            onOpenNotifikasi={() => setActiveScreenId('17_notifikasi')}
            onOpenBantuan={() => setIsBantuanOpen(true)}
            onSelectPackage={(pkg) => {
              setSelectedPackage(pkg);
              setIsDetailOpen(true);
            }}
          />
        );

      case '7_cek_ongkir':
        return (
          <div className="relative h-full flex flex-col justify-end bg-[#020617]">
            <CekOngkirModal
              isOpen={true}
              onClose={() => setActiveScreenId('6_beranda')}
              onSelectServiceToSend={(data) => {
                setInitialSendConfig(data);
                setActiveScreenId('8_kirim_paket');
              }}
            />
          </div>
        );

      case '8_kirim_paket':
      case '9_pembayaran':
        return (
          <KirimPaketFlow
            initialData={initialSendConfig}
            onSuccessOrder={handlePackageIssued}
            onCancel={() => {
              setActiveScreenId('6_beranda');
              setSenderTab('beranda');
            }}
          />
        );

      case '10_resi_terbit':
        return (
          <div className="relative h-full flex flex-col justify-end bg-[#020617]">
            <ResiTerbitModal
              packageItem={latestIssuedPkg || packages[0]}
              isOpen={true}
              onClose={() => setActiveScreenId('6_beranda')}
              onGoToJadwalJemput={(pkg) => {
                setSelectedPackage(pkg);
                setActiveScreenId('11_jadwal_jemput');
              }}
              onGoToLacak={(resi) => {
                setSelectedResiToTrack(resi);
                setActiveScreenId('12_lacak');
                setSenderTab('lacak');
              }}
            />
          </div>
        );

      case '11_jadwal_jemput':
        return (
          <JadwalJemputView
            packageItem={selectedPackage || packages[1]}
            showNewBadge={showNewBadge}
            onBack={() => {
              setActiveScreenId('6_beranda');
              setSenderTab('beranda');
            }}
            onSaveSchedule={(slot, catatan) => {
              alert(`Jadwal jemput pada slot ${slot} berhasil disimpan.`);
              setActiveScreenId('6_beranda');
            }}
          />
        );

      case '12_lacak':
        return (
          <LacakView
            packages={packages}
            selectedResi={selectedResiToTrack}
            showNewBadge={showNewBadge}
            onSelectPackage={(pkg) => {
              setSelectedPackage(pkg);
              setIsDetailOpen(true);
            }}
          />
        );

      case '13_detail_paket':
        return (
          <div className="relative h-full flex flex-col justify-end bg-[#020617]">
            <DetailPaketModal
              packageItem={selectedPackage || packages[0]}
              isOpen={true}
              onClose={() => setActiveScreenId('6_beranda')}
              onCancelPackage={handleCancelPackage}
              onOpenKonfirmasiTerima={(pkg) => {
                setSelectedPackage(pkg);
                setIsKonfirmasiTerimaOpen(true);
              }}
            />
          </div>
        );

      case '14_konfirmasi_terima':
        return (
          <div className="relative h-full flex flex-col justify-end bg-[#020617]">
            <KonfirmasiTerimaModal
              packageItem={selectedPackage || packages[0]}
              isOpen={true}
              onClose={() => setActiveScreenId('6_beranda')}
              onSuccessConfirm={handleConfirmReceived}
            />
          </div>
        );

      case '15_riwayat':
        return (
          <RiwayatView
            packages={packages}
            onSelectPackage={(pkg) => {
              setSelectedPackage(pkg);
              setIsDetailOpen(true);
            }}
          />
        );

      case '16_saldo':
        return (
          <SaldoView
            saldo={saldo}
            showNewBadge={showNewBadge}
            onBack={() => {
              setActiveScreenId('6_beranda');
              setSenderTab('beranda');
            }}
            onTopUp={(amt) => setSaldo((prev) => prev + amt)}
            onWithdraw={(amt) => setSaldo((prev) => prev - amt)}
          />
        );

      case '17_notifikasi':
        return (
          <NotifikasiView
            notifications={notifications}
            onMarkAllRead={() => {
              setNotifications((prev) => prev.map((n) => ({ ...n, dibaca: true })));
            }}
            onBack={() => setActiveScreenId('6_beranda')}
            onSelectResi={(resi) => {
              setSelectedResiToTrack(resi);
              setActiveScreenId('12_lacak');
            }}
          />
        );

      case '18_akun':
        return (
          <AkunView
            onLogout={() => {
              setActiveScreenId('3_login');
            }}
            onOpenBantuan={() => setIsBantuanOpen(true)}
          />
        );

      case '19_bantuan':
        return (
          <div className="relative h-full flex flex-col justify-end bg-[#020617]">
            <BantuanModal
              isOpen={true}
              onClose={() => setActiveScreenId('6_beranda')}
              packages={packages}
            />
          </div>
        );

      // Group C: Kurir
      case '20_kurir_tugas':
        return (
          <CourierTasksView
            onSelectTask={(task) => {
              setSelectedTask(task);
              setActiveScreenId('21_kurir_detail');
            }}
            showNewBadge={showNewBadge}
          />
        );

      case '21_kurir_detail':
        return (
          <CourierTaskDetailView
            task={selectedTask}
            onBack={() => setActiveScreenId('20_kurir_tugas')}
            onProceedHandover={(task) => {
              setSelectedTask(task);
              setActiveScreenId('22_kurir_serah_terima');
            }}
            onUpdateStatus={handleCourierUpdateStatus}
          />
        );

      case '22_kurir_serah_terima':
        return (
          <CourierHandoverView
            task={selectedTask}
            onBack={() => setActiveScreenId('20_kurir_tugas')}
            onComplete={handleCourierHandoverComplete}
            onFailReport={(alasan) => {
              alert(`Catatan kegagalan tersimpan: ${alasan}`);
              setActiveScreenId('20_kurir_tugas');
            }}
            showNewBadge={showNewBadge}
          />
        );

      // Group D: Admin
      case '23_admin_dashboard':
        return (
          <AdminDashboard
            packages={packages}
            onAssignCourier={handleAdminAssignCourier}
            onRecordIncident={handleAdminRecordIncident}
          />
        );

      default:
        return (
          <SenderHome
            packages={packages}
            unreadNotifsCount={unreadNotifsCount}
            showNewBadge={showNewBadge}
            onNavigateTab={handleSenderTabChange}
            onOpenCekOngkir={() => setIsCekOngkirOpen(true)}
            onOpenJadwalJemput={() => setActiveScreenId('11_jadwal_jemput')}
            onOpenSaldo={() => setActiveScreenId('16_saldo')}
            onOpenNotifikasi={() => setActiveScreenId('17_notifikasi')}
            onOpenBantuan={() => setIsBantuanOpen(true)}
            onSelectPackage={(pkg) => {
              setSelectedPackage(pkg);
              setIsDetailOpen(true);
            }}
          />
        );
    }
  };

  const isAuthScreen =
    activeScreenId === '1_splash' ||
    activeScreenId === '2_onboarding' ||
    activeScreenId === '3_login' ||
    activeScreenId === '4_register' ||
    activeScreenId === '5_otp';

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col font-sans select-none">
      {/* 1. Bilah Kendali di Luar Bingkai HP */}
      <TopControlBar
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        activeRole={activeRole}
        onChangeRole={handleChangeRole}
        showNewBadge={showNewBadge}
        onToggleNewBadge={() => setShowNewBadge(!showNewBadge)}
        simulatorState={simulatorState}
        onChangeSimulatorState={setSimulatorState}
        activeScreenId={activeScreenId}
        onSelectScreen={handleSelectScreenDirectly}
      />

      {/* 2. Main Display Area: Phone Frame OR Gallery */}
      {viewMode === 'gallery' ? (
        <GalleryView
          packages={packages}
          saldo={saldo}
          unreadCount={unreadNotifsCount}
          showNewBadge={showNewBadge}
          onOpenScreenInDevice={handleSelectScreenDirectly}
        />
      ) : (
        <main className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
          {/* Physical Phone Frame 390 x 844 px */}
          <MobileDeviceFrame isOffline={simulatorState === 'offline'}>
            {/* Scrollable Screen Body */}
            <div className="flex-1 flex flex-col relative overflow-y-auto no-scrollbar">
              {renderPhoneScreenContent()}
            </div>

            {/* Bottom Navigasi (Sesuai Peran Aktif & Bukan di Layar Auth) */}
            {!isAuthScreen && (
              <>
                {activeRole === 'pengirim' && (
                  <BottomNavSender
                    currentTab={senderTab}
                    onChangeTab={handleSenderTabChange}
                    activeCount={activeCount}
                  />
                )}
                {activeRole === 'kurir' && (
                  <BottomNavCourier
                    currentTab={courierTab}
                    onChangeTab={handleCourierTabChange}
                    pendingCount={courierTasks.length}
                  />
                )}
              </>
            )}
          </MobileDeviceFrame>

          {/* Quick Subtitle Under Frame */}
          <div className="text-center text-[11px] text-slate-400 mt-2">
            Bingkai HP 390×844 · Resolusi Standar Mobile Indonesia · Desain Responsif Dark Slate
          </div>
        </main>
      )}

      {/* Global Modals for Interactive Sender Flows */}
      <CekOngkirModal
        isOpen={isCekOngkirOpen}
        onClose={() => setIsCekOngkirOpen(false)}
        onSelectServiceToSend={(data) => {
          setInitialSendConfig(data);
          setIsCekOngkirOpen(false);
          setActiveScreenId('8_kirim_paket');
          setSenderTab('kirim');
        }}
      />

      <DetailPaketModal
        packageItem={selectedPackage}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onCancelPackage={handleCancelPackage}
        onOpenKonfirmasiTerima={(pkg) => {
          setIsDetailOpen(false);
          setSelectedPackage(pkg);
          setIsKonfirmasiTerimaOpen(true);
        }}
      />

      <KonfirmasiTerimaModal
        packageItem={selectedPackage}
        isOpen={isKonfirmasiTerimaOpen}
        onClose={() => setIsKonfirmasiTerimaOpen(false)}
        onSuccessConfirm={handleConfirmReceived}
      />

      {latestIssuedPkg && (
        <ResiTerbitModal
          packageItem={latestIssuedPkg}
          isOpen={isResiTerbitOpen}
          onClose={() => setIsResiTerbitOpen(false)}
          onGoToJadwalJemput={(pkg) => {
            setIsResiTerbitOpen(false);
            setSelectedPackage(pkg);
            setActiveScreenId('11_jadwal_jemput');
          }}
          onGoToLacak={(resi) => {
            setIsResiTerbitOpen(false);
            setSelectedResiToTrack(resi);
            setActiveScreenId('12_lacak');
            setSenderTab('lacak');
          }}
        />
      )}

      <BantuanModal
        isOpen={isBantuanOpen}
        onClose={() => setIsBantuanOpen(false)}
        packages={packages}
      />
    </div>
  );
}
