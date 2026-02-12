
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync search input with URL on load
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get('q');
    if (q) setSearchTerm(q);
    else if (!location.search.includes('q=')) setSearchTerm('');
  }, [location.search]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/');
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-500 ${
      scrolled ? 'border-b border-slate-200 py-3 bg-white/95 backdrop-blur-md shadow-sm' : 'py-7'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <div className="hidden md:flex items-center gap-8 w-1/3">
          <Link to="/?cat=All" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-slate-900 transition-all">Archive</Link>
          <Link to="/contact" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-slate-900 transition-all">Connect</Link>
        </div>

        <Link to="/" className="flex flex-col items-center gap-0 w-1/3">
          <span className="text-3xl md:text-5xl font-serif font-black tracking-tighter text-slate-900 uppercase leading-none select-none">WorldPulse</span>
          {!scrolled && (
            <span className="hidden md:block text-[9px] font-black tracking-[0.4em] text-slate-400 uppercase mt-2 opacity-80">Global Intelligence Platform</span>
          )}
        </Link>

        <div className="flex items-center justify-end gap-6 md:gap-8 w-1/3">
           <form 
             onSubmit={handleSearchSubmit} 
             className={`relative transition-all duration-500 ease-in-out ${isSearchFocused ? 'w-full md:w-64' : 'w-32 md:w-48'}`}
           >
             <input
               type="text"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               onFocus={() => setIsSearchFocused(true)}
               onBlur={() => setIsSearchFocused(false)}
               placeholder="Search Intelligence..."
               className="w-full bg-slate-50 border border-slate-200 pl-4 pr-10 py-2 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition-all"
             />
             <button 
               type="submit"
               className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors"
             >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
             </button>
           </form>

           <Link 
             to="/admin" 
             className={`hidden sm:block text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 border rounded-sm transition-all ${
               location.pathname === '/admin' 
                 ? 'bg-slate-900 text-white border-slate-900' 
                 : 'text-slate-500 border-slate-200 hover:border-slate-900 hover:text-slate-900'
             }`}
           >
             Admin
           </Link>
        </div>
      </div>
      
      {!scrolled && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6 hidden md:flex items-center justify-center gap-10 border-t border-slate-100 pt-4 animate-in fade-in slide-in-from-top-1 duration-500">
          {['World', 'Politics', 'Business', 'Technology', 'Science', 'Health', 'Culture', 'Sports'].map(cat => (
            <Link key={cat} to={`/?cat=${cat}`} className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 hover:text-slate-900 transition-all hover:-translate-y-0.5">{cat}</Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
