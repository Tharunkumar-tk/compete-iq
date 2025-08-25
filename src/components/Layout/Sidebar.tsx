import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Bell, 
  Database, 
  Settings,
  Search,
  Users,
  Globe
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
  { id: 'competitors', icon: Users, label: 'Competitors' },
  { id: 'trends', icon: TrendingUp, label: 'Market Trends' },
  { id: 'insights', icon: Eye, label: 'AI Insights' },
  { id: 'alerts', icon: Bell, label: 'Alerts' },
  { id: 'sources', icon: Globe, label: 'Data Sources' },
  { id: 'search', icon: Search, label: 'Semantic Search' },
  { id: 'data', icon: Database, label: 'Data Pipeline' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <aside className="w-64 bg-compete-dark border-r border-compete-indigo/20 h-screen">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-compete-purple text-compete-white shadow-lg animate-glow'
                : 'text-compete-gray hover:text-compete-white hover:bg-compete-indigo/20'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};