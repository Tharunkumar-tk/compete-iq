import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SentimentData {
  time: string;
  positive: number;
  negative: number;
  neutral: number;
}

interface SentimentChartProps {
  data: SentimentData[];
}

export const SentimentChart: React.FC<SentimentChartProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-compete-dark border border-compete-indigo/40 rounded-lg p-3">
          <p className="text-compete-white font-medium">{`Time: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-compete-indigo/30 border border-compete-indigo/40 rounded-xl p-6">
      <h3 className="text-xl font-bold text-compete-white mb-6">Sentiment Analysis</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#5B21B6" opacity={0.3} />
          <XAxis 
            dataKey="time" 
            stroke="#9CA3AF"
            fontSize={12}
          />
          <YAxis 
            stroke="#9CA3AF"
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="positive" fill="#9333EA" radius={[2, 2, 0, 0]} />
          <Bar dataKey="negative" fill="#7C3AED" radius={[2, 2, 0, 0]} />
          <Bar dataKey="neutral" fill="#FFFFFF" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      
      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-compete-purple rounded-full"></div>
          <span className="text-sm text-compete-gray">Positive</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
          <span className="text-sm text-compete-gray">Negative</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-white rounded-full"></div>
          <span className="text-sm text-compete-gray">Neutral</span>
        </div>
      </div>
    </div>
  );
};