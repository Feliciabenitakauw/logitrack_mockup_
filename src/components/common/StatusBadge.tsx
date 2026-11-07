import React from 'react';
import { PackageStatus } from '../../types';

interface StatusBadgeProps {
  status: PackageStatus;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  className = '',
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Terkirim':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Sedang Diantar':
        return 'bg-teal-500/15 text-teal-400 border-teal-500/30';
      case 'Dalam Perjalanan':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'Gagal Kirim':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      case 'Dibatalkan':
        return 'bg-slate-500/15 text-slate-400 border-slate-500/30';
      case 'Paket Terdaftar':
      case 'Dijemput':
      case 'Di Gudang':
      default:
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
    }
  };

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${getStatusColor()} ${sizeClasses[size]} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
      {status}
    </span>
  );
};

export const NewBadge: React.FC<{ show?: boolean; className?: string }> = ({
  show = true,
  className = '',
}) => {
  if (!show) return null;
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-teal-500/20 text-teal-300 border border-teal-400/40 ml-1.5 align-middle ${className}`}
    >
      BARU
    </span>
  );
};
