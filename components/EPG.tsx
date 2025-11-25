import React from 'react';
import { MOCK_CHANNELS, MOCK_EPG } from '../constants';

const EPG: React.FC = () => {
  const times = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00'];

  const getProgramStyle = (start: string, end: string) => {
    // Very simplified logic for mockup positioning
    // Assumes timeline starts at 08:00
    const parseTime = (t: string) => {
      const [h, m] = t.split(':').map(Number);
      return h * 60 + m;
    };
    const startMins = parseTime(start);
    const endMins = parseTime(end);
    const baseMins = parseTime('08:00');
    
    const duration = endMins - startMins;
    const offset = startMins - baseMins;

    // 1 min = 4px width roughly
    return {
      left: `${offset * 4}px`,
      width: `${duration * 4}px`
    };
  };

  return (
    <div className="h-full flex flex-col pt-4 pb-20 md:pb-0">
      <div className="px-4 md:px-8 mb-4">
         <h1 className="text-2xl font-bold text-white">TV Guide</h1>
         <p className="text-zinc-400 text-sm">Today, Oct 24</p>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col relative bg-zinc-950">
        {/* Timeline Header */}
        <div className="flex border-b border-zinc-800 ml-16 md:ml-48 overflow-hidden bg-zinc-900/50">
          <div className="flex relative h-10 items-center">
            {times.map(t => (
               <div key={t} className="w-[120px] text-xs text-zinc-500 font-medium pl-2 border-l border-zinc-800/50">
                 {t}
               </div>
            ))}
            {/* Extended empty space for scroll demo */}
            <div className="w-[400px]"></div>
          </div>
        </div>

        {/* Channels & Programs */}
        <div className="flex-1 overflow-y-auto overflow-x-auto no-scrollbar">
           {MOCK_CHANNELS.map(channel => {
             const progs = MOCK_EPG.filter(e => e.channelId === channel.id);
             
             return (
               <div key={channel.id} className="flex border-b border-zinc-800/50 h-20 group hover:bg-zinc-900/30 transition-colors">
                  {/* Channel Header (Sticky left) */}
                  <div className="w-16 md:w-48 shrink-0 sticky left-0 z-10 bg-zinc-950 border-r border-zinc-800 flex items-center px-2 md:px-4 space-x-3">
                     <img src={channel.logo} alt="" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-zinc-800" />
                     <div className="hidden md:block min-w-0">
                       <p className="text-sm font-medium text-white truncate">{channel.name}</p>
                       <p className="text-xs text-zinc-500">{channel.category}</p>
                     </div>
                  </div>

                  {/* Programs Track */}
                  <div className="relative h-full flex items-center">
                     {progs.length > 0 ? progs.map(prog => (
                       <div 
                         key={prog.id}
                         className="absolute h-16 top-2 rounded-md bg-zinc-800 border border-zinc-700/50 p-2 overflow-hidden hover:bg-zinc-700 hover:border-indigo-500/50 transition-colors cursor-pointer"
                         style={getProgramStyle(prog.start, prog.end)}
                       >
                         <p className="text-xs md:text-sm font-medium text-white truncate">{prog.title}</p>
                         <p className="text-[10px] text-zinc-400 truncate">{prog.start} - {prog.end}</p>
                       </div>
                     )) : (
                       <div className="absolute left-0 w-[800px] h-16 top-2 flex items-center justify-center text-zinc-700 text-xs italic">
                         No program data available
                       </div>
                     )}
                  </div>
               </div>
             )
           })}
        </div>
      </div>
    </div>
  );
};

export default EPG;