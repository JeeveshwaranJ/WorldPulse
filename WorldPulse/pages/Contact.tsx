
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <h1 className="text-5xl font-serif font-black mb-6 uppercase leading-tight">Connect with WorldPulse</h1>
          <p className="text-slate-600 font-serif italic text-xl mb-10">Direct communication for tipsters, strategic partners, and global intelligence inquiries.</p>
          
          <div className="space-y-8">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Electronic Correspondence</h4>
              <p className="text-lg font-bold">worldplus-npl@gmail.com</p>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Press Inquiries</h4>
              <p className="text-lg font-bold">newsroom@worldpulse.news</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-10 border border-slate-200 relative overflow-hidden">
          <AnimatePresence>
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 z-10 bg-slate-900 text-white flex flex-col items-center justify-center p-10 text-center"
              >
                <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">Transmission Successful</h3>
                <p className="text-slate-400 text-sm uppercase tracking-widest font-bold">The Editorial Desk has received your dispatch.</p>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Subject Category</label>
              <select className="w-full bg-white border border-slate-200 px-4 py-3 text-xs font-bold uppercase tracking-widest outline-none focus:ring-1 focus:ring-slate-900">
                <option>Intelligence Tip</option>
                <option>Strategic Partnership</option>
                <option>Technical Inquiry</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Your Identity / Email</label>
              <input type="email" required placeholder="name@domain.com" className="w-full bg-white border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-slate-900" />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Message Payload</label>
              <textarea required rows={5} placeholder="Draft your dispatch here..." className="w-full bg-white border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-slate-900 resize-none"></textarea>
            </div>
            <button className="w-full bg-slate-900 text-white font-black py-4 text-xs uppercase tracking-[0.3em] hover:bg-slate-800 transition-colors">
              Execute Dispatch
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
