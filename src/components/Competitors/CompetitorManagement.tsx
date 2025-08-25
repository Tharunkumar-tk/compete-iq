import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, ExternalLink, Building, Globe, Calendar } from 'lucide-react';
import { Competitor } from '../../types';
import { supabase } from '../../lib/supabase';

export const CompetitorManagement: React.FC = () => {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCompetitor, setEditingCompetitor] = useState<Competitor | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    sector: 'smartphones',
    logo_url: ''
  });

  const fetchCompetitors = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('competitors')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setCompetitors(data || []);
    } catch (error) {
      console.error('Error fetching competitors:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCompetitor) {
        const { error } = await supabase
          .from('competitors')
          .update(formData)
          .eq('id', editingCompetitor.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('competitors')
          .insert([formData]);
        if (error) throw error;
      }
      
      setFormData({ name: '', website: '', sector: 'smartphones', logo_url: '' });
      setShowAddForm(false);
      setEditingCompetitor(null);
      fetchCompetitors();
    } catch (error) {
      console.error('Error saving competitor:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this competitor?')) return;
    
    try {
      const { error } = await supabase
        .from('competitors')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      fetchCompetitors();
    } catch (error) {
      console.error('Error deleting competitor:', error);
    }
  };

  const handleEdit = (competitor: Competitor) => {
    setEditingCompetitor(competitor);
    setFormData({
      name: competitor.name,
      website: competitor.website || '',
      sector: competitor.sector,
      logo_url: competitor.logo_url || ''
    });
    setShowAddForm(true);
  };

  useEffect(() => {
    fetchCompetitors();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-compete-white">Competitor Management</h1>
          <p className="text-compete-gray mt-1">Manage and track your key competitors</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-compete-purple text-compete-white px-4 py-2 rounded-lg hover:bg-compete-purple/80 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Competitor</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-compete-indigo/30 border border-compete-indigo/40 rounded-xl p-6">
          <h3 className="text-xl font-bold text-compete-white mb-4">
            {editingCompetitor ? 'Edit Competitor' : 'Add New Competitor'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-compete-gray text-sm font-medium mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-compete-dark border border-compete-indigo/40 rounded-lg px-3 py-2 text-compete-white focus:outline-none focus:ring-2 focus:ring-compete-purple"
                  required
                />
              </div>
              <div>
                <label className="block text-compete-gray text-sm font-medium mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full bg-compete-dark border border-compete-indigo/40 rounded-lg px-3 py-2 text-compete-white focus:outline-none focus:ring-2 focus:ring-compete-purple"
                />
              </div>
              <div>
                <label className="block text-compete-gray text-sm font-medium mb-2">
                  Sector
                </label>
                <select
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  className="w-full bg-compete-dark border border-compete-indigo/40 rounded-lg px-3 py-2 text-compete-white focus:outline-none focus:ring-2 focus:ring-compete-purple"
                >
                  <option value="smartphones">Smartphones</option>
                  <option value="tablets">Tablets</option>
                  <option value="wearables">Wearables</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
              <div>
                <label className="block text-compete-gray text-sm font-medium mb-2">
                  Logo URL
                </label>
                <input
                  type="url"
                  value={formData.logo_url}
                  onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                  className="w-full bg-compete-dark border border-compete-indigo/40 rounded-lg px-3 py-2 text-compete-white focus:outline-none focus:ring-2 focus:ring-compete-purple"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-compete-purple text-compete-white px-4 py-2 rounded-lg hover:bg-compete-purple/80 transition-colors"
              >
                {editingCompetitor ? 'Update' : 'Add'} Competitor
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingCompetitor(null);
                  setFormData({ name: '', website: '', sector: 'smartphones', logo_url: '' });
                }}
                className="bg-compete-gray/20 text-compete-gray px-4 py-2 rounded-lg hover:bg-compete-gray/30 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Competitors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {competitors.map((competitor) => (
          <div
            key={competitor.id}
            className="bg-compete-indigo/30 border border-compete-indigo/40 rounded-xl p-6 hover:border-compete-purple/40 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {competitor.logo_url ? (
                  <img
                    src={competitor.logo_url}
                    alt={competitor.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-compete-purple/20 rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-compete-purple" />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-compete-white">{competitor.name}</h3>
                  <p className="text-sm text-compete-gray capitalize">{competitor.sector}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(competitor)}
                  className="p-2 text-compete-gray hover:text-compete-purple transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(competitor.id)}
                  className="p-2 text-compete-gray hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {competitor.website && (
              <div className="flex items-center space-x-2 mb-3">
                <Globe className="w-4 h-4 text-compete-gray" />
                <a
                  href={competitor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-compete-purple hover:text-purple-400 transition-colors text-sm"
                >
                  Visit Website
                  <ExternalLink className="w-3 h-3 ml-1 inline" />
                </a>
              </div>
            )}

            <div className="flex items-center space-x-2 text-xs text-compete-gray">
              <Calendar className="w-3 h-3" />
              <span>Added {new Date(competitor.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {competitors.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Building className="w-12 h-12 text-compete-gray mx-auto mb-4" />
          <h3 className="text-lg font-medium text-compete-white mb-2">No competitors added yet</h3>
          <p className="text-compete-gray mb-4">Start by adding your first competitor to track</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-compete-purple text-compete-white px-4 py-2 rounded-lg hover:bg-compete-purple/80 transition-colors"
          >
            Add First Competitor
          </button>
        </div>
      )}
    </div>
  );
};