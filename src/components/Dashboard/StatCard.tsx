import React from 'react';
import { Card } from '../UI/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendDirection = 'neutral',
  color = 'primary'
}) => {
  const colorMap = {
    primary: 'bg-brand-50 text-brand-600',
    success: 'bg-emerald-50 text-emerald-600',
    warning: 'bg-amber-50 text-amber-600',
    danger: 'bg-red-50 text-red-600',
    info: 'bg-sky-50 text-sky-600'
  };

  const trendColorMap = {
    up: 'text-emerald-500',
    down: 'text-red-500',
    neutral: 'text-slate-400'
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <h4 className="text-3xl font-bold text-slate-800">{value}</h4>
        </div>
        <div className={`p-3 rounded-xl ${colorMap[color]}`}>
          {icon}
        </div>
      </div>
      
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          <span className={`font-semibold ${trendColorMap[trendDirection]}`}>
            {trendDirection === 'up' && '↑ '}
            {trendDirection === 'down' && '↓ '}
            {trend}
          </span>
          <span className="text-slate-400 ml-2">vs bulan lalu</span>
        </div>
      )}
    </Card>
  );
};
