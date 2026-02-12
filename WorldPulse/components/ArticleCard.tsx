
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Article } from '../types';

interface Props {
  article: Article;
}

const ArticleCard: React.FC<Props> = ({ article }) => {
  return (
    <Link to={`/article/${article.slug}`} className="group block">
      <article className="space-y-4">
        <div className="overflow-hidden aspect-[16/9] mb-4 bg-slate-100">
          <img
            src={article.image}
            alt={article.imageAlt || article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-[0.1em] text-blue-600">
              {article.category}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
          
          <h2 className="text-2xl font-serif font-bold leading-tight group-hover:text-blue-800 transition-colors">
            {article.title}
          </h2>
          
          <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>

          <div className="pt-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              {article.author} • {article.readTime}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;