
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-slate-800 pb-16">
          <div className="col-span-2">
            <Link to="/" className="text-3xl font-serif font-black tracking-tighter uppercase block mb-6">WorldPulse</Link>
            <p className="text-slate-400 max-w-md text-sm leading-relaxed mb-8 font-serif italic">
              "WorldPulse is a premier global intelligence platform delivering real-time, AI-driven analysis of geopolitical and economic shifts. Our mission is to provide synthesized insight into the complex mechanisms driving the 21st century."
            </p>
            <div className="flex gap-4">
               {['Twitter', 'LinkedIn', 'RSS'].map(s => (
                 <a key={s} href="#" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">{s}</a>
               ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6">Intelligence</h4>
            <ul className="space-y-3 text-xs font-medium uppercase tracking-widest">
              <li><Link to="/?cat=World" className="hover:text-blue-400 transition-colors">Global Affairs</Link></li>
              <li><Link to="/?cat=Business" className="hover:text-blue-400 transition-colors">Economic Trends</Link></li>
              <li><Link to="/?cat=Technology" className="hover:text-blue-400 transition-colors">Deep Tech</Link></li>
              <li><Link to="/?cat=Science" className="hover:text-blue-400 transition-colors">Strategic Science</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6">Corporate</h4>
            <ul className="space-y-3 text-xs font-medium uppercase tracking-widest">
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          <div className="flex flex-col items-center md:items-start gap-1">
             <p>© 2026 WORLDPULSE. ALL RIGHTS RESERVED.</p>
             <p className="text-slate-600">CONTACT: WORLDPLUS-NPL@GMAIL.COM</p>
          </div>
          <div className="flex items-center gap-4">
            <span>POWERED BY <span className="text-white">NEURALSPEAK LABS</span></span>
            <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
            <span>INTEL KERNEL: GEMINI 3 PRO</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
