
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Article } from '../types';

interface Props {
  mainArticle?: Article;
}

const Hero: React.FC<Props> = ({ mainArticle }) => {
  if (!mainArticle) return null;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div className="lg:col-span-8 group">
        <Link to={`/article/${mainArticle.slug}`}>
          <div className="overflow-hidden mb-6">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              src={mainArticle.image}
              alt={mainArticle.imageAlt}
              className="w-full aspect-video object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
          <div className="space-y-4">
            <span className="inline-block text-[10px] font-black uppercase tracking-[0.2em] text-red-600 border-b-2 border-red-600 pb-0.5">Top Story</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight group-hover:text-blue-800 transition-colors">
              {mainArticle.title}
            </h1>
            <p className="text-xl font-serif italic text-slate-600">
              {mainArticle.subheadline}
            </p>
            <p className="text-slate-600 leading-relaxed max-w-3xl">
              {mainArticle.excerpt}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">By {mainArticle.author}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{mainArticle.readTime}</span>
            </div>
          </div>
        </Link>
      </div>

      <div className="lg:col-span-4 border-l border-slate-100 pl-10 hidden lg:block">
        <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-slate-900 pb-2">Analysis & Opinion</h3>
        <div className="space-y-8">
          {[
            { tag: 'Analysis', title: 'Why the New Trade Corridors Matter for European Security', author: 'Mark Vance' },
            { tag: 'Insight', title: 'The Ethical Dilemma of Autonomous AI Agents in Civil Service', author: 'Dr. Elena Rossi' },
            { tag: 'Perspective', title: 'Reclaiming Urban Spaces: How Cities are Fighting Gentrification', author: 'Julian Thorne' }
          ].map((item, i) => (
            <div key={i} className="group cursor-pointer">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1 block">{item.tag}</span>
              <h4 className="text-lg font-serif font-bold group-hover:underline leading-snug">{item.title}</h4>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-2">By {item.author}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 p-6 bg-slate-900 text-white">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-slate-400">The Weekly Dossier</h4>
          <p className="text-lg font-serif italic mb-6 leading-snug">"The integration of AI into logistics isn't an upgrade; it's a total reimagining of global velocity."</p>
          <button className="text-[10px] font-black uppercase tracking-widest border-b border-white pb-1 hover:text-slate-300 transition-colors">Read Full Dossier</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;