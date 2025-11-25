import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Settings, 
  SkipBack, 
  SkipForward, 
  Subtitles,
  Cast
} from 'lucide-react';
import { MediaItem, Channel, Episode } from '../types';

interface PlayerProps {
  item: MediaItem | Channel;
  episode?: Episode;
  onClose: () => void;
}

const Player: React.FC<PlayerProps> = ({ item, episode, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(35); // Mock progress
  const controlsTimeoutRef = useRef<any>(null);

  // Determine display title and subtitle
  const title = 'seasons' in item && episode 
    ? episode.title 
    : 'name' in item 
      ? (item as Channel).name 
      : (item as MediaItem).title;
    
  const subTitle = 'seasons' in item && episode 
    ? `${(item as MediaItem).title} - S${item.seasons?.find(s => s.episodes.includes(episode))?.number} E${episode.number}`
    : 'currentProgram' in item 
      ? (item as Channel).currentProgram 
      : (item as MediaItem).year.toString();

  const background = episode?.thumbnail || (item as MediaItem).backdrop || (item as MediaItem).cover || (item as Channel).logo;

  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    // Initial timeout
    controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col animate-fade-in font-sans">
      {/* Video Background Mock */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <img 
          src={background} 
          alt="Video Content" 
          className="w-full h-full object-cover opacity-60 blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Loading Spinner / Buffering simulation */}
        {!isPlaying && (
          <div className="absolute z-10 p-6 rounded-full bg-black/50 backdrop-blur-sm animate-pulse">
            <Play size={48} className="fill-white text-white ml-2" />
          </div>
        )}
      </div>

      {/* Controls Overlay */}
      <div 
        className={`absolute inset-0 flex flex-col justify-between p-4 md:p-8 transition-opacity duration-300 ${
          showControls ? 'opacity-100 cursor-default' : 'opacity-0 cursor-none'
        }`}
      >
        {/* Top Bar */}
        <div className="flex items-start justify-between bg-gradient-to-b from-black/80 to-transparent pt-4 pb-12 -mx-4 -mt-4 px-8">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
          >
            <ArrowLeft size={32} />
          </button>
          
          <div className="text-center md:text-right pt-2">
            <h1 className="text-white text-xl md:text-2xl font-bold drop-shadow-md">{title}</h1>
            <p className="text-zinc-300 text-sm font-medium drop-shadow-md">{subTitle}</p>
          </div>
        </div>

        {/* Center Area (Click to toggle) */}
        <div className="flex-1 w-full" onClick={togglePlay}></div>

        {/* Bottom Controls */}
        <div className="bg-gradient-to-t from-black/90 via-black/60 to-transparent pb-4 pt-12 -mx-4 -mb-4 px-8">
          {/* Progress Bar */}
          <div className="group relative h-1.5 bg-white/20 rounded-full mb-6 cursor-pointer hover:h-2.5 transition-all">
            <div 
              className="absolute h-full bg-indigo-600 rounded-full relative" 
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-lg transform scale-0 group-hover:scale-100 transition-all" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button onClick={togglePlay} className="text-white hover:text-indigo-400 transition-colors">
                {isPlaying ? <Pause size={32} className="fill-current" /> : <Play size={32} className="fill-current" />}
              </button>

              <button className="text-zinc-300 hover:text-white transition-colors hidden md:block">
                <SkipBack size={24} />
              </button>
              
              <button className="text-zinc-300 hover:text-white transition-colors hidden md:block">
                <SkipForward size={24} />
              </button>

              <div className="flex items-center space-x-2 group relative">
                <button onClick={toggleMute} className="text-white hover:text-indigo-400 transition-colors">
                  {isMuted || volume === 0 ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
                <div className="w-0 overflow-hidden group-hover:w-24 transition-all duration-300">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={volume}
                    onChange={(e) => setVolume(parseInt(e.target.value))}
                    className="h-1 w-20 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                  />
                </div>
              </div>

              <span className="text-sm font-medium text-zinc-300 font-mono">
                {Math.floor(progress / 100 * 120)}:42 / 1:58:00
              </span>
            </div>

            <div className="flex items-center space-x-6">
              <button className="text-zinc-300 hover:text-white transition-colors" title="Subtitles">
                <Subtitles size={24} />
              </button>
              <button className="text-zinc-300 hover:text-white transition-colors" title="Quality">
                <Settings size={24} />
              </button>
               <button className="text-zinc-300 hover:text-white transition-colors hidden md:block" title="Cast">
                <Cast size={24} />
              </button>
              <button className="text-zinc-300 hover:text-white transition-colors" title="Fullscreen">
                <Maximize size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;