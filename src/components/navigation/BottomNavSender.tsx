import React from 'react';
import { Home, PackagePlus, Compass, Clock, User } from 'lucide-react';

export type SenderTab = 'beranda' | 'kirim' | 'lacak' | 'riwayat' | 'akun';

interface BottomNavSenderProps {
  currentTab: SenderTab;
  onChangeTab: (tab: SenderTab) => void;
  activeCount?: number;
}

export const BottomNavSender: React.FC<BottomNavSenderProps> = ({
  currentTab,
  onChangeTab,
  activeCount = 2,
}) => {
  const tabs = [
    { id: 'beranda' as SenderTab, label: 'Beranda', icon: Home },
    { id: 'kirim' as SenderTab, label: 'Kirim', icon: PackagePlus },
    { id: 'lacak' as SenderTab, label: 'Lacak', icon: Compass },
    { id: 'riwayat' as SenderTab, label: 'Riwayat', icon: Clock, badge: activeCount },
    { id: 'akun' as SenderTab, label: 'Akun', icon: User },
  ];

  return (
    <div className="sticky bottom-0 left-0 right-0 z-40 bg-[#0f172a]/95 backdrop-blur-md border-t border-slate-800/80 px-2 py-1.5 flex items-center justify-around shrink-0">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onChangeTab(tab.id)}
            className={`relative flex flex-col items-center justify-center min-w-[60px] min-h-[48px] py-1 transition-colors ${
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
                <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 rounded-full bg-teal-500 text-[#020617] text-[10px] font-bold flex items-center justify-center shadow-sm">
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
