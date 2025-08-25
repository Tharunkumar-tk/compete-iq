/*
  # CompeteIQ Database Schema

  1. New Tables
    - `sources`
      - `id` (uuid, primary key)
      - `name` (text) - Source name (e.g., "Gadgets360")
      - `type` (text) - Source type: 'news', 'social', 'website'
      - `url` (text) - Base URL
      - `created_at` (timestamp)

    - `articles`
      - `id` (uuid, primary key) 
      - `source_id` (uuid, foreign key to sources)
      - `title` (text) - Article title
      - `content` (text) - Full article content
      - `url` (text) - Article URL
      - `date` (timestamp) - Publication date
      - `sentiment` (text) - 'positive', 'negative', 'neutral'
      - `embedding` (vector) - Text embeddings for semantic search
      - `created_at` (timestamp)

    - `competitors`
      - `id` (uuid, primary key)
      - `name` (text) - Competitor name
      - `website` (text) - Official website
      - `sector` (text) - Business sector
      - `logo_url` (text) - Logo image URL
      - `created_at` (timestamp)

    - `alerts`
      - `id` (uuid, primary key)
      - `competitor_id` (uuid, foreign key to competitors)
      - `insight` (text) - AI-generated insight
      - `trend_score` (decimal) - Trending score 0-10
      - `sentiment` (text) - Overall sentiment
      - `sources` (text[]) - Array of source URLs
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add indexes for performance
*/

-- Enable the vector extension for semantic search
CREATE EXTENSION IF NOT EXISTS vector;

-- Sources table
CREATE TABLE IF NOT EXISTS sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('news', 'social', 'website')),
  url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Articles table with vector embeddings
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id uuid REFERENCES sources(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  url text NOT NULL UNIQUE,
  date timestamptz NOT NULL,
  sentiment text DEFAULT 'neutral' CHECK (sentiment IN ('positive', 'negative', 'neutral')),
  embedding vector(1536), -- OpenAI embedding dimension
  created_at timestamptz DEFAULT now()
);

-- Competitors table
CREATE TABLE IF NOT EXISTS competitors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  website text,
  sector text DEFAULT 'smartphones',
  logo_url text,
  created_at timestamptz DEFAULT now()
);

-- Alerts table
CREATE TABLE IF NOT EXISTS alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competitor_id uuid REFERENCES competitors(id) ON DELETE CASCADE,
  insight text NOT NULL,
  trend_score decimal(3,1) DEFAULT 5.0 CHECK (trend_score >= 0 AND trend_score <= 10),
  sentiment text DEFAULT 'neutral' CHECK (sentiment IN ('positive', 'negative', 'neutral')),
  sources text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Allow authenticated users to read all data)
CREATE POLICY "Allow authenticated users to read sources"
  ON sources FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read articles"
  ON articles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read competitors"
  ON competitors FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read alerts"
  ON alerts FOR SELECT
  TO authenticated
  USING (true);

-- Allow service role to manage all data
CREATE POLICY "Allow service role to manage sources"
  ON sources FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Allow service role to manage articles"
  ON articles FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Allow service role to manage competitors"
  ON competitors FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Allow service role to manage alerts"
  ON alerts FOR ALL
  TO service_role
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_articles_date ON articles(date DESC);
CREATE INDEX IF NOT EXISTS idx_articles_sentiment ON articles(sentiment);
CREATE INDEX IF NOT EXISTS idx_articles_source_id ON articles(source_id);
CREATE INDEX IF NOT EXISTS idx_articles_embedding ON articles USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS idx_alerts_created_at ON alerts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_alerts_competitor_id ON alerts(competitor_id);
CREATE INDEX IF NOT EXISTS idx_alerts_trend_score ON alerts(trend_score DESC);

-- Insert initial data sources
INSERT INTO sources (name, type, url) VALUES 
  ('Gadgets360', 'news', 'https://gadgets360.com'),
  ('91Mobiles', 'news', 'https://91mobiles.com'),
  ('GSMArena', 'news', 'https://gsmarena.com'),
  ('Economic Times Tech', 'news', 'https://economictimes.indiatimes.com/tech'),
  ('Twitter/X', 'social', 'https://twitter.com'),
  ('Reddit', 'social', 'https://reddit.com')
ON CONFLICT (url) DO NOTHING;

-- Insert major smartphone competitors
INSERT INTO competitors (name, website, sector) VALUES
  ('Xiaomi', 'https://mi.com/in', 'smartphones'),
  ('Samsung', 'https://samsung.com/in', 'smartphones'),
  ('Apple', 'https://apple.com/in', 'smartphones'),
  ('OnePlus', 'https://oneplus.in', 'smartphones'),
  ('Realme', 'https://realme.com/in', 'smartphones'),
  ('Vivo', 'https://vivo.com/in', 'smartphones'),
  ('Oppo', 'https://oppo.com/in', 'smartphones'),
  ('Nothing', 'https://nothing.tech', 'smartphones')
ON CONFLICT (name) DO NOTHING;