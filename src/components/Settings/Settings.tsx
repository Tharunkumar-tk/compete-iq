import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Database, Key, Shield, Save } from 'lucide-react';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      name: 'Admin User',
      email: 'admin@competeiq.com',
      company: 'CompeteIQ',
      timezone: 'Asia/Kolkata'
    },
    notifications: {
      email_alerts: true,
      slack_notifications: true,
      push_notifications: false,
      alert_frequency: 'immediate'
    },
    api: {
      openai_key: '',
      twitter_bearer_token: '',
      news_api_key: ''
    },
    security: {
      two_factor_enabled: false,
      session_timeout: 24,
      ip_whitelist: ''
    }
  });

  const handleSave = () => {
    // Save settings logic
    console.log('Saving settings:', settings);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'database', label: 'Database', icon: Database }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-compete-white">Settings</h1>
        <p className="text-compete-gray mt-1">Configure your CompeteIQ platform preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-compete-indigo/30 border border-compete-indigo/40 rounded-xl p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-compete-purple text-compete-white'
                      : 'text-compete-gray hover:text-compete-white hover:bg-compete-indigo/20'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-compete-indigo/30 border border-compete-indigo/40 rounded-xl p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-compete-white">Profile Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-compete-gray text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={settings.profile.name}
                      onChange={(e) => setSettings({
                        ...settings,
                        profile: { ...settings.profile, name: e.target.value }
                      })}
                      className="w-full bg-compete-dark border border-compete-indigo/40 rounded-lg px-3 py-2 text-compete-white focus:outline-none focus:ring-2 focus:ring-compete-purple"
                    />
                  </div>
                  <div>
                    <label className="block text-compete-gray text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={settings.profile.email}
                      onChange={(e) => setSettings({
                        ...settings,
                        profile: { ...settings.profile, email: e.target.value }
                      })}
                      className="w-full bg-compete-dark border border-compete-indigo/40 rounded-lg px-3 py-2 text-compete-white focus:outline-none focus:ring-2 focus:ring-compete-purple"
                    />
                  </div>
                  <div>
                    <label className="block text-compete-gray text-sm font-medium mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={settings.profile.company}
                      onChange={(e) => setSettings({
                        ...settings,
                        profile: { ...settings.profile, company: e.target.value }
                      })}
                      className="w-full bg-compete-dark border border-compete-indigo/40 rounded-lg px-3 py-2 text-compete-white focus:outline-none focus:ring-2 focus:ring-compete-purple"
                    />
                  </div>
                  <div>
                    <label className="block text-compete-gray text-sm font-medium mb-2">
                      Timezone
                    </label>
                    <select
                      value={settings.profile.timezone}
                      onChange={(e) => setSettings({
                        ...settings,
                        profile: { ...settings.profile, timezone: e.target.value }
                      })}
                      className="w-full bg-compete-dark border border-compete-indigo/40 rounded-lg px-3 py-2 text-compete-white focus:outline-none focus:ring-2 focus:ring-compete-purple"
                    >
                      <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">America/New_York (EST)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-compete-white">Notification Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-compete-white font-medium">Email Alerts</h3>
                      <p className="text-compete-gray text-sm">Receive alerts via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.email_alerts}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, email_alerts: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-compete-gray rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-compete-purple"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-compete-white font-medium">Slack Notifications</h3>
                      <p className="text-compete-gray text-sm">Send alerts to Slack channels</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.slack_notifications}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, slack_notifications: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-compete-gray rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-compete-purple"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-compete-gray text-sm font-medium mb-2">
                      Alert Frequency
                    </label>
                    <select
                      value={settings.notifications.alert_frequency}
                      onChange={(e) => setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, alert_frequency: e.target.value }
                      })}
                      className="w-full bg-compete-dark border border-compete-indigo/40 rounded-lg px-3 py-2 text-compete-white focus:outline-none focus:ring-2 focus:ring-compete-purple"
                    >
                      <option value="immediate">Immediate</option>
                      <option value="hourly">Hourly Digest</option>
                      <option value="daily">Daily Summary</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-compete-white">API Configuration</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-compete-gray text-sm font-medium mb-2">
                      OpenAI API Key
                    </label>
                    <input
                      type="password"
                      value={settings.api.openai_key}
                      onChange={(e) => setSettings({
                        ...settings,
                        api: { ...settings.api, openai_key: e.target.value }
                      })}
                      placeholder="sk-..."
                      className="w-full bg-compete-dark border border-compete-indigo/40 rounded-lg px-3 py-2 text-compete-white focus:outline-none focus:ring-2 focus:ring-compete-purple"
                    />
                  </div>
                  <div>
                    <label className="block text-compete-gray text-sm font-medium mb-2">
                      Twitter Bearer Token
                    </label>
                    <input
                      type="password"
                      value={settings.api.twitter_bearer_token}
                      onChange={(e) => setSettings({
                        ...settings,
                        api: { ...settings.api, twitter_bearer_token: e.target.value }
                      })}
                      placeholder="Bearer token..."
                      className="w-full bg-compete-dark border border-compete-indigo/40 rounded-lg px-3 py-2 text-compete-white focus:outline-none focus:ring-2 focus:ring-compete-purple"
                    />
                  </div>
                  <div>
                    <label className="block text-compete-gray text-sm font-medium mb-2">
                      News API Key
                    </label>
                    <input
                      type="password"
                      value={settings.api.news_api_key}
                      onChange={(e) => setSettings({
                        ...settings,
                        api: { ...settings.api, news_api_key: e.target.value }
                      })}
                      placeholder="API key..."
                      className="w-full bg-compete-dark border border-compete-indigo/40 rounded-lg px-3 py-2 text-compete-white focus:outline-none focus:ring-2 focus:ring-compete-purple"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-compete-white">Security Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-compete-white font-medium">Two-Factor Authentication</h3>
                      <p className="text-compete-gray text-sm">Add an extra layer of security</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.security.two_factor_enabled}
                        onChange={(e) => setSettings({
                          ...settings,
                          security: { ...settings.security, two_factor_enabled: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-compete-gray rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-compete-purple"></div>
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-compete-gray text-sm font-medium mb-2">
                      Session Timeout (hours)
                    </label>
                    <input
                      type="number"
                      value={settings.security.session_timeout}
                      onChange={(e) => setSettings({
                        ...settings,
                        security: { ...settings.security, session_timeout: parseInt(e.target.value) }
                      })}
                      className="w-full bg-compete-dark border border-compete-indigo/40 rounded-lg px-3 py-2 text-compete-white focus:outline-none focus:ring-2 focus:ring-compete-purple"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'database' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-compete-white">Database Configuration</h2>
                <div className="space-y-4">
                  <div className="bg-compete-dark/50 border border-compete-indigo/20 rounded-lg p-4">
                    <h3 className="text-compete-white font-medium mb-2">Connection Status</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400">Connected to Supabase</span>
                    </div>
                  </div>
                  
                  <div className="bg-compete-dark/50 border border-compete-indigo/20 rounded-lg p-4">
                    <h3 className="text-compete-white font-medium mb-2">Storage Usage</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-compete-gray">Articles</span>
                        <span className="text-compete-white">1,247 records</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-compete-gray">Competitors</span>
                        <span className="text-compete-white">8 records</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-compete-gray">Alerts</span>
                        <span className="text-compete-white">23 records</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-compete-indigo/20">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-compete-purple text-compete-white px-6 py-2 rounded-lg hover:bg-compete-purple/80 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};