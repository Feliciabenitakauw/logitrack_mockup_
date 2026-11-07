import React, { useState } from 'react';
import { Truck, Navigation, MapPin, ZoomIn, ZoomOut, Compass } from 'lucide-react';

interface SvgMapTrackerProps {
  asal?: string;
  tujuan?: string;
  lokasiSaatIni?: string;
  estimasiTiba?: string;
  kurirNama?: string;
  platNomor?: string;
}

export const SvgMapTracker: React.FC<SvgMapTrackerProps> = ({
  asal = 'Jakarta Utara',
  tujuan = 'Surabaya',
  lokasiSaatIni = 'Hub Transit Surabaya Barat (KM 742)',
  estimasiTiba = '17:00 WIB',
  kurirNama = 'Andi Saputra',
  platNomor = 'B 4821 TRL',
}) => {
  const [zoom, setZoom] = useState(1);
  const [activePoint, setActivePoint] = useState<string | null>('kurir');

  return (
    <div className="relative w-full h-64 bg-[#091122] rounded-2xl overflow-hidden border border-slate-800 shadow-inner select-none">
      {/* Top Map Controls */}
      <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5 bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-slate-800">
        <button
          onClick={() => setZoom((z) => Math.min(z + 0.2, 1.6))}
          className="w-7 h-7 flex items-center justify-center text-slate-300 hover:text-white active:scale-95 transition-transform"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <div className="h-[1px] bg-slate-800 w-full" />
        <button
          onClick={() => setZoom((z) => Math.max(z - 0.2, 0.8))}
          className="w-7 h-7 flex items-center justify-center text-slate-300 hover:text-white active:scale-95 transition-transform"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Floating GPS live pill */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-teal-500/30 text-[10px] text-teal-300 font-medium shadow-lg">
        <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
        <span>GPS Satelit Terhubung · 68 km/jam</span>
      </div>

      {/* SVG Canvas */}
      <div
        className="w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
        style={{ transform: `scale(${zoom})` }}
      >
        <svg
          viewBox="0 0 400 240"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="mapRouteGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="70%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <radialGradient id="courierGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Grid lines */}
          <g stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3 3">
            <line x1="0" y1="60" x2="400" y2="60" />
            <line x1="0" y1="120" x2="400" y2="120" />
            <line x1="0" y1="180" x2="400" y2="180" />
            <line x1="80" y1="0" x2="80" y2="240" />
            <line x1="160" y1="0" x2="160" y2="240" />
            <line x1="240" y1="0" x2="240" y2="240" />
            <line x1="320" y1="0" x2="320" y2="240" />
          </g>

          {/* Stylized Island Silhouette (Java Island Mainland & Coastlines) */}
          <path
            d="M 20,135 Q 50,115 100,125 T 180,120 T 260,115 T 330,125 Q 360,140 380,150 Q 360,175 320,180 T 220,175 T 120,180 Q 50,185 20,165 Z"
            fill="#0f1d36"
            stroke="#1e3a5f"
            strokeWidth="1.5"
          />

          {/* Secondary Coastlines / Sunda Strait & Madura */}
          <path
            d="M 330,110 Q 355,105 375,115 T 350,120 Z"
            fill="#0f1d36"
            stroke="#1e3a5f"
            strokeWidth="1"
          />

          {/* Trans-Java Highway Network (Secondary routes) */}
          <path
            d="M 50,135 Q 90,145 130,140 T 220,145 T 310,135"
            stroke="#1e293b"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Active Expedition Route (Jakarta to Surabaya via Pantura) */}
          {/* Base path */}
          <path
            d="M 60,130 Q 110,122 170,126 T 250,124 T 335,130"
            stroke="#134e4a"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Animated Glowing Path */}
          <path
            d="M 60,130 Q 110,122 170,126 T 250,124 T 335,130"
            stroke="url(#mapRouteGrad)"
            strokeWidth="3"
            strokeDasharray="6 4"
            strokeLinecap="round"
          />

          {/* Transit Hubs */}
          {/* 1. Jakarta (Origin) */}
          <g
            className="cursor-pointer"
            onClick={() => setActivePoint('jakarta')}
          >
            <circle cx="60" cy="130" r="6" fill="#14b8a6" />
            <circle cx="60" cy="130" r="10" fill="#14b8a6" fillOpacity="0.2" />
            <text x="60" y="152" fill="#94a3b8" fontSize="9" textAnchor="middle" fontWeight="500">
              Jakarta
            </text>
          </g>

          {/* 2. Cirebon Transit */}
          <g
            className="cursor-pointer"
            onClick={() => setActivePoint('cirebon')}
          >
            <circle cx="150" cy="126" r="3.5" fill="#475569" stroke="#64748b" strokeWidth="1" />
            <text x="150" y="115" fill="#64748b" fontSize="8" textAnchor="middle">
              Cirebon
            </text>
          </g>

          {/* 3. Semarang Transit */}
          <g
            className="cursor-pointer"
            onClick={() => setActivePoint('semarang')}
          >
            <circle cx="230" cy="125" r="3.5" fill="#475569" stroke="#64748b" strokeWidth="1" />
            <text x="230" y="115" fill="#64748b" fontSize="8" textAnchor="middle">
              Semarang
            </text>
          </g>

          {/* 4. Surabaya (Destination) */}
          <g
            className="cursor-pointer"
            onClick={() => setActivePoint('surabaya')}
          >
            <circle cx="335" cy="130" r="6" fill="#f59e0b" />
            <circle cx="335" cy="130" r="11" fill="#f59e0b" fillOpacity="0.2" />
            <text x="335" y="152" fill="#f59e0b" fontSize="9" textAnchor="middle" fontWeight="600">
              Surabaya
            </text>
          </g>

          {/* Live Courier Position (Currently approaching Surabaya at ~85% mark: x=295, y=127) */}
          <g
            className="cursor-pointer"
            onClick={() => setActivePoint('kurir')}
          >
            {/* Animated radar rings */}
            <circle cx="295" cy="127" r="18" fill="url(#courierGlow)">
              <animate
                attributeName="r"
                values="10;22;10"
                dur="2.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.8;0.1;0.8"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Courier marker badge */}
            <rect
              x="283"
              y="115"
              width="24"
              height="24"
              rx="12"
              fill="#10b981"
              stroke="#0f172a"
              strokeWidth="2"
            />
            {/* Truck Icon */}
            <path
              d="M291 123 h5 l2 3 h3 v5 h-1 a2 2 0 0 1 -4 0 h-2 a2 2 0 0 1 -4 0 h-1 v-8 z"
              fill="#ffffff"
            />
          </g>
        </svg>
      </div>

      {/* Bottom overlay status card */}
      <div className="absolute bottom-2 left-2 right-2 bg-slate-900/95 backdrop-blur-md p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-medium text-slate-200">
              <span>{lokasiSaatIni}</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Kurir: <strong className="text-slate-300">{kurirNama}</strong> ({platNomor})
            </div>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider">ETA Tiba</div>
          <div className="text-xs font-bold text-emerald-400">{estimasiTiba}</div>
        </div>
      </div>
    </div>
  );
};
