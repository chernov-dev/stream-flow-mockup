import React from 'react';
import { Home, Tv, Film, Clapperboard, Calendar, Settings } from 'lucide-react';
import { ViewState } from '../types';

interface NavigationProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onChangeView }) => {
  const navItems = [
    { id: ViewState.DASHBOARD, label: 'Home', icon: Home },
    { id: ViewState.LIVE_TV, label: 'Live TV', icon: Tv },
    { id: ViewState.MOVIES, label: 'Movies', icon: Film },
    { id: ViewState.SERIES, label: 'Series', icon: Clapperboard },
    { id: ViewState.EPG, label: 'EPG', icon: Calendar },
    { id: ViewState.SETTINGS, label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-zinc-800 z-50">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                currentView === item.id ? 'text-indigo-500' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <item.icon size={20} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-20 lg:w-64 fixed left-0 top-0 bottom-0 bg-black/90 border-r border-zinc-800 z-50">
        <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-zinc-800">
           <div className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
             SF
           </div>
           <span className="hidden lg:block ml-3 font-bold text-xl tracking-tight">StreamFlow</span>
        </div>
        
        <div className="flex-1 py-6 space-y-2">
           {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`flex items-center w-full px-4 lg:px-6 py-3 transition-colors ${
                currentView === item.id 
                  ? 'text-indigo-500 bg-indigo-500/10 border-r-2 border-indigo-500' 
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
              }`}
            >
              <item.icon size={24} />
              <span className="hidden lg:block ml-4 font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;