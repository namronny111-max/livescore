import React, { useState, useEffect } from 'react';
import { Play, Clock, Trophy, TrendingUp, Filter } from 'lucide-react';
import type { Match, Team, Player } from '../types';

interface HomepageProps {
  matches: Match[];
  teams: Team[];
  players: Player[];
  onMatchClick: (matchId: string) => void;
}

export const Homepage: React.FC<HomepageProps> = ({ matches, teams, players, onMatchClick }) => {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [selectedSport, setSelectedSport] = useState<string>('all');
  
  const liveMatches = matches.filter(m => m.status === 'Live');
  const filteredMatches = selectedSport === 'all' 
    ? matches 
    : matches.filter(m => m.sport.toLowerCase() === selectedSport.toLowerCase());
  const topScorers = players.sort((a, b) => b.goals - a.goals).slice(0, 3);
  
  const sports = ['all', 'football', 'volleyball', 'netball', 'tug of war', 'aerobics'];
  const pitches = ['Pitch 1', 'Pitch 2', 'Pitch 3', 'Pitch 5', 'Main Stage'];

  // Animated score ticker
  useEffect(() => {
    if (liveMatches.length > 1) {
      const interval = setInterval(() => {
        setTickerIndex(prev => (prev + 1) % liveMatches.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [liveMatches.length]);

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center py-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white">
        <h1 className="text-3xl font-bold mb-2">🏆 Lira Corporate Gala</h1>
        <p className="text-blue-100">Live from the Sports Festival</p>
        <div className="mt-4 flex justify-center space-x-4">
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <span className="text-sm">Live Matches</span>
            <div className="text-xl font-bold">{liveMatches.length}</div>
          </div>
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <span className="text-sm">Total Attendees</span>
            <div className="text-xl font-bold">900+</div>
          </div>
        </div>
      </div>

      {/* Live Score Ticker */}
      {liveMatches.length > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-4 overflow-hidden">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-600 font-semibold text-sm">LIVE</span>
            <span className="text-xs text-gray-500">• {liveMatches.length} matches ongoing</span>
          </div>
          <div 
            className="transition-transform duration-500 ease-in-out"
            style={{ transform: `translateY(-${tickerIndex * 60}px)` }}
          >
            {liveMatches.map((match, index) => (
              <div 
                key={match.id}
                className="h-15 flex items-center justify-between cursor-pointer hover:bg-red-100 rounded-lg p-2 transition-colors"
                onClick={() => onMatchClick(match.id)}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{match.homeTeam.logo}</span>
                  <div>
                    <div className="font-medium text-sm">{match.homeTeam.name}</div>
                    <div className="text-xs text-gray-500">{match.pitch}</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-red-600">
                    {match.homeScore} - {match.awayScore}
                  </div>
                  <div className="text-xs text-gray-500">{match.sport} • {match.time}</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="font-medium text-sm">{match.awayTeam.name}</div>
                    <div className="text-xs text-gray-500">{match.pitch}</div>
                  </div>
                  <span className="text-2xl">{match.awayTeam.logo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sport Filter */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-3">
          <Filter size={16} className="text-blue-500" />
          <span className="font-semibold text-sm">Filter by Sport</span>
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {sports.map((sport) => (
            <button
              key={sport}
              onClick={() => setSelectedSport(sport)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedSport === sport
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {sport.charAt(0).toUpperCase() + sport.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Today's Fixtures */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <Clock className="mr-2 text-blue-500" size={20} />
            {selectedSport === 'all' ? 'All Fixtures' : `${selectedSport.charAt(0).toUpperCase() + selectedSport.slice(1)} Fixtures`}
          </h2>
        </div>
        <div className="space-y-2 p-4">
          {filteredMatches.slice(0, 8).map((match) => (
            <div
              key={match.id}
              onClick={() => onMatchClick(match.id)}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200 border border-gray-100 hover:shadow-md"
            >
              <div className="flex items-center space-x-3">
                <div className="text-center">
                  <div className="text-lg">{match.homeTeam.logo}</div>
                  <div className="text-xs text-gray-500 w-16 truncate">{match.homeTeam.name}</div>
                </div>
                <div className="text-sm text-gray-400">vs</div>
                <div className="text-center">
                  <div className="text-lg">{match.awayTeam.logo}</div>
                  <div className="text-xs text-gray-500 w-16 truncate">{match.awayTeam.name}</div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-xs text-blue-600 font-medium mb-1">{match.pitch}</div>
                {match.status === 'Live' && (
                  <div className="flex items-center space-x-2">
                    <div className="text-lg font-bold text-red-600">
                      {match.homeScore}-{match.awayScore}
                    </div>
                    <Play size={16} className="text-red-500" />
                  </div>
                )}
                {match.status === 'FT' && (
                  <div className="text-lg font-bold text-gray-600">
                    {match.homeScore}-{match.awayScore}
                  </div>
                )}
                {match.status === 'Scheduled' && (
                  <div className="text-sm text-gray-500">{match.time}</div>
                )}
                <div className="text-xs text-gray-400 mt-1">{match.sport} • {match.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Pitches Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold text-lg">🏟️ Live Pitches</h3>
        </div>
        <div className="p-4 grid grid-cols-2 gap-3">
          {pitches.map((pitch) => {
            const pitchMatch = liveMatches.find(m => m.pitch === pitch);
            return (
              <div 
                key={pitch}
                className={`p-3 rounded-lg border-2 transition-all ${
                  pitchMatch 
                    ? 'border-red-200 bg-red-50 cursor-pointer hover:bg-red-100' 
                    : 'border-gray-200 bg-gray-50'
                }`}
                onClick={() => pitchMatch && onMatchClick(pitchMatch.id)}
              >
                <div className="text-center">
                  <div className="font-bold text-sm mb-1">{pitch}</div>
                  {pitchMatch ? (
                    <>
                      <div className="text-xs text-red-600 font-medium mb-1">LIVE</div>
                      <div className="text-xs text-gray-600">{pitchMatch.sport}</div>
                      <div className="text-sm font-bold text-red-600 mt-1">
                        {pitchMatch.homeScore}-{pitchMatch.awayScore}
                      </div>
                    </>
                  ) : (
                    <div className="text-xs text-gray-500">Available</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
          <Trophy className="mb-2" size={24} />
          <div className="text-sm opacity-90">Top Team</div>
          <div className="font-bold">{teams[0]?.name || 'TBD'}</div>
          <div className="text-xs opacity-75">{teams[0]?.points || 0} points</div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 text-white">
          <TrendingUp className="mb-2" size={24} />
          <div className="text-sm opacity-90">Top Scorer</div>
          <div className="font-bold">{topScorers[0]?.name || 'TBD'}</div>
          <div className="text-xs opacity-75">{topScorers[0]?.goals || 0} goals</div>
        </div>
      </div>

      {/* Trending Players */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-800">🌟 Trending Players</h3>
        </div>
        <div className="p-4 space-y-3">
          {topScorers.map((player, index) => (
            <div key={player.id} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-lg">{player.photo}</span>
              </div>
              <div className="flex-1">
                <div className="font-medium">{player.name}</div>
                <div className="text-sm text-gray-500">{player.team} • {teams.find(t => t.name === player.team)?.sport}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-blue-600">{player.goals}</div>
                <div className="text-xs text-gray-500">goals</div>
              </div>
              {player.isFanFavorite && (
                <div className="text-yellow-500">⭐</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};