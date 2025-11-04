import React, { useState } from 'react';
import { Trophy, TrendingUp, TrendingDown, Medal, Crown } from 'lucide-react';
import type { Team, Match } from '../types';

interface LeagueTableProps {
  teams: Team[];
  matches: Match[];
}

export const LeagueTable: React.FC<LeagueTableProps> = ({ teams, matches }) => {
  const [selectedSport, setSelectedSport] = useState<string>('all');

  const sports = ['all', ...Array.from(new Set(teams.map(team => team.sport)))];
  
  const filteredTeams = selectedSport === 'all' 
    ? teams 
    : teams.filter(team => team.sport === selectedSport);

  const sortedTeams = filteredTeams.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if ((b.goalsFor - b.goalsAgainst) !== (a.goalsFor - a.goalsAgainst)) {
      return (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst);
    }
    return b.goalsFor - a.goalsFor;
  });

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="text-yellow-500" size={20} />;
      case 2:
        return <Medal className="text-gray-400" size={20} />;
      case 3:
        return <Medal className="text-amber-600" size={20} />;
      default:
        return null;
    }
  };

  const getPositionBadge = (position: number) => {
    if (position <= 3) {
      const colors = ['bg-yellow-100 text-yellow-800', 'bg-gray-100 text-gray-800', 'bg-amber-100 text-amber-800'];
      return `${colors[position - 1]} border-2 border-current`;
    }
    return 'bg-gray-50 text-gray-600';
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center py-6 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl text-white">
        <h1 className="text-2xl font-bold mb-2">🏆 League Table</h1>
        <p className="text-yellow-100">Live standings and rankings</p>
      </div>

      {/* Sport Filter */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex space-x-2 overflow-x-auto">
          {sports.map((sport) => (
            <button
              key={sport}
              onClick={() => setSelectedSport(sport)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-all ${
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

      {/* Top 3 Podium */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-lg mb-4 text-center">🥇 Top Teams</h3>
        <div className="flex justify-center items-end space-x-4">
          {sortedTeams.slice(0, 3).map((team, index) => {
            const positions = [1, 0, 2]; // Second, First, Third
            const actualPosition = positions[index];
            const heights = ['h-20', 'h-24', 'h-16'];
            const colors = ['bg-gray-300', 'bg-yellow-400', 'bg-amber-600'];
            
            return (
              <div key={team.id} className="text-center">
                <div className="mb-2">
                  <div className="text-2xl mb-1">{team.logo}</div>
                  <div className="text-sm font-medium truncate w-20">{team.name}</div>
                  <div className="text-xs text-gray-500">{team.points} pts</div>
                </div>
                <div className={`${heights[actualPosition]} ${colors[actualPosition]} rounded-t-lg w-20 flex items-end justify-center pb-2`}>
                  <span className="text-white font-bold">{actualPosition + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full League Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold text-lg flex items-center">
            <Trophy className="mr-2 text-yellow-500" size={20} />
            Full Table
          </h3>
        </div>
        
        {/* Table Header */}
        <div className="bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700">
          <div className="grid grid-cols-12 gap-2 items-center">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-4">Team</div>
            <div className="col-span-1 text-center">P</div>
            <div className="col-span-1 text-center">W</div>
            <div className="col-span-1 text-center">D</div>
            <div className="col-span-1 text-center">L</div>
            <div className="col-span-1 text-center">GF</div>
            <div className="col-span-1 text-center">GA</div>
            <div className="col-span-1 text-center">Pts</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-100">
          {sortedTeams.map((team, index) => {
            const position = index + 1;
            const totalGames = team.wins + team.draws + team.losses;
            const goalDiff = team.goalsFor - team.goalsAgainst;
            
            return (
              <div 
                key={team.id} 
                className={`px-4 py-3 hover:bg-gray-50 transition-colors ${
                  position <= 3 ? 'bg-gradient-to-r from-yellow-50 to-transparent' : ''
                }`}
              >
                <div className="grid grid-cols-12 gap-2 items-center">
                  {/* Position */}
                  <div className="col-span-1 flex justify-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getPositionBadge(position)}`}>
                      {position <= 3 ? getPositionIcon(position) : position}
                    </div>
                  </div>
                  
                  {/* Team */}
                  <div className="col-span-4 flex items-center space-x-3">
                    <span className="text-xl" style={{ color: team.color }}>{team.logo}</span>
                    <div>
                      <div className="font-medium text-sm">{team.name}</div>
                      <div className="text-xs text-gray-500">{team.sport}</div>
                    </div>
                  </div>
                  
                  {/* Played */}
                  <div className="col-span-1 text-center text-sm">{totalGames}</div>
                  
                  {/* Won */}
                  <div className="col-span-1 text-center text-sm font-medium text-green-600">{team.wins}</div>
                  
                  {/* Drawn */}
                  <div className="col-span-1 text-center text-sm font-medium text-yellow-600">{team.draws}</div>
                  
                  {/* Lost */}
                  <div className="col-span-1 text-center text-sm font-medium text-red-600">{team.losses}</div>
                  
                  {/* Goals For */}
                  <div className="col-span-1 text-center text-sm">{team.goalsFor}</div>
                  
                  {/* Goals Against */}
                  <div className="col-span-1 text-center text-sm">{team.goalsAgainst}</div>
                  
                  {/* Points */}
                  <div className="col-span-1 text-center">
                    <div className="font-bold text-blue-600">{team.points}</div>
                    <div className="text-xs flex items-center justify-center">
                      {goalDiff > 0 && <TrendingUp size={12} className="text-green-500" />}
                      {goalDiff < 0 && <TrendingDown size={12} className="text-red-500" />}
                      <span className={goalDiff > 0 ? 'text-green-600' : goalDiff < 0 ? 'text-red-600' : 'text-gray-500'}>
                        {goalDiff > 0 ? '+' : ''}{goalDiff}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* League Statistics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {teams.reduce((sum, team) => sum + team.goalsFor, 0)}
          </div>
          <div className="text-sm text-gray-500">Total Goals</div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {teams.reduce((sum, team) => sum + team.wins + team.draws + team.losses, 0)}
          </div>
          <div className="text-sm text-gray-500">Matches Played</div>
        </div>
      </div>
    </div>
  );
};