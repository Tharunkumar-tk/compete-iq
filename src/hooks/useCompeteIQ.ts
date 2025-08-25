import { useState, useEffect } from 'react';
import { supabase, AIService, DataIngestionService } from '../lib/supabase';
import { Article, Alert, Competitor, Source } from '../types';

export const useCompeteIQ = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data from Supabase
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [articlesRes, alertsRes, competitorsRes, sourcesRes] = await Promise.all([
        supabase.from('articles').select('*, source:sources(*)').order('created_at', { ascending: false }).limit(50),
        supabase.from('alerts').select('*, competitor:competitors(*)').order('created_at', { ascending: false }).limit(20),
        supabase.from('competitors').select('*').order('name'),
        supabase.from('sources').select('*').order('name')
      ]);

      if (articlesRes.data) setArticles(articlesRes.data);
      if (alertsRes.data) setAlerts(alertsRes.data);
      if (competitorsRes.data) setCompetitors(competitorsRes.data);
      if (sourcesRes.data) setSources(sourcesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Ingest new data
  const ingestData = async (sourceId: string) => {
    try {
      const source = sources.find(s => s.id === sourceId);
      if (!source) return;

      const newArticles = await DataIngestionService.scrapeSource(source);
      
      // Process each article through AI
      for (const article of newArticles) {
        article.sentiment = await AIService.analyzeSentiment(article.content);
        // In real implementation, would generate embeddings and save to database
      }

      // Generate alerts if significant activity
      if (newArticles.length > 0) {
        const alertText = await AIService.generateTrendAlert(newArticles);
        // Would save alert to database
      }

      await fetchData(); // Refresh data
      return newArticles.length;
    } catch (error) {
      console.error('Error ingesting data:', error);
      return 0;
    }
  };

  // Search functionality
  const searchInsights = async (query: string) => {
    try {
      // In real implementation, would call semantic search function
      const mockResults = articles.filter(article => 
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.content.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10);
      
      return mockResults;
    } catch (error) {
      console.error('Error searching:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    articles,
    alerts,
    competitors,
    sources,
    isLoading,
    fetchData,
    ingestData,
    searchInsights
  };
};