import React from 'react';
import { ExternalLink, Clock, TrendingUp } from 'lucide-react';
import { Alert } from '../../types';
import { format } from 'date-fns';

interface AlertsFeedProps {
  alerts: Alert[];
}

export const AlertsFeed: React.FC<AlertsFeedProps> = ({ alerts }) => {
  const getSentimentColor = (sentiment: Alert['sentiment']) => {
    switch (sentiment) {
      case 'positive':
        return 'border-green-400 bg-green-400/10';
      case 'negative':
        return 'border-red-400 bg-red-400/10';
      default:
        return 'border-compete-gray bg-compete-gray/10';
    }
  };

  const getSentimentDot = (sentiment: Alert['sentiment']) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-400';
      case 'negative':
        return 'bg-red-400';
      default:
        return 'bg-compete-gray';
    }
  };

  return (
    <div className="bg-compete-indigo/30 border border-compete-indigo/40 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-compete-white">Market Alerts</h3>
        <TrendingUp className="w-5 h-5 text-compete-purple animate-pulse-slow" />
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {alerts.map((alert) => (
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
                {format(new Date(alert.created_at), 'HH:mm')}
              </div>
            </div>
            
            <p className="text-compete-gray mb-3 leading-relaxed">
              {alert.insight}
            </p>
            
            {alert.sources && alert.sources.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {alert.sources.map((source, index) => (
                  <a
                    key={index}
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs text-compete-purple hover:text-purple-400 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Source {index + 1}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};