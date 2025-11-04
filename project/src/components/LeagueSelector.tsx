import React, { useState } from 'react';
import { ChevronDown, Globe, Trophy, MapPin } from 'lucide-react';
import type { League } from '../types';

interface LeagueSelectorProps {
  leagues: League[];
  currentLeagueId: string;
  onLeagueChange: (leagueId: string) => void;
}

export const LeagueSelector: React.FC<LeagueSelectorProps> = ({
  leagues,
  currentLeagueId,
  onLeagueChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentLeague = leagues.find(l => l.id === currentLeagueId);

  const handleLeagueSelect = (leagueId: string) => {
    onLeagueChange(leagueId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{currentLeague?.logo}</div>
          <div className="text-left">
            <div className="font-semibold text-gray-900">{currentLeague?.name}</div>
            <div className="text-xs text-gray-500">{currentLeague?.region}, {currentLeague?.country}</div>
          </div>
        </div>
        <ChevronDown
          size={20}
          className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                Available Leagues
              </div>
              {leagues.map((league) => (
                <button
                  key={league.id}
                  onClick={() => handleLeagueSelect(league.id)}
                  className={`w-full px-3 py-3 rounded-lg flex items-center justify-between hover:bg-gray-50 transition-colors ${
                    league.id === currentLeagueId ? 'bg-blue-50 border border-blue-200' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{league.logo}</div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">{league.name}</div>
                      <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                        <MapPin size={12} />
                        <span>{league.region}, {league.country}</span>
                      </div>
                      <div className="flex items-center space-x-3 mt-1">
                        <div className="flex items-center space-x-1 text-xs text-gray-600">
                          <Trophy size={10} />
                          <span>{league.totalTeams} teams</span>
                        </div>
                        <div className="text-xs text-yellow-600 font-medium">
                          Rating: {league.rating}/10
                        </div>
                      </div>
                    </div>
                  </div>
                  {league.id === currentLeagueId && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
