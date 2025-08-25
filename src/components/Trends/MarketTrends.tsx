import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, BarChart3, Calendar, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface TrendPoint {
  date: string;
  mentions: number;
  sentiment: number;
  competitor: string;
}

export const MarketTrends: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>(['OnePlus', 'Xiaomi', 'Samsung']);
  const [trendData, setTrendData] = useState<TrendPoint[]>([]);

  // Mock trend data
  const mockTrendData = [
    { date: '2024-12-22', mentions: 45, sentiment: 0.7, competitor: 'OnePlus' },
    { date: '2024-12-23', mentions: 52, sentiment: 0.8, competitor: 'OnePlus' },
    { date: '2024-12-24', mentions: 38, sentiment: 0.6, competitor: 'OnePlus' },
    { date: '2024-12-25', mentions: 67, sentiment: 0.9, competitor: 'OnePlus' },
    { date: '2024-12-26', mentions: 71, sentiment: 0.85, competitor: 'OnePlus' },
    { date: '2024-12-27', mentions: 58, sentiment: 0.75, competitor: 'OnePlus' },
    { date: '2024-12-28', mentions: 82, sentiment: 0.92, competitor: 'OnePlus' },
    
    { date: '2024-12-22', mentions: 62, sentiment: 0.4, competitor: 'Xiaomi' },
    { date: '2024-12-23', mentions: 58, sentiment: 0.35, competitor: 'Xiaomi' },
    { date: '2024-12-24', mentions: 45, sentiment: 0.3, competitor: 'Xiaomi' },
    { date: '2024-12-25', mentions: 41, sentiment: 0.25, competitor: 'Xiaomi' },
    { date: '2024-12-26', mentions: 38, sentiment: 0.28, competitor: 'Xiaomi' },
    { date: '2024-12-27', mentions: 35, sentiment: 0.32, competitor: 'Xiaomi' },
    { date: '2024-12-28', mentions: 42, sentiment: 0.38, competitor: 'Xiaomi' },
    
    { date: '2024-12-22', mentions: 55, sentiment: 0.65, competitor: 'Samsung' },
    { date: '2024-12-23', mentions: 48, sentiment: 0.62, competitor: 'Samsung' },
    { date: '2024-12-24', mentions: 52, sentiment: 0.68, competitor: 'Samsung' },
    { date: '2024-12-25', mentions: 59, sentiment: 0.72, competitor: 'Samsung' },
    { date: '2024-12-26', mentions: 61, sentiment: 0.75, competitor: 'Samsung' },
    { date: '2024-12-27', mentions: 57, sentiment: 0.71, competitor: 'Samsung' },
    { date: '2024-12-28', mentions: 63, sentiment: 0.78, competitor: 'Samsung' },
  ];

  const aggregatedData = mockTrendData.reduce((acc, point) => {
    const existing = acc.find(item => item.date === point.date);
    if (existing) {
      existing[`${point.competitor}_mentions`] = point.mentions;
      existing[`${point.competitor}_sentiment`] = point.sentiment;
    } else {
      acc.push({
        date: point.date,
        [`${point.competitor}_mentions`]: point.mentions,
        [`${point.competitor}_sentiment`]: point.sentiment,
      });
    }
    return acc;
  }, [] as any[]);

  const competitorColors = {
    OnePlus: '#9333EA',
    Xiaomi: '#7C3AED',
    Samsung: '#A855F7',
    Apple: '#C084FC',
    Realme: '#DDD6FE'
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-compete-dark border border-compete-indigo/40 rounded-lg p-3">
          <p className="text-compete-white font-medium">{`Date: ${label}`}</p>
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-compete-white">Market Trends Analysis</h1>
          <p className="text-compete-gray mt-1">Track competitor performance and market dynamics</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="bg-compete-indigo/30 border border-compete-indigo/40 rounded-lg px-3 py-2 text-compete-white focus:outline-none focus:ring-2 focus:ring-compete-purple"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-compete-indigo/30 border border-compete-indigo/40 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-compete-purple" />
            <span className="text-green-400 text-sm font-medium">+15.3%</span>
          </div>
          <h3 className="text-2xl font-bold text-compete-white">1,247</h3>
          <p className="text-compete-gray text-sm">Total Mentions</p>
        </div>
        
        <div className="bg-compete-indigo/30 border border-compete-indigo/40 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="w-8 h-8 text-compete-purple" />
            <span className="text-compete-purple text-sm font-medium">0.72</span>
          </div>
          <h3 className="text-2xl font-bold text-compete-white">72%</h3>
          <p className="text-compete-gray text-sm">Avg Sentiment</p>
        </div>
        
        <div className="bg-compete-indigo/30 border border-compete-indigo/40 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingDown className="w-8 h-8 text-red-400" />
            <span className="text-red-400 text-sm font-medium">-8.2%</span>
          </div>
          <h3 className="text-2xl font-bold text-compete-white">156</h3>
          <p className="text-compete-gray text-sm">Negative Mentions</p>
        </div>
        
        <div className="bg-compete-indigo/30 border border-compete-indigo/40 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 text-compete-purple" />
            <span className="text-green-400 text-sm font-medium">+5</span>
          </div>
          <h3 className="text-2xl font-bold text-compete-white">23</h3>
          <p className="text-compete-gray text-sm">Active Trends</p>
        </div>
      </div>

      {/* Mentions Trend Chart */}
      <div className="bg-compete-indigo/30 border border-compete-indigo/40 rounded-xl p-6">
        <h3 className="text-xl font-bold text-compete-white mb-6">Mentions Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={aggregatedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#5B21B6" opacity={0.3} />
            <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            {selectedCompetitors.map((competitor) => (
              <Line
                key={competitor}
                type="monotone"
                dataKey={`${competitor}_mentions`}
                stroke={competitorColors[competitor as keyof typeof competitorColors]}
                strokeWidth={2}
                dot={{ fill: competitorColors[competitor as keyof typeof competitorColors], strokeWidth: 2, r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Sentiment Trend Chart */}
      <div className="bg-compete-indigo/30 border border-compete-indigo/40 rounded-xl p-6">
        <h3 className="text-xl font-bold text-compete-white mb-6">Sentiment Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={aggregatedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#5B21B6" opacity={0.3} />
            <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} domain={[0, 1]} />
            <Tooltip content={<CustomTooltip />} />
            {selectedCompetitors.map((competitor) => (
              <Area
                key={competitor}
                type="monotone"
                dataKey={`${competitor}_sentiment`}
                stackId="1"
                stroke={competitorColors[competitor as keyof typeof competitorColors]}
                fill={competitorColors[competitor as keyof typeof competitorColors]}
                fillOpacity={0.3}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Competitor Filter */}
      <div className="bg-compete-indigo/30 border border-compete-indigo/40 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Filter className="w-5 h-5 text-compete-purple" />
          <h3 className="text-lg font-semibold text-compete-white">Filter Competitors</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {Object.keys(competitorColors).map((competitor) => (
            <label key={competitor} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCompetitors.includes(competitor)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCompetitors([...selectedCompetitors, competitor]);
                  } else {
                    setSelectedCompetitors(selectedCompetitors.filter(c => c !== competitor));
                  }
                }}
                className="rounded border-compete-indigo/40 text-compete-purple focus:ring-compete-purple"
              />
              <span 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: competitorColors[competitor as keyof typeof competitorColors] }}
              ></span>
              <span className="text-compete-white">{competitor}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};