import React, { useState } from 'react';
import { ViewState, Profile, MediaItem, Channel, Episode } from './types';
import { MOCK_PROFILES } from './constants';
import ProfileSelection from './components/ProfileSelection';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import LiveTV from './components/LiveTV';
import MoviesSeries from './components/MoviesSeries';
import EPG from './components/EPG';
import Settings from './components/Settings';
import AISearch from './components/AISearch';
import MediaDetails from './components/MediaDetails';
import Player from './components/Player';

const App: React.FC = () => {
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [previousView, setPreviousView] = useState<ViewState>(ViewState.DASHBOARD);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  
  // Player State
  const [playerItem, setPlayerItem] = useState<MediaItem | Channel | null>(null);
  const [playerEpisode, setPlayerEpisode] = useState<Episode | undefined>(undefined);

  const handleProfileSelect = (profile: Profile) => {
    setActiveProfile(profile);
    setCurrentView(ViewState.DASHBOARD);
  };

  const handleLogout = () => {
    setActiveProfile(null);
    setCurrentView(ViewState.PROFILE_SELECT);
  };

  const handleMediaSelect = (item: MediaItem) => {
    setSelectedMedia(item);
    setPreviousView(currentView);
    setCurrentView(ViewState.DETAILS);
  };

  const handleBackFromDetails = () => {
    setSelectedMedia(null);
    setCurrentView(previousView);
  };

  // Play Handlers
  const handlePlayMedia = (item: MediaItem, episode?: Episode) => {
    setPlayerItem(item);
    setPlayerEpisode(episode);
    setPreviousView(currentView);
    setCurrentView(ViewState.PLAYER);
  };

  const handlePlayChannel = (channel: Channel) => {
    setPlayerItem(channel);
    setPlayerEpisode(undefined);
    setPreviousView(currentView);
    setCurrentView(ViewState.PLAYER);
  };

  const handleClosePlayer = () => {
    setPlayerItem(null);
    setPlayerEpisode(undefined);
    setCurrentView(previousView);
  };

  if (!activeProfile) {
    return (
      <ProfileSelection 
        profiles={MOCK_PROFILES} 
        onSelectProfile={handleProfileSelect} 
      />
    );
  }

  // Player takes full screen, no navigation
  if (currentView === ViewState.PLAYER && playerItem) {
    return (
      <Player 
        item={playerItem} 
        episode={playerEpisode} 
        onClose={handleClosePlayer} 
      />
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard onSelectMedia={handleMediaSelect} onPlay={handlePlayMedia} />;
      case ViewState.LIVE_TV:
        return <LiveTV onPlay={handlePlayChannel} />;
      case ViewState.MOVIES:
        return <MoviesSeries type="MOVIES" onSelectMedia={handleMediaSelect} />;
      case ViewState.SERIES:
        return <MoviesSeries type="SERIES" onSelectMedia={handleMediaSelect} />;
      case ViewState.EPG:
        return <EPG />;
      case ViewState.SETTINGS:
        return <Settings currentProfile={activeProfile} onLogout={handleLogout} />;
      case ViewState.DETAILS:
        return selectedMedia 
          ? <MediaDetails item={selectedMedia} onBack={handleBackFromDetails} onPlay={handlePlayMedia} /> 
          : <Dashboard onSelectMedia={handleMediaSelect} onPlay={handlePlayMedia} />;
      default:
        return <Dashboard onSelectMedia={handleMediaSelect} onPlay={handlePlayMedia} />;
    }
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
      <Navigation currentView={currentView === ViewState.DETAILS ? previousView : currentView} onChangeView={setCurrentView} />
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar md:pl-20 lg:pl-64 w-full relative">
        {/* Top Header (Mobile & Desktop) */}
        {currentView !== ViewState.DETAILS && (
          <header className="sticky top-0 z-30 bg-zinc-950/80 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-zinc-800/50 md:hidden">
            <div className="font-bold text-lg tracking-tight bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              StreamFlow
            </div>
            <div className="w-8 h-8 rounded bg-zinc-800 overflow-hidden cursor-pointer" onClick={() => setCurrentView(ViewState.SETTINGS)}>
              <img src={activeProfile.avatar} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </header>
        )}

        {/* Desktop Profile Corner (Absolute) */}
        {currentView !== ViewState.DETAILS && (
          <div className="hidden md:flex absolute top-6 right-8 z-30 items-center space-x-3 cursor-pointer hover:bg-zinc-900/50 p-2 rounded-lg transition-colors" onClick={() => setCurrentView(ViewState.SETTINGS)}>
             <span className="text-sm font-medium text-zinc-300">{activeProfile.name}</span>
             <img src={activeProfile.avatar} alt="Profile" className="w-8 h-8 rounded object-cover ring-2 ring-zinc-800" />
          </div>
        )}

        {renderContent()}

        {/* AI Assistant FAB */}
        {currentView !== ViewState.DETAILS && <AISearch profileName={activeProfile.name} />}
      </main>
    </div>
  );
};

export default App;