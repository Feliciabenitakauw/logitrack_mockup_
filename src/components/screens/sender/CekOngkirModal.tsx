import React, { useState } from 'react';
import { X, Calculator, ArrowRight, Info, Check, ChevronDown } from 'lucide-react';
import { KOTA_LIST, hitungBiayaKirim } from '../../../data/mockData';
import { ServiceType } from '../../../types';

interface CekOngkirModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectServiceToSend: (data: {
    asal: string;
    tujuan: string;
    berat: number;
    panjang: number;
    lebar: number;
    tinggi: number;
    layanan: ServiceType;
  }) => void;
}

export const CekOngkirModal: React.FC<CekOngkirModalProps> = ({
  isOpen,
  onClose,
  onSelectServiceToSend,
}) => {
  const [asal, setAsal] = useState('Jakarta');
  const [tujuan, setTujuan] = useState('Surabaya');
  const [berat, setBerat] = useState(5.0);
  const [panjang, setPanjang] = useState(30);
  const [lebar, setLebar] = useState(25);
  const [tinggi, setTinggi] = useState(20);
  const [selectedService, setSelectedService] = useState<ServiceType>('Reguler');
  const [showDetailSheet, setShowDetailSheet] = useState(false);

  if (!isOpen) return null;

  const regCalc = hitungBiayaKirim(panjang, lebar, tinggi, berat, 'Reguler', asal, tujuan);
  const expCalc = hitungBiayaKirim(panjang, lebar, tinggi, berat, 'Express', asal, tujuan);
  const crgCalc = hitungBiayaKirim(panjang, lebar, tinggi, berat, 'Cargo', asal, tujuan);

  const activeCalc =
    selectedService === 'Reguler' ? regCalc : selectedService === 'Express' ? expCalc : crgCalc;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex flex-col justify-end">
      <div className="w-full bg-[#0f172a] border-t border-slate-800 rounded-t-3xl max-h-[92vh] flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Grab Handle & Header */}
        <div className="p-4 pb-2 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Kalkulator Ongkir & Volumetrik</h3>
              <p className="text-[11px] text-slate-400">Formula resmi P×L×T ÷ 5000</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs">
          {/* Origin & Destination */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Kota Asal</label>
              <select
                value={asal}
                onChange={(e) => setAsal(e.target.value)}
                className="w-full h-10 px-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:border-teal-400"
              >
                {KOTA_LIST.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Kota Tujuan</label>
              <select
                value={tujuan}
                onChange={(e) => setTujuan(e.target.value)}
                className="w-full h-10 px-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:border-teal-400"
              >
                {KOTA_LIST.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Weight & Dimensions */}
          <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-medium text-slate-300">Berat Aktual (kg)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  value={berat}
                  onChange={(e) => setBerat(Math.max(0.1, parseFloat(e.target.value) || 0))}
                  className="w-20 h-8 px-2 text-right bg-slate-950 border border-slate-700 rounded-lg text-teal-300 font-mono font-bold"
                />
                <span className="text-slate-400">kg</span>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-medium text-slate-400 mb-1.5">Dimensi Paket (cm)</div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <span className="text-[10px] text-slate-500">Panjang</span>
                  <input
                    type="number"
                    value={panjang}
                    onChange={(e) => setPanjang(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full h-8 px-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-center"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500">Lebar</span>
                  <input
                    type="number"
                    value={lebar}
                    onChange={(e) => setLebar(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full h-8 px-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-center"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500">Tinggi</span>
                  <input
                    type="number"
                    value={tinggi}
                    onChange={(e) => setTinggi(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full h-8 px-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-center"
                  />
                </div>
              </div>
            </div>

            {/* Live calculation info */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">
                Berat Volumetrik: <strong className="text-slate-200">{activeCalc.beratVolumetrik} kg</strong>
              </span>
              <span className="text-teal-400 font-semibold">
                Berat Dikenakan: {activeCalc.beratDikenakan} kg
              </span>
            </div>
          </div>

          {/* 3 Services Cards */}
          <div className="space-y-2">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Pilihan Layanan Ekspedisi
            </div>

            {/* Reguler */}
            <div
              onClick={() => setSelectedService('Reguler')}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                selectedService === 'Reguler'
                  ? 'bg-teal-500/15 border-teal-500/60 shadow-md'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-xs">Reguler</span>
                  <span className="text-[10px] text-slate-400">· 2-3 hari</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Tarif darat ekonomis antarkota</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-sm font-bold text-teal-400">
                  Rp {regCalc.ongkirTotal.toLocaleString('id-ID')}
                </div>
                <span className="text-[10px] text-slate-500">Rp 12.000 / kg</span>
              </div>
            </div>

            {/* Express */}
            <div
              onClick={() => setSelectedService('Express')}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                selectedService === 'Express'
                  ? 'bg-teal-500/15 border-teal-500/60 shadow-md'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-xs">Express</span>
                  <span className="text-[10px] text-emerald-400 font-medium">· Besok Sampai</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Prioritas armada malam Trans-Jawa</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-sm font-bold text-teal-400">
                  Rp {expCalc.ongkirTotal.toLocaleString('id-ID')}
                </div>
                <span className="text-[10px] text-slate-500">Rp 22.000 / kg</span>
              </div>
            </div>

            {/* Cargo */}
            <div
              onClick={() => setSelectedService('Cargo')}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                selectedService === 'Cargo'
                  ? 'bg-teal-500/15 border-teal-500/60 shadow-md'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-xs">Cargo</span>
                  <span className="text-[10px] text-slate-400">· 3-5 hari (Min. 10 kg)</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Kargo partai besar & mesin</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-sm font-bold text-teal-400">
                  Rp {crgCalc.ongkirTotal.toLocaleString('id-ID')}
                </div>
                <span className="text-[10px] text-slate-500">Rp 6.500 / kg</span>
              </div>
            </div>
          </div>

          {/* Breakdown button */}
          <button
            type="button"
            onClick={() => setShowDetailSheet(!showDetailSheet)}
            className="w-full py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 font-medium flex items-center justify-between transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-teal-400" />
              <span>Rincian Perhitungan Biaya & Volumetrik</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${showDetailSheet ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Detail Breakdown Bottom-sheet / Expanded section */}
          {showDetailSheet && (
            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Berat Aktual</span>
                <span className="font-mono text-slate-200">{activeCalc.beratAktualKg} kg</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">
                  Berat Volumetrik ({panjang}×{lebar}×{tinggi}÷5000)
                </span>
                <span className="font-mono text-slate-200">{activeCalc.beratVolumetrik} kg</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800 font-semibold">
                <span className="text-teal-300">Berat Dikenakan Biaya [Maks]</span>
                <span className="font-mono text-teal-300">{activeCalc.beratDikenakan} kg</span>
              </div>
              {selectedService === 'Cargo' && activeCalc.beratDikenakan < 10 && (
                <div className="flex items-center justify-between py-1 border-b border-slate-800 text-amber-400">
                  <span>Kebijakan Minimum Kargo</span>
                  <span className="font-mono">10.0 kg</span>
                </div>
              )}
              <div className="flex items-center justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Tarif Zona per kg</span>
                <span className="font-mono text-slate-200">
                  Rp {activeCalc.tarifPerKg.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Biaya Tersembunyi</span>
                <span className="font-mono text-emerald-400 font-bold">Rp 0 (Transparan)</span>
              </div>
              <div className="flex items-center justify-between pt-1 text-sm font-bold">
                <span className="text-white">Total Ongkos Kirim</span>
                <span className="font-mono text-teal-400">
                  Rp {activeCalc.ongkirTotal.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="p-4 border-t border-slate-800 bg-[#0f172a]">
          <button
            onClick={() => {
              onClose();
              onSelectServiceToSend({
                asal,
                tujuan,
                berat,
                panjang,
                lebar,
                tinggi,
                layanan: selectedService,
              });
            }}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25 active:scale-[0.98] transition-transform cursor-pointer"
          >
            <span>Kirim dengan Layanan {selectedService}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
