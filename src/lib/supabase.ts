import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://localhost:3000';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// AI Integration Functions
export class AIService {
  static async analyzeSentiment(text: string): Promise<'positive' | 'negative' | 'neutral'> {
    try {
      // This would integrate with OpenAI API
      // For now, return mock data
      const sentiments = ['positive', 'negative', 'neutral'] as const;
      return sentiments[Math.floor(Math.random() * sentiments.length)];
    } catch (error) {
      console.error('Sentiment analysis error:', error);
      return 'neutral';
    }
  }

  static async extractEntities(text: string): Promise<string[]> {
    try {
      // Mock entity extraction - would use OpenAI/LLaMA
      const entities = ['Xiaomi', 'Samsung', 'Apple', 'OnePlus', 'Realme', 'Vivo', 'Oppo'];
      return entities.filter(() => Math.random() > 0.7);
    } catch (error) {
      console.error('Entity extraction error:', error);
      return [];
    }
  }

  static async summarizeArticle(content: string): Promise<string> {
    try {
      // Mock summarization - would use OpenAI/LLaMA
      return content.substring(0, 200) + '...';
    } catch (error) {
      console.error('Summarization error:', error);
      return content.substring(0, 100) + '...';
    }
  }

  static async generateTrendAlert(articles: Article[]): Promise<string> {
    try {
      // Mock alert generation
      const competitors = ['OnePlus', 'Xiaomi', 'Samsung', 'Apple'];
      const events = ['price drop', 'new launch', 'market share growth', 'negative reviews'];
      const competitor = competitors[Math.floor(Math.random() * competitors.length)];
      const event = events[Math.floor(Math.random() * events.length)];
      return `${competitor} ${event} trending with ${articles.length} mentions in the last hour`;
    } catch (error) {
      console.error('Alert generation error:', error);
      return 'Market activity detected';
    }
  }
}

// Data Ingestion Service
export class DataIngestionService {
  static async scrapeSource(source: Source): Promise<Article[]> {
    try {
      // Mock scraping - would integrate with real scraping APIs
      const mockArticles: Omit<Article, 'id' | 'created_at'>[] = [
        {
          source_id: source.id,
          title: 'OnePlus 13 Flagship Smartphone Launching in India This Quarter',
          content: 'OnePlus is preparing to launch its latest flagship smartphone OnePlus 13 in India. The device features cutting-edge specifications and competitive pricing strategy targeting premium segment users.',
          url: 'https://gadgets360.com/mobiles/news/oneplus-13-launch-india-specifications-price',
          date: new Date().toISOString(),
          sentiment: 'positive'
        },
        {
          source_id: source.id,
          title: 'Xiaomi Faces Market Share Decline in Q4 2024 Indian Smartphone Market',
          content: 'Recent market analysis shows Xiaomi experiencing a decline in market share during Q4 2024, with increased competition from Samsung and emerging brands affecting sales numbers.',
          url: 'https://91mobiles.com/hub/xiaomi-market-share-decline-india-q4-2024',
          date: new Date().toISOString(),
          sentiment: 'negative'
        },
        {
          source_id: source.id,
          title: 'Apple iPhone 16 Series Sees Strong Demand in Premium Indian Market',
          content: 'Apple iPhone 16 series continues to show robust demand in India premium smartphone segment, with retail partners reporting consistent sales growth across major cities.',
          url: 'https://economictimes.indiatimes.com/tech/apple-iphone-16-demand-india',
          date: new Date().toISOString(),
          sentiment: 'positive'
        }
      ];

      return mockArticles.map(article => ({
        ...article,
        id: Math.random().toString(36).substring(7),
        created_at: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Scraping error:', error);
      return [];
    }
  }

  static async monitorSocialMedia(handles: string[]): Promise<Article[]> {
    try {
      // Mock social media monitoring
      return [];
    } catch (error) {
      console.error('Social media monitoring error:', error);
      return [];
    }
  }
}