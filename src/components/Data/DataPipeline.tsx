import React, { useState, useEffect } from 'react';
import { Database, Play, Pause, RefreshCw, AlertCircle, CheckCircle, Clock, BarChart3 } from 'lucide-react';

interface PipelineJob {
  id: string;
  name: string;
  type: 'scraping' | 'processing' | 'analysis';
  status: 'running' | 'completed' | 'failed' | 'pending';
  progress: number;
  started_at: string;
  completed_at?: string;
  records_processed: number;
  error_message?: string;
}

export const DataPipeline: React.FC = () => {
  const [jobs, setJobs] = useState<PipelineJob[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const mockJobs: PipelineJob[] = [
    {
      id: '1',
      name: 'Gadgets360 News Scraping',
      type: 'scraping',
      status: 'running',
      progress: 67,
      started_at: new Date(Date.now() - 1800000).toISOString(),
      records_processed: 234
    },
    {
      id: '2',
      name: 'Sentiment Analysis Processing',
      type: 'processing',
      status: 'completed',
      progress: 100,
      started_at: new Date(Date.now() - 3600000).toISOString(),
      completed_at: new Date(Date.now() - 300000).toISOString(),
      records_processed: 1247
    },
    {
      id: '3',
      name: 'Twitter Monitoring',
      type: 'scraping',
      status: 'failed',
      progress: 23,
      started_at: new Date(Date.now() - 7200000).toISOString(),
      records_processed: 89,
      error_message: 'API rate limit exceeded'
    },
    {
      id: '4',
      name: 'Competitor Trend Analysis',
      type: 'analysis',
      status: 'pending',
      progress: 0,
      started_at: new Date().toISOString(),
      records_processed: 0
    }
  ];

  const getStatusIcon = (status: PipelineJob['status']) => {
    switch (status) {
      case 'running': return <RefreshCw className="w-4 h-4 text-compete-purple animate-spin" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'failed': return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'pending': return <Clock className="w-4 h-4 text-compete-gray" />;
    }
  };

  const getStatusColor = (status: PipelineJob['status']) => {
    switch (status) {
      case 'running': return 'border-compete-purple bg-compete-purple/10';
      case 'completed': return 'border-green-400 bg-green-400/10';
      case 'failed': return 'border-red-400 bg-red-400/10';
      case 'pending': return 'border-compete-gray bg-compete-gray/10';
    }
  };

  const getTypeIcon = (type: PipelineJob['type']) => {
    switch (type) {
      case 'scraping': return '🕷️';
      case 'processing': return '⚙️';
      case 'analysis': return '📊';
    }
  };

  const refreshJobs = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const startJob = (jobId: string) => {
    // Simulate starting a job
    console.log('Starting job:', jobId);
  };

  const stopJob = (jobId: string) => {
    // Simulate stopping a job
    console.log('Stopping job:', jobId);
  };

  useEffect(() => {
    setJobs(mockJobs);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-compete-white">Data Pipeline Management</h1>
          <p className="text-compete-gray mt-1">Monitor and control your data processing workflows</p>
        </div>
        <button
          onClick={refreshJobs}
          disabled={isRefreshing}
          className="flex items-center space-x-2 bg-compete-purple text-compete-white px-4 py-2 rounded-lg hover:bg-compete-purple/80 disabled:opacity-50 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Pipeline Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-compete-indigo/30 border border-compete-indigo/40 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Database className="w-8 h-8 text-compete-purple" />
            <span className="text-green-400 text-sm font-medium">Active</span>
          </div>
          <h3 className="text-2xl font-bold text-compete-white">
            {jobs.filter(j => j.status === 'running').length}
          </h3>
          <p className="text-compete-gray text-sm">Running Jobs</p>
        </div>
        
        <div className="bg-compete-indigo/30 border border-compete-indigo/40 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <span className="text-green-400 text-sm font-medium">Today</span>
          </div>
          <h3 className="text-2xl font-bold text-compete-white">
            {jobs.filter(j => j.status === 'completed').length}
          </h3>
          <p className="text-compete-gray text-sm">Completed</p>
        </div>
        
        <div className="bg-compete-indigo/30 border border-compete-indigo/40 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="w-8 h-8 text-compete-purple" />
            <span className="text-compete-purple text-sm font-medium">Total</span>
          </div>
          <h3 className="text-2xl font-bold text-compete-white">
            {jobs.reduce((sum, job) => sum + job.records_processed, 0).toLocaleString()}
          </h3>
          <p className="text-compete-gray text-sm">Records Processed</p>
        </div>
        
        <div className="bg-compete-indigo/30 border border-compete-indigo/40 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-8 h-8 text-red-400" />
            <span className="text-red-400 text-sm font-medium">Errors</span>
          </div>
          <h3 className="text-2xl font-bold text-compete-white">
            {jobs.filter(j => j.status === 'failed').length}
          </h3>
          <p className="text-compete-gray text-sm">Failed Jobs</p>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-compete-white">Active Jobs</h2>
        
        {jobs.map((job) => (
          <div
            key={job.id}
            className={`border-l-4 rounded-r-xl p-6 ${getStatusColor(job.status)} hover:bg-opacity-20 transition-all duration-200`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{getTypeIcon(job.type)}</div>
                <div>
                  <h3 className="text-lg font-semibold text-compete-white">{job.name}</h3>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-xs text-compete-gray capitalize">
                      {job.type} Job
                    </span>
                    <span className="text-xs text-compete-gray">
                      {job.records_processed.toLocaleString()} records
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(job.status)}
                  <span className="text-sm font-medium text-compete-white capitalize">
                    {job.status}
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  {job.status === 'running' ? (
                    <button
                      onClick={() => stopJob(job.id)}
                      className="p-2 text-compete-gray hover:text-red-400 transition-colors"
                    >
                      <Pause className="w-4 h-4" />
                    </button>
                  ) : job.status === 'pending' || job.status === 'failed' ? (
                    <button
                      onClick={() => startJob(job.id)}
                      className="p-2 text-compete-gray hover:text-green-400 transition-colors"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            {job.status === 'running' && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-compete-gray">Progress</span>
                  <span className="text-sm text-compete-white">{job.progress}%</span>
                </div>
                <div className="w-full bg-compete-indigo/20 rounded-full h-2">
                  <div
                    className="bg-compete-purple h-2 rounded-full transition-all duration-300"
                    style={{ width: `${job.progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {job.error_message && (
              <div className="mb-4 p-3 bg-red-400/10 border border-red-400/20 rounded-lg">
                <p className="text-red-400 text-sm">{job.error_message}</p>
              </div>
            )}

            {/* Timing Information */}
            <div className="flex items-center justify-between text-xs text-compete-gray">
              <span>
                Started: {new Date(job.started_at).toLocaleString()}
              </span>
              {job.completed_at && (
                <span>
                  Completed: {new Date(job.completed_at).toLocaleString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {jobs.length === 0 && (
        <div className="text-center py-12">
          <Database className="w-12 h-12 text-compete-gray mx-auto mb-4" />
          <h3 className="text-lg font-medium text-compete-white mb-2">No active jobs</h3>
          <p className="text-compete-gray mb-4">Data pipeline jobs will appear here when running</p>
        </div>
      )}
    </div>
  );
};