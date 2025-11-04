import React, { useState } from 'react';
import { Trophy, Target, Shield, TrendingUp, Users, Star } from 'lucide-react';
import type { Team, Match } from '../types';

interface TeamProfilesProps {
  teams: Team[];
  matches: Match[];
}

export const TeamProfiles: React.FC<TeamProfilesProps> = ({ teams, matches }) => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const getTeamMatches = (teamId: string) => {
    return matches.filter(match => 
      match.homeTeam.id === teamId || match.awayTeam.id === teamId
    );
  };

  const getWinPercentage = (team: Team) => {
    const totalGames = team.wins + team.draws + team.losses;
    return totalGames > 0 ? Math.round((team.wins / totalGames) * 100) : 0;
  };

  if (selectedTeam) {
    const teamMatches = getTeamMatches(selectedTeam.id);
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Team Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="p-4">
            <button 
              onClick={() => setSelectedTeam(null)}
              className="text-blue-600 mb-4 hover:text-blue-800 transition-colors"
            >
              ← Back to Teams
            </button>
            
            <div 
              className="rounded-2xl p-6 text-white bg-gradient-to-r"
              style={{ 
                background: `linear-gradient(135deg, ${selectedTeam.color}, ${selectedTeam.color}dd)` 
              }}
            >
              <div className="flex items-center space-x-4">
                <div className="text-6xl">{selectedTeam.logo}</div>
                <div>
                  <h1 className="text-2xl font-bold">{selectedTeam.name}</h1>
                  <p className="opacity-90">{selectedTeam.sport}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="bg-white/20 rounded-lg px-3 py-1">
                      <span className="text-sm">Points: {selectedTeam.points}</span>
                    </div>
                    <div className="bg-white/20 rounded-lg px-3 py-1">
                      <span className="text-sm">Win Rate: {getWinPercentage(selectedTeam)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Team Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2 mb-2">
                <Trophy className="text-yellow-500" size={20} />
                <span className="font-semibold">Wins</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{selectedTeam.wins}</div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="text-blue-500" size={20} />
                <span className="font-semibold">Goals For</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">{selectedTeam.goalsFor}</div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="text-red-500" size={20} />
                <span className="font-semibold">Goals Against</span>
              </div>
              <div className="text-2xl font-bold text-red-600">{selectedTeam.goalsAgainst}</div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="text-purple-500" size={20} />
                <span className="font-semibold">Goal Diff</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">
                {selectedTeam.goalsFor - selectedTeam.goalsAgainst > 0 ? '+' : ''}
                {selectedTeam.goalsFor - selectedTeam.goalsAgainst}
              </div>
            </div>
          </div>

          {/* Team Roster */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-bold flex items-center">
                <Users className="mr-2 text-blue-500" size={20} />
                Team Roster
              </h3>
            </div>
            <div className="p-4 space-y-3">
              {selectedTeam.roster.map((player, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-gray-600">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{player}</div>
                    <div className="text-sm text-gray-500">Player</div>
                  </div>
                  {index < 3 && (
                    <Star className="text-yellow-500" size={16} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Matches */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-bold">Recent & Upcoming Matches</h3>
            </div>
            <div className="p-4 space-y-3">
              {teamMatches.slice(0, 5).map((match) => {
                const isHome = match.homeTeam.id === selectedTeam.id;
                const opponent = isHome ? match.awayTeam : match.homeTeam;
                const teamScore = isHome ? match.homeScore : match.awayScore;
                const opponentScore = isHome ? match.awayScore : match.homeScore;
                
                return (
                  <div key={match.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{opponent.logo}</span>
                      <div>
                        <div className="font-medium">{opponent.name}</div>
                        <div className="text-sm text-gray-500">{match.venue}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      {match.status === 'Scheduled' ? (
                        <div className="text-sm text-gray-500">{match.time}</div>
                      ) : (
                        <div className={`font-bold ${
                          teamScore > opponentScore ? 'text-green-600' : 
                          teamScore < opponentScore ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {teamScore}-{opponentScore}
                        </div>
                      )}
                      <div className="text-xs text-gray-400">{match.status}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center py-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl text-white">
        <h1 className="text-2xl font-bold mb-2">🏆 Team Profiles</h1>
        <p className="text-purple-100">Explore team stats and rosters</p>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teams.map((team) => (
          <div
            key={team.id}
            onClick={() => setSelectedTeam(team)}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-4xl">{team.logo}</div>
              <div>
                <h3 className="font-bold text-lg">{team.name}</h3>
                <p className="text-gray-500">{team.sport}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-green-50 rounded-lg p-2">
                <div className="font-bold text-green-600">{team.wins}</div>
                <div className="text-xs text-gray-500">Wins</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-2">
                <div className="font-bold text-yellow-600">{team.draws}</div>
                <div className="text-xs text-gray-500">Draws</div>
              </div>
              <div className="bg-red-50 rounded-lg p-2">
                <div className="font-bold text-red-600">{team.losses}</div>
                <div className="text-xs text-gray-500">Losses</div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <div className="font-bold text-blue-600">{team.points}</div>
                  <div className="text-xs text-gray-500">Points</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-purple-600">{getWinPercentage(team)}%</div>
                  <div className="text-xs text-gray-500">Win Rate</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-indigo-600">
                    {team.goalsFor - team.goalsAgainst > 0 ? '+' : ''}
                    {team.goalsFor - team.goalsAgainst}
                  </div>
                  <div className="text-xs text-gray-500">Goal Diff</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};