import React from 'react';
import { User, Shield, CreditCard, Monitor, LogOut } from 'lucide-react';
import { Profile } from '../types';

interface SettingsProps {
  currentProfile: Profile;
  onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ currentProfile, onLogout }) => {
  return (
    <div className="h-full pt-4 px-4 md:px-8 pb-24 md:pb-8 overflow-y-auto">
      <h1 className="text-2xl font-bold text-white mb-8">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Account Section */}
        <div className="space-y-6">
          <section className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
              <User className="mr-2 text-indigo-500" size={20} />
              Profile
            </h2>
            <div className="flex items-center space-x-4 mb-6">
              <img src={currentProfile.avatar} alt="Avatar" className="w-16 h-16 rounded-lg" />
              <div>
                <p className="text-white font-medium text-lg">{currentProfile.name}</p>
                <p className="text-zinc-500 text-sm">Standard Plan</p>
              </div>
              <button className="ml-auto text-sm text-indigo-400 hover:text-indigo-300 font-medium">Edit</button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
                 <span className="text-zinc-400">Parental Control</span>
                 <div className="w-10 h-5 bg-zinc-700 rounded-full relative cursor-pointer">
                   <div className="w-5 h-5 bg-white rounded-full absolute left-0 shadow-sm"></div>
                 </div>
              </div>
              <div className="flex justify-between items-center py-2">
                 <span className="text-zinc-400">Autoplay Trailers</span>
                 <div className="w-10 h-5 bg-indigo-600 rounded-full relative cursor-pointer">
                   <div className="w-5 h-5 bg-white rounded-full absolute right-0 shadow-sm"></div>
                 </div>
              </div>
            </div>
          </section>

          <section className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
             <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Monitor className="mr-2 text-indigo-500" size={20} />
              Stream Configuration
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-500 uppercase mb-1">Stream Format</label>
                <select className="w-full bg-zinc-950 border border-zinc-800 text-white text-sm rounded-lg p-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none">
                  <option>MPEG-TS (Default)</option>
                  <option>HLS</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-500 uppercase mb-1">Xtream API Endpoint</label>
                <input type="text" value="http://line.srv-iptv.com:80" disabled className="w-full bg-zinc-950/50 border border-zinc-800 text-zinc-500 text-sm rounded-lg p-2.5" />
              </div>
            </div>
          </section>
        </div>

        {/* Subscription & Support */}
        <div className="space-y-6">
           <section className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
              <CreditCard className="mr-2 text-indigo-500" size={20} />
              Subscription
            </h2>
            <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start">
                <div>
                   <p className="text-indigo-400 font-bold text-sm">PREMIUM PLUS</p>
                   <p className="text-zinc-300 text-xs mt-1">Next billing date: Nov 24, 2024</p>
                </div>
                <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-1 rounded">ACTIVE</span>
              </div>
            </div>
            <button className="w-full py-2 border border-zinc-700 text-zinc-300 rounded-lg text-sm hover:bg-zinc-800 transition-colors">Manage Subscription</button>
          </section>

           <section className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Shield className="mr-2 text-indigo-500" size={20} />
              Security
            </h2>
            <button onClick={onLogout} className="w-full flex items-center justify-center py-3 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg font-medium transition-colors border border-red-500/20">
              <LogOut size={18} className="mr-2" />
              Log Out All Devices
            </button>
           </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;