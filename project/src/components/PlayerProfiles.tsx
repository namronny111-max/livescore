import React, { useState } from 'react';
import { Star, Trophy, Target, Heart, Award, TrendingUp, Search, Filter, X, Users } from 'lucide-react';
import type { Player } from '../types';

interface PlayerProfilesProps {
  players: Player[];
}

export const PlayerProfiles: React.FC<PlayerProfilesProps> = ({ players }) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'top-scorers' | 'fan-favorites'>('all');
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'goals' | 'assists' | 'rating' | 'mvpVotes' | 'name'>('rating');

  const teams = ['all', ...Array.from(new Set(players.map(p => p.team)))];

  const filteredPlayers = players
    .filter(player => {
      const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           player.team.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTeam = selectedTeam === 'all' || player.team === selectedTeam;

      let matchesFilter = true;
      switch (filter) {
        case 'top-scorers':
          matchesFilter = player.goals >= 5;
          break;
        case 'fan-favorites':
          matchesFilter = player.isFanFavorite;
          break;
      }

      return matchesSearch && matchesTeam && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'goals':
          return b.goals - a.goals;
        case 'assists':
          return b.assists - a.assists;
        case 'rating':
          return b.rating - a.rating;
        case 'mvpVotes':
          return b.mvpVotes - a.mvpVotes;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return b.rating - a.rating;
      }
    });

  const sortedPlayers = filteredPlayers;

  if (selectedPlayer) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Player Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="p-4">
            <button 
              onClick={() => setSelectedPlayer(null)}
              className="text-blue-600 mb-4 hover:text-blue-800 transition-colors"
            >
              ← Back to Players
            </button>
            
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl">
                  {selectedPlayer.photo}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold">{selectedPlayer.name}</h1>
                  <p className="opacity-90">{selectedPlayer.position} • {selectedPlayer.team}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    {selectedPlayer.isFanFavorite && (
                      <div className="bg-yellow-500/20 rounded-lg px-3 py-1 flex items-center space-x-1">
                        <Star size={14} />
                        <span className="text-sm">Fan Favorite</span>
                      </div>
                    )}
                    <div className="bg-white/20 rounded-lg px-3 py-1">
                      <span className="text-sm">{selectedPlayer.goals} Goals</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Player Bio */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-3">About</h3>
            <p className="text-gray-700 leading-relaxed">{selectedPlayer.bio}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="text-green-500" size={20} />
                <span className="font-semibold">Goals</span>
              </div>
              <div className="text-3xl font-bold text-green-600">{selectedPlayer.goals}</div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="text-blue-500" size={20} />
                <span className="font-semibold">Assists</span>
              </div>
              <div className="text-3xl font-bold text-blue-600">{selectedPlayer.assists}</div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2 mb-2">
                <Trophy className="text-yellow-500" size={20} />
                <span className="font-semibold">MVP Votes</span>
              </div>
              <div className="text-3xl font-bold text-yellow-600">{selectedPlayer.mvpVotes}</div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="text-purple-500" size={20} />
                <span className="font-semibold">Rating</span>
              </div>
              <div className="text-3xl font-bold text-purple-600">
                {(selectedPlayer.goals * 2 + selectedPlayer.assists * 1.5 + selectedPlayer.mvpVotes * 0.1).toFixed(1)}
              </div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4">Performance Overview</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Goals</span>
                  <span>{selectedPlayer.goals}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (selectedPlayer.goals / 10) * 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Assists</span>
                  <span>{selectedPlayer.assists}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (selectedPlayer.assists / 10) * 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Fan Popularity</span>
                  <span>{selectedPlayer.mvpVotes} votes</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (selectedPlayer.mvpVotes / 25) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4">Achievements & Badges</h3>
            <div className="grid grid-cols-2 gap-3">
              {selectedPlayer.goals >= 5 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center space-x-2">
                  <Target className="text-green-600" size={20} />
                  <span className="text-sm font-medium text-green-800">Top Scorer</span>
                </div>
              )}
              
              {selectedPlayer.assists >= 3 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center space-x-2">
                  <TrendingUp className="text-blue-600" size={20} />
                  <span className="text-sm font-medium text-blue-800">Playmaker</span>
                </div>
              )}
              
              {selectedPlayer.isFanFavorite && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center space-x-2">
                  <Star className="text-yellow-600" size={20} />
                  <span className="text-sm font-medium text-yellow-800">Fan Favorite</span>
                </div>
              )}
              
              {selectedPlayer.mvpVotes >= 15 && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 flex items-center space-x-2">
                  <Trophy className="text-purple-600" size={20} />
                  <span className="text-sm font-medium text-purple-800">MVP Candidate</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center py-6 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl text-white">
        <h1 className="text-2xl font-bold mb-2">Player Profiles</h1>
        <p className="text-green-100">Discover the stars of the tournament</p>
        <div className="mt-3 text-sm opacity-90">{sortedPlayers.length} players</div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search players by name or team..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Filter size={16} className="text-gray-500" />
            <span className="text-sm font-semibold text-gray-700">Filter by Team</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {teams.map((team) => (
              <button
                key={team}
                onClick={() => setSelectedTeam(team)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedTeam === team
                    ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent'
                }`}
              >
                {team === 'all' ? 'All Teams' : team}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp size={16} className="text-gray-500" />
            <span className="text-sm font-semibold text-gray-700">Sort By</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'rating', label: 'Rating' },
              { value: 'goals', label: 'Goals' },
              { value: 'assists', label: 'Assists' },
              { value: 'mvpVotes', label: 'MVP Votes' },
              { value: 'name', label: 'Name' }
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setSortBy(value as any)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  sortBy === value
                    ? 'bg-green-100 text-green-700 border-2 border-green-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 bg-white rounded-xl p-2 shadow-sm border border-gray-100">
        {[
          { key: 'all', label: 'All Players', icon: Trophy },
          { key: 'top-scorers', label: 'Top Scorers', icon: Target },
          { key: 'fan-favorites', label: 'Fan Favorites', icon: Heart }
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setFilter(key as any)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg transition-all ${
              filter === key
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon size={16} />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>

      {/* Players Grid */}
      {sortedPlayers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedPlayers.map((player, index) => (
          <div
            key={player.id}
            onClick={() => setSelectedPlayer(player)}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-2xl relative">
                {player.photo}
                {index < 3 && filter === 'top-scorers' && (
                  <div className="absolute -top-1 -right-1 bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg flex items-center space-x-2">
                  <span>{player.name}</span>
                  {player.isFanFavorite && <Star className="text-yellow-500" size={16} />}
                </h3>
                <p className="text-gray-500">{player.position}</p>
                <p className="text-sm text-blue-600 font-medium">{player.team}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-green-50 rounded-lg p-2">
                <div className="font-bold text-green-600">{player.goals}</div>
                <div className="text-xs text-gray-500">Goals</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-2">
                <div className="font-bold text-blue-600">{player.assists}</div>
                <div className="text-xs text-gray-500">Assists</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-2">
                <div className="font-bold text-yellow-600">{player.mvpVotes}</div>
                <div className="text-xs text-gray-500">MVP Votes</div>
              </div>
            </div>
            
            {/* Player Rating */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Overall Rating</span>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={
                        star <= Math.round((player.goals + player.assists + player.mvpVotes / 5) / 3)
                          ? 'text-yellow-500 fill-current'
                          : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
          <Users size={32} className="mx-auto mb-3 text-gray-400" />
          <h3 className="font-bold text-gray-600 mb-2">No Players Found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};