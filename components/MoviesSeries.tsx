import React from 'react';
import { Star, Info } from 'lucide-react';
import { MediaItem } from '../types';
import { MOCK_MOVIES, MOCK_SERIES } from '../constants';

interface MoviesSeriesProps {
  type: 'MOVIES' | 'SERIES';
  onSelectMedia: (item: MediaItem) => void;
}

const MoviesSeries: React.FC<MoviesSeriesProps> = ({ type, onSelectMedia }) => {
  const data: MediaItem[] = type === 'MOVIES' ? MOCK_MOVIES : MOCK_SERIES;
  const title = type === 'MOVIES' ? 'Movies' : 'TV Series';

  return (
    <div className="h-full pt-4 px-4 md:px-8 pb-24 md:pb-8">
      <h1 className="text-2xl font-bold text-white mb-6">{title}</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {data.map((item) => (
          <div 
            key={item.id} 
            className="group relative cursor-pointer"
            onClick={() => onSelectMedia(item)}
          >
            <div className="aspect-[2/3] rounded-lg overflow-hidden bg-zinc-800 shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-indigo-500/20 group-hover:shadow-2xl">
              <img 
                src={item.cover} 
                alt={item.title} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                 <div className="flex justify-end">
                    <Info className="text-zinc-400 hover:text-white" size={20} />
                 </div>
                 <div className="space-y-1">
                   <h3 className="text-white font-bold text-sm leading-tight">{item.title}</h3>
                   <div className="flex items-center space-x-1 text-xs text-yellow-500">
                      <Star size={10} fill="currentColor" />
                      <span>{item.rating}</span>
                   </div>
                   <p className="text-[10px] text-zinc-400">{item.year} • {item.category}</p>
                 </div>
              </div>
            </div>
          </div>
        ))}
        {/* Placeholder items to fill grid for demo */}
        {[...Array(6)].map((_, i) => (
           <div key={`ph-${i}`} className="aspect-[2/3] rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
             <span className="text-zinc-700 font-bold text-4xl">?</span>
           </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesSeries;