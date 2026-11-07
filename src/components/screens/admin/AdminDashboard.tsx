import React, { useState } from 'react';
import {
  Shield,
  Truck,
  Users,
  AlertTriangle,
  CheckCircle2,
  Filter,
  UserCheck,
  X,
  FileSpreadsheet,
} from 'lucide-react';
import { StatusBadge } from '../../common/StatusBadge';
import { COURIERS } from '../../../data/mockData';
import { PackageItem, PackageStatus } from '../../../types';

interface AdminDashboardProps {
  packages: PackageItem[];
  onAssignCourier: (packageId: string, courierName: string, plat: string) => void;
  onRecordIncident: (packageId: string, issue: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  packages,
  onAssignCourier,
  onRecordIncident,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('Semua');
  const [selectedPkg, setSelectedPkg] = useState<PackageItem | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [incidentType, setIncidentType] = useState('Armada Mogok / Kendala Jalur Tol');
  const [incidentDesc, setIncidentDesc] = useState('');

  // KPIs
  const totalCount = packages.length;
  const inTransitCount = packages.filter((p) => p.status === 'Sedang Diantar' || p.status === 'Dalam Perjalanan').length;
  const failedCount = packages.filter((p) => p.status === 'Gagal Kirim').length;
  const unassignedCount = packages.filter((p) => !p.kurir && p.status !== 'Dibatalkan').length;

  const filteredPackages = packages.filter((p) => {
    if (filterStatus === 'Semua') return true;
    if (filterStatus === 'Diantar') return p.status === 'Sedang Diantar';
    if (filterStatus === 'Gagal') return p.status === 'Gagal Kirim';
    if (filterStatus === 'Belum Ditugaskan') return !p.kurir;
    return true;
  });

  const handleExecuteAssign = (courier: typeof COURIERS[0]) => {
    if (!selectedPkg) return;
    onAssignCourier(selectedPkg.id, courier.nama, courier.platNomor);
    setShowAssignModal(false);
    setSelectedPkg(null);
  };

  const handleExecuteIncident = () => {
    if (!selectedPkg || !incidentDesc.trim()) {
      alert('Deskripsi kendala wajib diisi.');
      return;
    }
    onRecordIncident(selectedPkg.id, `${incidentType}: ${incidentDesc}`);
    setShowIncidentModal(false);
    setIncidentDesc('');
    setSelectedPkg(null);
  };

  return (
    <div className="flex-1 flex flex-col p-4 space-y-3 pb-6 overflow-y-auto text-xs">
      {/* Admin Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Dashboard Operasional Armada</h2>
            <p className="text-[10px] text-slate-400">Pengawasan Lintas Darat Ekspedisi</p>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded bg-slate-800 text-teal-300 font-mono text-[10px] font-bold">
          Admin Hub
        </span>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-4 gap-1.5">
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-[9px] text-slate-400 uppercase block">Total</span>
          <span className="text-base font-extrabold font-mono text-white">{totalCount}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-[9px] text-slate-400 uppercase block">Diantar</span>
          <span className="text-base font-extrabold font-mono text-teal-400">{inTransitCount}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-[9px] text-slate-400 uppercase block">Gagal</span>
          <span className="text-base font-extrabold font-mono text-rose-400">{failedCount}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-[9px] text-slate-400 uppercase block">Belum Ada</span>
          <span className="text-base font-extrabold font-mono text-amber-400">{unassignedCount}</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {['Semua', 'Diantar', 'Gagal', 'Belum Ditugaskan'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
              filterStatus === st
                ? 'bg-teal-500 text-slate-950 font-bold'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Package Management List */}
      <div className="space-y-2">
        {filteredPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="p-3 bg-slate-900 rounded-2xl border border-slate-800 space-y-2 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-teal-300">{pkg.resi}</span>
              <StatusBadge status={pkg.status} size="sm" />
            </div>

            <div className="text-xs text-white font-medium">{pkg.detail.isi}</div>
            <div className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>{pkg.pengirim.kota} → {pkg.penerima.kota}</span>
              <span>{pkg.detail.beratKg} kg · {pkg.layanan}</span>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <div className="text-[11px] text-slate-400">
                Kurir: <strong className="text-slate-300">{pkg.kurir?.nama || 'Belum Ditugaskan'}</strong>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setSelectedPkg(pkg);
                    setShowAssignModal(true);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-teal-500/15 border border-teal-500/40 text-teal-300 font-semibold text-[10px] hover:bg-teal-500/25 cursor-pointer"
                >
                  Tugaskan Kurir
                </button>
                <button
                  onClick={() => {
                    setSelectedPkg(pkg);
                    setShowIncidentModal(true);
                  }}
                  className="px-2 py-1 rounded-lg bg-rose-500/15 border border-rose-500/40 text-rose-400 font-semibold text-[10px] hover:bg-rose-500/25 cursor-pointer"
                >
                  Catat Kendala
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Sheet: Tugaskan Kurir */}
      {showAssignModal && selectedPkg && (
        <div className="fixed inset-0 z-50 bg-black/85 flex flex-col justify-end">
          <div className="p-4 bg-[#0f172a] rounded-t-3xl border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div>
                <h4 className="text-xs font-bold text-white">Tugaskan Kurir Armada</h4>
                <span className="font-mono text-[10px] text-teal-400">{selectedPkg.resi}</span>
              </div>
              <button onClick={() => setShowAssignModal(false)} className="text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {COURIERS.map((courier) => (
                <div
                  key={courier.id}
                  onClick={() => handleExecuteAssign(courier)}
                  className="p-3 bg-slate-900 rounded-xl border border-slate-800 hover:border-teal-500 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold">
                      {courier.nama.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs">{courier.nama}</div>
                      <div className="text-[10px] text-slate-400">
                        {courier.platNomor} · {courier.wilayah}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold">Tugaskan</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Catat Kendala Operasional */}
      {showIncidentModal && selectedPkg && (
        <div className="fixed inset-0 z-50 bg-black/85 p-4 flex flex-col justify-center items-center">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
                <AlertTriangle className="w-4 h-4" />
                <span>Catat Kendala Pengiriman</span>
              </div>
              <button onClick={() => setShowIncidentModal(false)} className="text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                  Jenis Kendala
                </label>
                <select
                  value={incidentType}
                  onChange={(e) => setIncidentType(e.target.value)}
                  className="w-full h-9 px-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-teal-400"
                >
                  <option value="Armada Mogok / Kendala Jalur Tol">Armada Mogok / Kendala Jalur Tol</option>
                  <option value="Bencana Cuaca / Banjir Jalur Pantura">Bencana Cuaca / Banjir Jalur Pantura</option>
                  <option value="Alamat Tidak Ditemukan">Alamat Penerima Tidak Ditemukan</option>
                  <option value="Kemasan Rusak Saat Transit">Kemasan Rusak Saat Transit</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                  Alasan & Keterangan Wajib
                </label>
                <textarea
                  rows={2}
                  value={incidentDesc}
                  onChange={(e) => setIncidentDesc(e.target.value)}
                  placeholder="Detail kendala yang terjadi di lapangan..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs resize-none focus:outline-none focus:border-rose-400"
                />
              </div>

              <button
                onClick={handleExecuteIncident}
                className="w-full h-10 mt-1 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Simpan Catatan Kendala</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
