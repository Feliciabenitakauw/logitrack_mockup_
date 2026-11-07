import React, { useState, useEffect } from 'react';
import {
  Truck,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  MapPin,
  PackageCheck,
  CheckCircle2,
  ChevronLeft,
} from 'lucide-react';
import { UserRole } from '../../../types';

// ==========================================
// 1. SPLASH SCREEN
// ==========================================
export const SplashScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-between p-8 bg-gradient-to-b from-[#020617] via-[#0b1329] to-[#020617] text-center select-none">
      <div className="w-full pt-12 flex justify-end">
        <span className="text-[11px] text-teal-400 font-mono tracking-widest uppercase">v2.4 Mobile</span>
      </div>

      <div className="flex flex-col items-center">
        {/* Animated Glowing Logo */}
        <div className="relative mb-6">
          <div className="absolute -inset-4 rounded-3xl bg-teal-500/20 blur-xl animate-pulse" />
          <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-teal-400 via-teal-500 to-emerald-600 flex items-center justify-center shadow-2xl shadow-teal-500/30 border border-teal-300/30">
            <Truck className="w-12 h-12 text-[#020617] stroke-[2.2]" />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
          Logi<span className="text-teal-400">Track</span>
        </h1>
        <p className="text-sm text-slate-400 max-w-[240px] leading-relaxed">
          Kirim darat, terlacak sampai tujuan
        </p>
      </div>

      <div className="w-full flex flex-col gap-3 pb-8">
        <button
          onClick={onStart}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25 active:scale-[0.98] transition-transform cursor-pointer"
        >
          <span>Mulai Aplikasi</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <span className="text-[11px] text-slate-400">Jaringan Logistik Darat Seluruh Indonesia</span>
      </div>
    </div>
  );
};

// ==========================================
// 2. ONBOARDING (3 SLIDES)
// ==========================================
export const OnboardingScreen: React.FC<{
  onFinish: () => void;
  onSkip: () => void;
}> = ({ onFinish, onSkip }) => {
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      title: 'Kirim dalam 4 langkah',
      desc: 'Masukkan alamat, timbang volumetrik instan, pilih layanan kargo atau reguler, dan cetak label barcode.',
      icon: PackageCheck,
      tag: 'Cepat & Terstruktur',
    },
    {
      title: 'Lacak di peta langsung',
      desc: 'Pantau posisi armada darat dan kurir di peta live dengan estimasi waktu tiba akurat tanpa perkiraan manual.',
      icon: MapPin,
      tag: 'Pelacakan Real-Time',
    },
    {
      title: 'Terima dengan kode aman',
      desc: 'Serah terima terverifikasi menggunakan 6 digit PIN rahasia penerima dan foto bukti serah terima bertanda air.',
      icon: ShieldCheck,
      tag: 'Verifikasi Ganda',
    },
  ];

  const handleNext = () => {
    if (slide < slides.length - 1) {
      setSlide(slide + 1);
    } else {
      onFinish();
    }
  };

  const current = slides[slide];
  const Icon = current.icon;

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-[#020617] select-none">
      {/* Top Bar with Skip */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-slate-400 font-medium">Langkah {slide + 1} dari 3</span>
        <button
          onClick={onSkip}
          className="text-xs text-slate-400 hover:text-teal-400 font-medium transition-colors cursor-pointer px-2 py-1"
        >
          Lewati
        </button>
      </div>

      {/* Slide Illustration & Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center my-6">
        <div className="relative mb-8">
          <div className="w-32 h-32 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-xl">
            <Icon className="w-16 h-16 text-teal-400 stroke-[1.8]" />
          </div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-teal-500/20 border border-teal-500/40 text-[10px] text-teal-300 font-semibold tracking-wide uppercase whitespace-nowrap">
            {current.tag}
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-3 px-4">{current.title}</h2>
        <p className="text-xs text-slate-400 leading-relaxed px-6 max-w-[280px]">
          {current.desc}
        </p>
      </div>

      {/* Dots and Navigation */}
      <div className="pb-6 flex flex-col gap-6">
        {/* Indicators */}
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                slide === idx ? 'w-8 bg-teal-400' : 'w-2 bg-slate-700'
              }`}
              aria-label={`Ke slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Buttons */}
        <button
          onClick={handleNext}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 active:scale-[0.98] transition-transform cursor-pointer"
        >
          <span>{slide === slides.length - 1 ? 'Mulai Sekarang' : 'Lanjutkan'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 3. LOGIN SCREEN
// ==========================================
export const LoginScreen: React.FC<{
  onLogin: (role: UserRole) => void;
  onGoToRegister: () => void;
  onGoToOtp: () => void;
}> = ({ onLogin, onGoToRegister, onGoToOtp }) => {
  const [identifier, setIdentifier] = useState('0812-3456-7890');
  const [password, setPassword] = useState('logitrack2026');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setErrorMsg('Nomor HP atau email wajib diisi');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Kata sandi minimal 6 karakter');
      return;
    }
    setErrorMsg('');
    onGoToOtp();
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-[#020617] text-slate-200">
      <div>
        {/* Header */}
        <div className="pt-2 mb-6">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-xs border border-teal-500/30">
              LT
            </div>
            <span className="text-xs font-semibold text-teal-400 tracking-wider uppercase">LogiTrack Mobile</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Masuk ke Akun</h2>
          <p className="text-xs text-slate-400">Kelola dan lacak paket pengiriman darat Anda</p>
        </div>

        {/* Demo Fast Switcher Chips */}
        <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 mb-5">
          <div className="text-[11px] text-slate-400 font-medium mb-2">Coba demo langsung sebagai:</div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => onLogin('pengirim')}
              className="py-1.5 px-2 rounded-lg bg-teal-500/15 border border-teal-500/40 text-teal-300 text-xs font-medium hover:bg-teal-500/25 transition-colors cursor-pointer text-center"
            >
              Pengirim
            </button>
            <button
              type="button"
              onClick={() => onLogin('kurir')}
              className="py-1.5 px-2 rounded-lg bg-blue-500/15 border border-blue-500/40 text-blue-300 text-xs font-medium hover:bg-blue-500/25 transition-colors cursor-pointer text-center"
            >
              Kurir
            </button>
            <button
              type="button"
              onClick={() => onLogin('admin')}
              className="py-1.5 px-2 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-medium hover:bg-amber-500/25 transition-colors cursor-pointer text-center"
            >
              Admin
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Email atau Nomor HP
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="contoh: 08123456789 atau user@email.com"
              className="w-full h-11 px-3.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 transition-colors"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-slate-300">Kata Sandi</label>
              <button
                type="button"
                className="text-[11px] text-teal-400 hover:underline cursor-pointer"
                onClick={() => alert('Tautan reset kata sandi dikirim via WhatsApp dummy.')}
              >
                Lupa kata sandi?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Masukkan kata sandi"
                className="w-full h-11 pl-3.5 pr-10 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <p className="text-[11px] text-rose-400 font-medium px-1 animate-in fade-in">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            className="w-full h-12 mt-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-semibold text-sm flex items-center justify-center shadow-lg shadow-teal-500/20 active:scale-[0.98] transition-transform cursor-pointer"
          >
            Masuk
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-[1px] bg-slate-800" />
          <span className="text-[11px] text-slate-400 uppercase tracking-wider">atau</span>
          <div className="flex-1 h-[1px] bg-slate-800" />
        </div>

        {/* Google OAuth Dummy */}
        <button
          type="button"
          onClick={() => onLogin('pengirim')}
          className="w-full h-11 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>Masuk dengan Google</span>
        </button>
      </div>

      {/* Footer Register Link */}
      <div className="text-center py-2">
        <span className="text-xs text-slate-400">Belum punya akun? </span>
        <button
          onClick={onGoToRegister}
          className="text-xs font-semibold text-teal-400 hover:underline cursor-pointer"
        >
          Daftar sekarang
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 4. REGISTER SCREEN
// ==========================================
export const RegisterScreen: React.FC<{
  onRegisterSuccess: () => void;
  onBackToLogin: () => void;
}> = ({ onRegisterSuccess, onBackToLogin }) => {
  const [nama, setNama] = useState('Felicia Benita');
  const [email, setEmail] = useState('felicia.benita@logitrack.id');
  const [hp, setHp] = useState('0812-3456-7890');
  const [password, setPassword] = useState('rahasia2026');
  const [role, setRole] = useState<'pengirim' | 'kurir'>('pengirim');
  const [agree, setAgree] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !email || !hp || !password) {
      setErrorMsg('Semua kolom wajib diisi');
      return;
    }
    if (!agree) {
      setErrorMsg('Anda harus menyetujui syarat & ketentuan');
      return;
    }
    setErrorMsg('');
    onRegisterSuccess();
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-[#020617] text-slate-200">
      <div>
        {/* Back button */}
        <button
          onClick={onBackToLogin}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white pt-2 mb-4 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Kembali ke Login</span>
        </button>

        <h2 className="text-xl font-bold text-white mb-1">Daftar Akun Baru</h2>
        <p className="text-xs text-slate-400 mb-5">Bergabung dengan ekosistem ekspedisi LogiTrack</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div>
            <label className="block text-[11px] font-medium text-slate-300 mb-1">Nama Lengkap</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Nama lengkap sesuai KTP"
              className="w-full h-10 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alamat@email.com"
              className="w-full h-10 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-300 mb-1">Nomor WhatsApp / HP</label>
            <input
              type="tel"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
              placeholder="08xxxxxxxxxx"
              className="w-full h-10 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-300 mb-1">Kata Sandi</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 6 karakter"
              className="w-full h-10 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-[11px] font-medium text-slate-300 mb-1.5">Pilih Peran Akun</label>
            <div className="grid grid-cols-2 gap-2">
              <label
                className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer text-xs transition-colors ${
                  role === 'pengirim'
                    ? 'bg-teal-500/15 border-teal-500/50 text-teal-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  checked={role === 'pengirim'}
                  onChange={() => setRole('pengirim')}
                  className="hidden"
                />
                <span className="font-semibold">Pengirim (UMKM)</span>
              </label>

              <label
                className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer text-xs transition-colors ${
                  role === 'kurir'
                    ? 'bg-teal-500/15 border-teal-500/50 text-teal-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  checked={role === 'kurir'}
                  onChange={() => setRole('kurir')}
                  className="hidden"
                />
                <span className="font-semibold">Kurir Armada</span>
              </label>
            </div>
          </div>

          {/* Terms checkbox */}
          <label className="flex items-start gap-2 pt-1 text-[11px] text-slate-400 cursor-pointer">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-0.5 rounded border-slate-700 bg-slate-900 text-teal-500 focus:ring-0"
            />
            <span>
              Saya menyetujui <span className="text-teal-400 underline">Syarat & Ketentuan</span> serta Kebijakan Privasi LogiTrack.
            </span>
          </label>

          {errorMsg && <p className="text-[11px] text-rose-400">{errorMsg}</p>}

          <button
            type="submit"
            className="w-full h-11 mt-1 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-semibold text-xs flex items-center justify-center shadow-lg shadow-teal-500/20 active:scale-[0.98] transition-transform cursor-pointer"
          >
            Lanjutkan ke Verifikasi
          </button>
        </form>
      </div>

      <div className="text-center py-2">
        <span className="text-xs text-slate-400">Sudah memiliki akun? </span>
        <button
          onClick={onBackToLogin}
          className="text-xs font-semibold text-teal-400 hover:underline cursor-pointer"
        >
          Masuk di sini
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 5. OTP VERIFICATION SCREEN
// ==========================================
export const OtpVerificationScreen: React.FC<{
  targetPhone?: string;
  onVerified: () => void;
  onBack: () => void;
}> = ({ targetPhone = '0812-3456-7890', onVerified, onBack }) => {
  const [digits, setDigits] = useState(['4', '8', '2', '1', '9', '0']);
  const [countdown, setCountdown] = useState(48);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleDigitChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = val;
    setDigits(newDigits);

    // Auto move focus to next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-[#020617] text-slate-200">
      <div>
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white pt-2 mb-6 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/30 text-teal-400 flex items-center justify-center mb-4">
          <ShieldCheck className="w-6 h-6 stroke-[2]" />
        </div>

        <h2 className="text-xl font-bold text-white mb-1.5">Verifikasi Kode Aman</h2>
        <p className="text-xs text-slate-400 leading-relaxed mb-6">
          Masukkan 6 digit kode OTP yang kami kirimkan melalui WhatsApp ke nomor{' '}
          <strong className="text-slate-200">{targetPhone}</strong>
        </p>

        {/* 6 Digit Input Boxes */}
        <div className="flex items-center justify-between gap-2 mb-6">
          {digits.map((digit, i) => (
            <input
              key={i}
              id={`otp-input-${i}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigitChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-12 h-13 text-center text-lg font-bold text-white bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all"
            />
          ))}
        </div>

        {/* Resend Countdown */}
        <div className="text-center text-xs text-slate-400 mb-6">
          {countdown > 0 ? (
            <span>
              Kirim ulang kode dalam <strong className="text-teal-400">{countdown} detik</strong>
            </span>
          ) : (
            <button
              onClick={() => setCountdown(60)}
              className="text-teal-400 font-semibold hover:underline cursor-pointer"
            >
              Kirim Ulang Kode Sekarang
            </button>
          )}
        </div>

        <button
          onClick={onVerified}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-semibold text-sm flex items-center justify-center shadow-lg shadow-teal-500/20 active:scale-[0.98] transition-transform cursor-pointer"
        >
          Verifikasi & Masuk
        </button>
      </div>

      <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
        <span>Demo: Kode OTP telah terisi otomatis untuk kelancaran peninjauan mockup.</span>
      </div>
    </div>
  );
};
