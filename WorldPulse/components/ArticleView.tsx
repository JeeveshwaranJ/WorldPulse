
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Article } from '../types';

interface Props {
  articles: Article[];
}

const ShareModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  article: Article;
  onCopy: () => void;
}> = ({ isOpen, onClose, article, onCopy }) => {
  const shareUrl = window.location.href;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(article.title);

  const platforms = [
    { 
      name: 'X / Twitter', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      ),
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
    },
    { 
      name: 'LinkedIn', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      ),
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    },
    { 
      name: 'Facebook', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      ),
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white shadow-2xl z-[101] border border-slate-200"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Share Report</h3>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-900 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {platforms.map(p => (
                  <a 
                    key={p.name} 
                    href={p.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-slate-50 border border-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                      {p.icon}
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-900">{p.name}</span>
                  </a>
                ))}
              </div>

              <div className="relative group">
                <input 
                  readOnly 
                  value={shareUrl} 
                  className="w-full bg-slate-50 border border-slate-100 px-4 py-3 text-[10px] text-slate-500 font-mono outline-none"
                />
                <button 
                  onClick={onCopy}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 hover:bg-blue-800 transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ArticleView: React.FC<Props> = ({ articles }) => {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const [showCopied, setShowCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // SEO Metadata Management
  useEffect(() => {
    if (article) {
      const previousTitle = document.title;
      document.title = `${article.title} | WorldPulse Intelligence`;

      const setMetaTag = (attr: string, attrValue: string, content: string, propertyType: 'name' | 'property' = 'name') => {
        let element = document.querySelector(`meta[${propertyType}="${attrValue}"]`);
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute(propertyType, attrValue);
          document.head.appendChild(element);
        }
        element.setAttribute('content', content);
      };

      setMetaTag('name', 'description', article.meta.description);
      setMetaTag('name', 'keywords', article.meta.keywords.join(', '));
      setMetaTag('property', 'og:title', article.title, 'property');
      setMetaTag('property', 'og:description', article.meta.description, 'property');
      setMetaTag('property', 'og:image', article.image, 'property');
      setMetaTag('property', 'og:url', window.location.href, 'property');
      setMetaTag('property', 'og:type', 'article', 'property');
      setMetaTag('name', 'twitter:card', 'summary_large_image');
      setMetaTag('name', 'twitter:title', article.title);
      setMetaTag('name', 'twitter:description', article.meta.description);
      setMetaTag('name', 'twitter:image', article.image);

      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', article.meta.canonical);

      const scriptId = 'json-ld-article';
      let jsonLdScript = document.getElementById(scriptId) as HTMLScriptElement;
      if (!jsonLdScript) {
        jsonLdScript = document.createElement('script');
        jsonLdScript.id = scriptId;
        jsonLdScript.type = 'application/ld+json';
        document.head.appendChild(jsonLdScript);
      }
      
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": article.title,
        "description": article.meta.description,
        "image": [article.image],
        "datePublished": article.publishedAt,
        "dateModified": article.updatedAt,
        "author": [{
          "@type": "Person",
          "name": article.author,
          "url": "https://worldpulse.news/editorial-desk"
        }]
      };
      jsonLdScript.text = JSON.stringify(structuredData);

      return () => {
        document.title = previousTitle;
      };
    }
  }, [article]);

  if (!article) return <div className="pt-40 text-center font-serif text-2xl italic">The requested article could not be retrieved.</div>;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
      setIsShareModalOpen(false);
    } catch (err) {
      console.error("Clipboard access failed:", err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.debug("Share cancelled or failed:", err);
      }
    } else {
      setIsShareModalOpen(true);
    }
  };

  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-slate-900 origin-left z-[60]" style={{ scaleX }} />
      
      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        article={article}
        onCopy={handleCopyLink}
      />

      <div className="max-w-5xl mx-auto px-4 md:px-8 pt-12 pb-20">
        <article>
          <header className="mb-12 border-b border-slate-100 pb-12">
            <div className="flex items-center gap-4 mb-8">
              <Link 
                to={`/?cat=${article.category}`}
                className="px-2 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 transition-colors"
              >
                {article.category}
              </Link>
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">{article.readTime} Read</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-serif font-black leading-tight mb-6">
              {article.title}
            </h1>
            
            {article.subheadline && (
              <p className="text-2xl md:text-3xl font-serif italic text-slate-600 leading-snug mb-8">
                {article.subheadline}
              </p>
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 border border-slate-200 flex items-center justify-center font-serif text-lg uppercase font-bold text-slate-400">
                  {article.author.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-widest">{article.author}</div>
                  <div className="text-xs text-slate-400 uppercase tracking-widest font-medium">
                    {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </div>
              <div className="flex gap-4 relative">
                <button 
                  onClick={handleShare}
                  className="text-xs font-bold uppercase tracking-widest border border-slate-200 px-4 py-2 hover:bg-slate-50 transition-colors flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>
                <AnimatePresence>
                  {showCopied && (
                    <motion.span 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-sm whitespace-nowrap z-10"
                    >
                      Copied to Clipboard
                    </motion.span>
                  )}
                </AnimatePresence>
                <button className="text-xs font-bold uppercase tracking-widest border border-slate-200 px-4 py-2 hover:bg-slate-50 transition-colors flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  Save
                </button>
              </div>
            </div>
          </header>

          <div className="mb-16">
            <img src={article.image} alt={article.imageAlt} className="w-full aspect-[21/9] object-cover bg-slate-100 shadow-sm" />
            <span className="text-[10px] text-slate-400 mt-2 block uppercase tracking-widest">Photograph: WorldPlus Intelligence Asset</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <div className="mb-12">
                <ReactMarkdown
                  className="prose prose-slate max-w-none 
                    prose-headings:font-serif prose-headings:font-bold prose-headings:text-slate-900
                    prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-slate-100 prose-h2:pb-2
                    prose-p:text-slate-700 prose-p:text-lg prose-p:leading-relaxed prose-p:font-serif prose-p:mb-8
                    prose-strong:text-slate-900 prose-strong:font-bold
                    prose-blockquote:border-l-4 prose-blockquote:border-slate-900 prose-blockquote:italic prose-blockquote:text-slate-800
                    prose-ul:list-disc prose-ul:pl-6 prose-li:text-slate-700 prose-li:font-serif prose-li:mb-2"
                >
                  {article.content}
                </ReactMarkdown>
              </div>

              <div className="py-12 border-t border-slate-100 mb-12">
                <h4 className="text-[10px] font-black uppercase tracking-[0.25em] mb-8 text-slate-400">Explore Related Intelligence</h4>
                <div className="flex flex-wrap gap-3">
                  {article.tags.map(tag => (
                    <Link
                      key={tag}
                      to={`/?tag=${encodeURIComponent(tag)}`}
                      className="inline-flex items-center px-6 py-3 bg-slate-50 border border-slate-200 text-[10px] font-black uppercase tracking-[0.15em] text-slate-600 hover:text-white hover:bg-slate-900 hover:border-slate-900 transition-all duration-500 rounded-sm hover:-translate-y-0.5"
                    >
                      <span className="mr-2 text-slate-300">#</span>
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {article.pullQuote && (
                <blockquote className="my-16 border-y-2 border-slate-900 py-10 px-8 bg-slate-50/50">
                   <p className="text-3xl md:text-4xl font-serif italic text-slate-900 text-center leading-tight">
                     "{article.pullQuote}"
                   </p>
                </blockquote>
              )}

              {article.faqs.length > 0 && (
                <div className="mt-20 p-10 bg-slate-50 border border-slate-200">
                   <h3 className="text-xl font-serif font-bold mb-8 uppercase tracking-widest">Intelligence FAQ</h3>
                   <div className="space-y-8">
                     {article.faqs.map((faq, i) => (
                       <div key={i} className="space-y-2 border-l-2 border-slate-200 pl-6 hover:border-blue-600 transition-colors">
                         <h4 className="font-bold text-slate-900">{faq.question}</h4>
                         <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                       </div>
                     ))}
                   </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-12">
               <div className="p-6 border border-slate-100">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-slate-400 border-b border-slate-100 pb-3">Topic Index</h4>
                  <div className="flex flex-wrap gap-y-3 gap-x-4">
                    {article.tags.map(tag => (
                      <Link 
                        key={tag} 
                        to={`/?tag=${encodeURIComponent(tag)}`}
                        className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 cursor-pointer transition-colors border-b border-transparent hover:border-slate-900 pb-0.5"
                      >
                        #{tag.toLowerCase().replace(/\s+/g, '')}
                      </Link>
                    ))}
                  </div>
               </div>

               <div className="p-6 bg-slate-900 text-white">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-slate-400">Newsletter</h4>
                  <p className="text-sm font-serif italic mb-6">"Insight is the only commodity that never depreciates."</p>
                  <input type="email" placeholder="Email Address" className="w-full bg-slate-800 border-none text-white p-3 text-xs mb-3 focus:ring-1 focus:ring-white" />
                  <button className="w-full bg-white text-slate-900 font-bold py-3 text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-colors">Join the Briefing</button>
               </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default ArticleView;
