import React from 'react';

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="p-4 space-y-4 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-800" />
          <div className="space-y-1.5">
            <div className="w-20 h-3 bg-slate-800 rounded" />
            <div className="w-32 h-4 bg-slate-700 rounded" />
          </div>
        </div>
        <div className="w-9 h-9 rounded-xl bg-slate-800" />
      </div>

      {/* Main Card skeleton */}
      <div className="w-full h-36 rounded-2xl bg-slate-800/80 p-4 space-y-3">
        <div className="w-24 h-3 bg-slate-700 rounded" />
        <div className="w-48 h-8 bg-slate-700 rounded" />
        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="h-8 bg-slate-700/60 rounded-xl" />
          <div className="h-8 bg-slate-700/60 rounded-xl" />
          <div className="h-8 bg-slate-700/60 rounded-xl" />
        </div>
      </div>

      {/* 4 icons skeleton */}
      <div className="grid grid-cols-4 gap-2">
        <div className="h-16 rounded-2xl bg-slate-800" />
        <div className="h-16 rounded-2xl bg-slate-800" />
        <div className="h-16 rounded-2xl bg-slate-800" />
        <div className="h-16 rounded-2xl bg-slate-800" />
      </div>

      {/* Section cards skeleton */}
      <div className="space-y-2.5 pt-2">
        <div className="w-32 h-4 bg-slate-800 rounded" />
        <div className="w-full h-24 rounded-2xl bg-slate-800/70" />
        <div className="w-full h-24 rounded-2xl bg-slate-800/70" />
      </div>
    </div>
  );
};
