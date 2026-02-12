
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingTopic } from '../types';

interface Props {
  trends: TrendingTopic[];
}

const TrendingSidebar: React.FC<Props> = ({ trends }) => {
  return (
    <div className="relative">
      <h3 className="text-sm font-bold uppercase tracking-widest mb-8 border-b border-slate-900 pb-2">
        Market Intelligence
      </h3>

      <div className="space-y-8">
        {trends.map((trend, idx) => (
          <motion.div
            key={trend.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="group cursor-pointer flex gap-4"
          >
            <span className="text-2xl font-serif font-bold text-slate-200 group-hover:text-slate-900 transition-colors pt-1">
              {idx + 1}
            </span>
            <div>
              <span className="block text-[9px] font-black text-blue-600 uppercase tracking-[0.1em] mb-1">
                {trend.category}
              </span>
              <h4 className="text-sm font-bold leading-snug group-hover:text-blue-800 transition-colors">
                {trend.topic}
              </h4>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Volume: {trend.volume}</span>
                <span className={`text-[9px] font-black tracking-widest ${trend.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {trend.change}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-slate-100">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Latest Briefing</h4>
        <div className="bg-slate-50 p-4 border-l-4 border-blue-600">
          <p className="text-sm font-medium italic text-slate-800 leading-relaxed">
            "Strategic shifts in semiconductor supply chains are forcing a realignment of South Asian economic policy."
          </p>
          <span className="block text-[9px] font-black uppercase tracking-widest mt-3 text-slate-400">— Intelligence Desk</span>
        </div>
      </div>
    </div>
  );
};

export default TrendingSidebar;