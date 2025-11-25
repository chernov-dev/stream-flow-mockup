import React, { useState } from 'react';
import { Sparkles, X, Send, Loader2 } from 'lucide-react';
import { getAIRecommendations } from '../services/geminiService';

interface AISearchProps {
  profileName: string;
}

const AISearch: React.FC<AISearchProps> = ({ profileName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setResponse(null);
    
    // Simulate slight delay for UX if API is fast, or actual call
    const result = await getAIRecommendations(query, profileName);
    
    setResponse(result);
    setIsLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 md:bottom-8 md:right-8 bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-full shadow-lg shadow-indigo-900/50 z-40 transition-all hover:scale-110"
      >
        <Sparkles size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-gradient-to-r from-zinc-900 to-zinc-800">
              <div className="flex items-center space-x-2">
                <Sparkles className="text-indigo-400" size={20} />
                <h3 className="font-semibold text-white">AI Assistant</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 min-h-[300px] flex flex-col">
              {response ? (
                <div className="flex-1 overflow-y-auto mb-4 bg-zinc-950/50 p-4 rounded-lg border border-zinc-800/50">
                  <p className="text-zinc-300 text-sm whitespace-pre-wrap leading-relaxed">{response}</p>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-zinc-500 space-y-4 mb-4">
                   <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center">
                     <Sparkles className="text-indigo-500/50" size={32} />
                   </div>
                   <p className="text-sm">Ask me what to watch! I can help you find movies, series, or live channels.</p>
                </div>
              )}

              <div className="relative">
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="e.g., 'Action movies from the 90s'"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-full py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-zinc-600"
                />
                <button 
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-indigo-600 rounded-full text-white hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600"
                >
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AISearch;