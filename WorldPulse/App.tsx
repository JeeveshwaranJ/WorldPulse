
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Article, TrendingTopic, NewsCategory } from './types';
import { MOCK_ARTICLES, MOCK_TRENDS } from './constants';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ArticleCard from './components/ArticleCard';
import TrendingSidebar from './components/TrendingSidebar';
import ArticleView from './components/ArticleView';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import { PrivacyPolicy, TermsAndConditions } from './pages/Legal';
import { geminiService } from './services/geminiService';

const HomePage: React.FC<{ articles: Article[]; trends: TrendingTopic[] }> = ({ articles, trends }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const activeTag = queryParams.get('tag');
  const activeCategory = queryParams.get('cat') || 'All';
  const searchQuery = queryParams.get('q');

  const categories = ['All', ...Object.values(NewsCategory)];

  const filteredArticles = useMemo(() => {
    let result = articles;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a => 
        a.title.toLowerCase().includes(q) || 
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q)) ||
        a.category.toLowerCase().includes(q)
      );
    } else if (activeTag) {
      result = result.filter(a => a.tags.some(t => t.toLowerCase() === activeTag.toLowerCase()));
    } else if (activeCategory !== 'All') {
      result = result.filter(a => a.category === activeCategory);
    }
    return result;
  }, [articles, activeCategory, activeTag, searchQuery]);

  const heroArticle = useMemo(() => {
    const featured = filteredArticles.find(a => a.featured);
    return featured || filteredArticles[0];
  }, [filteredArticles]);

  const remainingArticles = useMemo(() => {
    return filteredArticles.filter(a => a.id !== heroArticle?.id);
  }, [filteredArticles, heroArticle]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
      {/* Dynamic Breaking Strip */}
      <div className="mb-8 overflow-hidden bg-slate-50 border-y border-slate-200 py-3 whitespace-nowrap">
        <div className="breaking-news-anim inline-block font-black text-[10px] tracking-widest uppercase">
          {trends.length > 0 ? trends.map((t, i) => (
            <span key={i} className="mr-16 inline-flex items-center">
              <span className="text-red-600 mr-3">● BREAKING</span>
              <span className="text-slate-900">{t.topic}</span>
              <span className="ml-3 text-slate-300">/</span>
            </span>
          )) : (
            <span className="mr-12 inline-flex items-center text-slate-400">
              Synchronizing global intelligence feeds...
            </span>
          )}
        </div>
      </div>

      {!activeTag && !searchQuery && <Hero mainArticle={heroArticle} />}

      <div className={`mt-16 flex flex-col lg:flex-row gap-12 border-t border-slate-200 pt-12 ${activeTag || searchQuery ? 'mt-0' : ''}`}>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-12 border-b border-slate-100 pb-6">
             <h2 className="text-3xl font-serif font-black uppercase tracking-tight">
               {searchQuery 
                 ? `Search Results: ${searchQuery}` 
                 : activeTag 
                   ? `Dispatch: ${activeTag}` 
                   : activeCategory === 'All' 
                     ? 'Latest Reports' 
                     : `${activeCategory} Desk`}
             </h2>
             {!searchQuery && (
               <div className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth">
                 {categories.map(cat => (
                   <button
                     key={cat}
                     onClick={() => navigate(cat === 'All' ? '/' : `/?cat=${cat}`)}
                     className={`text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all ${
                       activeCategory === cat ? 'text-blue-700 border-b-2 border-blue-700 pb-1' : 'text-slate-400 hover:text-slate-900'
                     }`}
                   >
                     {cat}
                   </button>
                 ))}
               </div>
             )}
          </div>

          {filteredArticles.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-xl font-serif italic text-slate-400">No reports found matching your parameters.</p>
              <button 
                onClick={() => navigate('/')}
                className="mt-6 text-[10px] font-black uppercase tracking-widest text-blue-600 border-b border-blue-600 pb-0.5"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              <AnimatePresence mode="popLayout">
                {(searchQuery || activeTag ? filteredArticles : remainingArticles).slice(0, 12).map((article, index) => (
                  <motion.div
                    key={article.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  >
                    <ArticleCard article={article} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        <div className="lg:w-80 shrink-0">
          <TrendingSidebar trends={trends} />
          
          <div className="mt-16 p-8 bg-slate-900 text-white shadow-xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-slate-400">Intelligence Briefing</h3>
            <p className="text-lg font-serif italic mb-8 leading-relaxed text-slate-300">
              "Actionable insight in the age of rapid disruption."
            </p>
            <div className="space-y-4">
               <input 
                 type="email" 
                 placeholder="Email for Briefings" 
                 className="w-full bg-slate-800 border-none px-4 py-3 text-xs focus:ring-1 focus:ring-white text-white placeholder:text-slate-500"
               />
               <button className="w-full bg-white text-slate-900 font-black py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-slate-200 transition-colors">
                 Authorize Sync
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
};

const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);
  const [trends, setTrends] = useState<TrendingTopic[]>(MOCK_TRENDS);

  const handleNewArticle = (article: Article) => {
    setArticles(prev => [article, ...prev]);
  };

  useEffect(() => {
    const syncTrends = async () => {
      const newTrends = await geminiService.fetchTrendingTopics();
      if (newTrends.length > 0) setTrends(newTrends);
    };
    syncTrends();
    const interval = setInterval(syncTrends, 1800000); // 30m
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 flex flex-col">
        <Navbar />
        <main className="pt-24 flex-grow">
          <Routes>
            <Route path="/" element={<HomePage articles={articles} trends={trends} />} />
            <Route path="/article/:slug" element={<ArticleView articles={articles} />} />
            <Route path="/admin" element={<AdminDashboard onGenerate={handleNewArticle} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
