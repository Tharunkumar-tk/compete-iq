import React from 'react';
import { Users, TrendingUp, Eye, AlertTriangle, Database, Activity } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { CompetitorRanking } from './CompetitorRanking';
import { AlertsFeed } from './AlertsFeed';
import { SentimentChart } from './SentimentChart';
import { TrendData, Alert } from '../../types';

// Mock data
const mockTrendData: TrendData[] = [
  { competitor: 'OnePlus', mentions: 1247, sentiment_score: 0.78, trend_direction: 'up', change_percentage: 15.3 },
  { competitor: 'Xiaomi', mentions: 1156, sentiment_score: 0.45, trend_direction: 'down', change_percentage: -8.2 },
  { competitor: 'Samsung', mentions: 1089, sentiment_score: 0.62, trend_direction: 'up', change_percentage: 5.7 },
  { competitor: 'Apple', mentions: 945, sentiment_score: 0.73, trend_direction: 'stable', change_percentage: 1.2 },
  { competitor: 'Realme', mentions: 823, sentiment_score: 0.58, trend_direction: 'up', change_percentage: 12.1 },
];

const mockAlerts: Alert[] = [
  {
    id: '1',
    competitor_id: '1',
    insight: 'OnePlus 13 launch announcement driving significant positive buzz across Indian tech media with 15% increase in mentions',
    trend_score: 8.5,
    sentiment: 'positive',
    created_at: new Date().toISOString(),
    competitor: { id: '1', name: 'OnePlus', website: 'oneplus.in', sector: 'smartphones', created_at: '' },
    sources: ['https://gadgets360.com/oneplus-13-launch', 'https://91mobiles.com/oneplus-news']
  },
  {
    id: '2',
    competitor_id: '2',
    insight: 'Xiaomi facing criticism over software update delays, negative sentiment spike detected across social platforms',
    trend_score: 7.2,
    sentiment: 'negative',
    created_at: new Date(Date.now() - 1800000).toISOString(),
    competitor: { id: '2', name: 'Xiaomi', website: 'mi.com', sector: 'smartphones', created_at: '' },
    sources: ['https://twitter.com/XiaomiIndia', 'https://reddit.com/r/xiaomi']
  }
];

const mockSentimentData = [
  { time: '09:00', positive: 45, negative: 12, neutral: 23 },
  { time: '12:00', positive: 52, negative: 15, neutral: 28 },
  { time: '15:00', positive: 38, negative: 22, neutral: 31 },
  { time: '18:00', positive: 47, negative: 18, neutral: 25 },
  { time: '21:00', positive: 41, negative: 14, neutral: 29 },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-compete-white">Strategic Intelligence Dashboard</h1>
          <p className="text-compete-gray mt-1">Real-time competitor insights for Indian smartphone market</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-compete-green rounded-full animate-pulse"></div>
          <span className="text-compete-green text-sm font-medium">Live Data</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Competitors"
          value="8"
          change="+2 this week"
          changeType="positive"
          icon={Users}
        />
        <MetricCard
          title="Total Mentions"
          value="5,260"
          change="+12.5%"
          changeType="positive"
          icon={TrendingUp}
          trend={[45, 52, 38, 47, 41, 48, 55]}
        />
        <MetricCard
          title="AI Insights"
          value="23"
          change="5 new alerts"
          changeType="neutral"
          icon={Eye}
        />
        <MetricCard
          title="Data Sources"
          value="12"
          change="All active"
          changeType="positive"
          icon={Database}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Competitor Rankings */}
        <div className="lg:col-span-1">
          <CompetitorRanking data={mockTrendData} />
        </div>

        {/* Sentiment Chart */}
        <div className="lg:col-span-2">
          <SentimentChart data={mockSentimentData} />
        </div>
      </div>

      {/* Alerts Feed */}
      <AlertsFeed alerts={mockAlerts} />
    </div>
  );
};