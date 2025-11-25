import React, { useState } from 'react';
import { ArrowLeft, Play, Plus, Share2, Star, Clock, ChevronDown } from 'lucide-react';
import { MediaItem, Episode } from '../types';

interface MediaDetailsProps {
  item: MediaItem;
  onBack: () => void;
  onPlay: (item: MediaItem, episode?: Episode) => void;
}

const MediaDetails: React.FC<MediaDetailsProps> = ({ item, onBack, onPlay }) => {
  const [selectedSeasonId, setSelectedSeasonId] = useState<string>(
    item.seasons && item.seasons.length > 0 ? item.seasons[0].id : ''
  );

  const selectedSeason = item.seasons?.find(s => s.id === selectedSeasonId);

  // Helper to play first episode if it's a series
  const handleMainPlay = () => {
    if (item.seasons && item.seasons.length > 0) {
      const firstEp = item.seasons[0].episodes[0];
      onPlay(item, firstEp);
    } else {
      onPlay(item);
    }
  };

  return (
    <div className="relative min-h-full pb-20 md:pb-12 animate-fade-in">
      {/* Hero Background */}
      <div className="relative h-[50vh] md:h-[65vh] w-full">
        <img 
          src={item.backdrop || item.cover} 
          alt={item.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        <div className="absolute top-0 left-0 p-4 z-20">
          <button 
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-white/20 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-12 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster (Hidden on mobile usually, or shown small) */}
          <div className="hidden md:block w-48 lg:w-64 shrink-0 -mt-24 rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10">
             <img src={item.cover} alt={item.title} className="w-full h-auto" />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">{item.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-300 mb-6">
              <span className="text-green-400 font-bold">{item.rating * 20}% Match</span>
              <span>{item.year}</span>
              <span className="px-2 py-0.5 border border-zinc-600 rounded text-xs">HD</span>
              <span>{item.duration}</span>
              <span>{item.category}</span>
            </div>

            <div className="flex gap-3 mb-8">
              <button 
                onClick={handleMainPlay}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-zinc-200 transition-colors"
              >
                <Play size={20} className="fill-black" />
                Play
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-lg bg-zinc-800/80 text-white hover:bg-zinc-700 transition-colors">
                <Plus size={24} />
              </button>
               <button className="flex items-center justify-center w-12 h-12 rounded-lg bg-zinc-800/80 text-white hover:bg-zinc-700 transition-colors">
                <Share2 size={20} />
              </button>
            </div>

            <p className="text-zinc-300 text-sm md:text-lg leading-relaxed max-w-3xl mb-8">
              {item.description}
            </p>

            {item.cast && (
              <div className="mb-8">
                <span className="text-zinc-500 text-sm">Starring: </span>
                <span className="text-zinc-300 text-sm">{item.cast.join(', ')}</span>
                {item.director && (
                   <div className="mt-1">
                      <span className="text-zinc-500 text-sm">Director: </span>
                      <span className="text-zinc-300 text-sm">{item.director}</span>
                   </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Series Episodes Section */}
        {item.seasons && item.seasons.length > 0 && selectedSeason && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
               <h2 className="text-xl font-bold text-white">Episodes</h2>
               <div className="relative">
                 <select 
                   value={selectedSeasonId}
                   onChange={(e) => setSelectedSeasonId(e.target.value)}
                   className="appearance-none bg-zinc-900 border border-zinc-700 text-white py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:border-indigo-500 font-medium"
                 >
                   {item.seasons.map(s => (
                     <option key={s.id} value={s.id}>Season {s.number}</option>
                   ))}
                 </select>
                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={16} />
               </div>
            </div>

            <div className="space-y-4">
              {selectedSeason.episodes.map((ep) => (
                <div 
                  key={ep.id} 
                  onClick={() => onPlay(item, ep)}
                  className="flex flex-col md:flex-row gap-4 p-4 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800/50 transition-colors cursor-pointer group"
                >
                  <div className="relative w-full md:w-48 aspect-video shrink-0 rounded-lg overflow-hidden bg-zinc-800">
                    {/* Placeholder for episode thumb if not available, using backdrop fallback */}
                    <img src={ep.thumbnail || item.backdrop || item.cover} alt={ep.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Play className="text-white fill-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="text-white font-bold">{ep.number}. {ep.title}</h3>
                       <span className="text-zinc-500 text-sm flex items-center"><Clock size={14} className="mr-1"/> {ep.duration}</span>
                    </div>
                    <p className="text-zinc-400 text-sm line-clamp-2">{ep.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaDetails;