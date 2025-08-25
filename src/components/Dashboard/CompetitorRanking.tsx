import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { TrendData } from '../../types';

interface CompetitorRankingProps {
  data: TrendData[];
}

export const CompetitorRanking: React.FC<CompetitorRankingProps> = ({ data }) => {
  const getTrendIcon = (direction: TrendData['trend_direction']) => {
    switch (direction) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-compete-gray" />;
    }
  };

  const getSentimentColor = (score: number) => {
    if (score > 0.6) return 'text-green-400';
    if (score < 0.4) return 'text-red-400';
    return 'text-compete-gray';
  };

  return (
    <div className="bg-compete-indigo/30 border border-compete-indigo/40 rounded-xl p-6">
      <h3 className="text-xl font-bold text-compete-white mb-6">Competitor Rankings</h3>
      
      <div className="space-y-4">
        {data.map((competitor, index) => (
          <div
            key={competitor.competitor}
            className="flex items-center justify-between p-4 bg-compete-dark/50 rounded-lg border border-compete-indigo/20 hover:border-compete-purple/40 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-8 h-8 bg-compete-purple/20 rounded-full text-compete-white font-bold">
                {index + 1}
              </div>
              <div>
                <h4 className="font-semibold text-compete-white">{competitor.competitor}</h4>
                <p className="text-sm text-compete-gray">{competitor.mentions} mentions</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className={`text-sm font-medium ${getSentimentColor(competitor.sentiment_score)}`}>
                  {Math.round(competitor.sentiment_score * 100)}%
                </p>
                <p className="text-xs text-compete-gray">Sentiment</p>
              </div>
              
              <div className="flex items-center space-x-2">
                {getTrendIcon(competitor.trend_direction)}
                <span className={`text-sm font-medium ${
                  competitor.change_percentage > 0 ? 'text-green-400' : 
                  competitor.change_percentage < 0 ? 'text-red-400' : 'text-compete-gray'
                }`}>
                  {competitor.change_percentage > 0 ? '+' : ''}{competitor.change_percentage}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};