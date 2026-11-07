import React from 'react';
import { ClipboardList, QrCode, Clock, User } from 'lucide-react';

export type CourierTab = 'tugas' | 'scan' | 'riwayat' | 'akun';

interface BottomNavCourierProps {
  currentTab: CourierTab;
  onChangeTab: (tab: CourierTab) => void;
  pendingCount?: number;
}

export const BottomNavCourier: React.FC<BottomNavCourierProps> = ({
  currentTab,
  onChangeTab,
  pendingCount = 4,
}) => {
  const tabs = [
    { id: 'tugas' as CourierTab, label: 'Tugas', icon: ClipboardList, badge: pendingCount },
    { id: 'scan' as CourierTab, label: 'Scan', icon: QrCode },
    { id: 'riwayat' as CourierTab, label: 'Riwayat', icon: Clock },
    { id: 'akun' as CourierTab, label: 'Akun', icon: User },
  ];

  return (
    <div className="sticky bottom-0 left-0 right-0 z-40 bg-[#0f172a]/95 backdrop-blur-md border-t border-slate-800/80 px-4 py-1.5 flex items-center justify-around shrink-0">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onChangeTab(tab.id)}
            className={`relative flex flex-col items-center justify-center min-w-[64px] min-h-[48px] py-1 transition-colors ${
              isActive ? 'text-teal-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <Icon
                className={`w-5 h-5 transition-transform ${
                  isActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.8]'
                }`}
              />
              {tab.badge && tab.badge > 0 ? (
                <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 rounded-full bg-amber-500 text-[#020617] text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {tab.badge}
                </span>
              ) : null}
            </div>
            <span className="text-[10px] tracking-tight mt-1">{tab.label}</span>
            {isActive && (
              <span className="absolute bottom-0 w-6 h-0.5 bg-teal-400 rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};
