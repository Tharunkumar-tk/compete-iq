import React, { useState, useEffect } from 'react';
import { Brain, Lightbulb, TrendingUp, AlertTriangle, Target, Zap } from 'lucide-react';

interface Insight {
  id: string;
  type: 'opportunity' | 'threat' | 'trend' | 'recommendation';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  competitors: string[];
  sources: number;
  created_at: string;
}

export const AIInsights: React.FC = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isGenerating, setIsGenerating] = useState(false);

  const mockInsights: Insight[] = [
    {
      id: '1',
      type: 'opportunity',
      title: 'OnePlus 13 Launch Window Creates Market Gap',
      description: 'Analysis of 247 articles shows OnePlus 13 launch delayed by 3 weeks, creating opportunity for competitors to capture premium segment attention. Xiaomi and Samsung showing increased marketing activity.',
      confidence: 0.89,
      impact: 'high',
      competitors: ['OnePlus', 'Xiaomi', 'Samsung'],
      sources: 247,
      created_at: '2024-12-28T10:30:00Z'
    },
    {
      id: '2',
      type: 'threat',
      title: 'Apple iPhone 16 Price Drop Signals Aggressive Strategy',
      description: 'Apple India reducing iPhone 16 prices by 8-12% across major retailers. This aggressive pricing could pressure Android flagship sales, particularly affecting OnePlus and Samsung premium models.',
      confidence: 0.94,
      impact: 'high',
      competitors: ['Apple', 'OnePlus', 'Samsung'],
      sources: 156,
      created_at: '2024-12-28T09:15:00Z'
    },
    {
      id: '3',
      type: 'trend',
      title: 'AI Camera Features Becoming Key Differentiator',
      description: 'Social media sentiment analysis reveals 73% increase in discussions about AI photography features. Consumers prioritizing computational photography over hardware specs.',
      confidence: 0.82,
      impact: 'medium',
      competitors: ['Xiaomi', 'Realme', 'Vivo'],
      sources: 189,
      created_at: '2024-12-28T08:45:00Z'
    },
    {
      id: '4',
      type: 'recommendation',
      title: 'Focus on Mid-Range 5G Segment',
      description: 'Market data indicates 67% growth in 15K-25K price segment. Recommend increasing focus on 5G-enabled mid-range devices with premium features to capture growing market.',
      confidence: 0.91,
      impact: 'high',
      competitors: ['Realme', 'Xiaomi', 'OnePlus'],
      sources: 312,
      created_at: '2024-12-28T07:20:00Z'
    }
  ];

  const getInsightIcon = (type: Insight['type']) => {
    switch (type) {
      case 'opportunity': return <Target className="w-5 h-5 text-green-400" />;
      case 'threat': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'trend': return <TrendingUp className="w-5 h-5 text-compete-purple" />;
      case 'recommendation': return <Lightbulb className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getInsightColor = (type: Insight['type']) => {
    switch (type) {
      case 'opportunity': return 'border-green-400 bg-green-400/10';
      case 'threat': return 'border-red-400 bg-red-400/10';
      case 'trend': return 'border-compete-purple bg-compete-purple/10';
      case 'recommendation': return 'border-yellow-400 bg-yellow-400/10';
    }
  };

  const getImpactColor = (impact: Insight['impact']) => {
    switch (impact) {
      case 'high': return 'text-red-400 bg-red-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'low': return 'text-green-400 bg-green-400/20';
    }
  };

  const generateNewInsights = async () => {
    setIsGenerating(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsGenerating(false);
      // In real app, would fetch new insights from API
    }, 3000);
  };

  const filteredInsights = selectedType === 'all' 
    ? mockInsights 
    : mockInsights.filter(insight => insight.type === selectedType);

  useEffect(() => {
    setInsights(mockInsights);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-compete-white">AI-Powered Insights</h1>
          <p className="text-compete-gray mt-1">Strategic intelligence generated from market data analysis</p>
        </div>
        <button
          onClick={generateNewInsights}
          disabled={isGenerating}
          className="flex items-center space-x-2 bg-compete-purple text-compete-white px-4 py-2 rounded-lg hover:bg-compete-purple/80 disabled:opacity-50 transition-colors"
        >
          <Brain className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Generating...' : 'Generate Insights'}</span>
        </button>
      </div>

      {/* Insight Type Filter */}
      <div className="bg-compete-indigo/30 border border-compete-indigo/40 rounded-xl p-6">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedType === 'all' 
                ? 'bg-compete-purple text-compete-white' 
                : 'bg-compete-indigo/20 text-compete-gray hover:text-compete-white'
            }`}
          >
            All Insights
          </button>
          <button
            onClick={() => setSelectedType('opportunity')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              selectedType === 'opportunity' 
                ? 'bg-green-400/20 text-green-400 border border-green-400' 
                : 'bg-compete-indigo/20 text-compete-gray hover:text-compete-white'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Opportunities</span>
          </button>
          <button
            onClick={() => setSelectedType('threat')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              selectedType === 'threat' 
                ? 'bg-red-400/20 text-red-400 border border-red-400' 
                : 'bg-compete-indigo/20 text-compete-gray hover:text-compete-white'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Threats</span>
          </button>
          <button
            onClick={() => setSelectedType('trend')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              selectedType === 'trend' 
                ? 'bg-compete-purple text-compete-white' 
                : 'bg-compete-indigo/20 text-compete-gray hover:text-compete-white'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Trends</span>
          </button>
          <button
            onClick={() => setSelectedType('recommendation')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              selectedType === 'recommendation' 
                ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400' 
                : 'bg-compete-indigo/20 text-compete-gray hover:text-compete-white'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>Recommendations</span>
          </button>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="space-y-4">
        {filteredInsights.map((insight) => (
          <div
            key={insight.id}
            className={`border-l-4 rounded-r-xl p-6 ${getInsightColor(insight.type)} hover:bg-opacity-20 transition-all duration-200`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getInsightIcon(insight.type)}
                <div>
                  <h3 className="text-lg font-semibold text-compete-white">{insight.title}</h3>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full ${getImpactColor(insight.impact)}`}>
                      {insight.impact.toUpperCase()} IMPACT
                    </span>
                    <span className="text-xs text-compete-gray">
                      Confidence: {Math.round(insight.confidence * 100)}%
                    </span>
                    <span className="text-xs text-compete-gray">
                      {insight.sources} sources
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-compete-gray">
                {new Date(insight.created_at).toLocaleString()}
              </div>
            </div>

            <p className="text-compete-gray mb-4 leading-relaxed">
              {insight.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {insight.competitors.map((competitor) => (
                  <span
                    key={competitor}
                    className="px-2 py-1 text-xs bg-compete-indigo/20 text-compete-purple rounded-full"
                  >
                    {competitor}
                  </span>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-compete-purple" />
                <span className="text-sm text-compete-purple font-medium">AI Generated</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredInsights.length === 0 && (
        <div className="text-center py-12">
          <Brain className="w-12 h-12 text-compete-gray mx-auto mb-4" />
          <h3 className="text-lg font-medium text-compete-white mb-2">No insights available</h3>
          <p className="text-compete-gray mb-4">Generate new insights from your data</p>
          <button
            onClick={generateNewInsights}
            className="bg-compete-purple text-compete-white px-4 py-2 rounded-lg hover:bg-compete-purple/80 transition-colors"
          >
            Generate Insights
          </button>
        </div>
      )}
    </div>
  );
};