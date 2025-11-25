import React from 'react';
import { PlusCircle, Lock } from 'lucide-react';
import { Profile } from '../types';

interface ProfileSelectionProps {
  profiles: Profile[];
  onSelectProfile: (profile: Profile) => void;
}

const ProfileSelection: React.FC<ProfileSelectionProps> = ({ profiles, onSelectProfile }) => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center animate-fade-in">
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-5xl font-medium text-white mb-4">Who's watching?</h1>
      </div>

      <div className="flex flex-wrap justify-center gap-4 md:gap-8 px-4">
        {profiles.map((profile) => (
          <button
            key={profile.id}
            onClick={() => onSelectProfile(profile)}
            className="group flex flex-col items-center space-y-4 focus:outline-none transition-transform hover:scale-105"
          >
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded overflow-hidden ring-2 ring-transparent group-hover:ring-white transition-all">
              <img 
                src={profile.avatar} 
                alt={profile.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
            <span className="text-zinc-400 group-hover:text-white text-lg md:text-xl font-normal transition-colors">
              {profile.name}
            </span>
          </button>
        ))}

        <button className="group flex flex-col items-center space-y-4 focus:outline-none hover:scale-105 transition-transform">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded flex items-center justify-center bg-zinc-800 group-hover:bg-zinc-700 ring-2 ring-transparent group-hover:ring-zinc-400 transition-all">
            <PlusCircle className="w-12 h-12 text-zinc-400" />
          </div>
          <span className="text-zinc-400 group-hover:text-white text-lg md:text-xl font-normal">Add Profile</span>
        </button>
      </div>

      <button className="mt-16 border border-zinc-600 text-zinc-400 px-6 py-2 tracking-widest hover:border-white hover:text-white transition-colors uppercase text-sm">
        Manage Profiles
      </button>
    </div>
  );
};

export default ProfileSelection;