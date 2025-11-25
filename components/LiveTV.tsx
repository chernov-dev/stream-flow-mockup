import React, { useState } from 'react';
import { Search, Play } from 'lucide-react';
import { MOCK_CHANNELS } from '../constants';
import { Channel } from '../types';

interface LiveTVProps {
  onPlay: (channel: Channel) => void;
}

const LiveTV: React.FC<LiveTVProps> = ({ onPlay }) => {
  const categories = ['All', 'Favorites', 'Sports', 'News', 'Movies', 'Kids', 'Documentary'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChannels = MOCK_CHANNELS.filter(ch => {
     const matchesCategory = activeCategory === 'All' || ch.category === activeCategory;
     const matchesSearch = ch.name.toLowerCase().includes(searchTerm.toLowerCase());
     return matchesCategory && matchesSearch;
  });

  return (
    <div className="h-full pt-4 px-4 md:px-8 pb-24 md:pb-8 flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold text-white self-start">Live TV</h1>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder="Search channels..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex space-x-2 overflow-x-auto no-scrollbar mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat 
                ? 'bg-indigo-600 text-white' 
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Channel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto pb-20">
        {filteredChannels.map(channel => (
          <div 
            key={channel.id} 
            onClick={() => onPlay(channel)}
            className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-3 flex items-center space-x-4 hover:bg-zinc-800/50 hover:border-zinc-700 cursor-pointer group transition-all"
          >
            <div className="w-12 h-12 bg-zinc-950 rounded-full flex items-center justify-center shrink-0 border border-zinc-800">
               <img src={channel.logo} alt={channel.name} className="w-8 h-8 rounded-full opacity-80" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium truncate">{channel.name}</h3>
              <p className="text-zinc-500 text-xs truncate group-hover:text-indigo-400">{channel.currentProgram}</p>
              {/* Progress bar mock */}
              <div className="w-full h-1 bg-zinc-800 mt-2 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600/50" style={{ width: `${channel.progress}%` }}></div>
              </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Play className="text-white fill-white" size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveTV;