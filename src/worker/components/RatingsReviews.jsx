import React, { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, CheckCircle, ShieldCheck } from 'lucide-react';
import { INITIAL_COMPLETED_JOBS } from '../data/mockData';

export default function RatingsReviews({ worker }) {
  const [replies, setReplies] = useState({});
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleSendReply = (jobId) => {
    if (!replyText.trim()) return;
    setReplies(prev => ({
      ...prev,
      [jobId]: replyText
    }));
    setActiveReplyId(null);
    setReplyText('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="text-center p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
            <div className="text-4xl font-extrabold text-amber-500">{worker.rating}</div>
            <div className="flex items-center justify-center gap-0.5 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-[11px] text-slate-400 font-semibold mt-1">Overall Rating</div>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Customer Ratings & Feedback
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Based on <strong>{worker.totalReviews} verified customer reviews</strong> on the platform.
            </p>
            <div className="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>98% Positive Feedback Score</span>
            </div>
          </div>
        </div>

        {/* Rating Bars */}
        <div className="w-full md:w-64 space-y-1.5 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>5 ★</span>
            <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 w-[92%]" />
            </div>
            <span>92%</span>
          </div>
          <div className="flex items-center gap-2">
            <span>4 ★</span>
            <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 w-[6%]" />
            </div>
            <span>6%</span>
          </div>
          <div className="flex items-center gap-2">
            <span>3 ★</span>
            <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 w-[2%]" />
            </div>
            <span>2%</span>
          </div>
        </div>
      </div>

      {/* Customer Reviews Feed */}
      <div className="space-y-4">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
          Verified Reviews
        </h3>

        <div className="space-y-3">
          {INITIAL_COMPLETED_JOBS.map((job) => (
            <div 
              key={job.id} 
              className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{job.customerName}</div>
                  <div className="text-xs text-slate-400">{job.title} • {job.date}</div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(job.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                "{job.review}"
              </p>

              {/* Worker Reply */}
              {replies[job.id] && (
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-900 dark:text-blue-200 space-y-1">
                  <div className="font-bold flex items-center gap-1 text-blue-600 dark:text-blue-400">
                    <span>Your Official Reply:</span>
                  </div>
                  <div>{replies[job.id]}</div>
                </div>
              )}

              {activeReplyId === job.id ? (
                <div className="space-y-2 pt-2">
                  <textarea
                    rows={2}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a polite response to customer..."
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleSendReply(job.id)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                    >
                      Post Reply
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveReplyId(null)}
                      className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                !replies[job.id] && (
                  <button
                    type="button"
                    onClick={() => setActiveReplyId(job.id)}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 pt-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Reply to Customer</span>
                  </button>
                )
              )}

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
