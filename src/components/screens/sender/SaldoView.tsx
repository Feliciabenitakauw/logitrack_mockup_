import React, { useState } from 'react';
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  History,
  CheckCircle2,
  ChevronLeft,
  Building,
  CreditCard,
  Plus,
} from 'lucide-react';
import { NewBadge } from '../../common/StatusBadge';
import { INITIAL_MUTATIONS, SAVED_BANK_ACCOUNTS } from '../../../data/mockData';
import { BalanceMutation } from '../../../types';

interface SaldoViewProps {
  saldo: number;
  showNewBadge: boolean;
  onBack: () => void;
  onTopUp: (amount: number) => void;
  onWithdraw: (amount: number) => void;
}

export const SaldoView: React.FC<SaldoViewProps> = ({
  saldo,
  showNewBadge,
  onBack,
  onTopUp,
  onWithdraw,
}) => {
  const [tab, setTab] = useState<'mutasi' | 'topup' | 'tarik'>('mutasi');
  const [mutations, setMutations] = useState<BalanceMutation[]>(INITIAL_MUTATIONS);

  // Top Up state
  const [topUpNominal, setTopUpNominal] = useState<number>(250000);
  const [topUpMethod, setTopUpMethod] = useState('BCA Virtual Account');
  const [topUpSuccess, setTopUpSuccess] = useState(false);

  // Tarik state
  const [tarikNominal, setTarikNominal] = useState<number>(200000);
  const [selectedBank, setSelectedBank] = useState(SAVED_BANK_ACCOUNTS[0].id);
  const [tarikSuccess, setTarikSuccess] = useState(false);

  const handleExecuteTopUp = () => {
    onTopUp(topUpNominal);
    const newMut: BalanceMutation = {
      id: `mut-${Date.now()}`,
      tipe: 'masuk',
      nominal: topUpNominal,
      tanggal: 'Hari ini · Baru saja',
      keterangan: `Top Up Saldo via ${topUpMethod}`,
      metode: topUpMethod,
    };
    setMutations([newMut, ...mutations]);
    setTopUpSuccess(true);
    setTimeout(() => {
      setTopUpSuccess(false);
      setTab('mutasi');
    }, 1500);
  };

  const handleExecuteTarik = () => {
    if (tarikNominal > saldo) {
      alert('Nominal penarikan melebihi saldo tersedia.');
      return;
    }
    onWithdraw(tarikNominal);
    const newMut: BalanceMutation = {
      id: `mut-${Date.now()}`,
      tipe: 'keluar',
      nominal: tarikNominal,
      tanggal: 'Hari ini · Baru saja',
      keterangan: 'Penarikan Dana ke Rekening Bank BCA',
      metode: 'Transfer Bank',
    };
    setMutations([newMut, ...mutations]);
    setTarikSuccess(true);
    setTimeout(() => {
      setTarikSuccess(false);
      setTab('mutasi');
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#020617] text-slate-200">
      {/* Top Header */}
      <div className="p-4 border-b border-slate-800 bg-[#0f172a] flex items-center justify-between shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>
        <div className="flex items-center gap-1">
          <span className="text-xs font-bold text-white">Dompet & Saldo LogiTrack</span>
          <NewBadge show={showNewBadge} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {/* Main Balance Display */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800 text-white shadow-xl shadow-teal-900/20 border border-teal-400/40">
          <div className="flex items-center justify-between text-teal-100 text-xs mb-1">
            <span>Saldo Aktif Pengirim</span>
            <Wallet className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black font-mono tracking-tight mb-1">
            Rp {saldo.toLocaleString('id-ID')}
          </div>
          <p className="text-[11px] text-teal-200">
            Dapat digunakan langsung untuk ongkir kargo darat & pembayaran instan.
          </p>
        </div>

        {/* 3 Tabs Navigation: Mutasi, Top Up, Tarik */}
        <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setTab('mutasi')}
            className={`py-2 rounded-lg font-medium transition-all cursor-pointer flex items-center justify-center gap-1 text-xs ${
              tab === 'mutasi' ? 'bg-teal-500/20 text-teal-300 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Mutasi</span>
          </button>
          <button
            onClick={() => setTab('topup')}
            className={`py-2 rounded-lg font-medium transition-all cursor-pointer flex items-center justify-center gap-1 text-xs ${
              tab === 'topup' ? 'bg-teal-500/20 text-teal-300 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ArrowDownLeft className="w-3.5 h-3.5" />
            <span>Top Up</span>
          </button>
          <button
            onClick={() => setTab('tarik')}
            className={`py-2 rounded-lg font-medium transition-all cursor-pointer flex items-center justify-center gap-1 text-xs ${
              tab === 'tarik' ? 'bg-teal-500/20 text-teal-300 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Tarik</span>
          </button>
        </div>

        {/* TAB 1: MUTASI SALDO */}
        {tab === 'mutasi' && (
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              8 Riwayat Mutasi Terakhir
            </div>
            <div className="space-y-2">
              {mutations.map((m) => {
                const isMasuk = m.tipe === 'masuk';
                return (
                  <div
                    key={m.id}
                    className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          isMasuk ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'
                        }`}
                      >
                        {isMasuk ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="font-semibold text-white leading-tight">{m.keterangan}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {m.tanggal} {m.resiTerkait && `· ${m.resiTerkait}`}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`font-mono font-bold text-xs ${
                        isMasuk ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {isMasuk ? '+' : '-'}Rp {m.nominal.toLocaleString('id-ID')}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: TOP UP SALDO */}
        {tab === 'topup' && (
          <div className="space-y-4">
            {topUpSuccess && (
              <div className="p-3 bg-emerald-500/15 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold text-center">
                Top Up Rp {topUpNominal.toLocaleString('id-ID')} Berhasil Ditambahkan!
              </div>
            )}

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Pilih Nominal Cepat
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[50000, 100000, 250000, 500000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setTopUpNominal(amt)}
                    className={`p-3 rounded-xl border text-center font-mono font-bold transition-all cursor-pointer ${
                      topUpNominal === amt
                        ? 'bg-teal-500/20 border-teal-500 text-teal-300'
                        : 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    Rp {amt.toLocaleString('id-ID')}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Metode Pembayaran Top Up
              </label>
              <div className="space-y-2">
                {['BCA Virtual Account', 'Mandiri Virtual Account', 'QRIS Instan'].map((method) => (
                  <div
                    key={method}
                    onClick={() => setTopUpMethod(method)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      topUpMethod === method
                        ? 'bg-teal-500/15 border-teal-500 text-teal-300'
                        : 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="font-semibold text-xs">{method}</span>
                    <span className="text-[10px] text-slate-400">Verifikasi Otomatis</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleExecuteTopUp}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25 active:scale-[0.98] transition-transform cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Top Up Rp {topUpNominal.toLocaleString('id-ID')}</span>
            </button>
          </div>
        )}

        {/* TAB 3: TARIK DANA */}
        {tab === 'tarik' && (
          <div className="space-y-4">
            {tarikSuccess && (
              <div className="p-3 bg-emerald-500/15 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold text-center">
                Pengajuan Penarikan Rp {tarikNominal.toLocaleString('id-ID')} Berhasil Diproses!
              </div>
            )}

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Rekening Bank Tujuan
              </label>
              <div className="space-y-2">
                {SAVED_BANK_ACCOUNTS.map((bank) => (
                  <div
                    key={bank.id}
                    onClick={() => setSelectedBank(bank.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedBank === bank.id
                        ? 'bg-teal-500/15 border-teal-500 text-teal-300'
                        : 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Building className="w-4 h-4 text-teal-400" />
                      <div>
                        <div className="font-bold text-xs text-white">{bank.bank}</div>
                        <div className="font-mono text-[11px] text-slate-400">
                          {bank.nomor} · a.n. {bank.atasNama}
                        </div>
                      </div>
                    </div>
                    {bank.utama && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        Utama
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Nominal Penarikan (Rp)
              </label>
              <input
                type="number"
                step="50000"
                max={saldo}
                value={tarikNominal}
                onChange={(e) => setTarikNominal(parseInt(e.target.value) || 0)}
                className="w-full h-11 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono font-bold text-sm focus:outline-none focus:border-teal-400"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Maksimal penarikan: Rp {saldo.toLocaleString('id-ID')} · Bebas biaya admin.
              </span>
            </div>

            <button
              onClick={handleExecuteTarik}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25 active:scale-[0.98] transition-transform cursor-pointer"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Ajukan Penarikan Dana</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
