import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  trend?: number[];
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  trend
}) => {
  const changeColor = {
    positive: 'text-compete-green',
    negative: 'text-compete-red',
    neutral: 'text-compete-gray'
  };

  return (
    <div className="bg-compete-indigo/30 border border-compete-indigo/40 rounded-xl p-6 hover:border-compete-purple/40 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-compete-purple/20 rounded-lg group-hover:bg-compete-purple/30 transition-colors">
          <Icon className="w-6 h-6 text-compete-purple" />
        </div>
        {change && (
          <span className={`text-sm font-medium ${changeType ? changeColor[changeType] : 'text-compete-gray'}`}>
            {change}
          </span>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-compete-gray text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-compete-white">{value}</p>
      </div>
      
      {trend && (
        <div className="mt-4 h-8 flex items-end space-x-1">
          {trend.map((point, index) => (
            <div
              key={index}
              className="flex-1 bg-compete-purple/40 rounded-sm"
              style={{ height: `${(point / Math.max(...trend)) * 100}%` }}
            />
          ))}
        </div>
      )}
    </div>
  );
};