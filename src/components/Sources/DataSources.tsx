import React, { useState, useEffect } from 'react';
import { Globe, Plus, Settings, Trash2, CheckCircle, XCircle, Activity, RefreshCw } from 'lucide-react';
import { Source } from '../../types';
import { supabase } from '../../lib/supabase';

export const DataSources: React.FC = () => {
  const [sources, setSources] = useState<Source[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'news' as Source['type'],
    url: ''
  });

  const fetchSources = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('sources')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setSources(data || []);
    } catch (error) {
      console.error('Error fetching sources:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('sources')
        .insert([formData]);
      
      if (error) throw error;
      
      setFormData({ name: '', type: 'news', url: '' });
      setShowAddForm(false);
      fetchSources();
    } catch (error) {
      console.error('Error adding source:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this source?')) return;
    
    try {
      const { error } = await supabase
        .from('sources')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      fetchSources();
    } catch (error) {
      console.error('Error deleting source:', error);
    }
  };

  const getSourceTypeColor = (type: Source['type']) => {
    switch (type) {
      case 'news': return 'bg-blue-500/20 text-blue-400 border-blue-500';
      case 'social': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'website': return 'bg-purple-500/20 text-purple-400 border-purple-500';
    }
  };

  const getSourceTypeIcon = (type: Source['type']) => {
    switch (type) {
      case 'news': return '📰';
      case 'social': return '📱';
      case 'website': return '🌐';
    }
  };

  // Mock status for demo
  const getSourceStatus = () => {
    return Math.random() > 0.2 ? 'active' : 'inactive';
  };

  useEffect(() => {
    fetchSources();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-compete-white">Data Sources</h1>
          <p className="text-compete-gray mt-1">Manage your intelligence data sources and monitoring</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-compete-purple text-compete-white px-4 py-2 rounded-lg hover:bg-compete-purple/80 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Source</span>
        </button>
      </div>

      {/* Source Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-compete-indigo/30 border border-compete-indigo/40 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Globe className="w-8 h-8 text-compete-purple" />
            <span className="text-green-400 text-sm font-medium">Active</span>
          </div>
          <h3 className="text-2xl font-bold text-compete-white">{sources.length}</h3>
          <p className="text-compete-gray text-sm">Total Sources</p>
        </div>
        
        <div className="bg-compete-indigo/30 border border-compete-indigo/40 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-8 h-8 text-compete-purple" />
            <span className="text-compete-purple text-sm font-medium">24/7</span>
          </div>
          <h3 className="text-2xl font-bold text-compete-white">1,247</h3>
          <p className="text-compete-gray text-sm">Articles Today</p>
        </div>
        
        <div className="bg-compete-indigo/30 border border-compete-indigo/40 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <RefreshCw className="w-8 h-8 text-compete-purple" />
            <span className="text-green-400 text-sm font-medium">2 min</span>
          </div>
          <h3 className="text-2xl font-bold text-compete-white">98.5%</h3>
          <p className="text-compete-gray text-sm">Uptime</p>
        </div>
        
        <div className="bg-compete-indigo/30 border border-compete-indigo/40 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <span className="text-green-400 text-sm font-medium">Live</span>
          </div>
          <h3 className="text-2xl font-bold text-compete-white">12</h3>
          <p className="text-compete-gray text-sm">Monitoring</p>
        </div>
      </div>

      {/* Add Source Form */}
      {showAddForm && (
        <div className="bg-compete-indigo/30 border border-compete-indigo/40 rounded-xl p-6">
          <h3 className="text-xl font-bold text-compete-white mb-4">Add New Data Source</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-compete-gray text-sm font-medium mb-2">
                  Source Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-compete-dark border border-compete-indigo/40 rounded-lg px-3 py-2 text-compete-white focus:outline-none focus:ring-2 focus:ring-compete-purple"
                  placeholder="e.g., TechCrunch India"
                  required
                />
              </div>
              <div>
                <label className="block text-compete-gray text-sm font-medium mb-2">
                  Source Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as Source['type'] })}
                  className="w-full bg-compete-dark border border-compete-indigo/40 rounded-lg px-3 py-2 text-compete-white focus:outline-none focus:ring-2 focus:ring-compete-purple"
                >
                  <option value="news">News Website</option>
                  <option value="social">Social Media</option>
                  <option value="website">Company Website</option>
                </select>
              </div>
              <div>
                <label className="block text-compete-gray text-sm font-medium mb-2">
                  URL *
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full bg-compete-dark border border-compete-indigo/40 rounded-lg px-3 py-2 text-compete-white focus:outline-none focus:ring-2 focus:ring-compete-purple"
                  placeholder="https://example.com"
                  required
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-compete-purple text-compete-white px-4 py-2 rounded-lg hover:bg-compete-purple/80 transition-colors"
              >
                Add Source
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setFormData({ name: '', type: 'news', url: '' });
                }}
                className="bg-compete-gray/20 text-compete-gray px-4 py-2 rounded-lg hover:bg-compete-gray/30 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sources.map((source) => {
          const status = getSourceStatus();
          return (
            <div
              key={source.id}
              className="bg-compete-indigo/30 border border-compete-indigo/40 rounded-xl p-6 hover:border-compete-purple/40 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{getSourceTypeIcon(source.type)}</div>
                  <div>
                    <h3 className="font-semibold text-compete-white">{source.name}</h3>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full border ${getSourceTypeColor(source.type)}`}>
                      {source.type}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {status === 'active' ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                  <button
                    onClick={() => handleDelete(source.id)}
                    className="p-1 text-compete-gray hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-compete-gray" />
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-compete-purple hover:text-purple-400 transition-colors text-sm truncate"
                  >
                    {source.url}
                  </a>
                </div>

                <div className="flex items-center justify-between text-xs text-compete-gray">
                  <span>Status: {status === 'active' ? 'Active' : 'Inactive'}</span>
                  <span>Added {new Date(source.created_at).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-compete-gray">Last crawled: 2 min ago</span>
                  <span className="text-green-400">47 articles today</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-compete-indigo/20">
                <button className="flex items-center space-x-2 text-compete-purple hover:text-purple-400 transition-colors text-sm">
                  <Settings className="w-4 h-4" />
                  <span>Configure</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {sources.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Globe className="w-12 h-12 text-compete-gray mx-auto mb-4" />
          <h3 className="text-lg font-medium text-compete-white mb-2">No data sources configured</h3>
          <p className="text-compete-gray mb-4">Add your first data source to start monitoring</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-compete-purple text-compete-white px-4 py-2 rounded-lg hover:bg-compete-purple/80 transition-colors"
          >
            Add First Source
          </button>
        </div>
      )}
    </div>
  );
};