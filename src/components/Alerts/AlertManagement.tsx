import React, { useState, useEffect } from 'react';
import { Bell, Plus, Settings, Trash2, Mail, MessageSquare, Clock, Filter } from 'lucide-react';
import { Alert } from '../../types';

interface AlertRule {
  id: string;
  name: string;
  type: 'keyword' | 'sentiment' | 'volume' | 'competitor';
  conditions: {
    keywords?: string[];
    sentiment_threshold?: number;
    volume_threshold?: number;
    competitors?: string[];
  };
  channels: ('email' | 'slack' | 'webhook')[];
  is_active: boolean;
  created_at: string;
}

export const AlertManagement: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [alertRules, setAlertRules] = useState<AlertRule[]>([]);
  const [showCreateRule, setShowCreateRule] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all');

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
    },
    {
      id: '3',
      competitor_id: '3',
      insight: 'Samsung Galaxy S25 series specifications leaked, generating moderate discussion in tech communities',
      trend_score: 6.8,
      sentiment: 'neutral',
      created_at: new Date(Date.now() - 3600000).toISOString(),
      competitor: { id: '3', name: 'Samsung', website: 'samsung.com', sector: 'smartphones', created_at: '' },
      sources: ['https://gsmarena.com/samsung-galaxy-s25', 'https://sammobile.com/news']
    }
  ];

  const mockAlertRules: AlertRule[] = [
    {
      id: '1',
      name: 'OnePlus Launch Keywords',
      type: 'keyword',
      conditions: { keywords: ['OnePlus 13', 'launch', 'announcement'] },
      channels: ['email', 'slack'],
      is_active: true,
      created_at: '2024-12-20T10:00:00Z'
    },
    {
      id: '2',
      name: 'Negative Sentiment Spike',
      type: 'sentiment',
      conditions: { sentiment_threshold: 0.3 },
      channels: ['email'],
      is_active: true,
      created_at: '2024-12-18T15:30:00Z'
    },
    {
      id: '3',
      name: 'High Volume Alert',
      type: 'volume',
      conditions: { volume_threshold: 100 },
      channels: ['slack', 'webhook'],
      is_active: false,
      created_at: '2024-12-15T09:15:00Z'
    }
  ];

  const getSentimentColor = (sentiment: Alert['sentiment']) => {
    switch (sentiment) {
      case 'positive': return 'border-green-400 bg-green-400/10';
      case 'negative': return 'border-red-400 bg-red-400/10';
      default: return 'border-compete-gray bg-compete-gray/10';
    }
  };

  const getSentimentDot = (sentiment: Alert['sentiment']) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-400';
      case 'negative': return 'bg-red-400';
      default: return 'bg-compete-gray';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'slack': return <MessageSquare className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const filteredAlerts = selectedFilter === 'all' 
    ? mockAlerts 
    : mockAlerts.filter(alert => alert.sentiment === selectedFilter);

  useEffect(() => {
    setAlerts(mockAlerts);
    setAlertRules(mockAlertRules);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-compete-white">Alert Management</h1>
          <p className="text-compete-gray mt-1">Configure and manage your intelligence alerts</p>
        </div>
        <button
          onClick={() => setShowCreateRule(true)}
          className="flex items-center space-x-2 bg-compete-purple text-compete-white px-4 py-2 rounded-lg hover:bg-compete-purple/80 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Alert Rule</span>
        </button>
      </div>

      {/* Alert Rules Section */}
      <div className="bg-compete-indigo/30 border border-compete-indigo/40 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-compete-white">Alert Rules</h2>
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-compete-purple" />
            <span className="text-compete-purple text-sm">{alertRules.filter(r => r.is_active).length} Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {alertRules.map((rule) => (
            <div
              key={rule.id}
              className="bg-compete-dark/50 border border-compete-indigo/20 rounded-lg p-4 hover:border-compete-purple/40 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-compete-white">{rule.name}</h3>
                  <p className="text-sm text-compete-gray capitalize">{rule.type} Alert</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${rule.is_active ? 'bg-green-400' : 'bg-compete-gray'}`}></div>
                  <button className="text-compete-gray hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                {rule.conditions.keywords && (
                  <div className="flex flex-wrap gap-1">
                    {rule.conditions.keywords.map((keyword, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-compete-purple/20 text-compete-purple rounded">
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
                {rule.conditions.sentiment_threshold && (
                  <p className="text-xs text-compete-gray">
                    Sentiment threshold: {rule.conditions.sentiment_threshold}
                  </p>
                )}
                {rule.conditions.volume_threshold && (
                  <p className="text-xs text-compete-gray">
                    Volume threshold: {rule.conditions.volume_threshold}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {rule.channels.map((channel, index) => (
                  <div key={index} className="flex items-center space-x-1 text-compete-gray">
                    {getChannelIcon(channel)}
                    <span className="text-xs capitalize">{channel}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Alerts Section */}
      <div className="bg-compete-indigo/30 border border-compete-indigo/40 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-compete-white">Recent Alerts</h2>
          <div className="flex items-center space-x-3">
            <Filter className="w-4 h-4 text-compete-gray" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value as any)}
              className="bg-compete-dark border border-compete-indigo/40 rounded-lg px-3 py-1 text-compete-white text-sm focus:outline-none focus:ring-2 focus:ring-compete-purple"
            >
              <option value="all">All Alerts</option>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
              <option value="neutral">Neutral</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`border-l-4 p-4 rounded-r-lg ${getSentimentColor(alert.sentiment)} hover:bg-opacity-20 transition-all duration-200`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getSentimentDot(alert.sentiment)} animate-pulse`}></div>
                  <h4 className="font-semibold text-compete-white">
                    {alert.competitor?.name || 'Market Alert'}
                  </h4>
                  <span className="text-xs text-compete-gray bg-compete-indigo/20 px-2 py-1 rounded">
                    Score: {alert.trend_score}
                  </span>
                </div>
                <div className="flex items-center text-xs text-compete-gray">
                  <Clock className="w-3 h-3 mr-1" />
                  {new Date(alert.created_at).toLocaleTimeString()}
                </div>
              </div>
              
              <p className="text-compete-gray mb-3 leading-relaxed">
                {alert.insight}
              </p>
              
              {alert.sources && alert.sources.length > 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {alert.sources.map((source, index) => (
                      <a
                        key={index}
                        href={source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs text-compete-purple hover:text-purple-400 transition-colors"
                      >
                        Source {index + 1}
                      </a>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Bell className="w-4 h-4 text-compete-purple" />
                    <span className="text-xs text-compete-purple">Auto-generated</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Create Rule Modal Placeholder */}
      {showCreateRule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-compete-dark border border-compete-indigo/40 rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-compete-white mb-4">Create Alert Rule</h3>
            <p className="text-compete-gray mb-4">Alert rule creation interface coming soon...</p>
            <button
              onClick={() => setShowCreateRule(false)}
              className="bg-compete-purple text-compete-white px-4 py-2 rounded-lg hover:bg-compete-purple/80 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};