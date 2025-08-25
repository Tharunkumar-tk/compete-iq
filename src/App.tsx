import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { Dashboard } from './components/Dashboard/Dashboard';
import { SemanticSearch } from './components/Search/SemanticSearch';
import { CompetitorManagement } from './components/Competitors/CompetitorManagement';
import { MarketTrends } from './components/Trends/MarketTrends';
import { AIInsights } from './components/Insights/AIInsights';
import { AlertManagement } from './components/Alerts/AlertManagement';
import { DataSources } from './components/Sources/DataSources';
import { DataPipeline } from './components/Data/DataPipeline';
import { Settings } from './components/Settings/Settings';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'search':
        return <SemanticSearch />;
      case 'competitors':
        return <CompetitorManagement />;
      case 'trends':
        return <MarketTrends />;
      case 'insights':
        return <AIInsights />;
      case 'alerts':
        return <AlertManagement />;
      case 'sources':
        return <DataSources />;
      case 'data':
        return <DataPipeline />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-compete-dark">
      <Header />
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;