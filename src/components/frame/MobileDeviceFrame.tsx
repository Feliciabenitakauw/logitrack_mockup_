import React from 'react';
import { Wifi, Signal, Battery, WifiOff } from 'lucide-react';

interface MobileDeviceFrameProps {
  children: React.ReactNode;
  isOffline?: boolean;
  currentTime?: string;
}

export const MobileDeviceFrame: React.FC<MobileDeviceFrameProps> = ({
  children,
  isOffline = false,
  currentTime = '09:41',
}) => {
  return (
    <div className="relative mx-auto my-2 select-none">
      {/* Outer Phone Casing 390 x 844 px */}
      <div
        className="relative w-[390px] h-[844px] bg-[#020617] rounded-[50px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_12px_#1e293b,0_0_0_14px_#334155] border-4 border-slate-900 overflow-hidden flex flex-col transition-all"
        style={{
          boxShadow:
            '0 25px 70px -10px rgba(0,0,0,0.9), 0 0 0 10px #0f172a, 0 0 0 12px #334155, 0 0 25px rgba(20, 184, 166, 0.15)',
        }}
      >
        {/* Dynamic Island / Top Notch Area */}
        <div className="relative w-full h-11 pt-2 px-6 flex items-center justify-between z-50 bg-[#020617] shrink-0">
          {/* Status Bar Left: Clock */}
          <div className="text-[14px] font-semibold tracking-tight text-slate-200 w-12 text-left pl-1">
            {currentTime}
          </div>

          {/* Dynamic Island Capsule */}
          <div className="w-28 h-6 bg-black rounded-full flex items-center justify-between px-2 shadow-inner border border-slate-800/80">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-indigo-950/80" />
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
          </div>

          {/* Status Bar Right: Signal, Wifi, Battery */}
          <div className="flex items-center gap-1.5 text-slate-200 w-14 justify-end pr-1">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <div className="flex items-center gap-0.5">
              <span className="text-[10px] font-bold text-slate-300">94%</span>
              <div className="w-5 h-2.5 border border-slate-400 rounded-sm p-0.5 flex items-center">
                <div className="w-3.5 h-full bg-emerald-400 rounded-xs" />
              </div>
            </div>
          </div>
        </div>

        {/* Offline Banner (Shown when simulated offline state is active) */}
        {isOffline && (
          <div className="bg-rose-500 text-white px-4 py-1.5 text-xs font-medium flex items-center justify-center gap-2 z-50 shrink-0 shadow-md animate-in slide-in-from-top-2">
            <WifiOff className="w-3.5 h-3.5" />
            <span>Anda sedang offline. Menampilkan data tersimpan.</span>
          </div>
        )}

        {/* Screen Content Viewport (Scrollable container with hidden scrollbar) */}
        <div className="relative flex-1 overflow-y-auto no-scrollbar bg-[#020617] text-slate-200 flex flex-col">
          {children}
        </div>

        {/* Bottom Gesture Navigation Bar */}
        <div className="w-full h-5 bg-[#020617] flex items-center justify-center shrink-0 z-50">
          <div className="w-32 h-1 bg-slate-600/60 rounded-full" />
        </div>
      </div>
    </div>
  );
};
