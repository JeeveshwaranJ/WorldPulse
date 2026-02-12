
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { geminiService } from '../services/geminiService';
import { Article, GenerationLog, NewsCategory } from '../types';

interface Props {
  onGenerate: (article: Article) => void;
}

const AdminDashboard: React.FC<Props> = ({ onGenerate }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [genStep, setGenStep] = useState<'idle' | 'analyzing' | 'writing' | 'visualizing'>('idle');
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState<NewsCategory>(NewsCategory.TECHNOLOGY);
  const [logs, setLogs] = useState<GenerationLog[]>([]);

  const handleManualGeneration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || isGenerating) return;

    setIsGenerating(true);
    setGenStep('analyzing');
    const newLogId = Date.now().toString();
    setLogs(prev => [{ id: newLogId, topic, status: 'processing', timestamp: new Date().toLocaleTimeString() }, ...prev]);

    try {
      setGenStep('writing');
      const article = await geminiService.generateArticle(topic, category);
      
      onGenerate(article);
      setLogs(prev => prev.map(l => l.id === newLogId ? { ...l, status: 'success' } : l));
      setTopic('');
    } catch (error) {
      console.error(error);
      setLogs(prev => prev.map(l => l.id === newLogId ? { ...l, status: 'failed' } : l));
    } finally {
      setIsGenerating(false);
      setGenStep('idle');
    }
  };

  const getStepLabel = () => {
    switch(genStep) {
      case 'analyzing': return 'ACCESSING GLOBAL TRENDS...';
      case 'writing': return 'DRAFTING EDITORIAL BRIEF...';
      case 'visualizing': return 'SYNTHESIZING ASSETS...';
      default: return 'PROCESSING...';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="flex-1">
          <header className="mb-12">
            <h1 className="text-4xl font-serif font-black uppercase tracking-tighter mb-2">SYSTEM COMMAND</h1>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Editorial Automation & Strategic Intelligence</p>
          </header>

          <section className="bg-white border border-slate-200 p-8 mb-12 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-8 border-b border-slate-900 pb-2">Manual Deployment</h3>
            <form onSubmit={handleManualGeneration} className="space-y-8">
              <div>
                <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Intelligence Topic</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Strategic implications of 6G implementation in Southeast Asia"
                  className="w-full bg-slate-50 border border-slate-200 px-6 py-4 text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 transition-all font-serif"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Category Designation</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as NewsCategory)}
                    className="w-full bg-slate-50 border border-slate-200 px-6 py-4 text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 transition-all text-xs font-bold uppercase tracking-widest"
                  >
                    {Object.values(NewsCategory).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">AI Kernel</label>
                  <div className="px-6 py-4 bg-slate-50 border border-slate-200 text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center justify-between">
                    <span>Gemini 3 Pro High-Precision</span>
                    <span className="text-green-600">ONLINE</span>
                  </div>
                </div>
              </div>

              <button
                disabled={isGenerating || !topic}
                className={`w-full py-5 font-black text-xs uppercase tracking-[0.3em] transition-all border ${
                  isGenerating 
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed' 
                    : 'bg-slate-900 text-white border-slate-900 hover:bg-white hover:text-slate-900'
                }`}
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-4 w-4 text-slate-400" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {getStepLabel()}
                  </span>
                ) : 'Execute Intelligence Draft'}
              </button>
            </form>
          </section>

          <section className="bg-white border border-slate-200 p-8 shadow-sm">
             <div className="flex items-center justify-between mb-8">
               <h3 className="text-xs font-black uppercase tracking-[0.2em] border-b border-slate-900 pb-2">Automation Logs</h3>
               <span className="text-[10px] text-green-600 font-bold tracking-widest uppercase">Kernel Active</span>
             </div>
             <div className="space-y-4">
               {logs.length === 0 ? (
                 <div className="text-center py-12 text-slate-300 text-xs font-bold uppercase tracking-widest italic">No events logged in the last 24 hours.</div>
               ) : (
                 logs.map(log => (
                   <div key={log.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-6">
                        <div className={`w-2 h-2 rounded-full ${
                          log.status === 'success' ? 'bg-green-600' : 
                          log.status === 'failed' ? 'bg-red-600' : 'bg-blue-600 animate-pulse'
                        }`} />
                        <div>
                          <p className="font-bold text-xs uppercase tracking-widest text-slate-900">{log.topic}</p>
                          <p className="text-[9px] text-slate-400 uppercase tracking-widest font-medium">{log.timestamp}</p>
                        </div>
                      </div>
                      <span className={`text-[9px] font-black uppercase tracking-widest ${
                        log.status === 'success' ? 'text-green-600' : 
                        log.status === 'failed' ? 'text-red-600' : 'text-blue-600'
                      }`}>
                        {log.status}
                      </span>
                   </div>
                 ))
               )}
             </div>
          </section>
        </div>

        <div className="lg:w-80 shrink-0 space-y-10">
           <div className="p-8 bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 border-b border-slate-900 pb-2">
                Automated Pipeline
              </h4>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global Sourcing</span>
                  <span className="text-[10px] font-black text-green-600 uppercase">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">AI Verification</span>
                  <span className="text-[10px] font-black text-green-600 uppercase">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Auto-Publish</span>
                  <span className="text-[10px] font-black text-red-600 uppercase">Standby</span>
                </div>
              </div>
              <button className="w-full mt-10 py-3 bg-slate-900 text-white font-bold text-[10px] uppercase tracking-widest">Reset Pipeline</button>
           </div>

           <div className="p-8 border border-slate-200">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 border-b border-slate-900 pb-2">Analytics Summary</h4>
              <div className="space-y-8">
                 <div>
                   <span className="text-[9px] text-slate-400 font-bold block mb-1 uppercase tracking-widest">Dossiers Compiled</span>
                   <span className="text-2xl font-serif font-black">2,841</span>
                 </div>
                 <div>
                   <span className="text-[9px] text-slate-400 font-bold block mb-1 uppercase tracking-widest">Global Distribution</span>
                   <span className="text-2xl font-serif font-black">18.4M</span>
                 </div>
                 <div>
                   <span className="text-[9px] text-slate-400 font-bold block mb-1 uppercase tracking-widest">Factual Integrity Score</span>
                   <span className="text-2xl font-serif font-black text-blue-800">99.9%</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;