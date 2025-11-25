import React from 'react';
import { Play } from 'lucide-react';
import { MOCK_MOVIES, MOCK_CHANNELS } from '../constants';

const Dashboard: React.FC = () => {
  const featuredMovie = MOCK_MOVIES[0];

  return (
    <div className="pb-20 md:pb-0">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full">
        <div className="absolute inset-0">
          <img 
            src={featuredMovie.cover} 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full md:w-2/3 lg:w-1/2">
          <span className="px-2 py-1 bg-indigo-600 text-white text-xs font-bold rounded uppercase tracking-wider mb-2 inline-block">Featured</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 leading-tight">{featuredMovie.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-zinc-300 mb-4">
            <span className="text-green-400 font-semibold">{featuredMovie.rating * 20}% Match</span>
            <span>{featuredMovie.year}</span>
            <span>{featuredMovie.category}</span>
          </div>
          <p className="text-zinc-300 text-sm md:text-base line-clamp-3 mb-6">{featuredMovie.description}</p>
          
          <div className="flex space-x-4">
            <button className="flex items-center bg-white text-black px-6 py-3 rounded font-bold hover:bg-zinc-200 transition-colors">
              <Play size={20} className="mr-2 fill-black" />
              Play
            </button>
            <button className="flex items-center bg-zinc-800/80 text-white px-6 py-3 rounded font-bold hover:bg-zinc-700 transition-colors backdrop-blur-sm">
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Recent Channels */}
      <div className="px-6 md:px-12 mt-8">
        <h2 className="text-xl font-bold text-white mb-4">Recent Channels</h2>
        <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-4">
          {MOCK_CHANNELS.map((channel) => (
            <div key={channel.id} className="flex-none w-40 group cursor-pointer">
              <div className="relative aspect-video bg-zinc-800 rounded-lg overflow-hidden border border-zinc-800 group-hover:border-indigo-500 transition-all">
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                  <img src={channel.logo} alt={channel.name} className="w-12 h-12 rounded-full opacity-80" />
                </div>
                <div className="absolute bottom-0 left-0 h-1 bg-indigo-600" style={{ width: `${channel.progress}%` }} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                   <Play className="fill-white text-white" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-white mt-2 truncate">{channel.name}</h3>
              <p className="text-xs text-zinc-500 truncate">{channel.currentProgram}</p>
            </div>
          ))}
        </div>
      </div>

       {/* Trending Movies */}
       <div className="px-6 md:px-12 mt-8">
        <h2 className="text-xl font-bold text-white mb-4">Trending Now</h2>
        <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-4">
          {MOCK_MOVIES.slice(1).map((movie) => (
            <div key={movie.id} className="flex-none w-32 md:w-40 group cursor-pointer">
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                <img src={movie.cover} alt={movie.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                   <p className="text-white text-xs font-bold">{movie.title}</p>
                   <p className="text-zinc-300 text-[10px]">{movie.year}</p>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;