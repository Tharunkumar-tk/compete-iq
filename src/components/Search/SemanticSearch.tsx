import React, { useState } from 'react';
import { Search, ExternalLink, Clock, TrendingUp } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  url: string;
  date: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  similarity_score: number;
  source: {
    name: string;
    type: string;
  };
}

export const SemanticSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      // Mock API call to semantic search function
      const response = await fetch('/api/semantic-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      
      if (response.ok) {
        const data = await response.json();
        setResults(data.results || []);
      }
    } catch (error) {
      console.error('Search error:', error);
      // Mock results for demo
      setResults([
        {
          id: '1',
          title: 'OnePlus 13 Launch Event Announced for India',
          content: 'OnePlus has officially announced the launch date for OnePlus 13 in India. The flagship smartphone will feature Snapdragon 8 Gen 3 processor and advanced camera system.',
          url: 'https://gadgets360.com/oneplus-13-launch-india',
          date: '2024-12-28',
          sentiment: 'positive',
          similarity_score: 0.95,
          source: { name: 'Gadgets360', type: 'news' }
        },
        {
          id: '2',
          title: 'Xiaomi Market Share Analysis Q4 2024',
          content: 'Latest market research shows Xiaomi maintaining strong position in Indian smartphone market despite increased competition from OnePlus and Realme.',
          url: 'https://91mobiles.com/xiaomi-market-analysis',
          date: '2024-12-27',
          sentiment: 'neutral',
          similarity_score: 0.87,
          source: { name: '91Mobiles', type: 'news' }
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getSentimentColor = (sentiment: SearchResult['sentiment']) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      default: return 'text-compete-gray';
    }
  };

  const getSentimentBadge = (sentiment: SearchResult['sentiment']) => {
    const colors = {
      positive: 'bg-green-400/20 border-green-400 text-green-400',
      negative: 'bg-red-400/20 border-red-400 text-red-400',
      neutral: 'bg-compete-gray/20 border-compete-gray text-compete-gray'
    };
    return colors[sentiment];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-compete-white">Semantic Search</h1>
        <p className="text-compete-gray mt-1">AI-powered search across all competitor intelligence data</p>
      </div>

      {/* Search Bar */}
      <div className="bg-compete-indigo/30 border border-compete-indigo/40 rounded-xl p-6">
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-compete-gray w-5 h-5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for competitor insights, market trends, product launches..."
              className="w-full bg-compete-dark border border-compete-indigo/40 rounded-lg pl-12 pr-4 py-3 text-compete-white placeholder-compete-gray focus:outline-none focus:ring-2 focus:ring-compete-purple focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isLoading || !query.trim()}
            className="px-6 py-3 bg-compete-purple text-compete-white rounded-lg hover:bg-compete-purple/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {['OnePlus launch', 'Xiaomi market share', 'iPhone pricing', 'Samsung features'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setQuery(suggestion)}
              className="px-3 py-1 text-sm bg-compete-purple/20 text-compete-purple rounded-full hover:bg-compete-purple/30 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-compete-white">
              Search Results ({results.length})
            </h2>
            <div className="flex items-center text-sm text-compete-gray">
              <TrendingUp className="w-4 h-4 mr-1" />
              Ranked by relevance
            </div>
          </div>

          {results.map((result) => (
            <div
              key={result.id}
              className="bg-compete-indigo/30 border border-compete-indigo/40 rounded-xl p-6 hover:border-compete-purple/40 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-compete-white mb-2">
                    {result.title}
                  </h3>
                  <p className="text-compete-gray leading-relaxed">
                    {result.content}
                  </p>
                </div>
                <div className="ml-4 text-right space-y-2">
                  <div className="text-sm text-compete-gray">
                    {Math.round(result.similarity_score * 100)}% match
                  </div>
                  <div className={`px-2 py-1 text-xs border rounded-full ${getSentimentBadge(result.sentiment)}`}>
                    {result.sentiment}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-compete-gray">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(result.date).toLocaleDateString()}
                  </div>
                  <div>
                    {result.source.name} • {result.source.type}
                  </div>
                </div>
                
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-compete-purple hover:text-purple-400 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  View Source
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};