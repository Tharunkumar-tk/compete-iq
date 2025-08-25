export interface Source {
  id: string;
  name: string;
  type: 'news' | 'social' | 'website';
  url: string;
  created_at: string;
}

export interface Article {
  id: string;
  source_id: string;
  title: string;
  content: string;
  url: string;
  date: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  embedding?: number[];
  created_at: string;
  source?: Source;
}

export interface Competitor {
  id: string;
  name: string;
  website: string;
  sector: string;
  logo_url?: string;
  created_at: string;
}

export interface Alert {
  id: string;
  competitor_id: string;
  insight: string;
  trend_score: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  created_at: string;
  competitor?: Competitor;
  sources?: string[];
}

export interface TrendData {
  competitor: string;
  mentions: number;
  sentiment_score: number;
  trend_direction: 'up' | 'down' | 'stable';
  change_percentage: number;
}