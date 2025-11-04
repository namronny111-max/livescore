import React, { useState } from 'react';
import { Trophy, TrendingUp, Award, Crown, Medal, Star, Target, Users } from 'lucide-react';
import type { League, Team, Player } from '../types';

interface RankingsProps {
  leagues: League[];
  teams: Team[];
  players: Player[];
  currentLeagueId: string;
}

export const Rankings: React.FC<RankingsProps> = ({ leagues, teams, players, currentLeagueId }) => {
  const [selectedTab, setSelectedTab] = useState<'leagues' | 'teams' | 'players'>('leagues');
  const [selectedSport, setSelectedSport] = useState<string>('all');

  const currentLeague = leagues.find(l => l.id === currentLeagueId);
  const leagueTeams = teams.filter(t => t.leagueId === currentLeagueId);
  const leaguePlayers = players.filter(p => p.leagueId === currentLeagueId);

  const filteredTeams = selectedSport === 'all'
    ? leagueTeams
    : leagueTeams.filter(t => t.sport.toLowerCase() === selectedSport.toLowerCase());

  const sports = ['all', ...Array.from(new Set(leagueTeams.map(t => t.sport)))];

  const sortedLeagues = [...leagues].sort((a, b) => b.rating - a.rating);
  const sortedTeams = [...filteredTeams].sort((a, b) => b.rating - a.rating);
  const sortedPlayers = [...leaguePlayers].sort((a, b) => b.rating - a.rating);

  const getMedalIcon = (position: number) => {
    if (position === 1) return <Crown className="text-yellow-500" size={20} />;
    if (position === 2) return <Medal className="text-gray-400" size={20} />;
    if (position === 3) return <Medal className="text-amber-600" size={20} />;
    return <span className="font-bold text-gray-600">{position}</span>;
  };

  const getPositionColor = (position: number) => {
    if (position === 1) return 'bg-yellow-50 border-yellow-300';
    if (position === 2) return 'bg-gray-50 border-gray-300';
    if (position === 3) return 'bg-amber-50 border-amber-300';
    return 'bg-white border-gray-200';
  };

  const renderLeagueRankings = () => (
    <div className="space-y-4">
      {sortedLeagues.map((league, index) => {
        const position = index + 1;
        return (
          <div
            key={league.id}
            className={`rounded-xl p-4 border-2 transition-all duration-200 hover:shadow-md ${getPositionColor(position)} ${
              league.id === currentLeagueId ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 flex items-center justify-center">
                {getMedalIcon(position)}
              </div>

              <div className="text-3xl">{league.logo}</div>

              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-lg">{league.name}</h3>
                  {league.id === currentLeagueId && (
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{league.region}, {league.country}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">{league.totalTeams}</span> teams
                  </div>
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">{league.totalPlayers}</span> players
                  </div>
                  <div className="text-xs text-gray-500">
                    Est. <span className="font-medium">{league.foundedYear}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center justify-end space-x-1 mb-1">
                  <Star className="text-yellow-500" size={18} fill="currentColor" />
                  <span className="text-2xl font-bold text-gray-900">{league.rating}</span>
                  <span className="text-gray-400">/10</span>
                </div>
                <div className="text-xs text-gray-500">Performance Rating</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderTeamRankings = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
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

      {sortedTeams.map((team, index) => {
        const position = index + 1;
        const winRate = team.wins + team.draws + team.losses > 0
          ? Math.round((team.wins / (team.wins + team.draws + team.losses)) * 100)
          : 0;

        return (
          <div
            key={team.id}
            className={`rounded-xl p-4 border-2 transition-all duration-200 hover:shadow-md ${getPositionColor(position)}`}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 flex items-center justify-center">
                {getMedalIcon(position)}
              </div>

              <div className="text-3xl">{team.logo}</div>

              <div className="flex-1">
                <h3 className="font-bold text-lg">{team.name}</h3>
                <p className="text-sm text-gray-600">{team.sport}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="text-xs">
                    <span className="text-green-600 font-bold">{team.wins}W</span>
                    <span className="text-gray-400 mx-1">•</span>
                    <span className="text-yellow-600 font-bold">{team.draws}D</span>
                    <span className="text-gray-400 mx-1">•</span>
                    <span className="text-red-600 font-bold">{team.losses}L</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">{winRate}%</span> win rate
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center justify-end space-x-1 mb-1">
                  <Star className="text-yellow-500" size={18} fill="currentColor" />
                  <span className="text-2xl font-bold text-gray-900">{team.rating}</span>
                  <span className="text-gray-400">/10</span>
                </div>
                <div className="flex items-center justify-end space-x-2 text-xs text-gray-500">
                  <Trophy size={12} />
                  <span>{team.points} pts</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {sortedTeams.length === 0 && (
        <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
          <Users size={32} className="mx-auto mb-3 text-gray-400" />
          <p className="text-gray-600">No teams found for this sport</p>
        </div>
      )}
    </div>
  );

  const renderPlayerRankings = () => (
    <div className="space-y-4">
      {sortedPlayers.map((player, index) => {
        const position = index + 1;
        const totalContributions = player.goals + player.assists;

        return (
          <div
            key={player.id}
            className={`rounded-xl p-4 border-2 transition-all duration-200 hover:shadow-md ${getPositionColor(position)}`}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 flex items-center justify-center">
                {getMedalIcon(position)}
              </div>

              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                {player.photo}
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-lg">{player.name}</h3>
                  {player.isFanFavorite && (
                    <Star className="text-yellow-500" size={16} fill="currentColor" />
                  )}
                </div>
                <p className="text-sm text-gray-600">{player.position} • {player.team}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1 text-xs">
                    <Target size={12} className="text-green-600" />
                    <span className="font-medium">{player.goals}</span>
                    <span className="text-gray-500">goals</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs">
                    <TrendingUp size={12} className="text-blue-600" />
                    <span className="font-medium">{player.assists}</span>
                    <span className="text-gray-500">assists</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs">
                    <Award size={12} className="text-purple-600" />
                    <span className="font-medium">{player.mvpVotes}</span>
                    <span className="text-gray-500">votes</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center justify-end space-x-1 mb-1">
                  <Star className="text-yellow-500" size={18} fill="currentColor" />
                  <span className="text-2xl font-bold text-gray-900">{player.rating}</span>
                  <span className="text-gray-400">/10</span>
                </div>
                <div className="text-xs text-gray-500">
                  {totalContributions} contributions
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {sortedPlayers.length === 0 && (
        <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
          <Users size={32} className="mx-auto mb-3 text-gray-400" />
          <p className="text-gray-600">No players found</p>
        </div>
      )}
    </div>
  );

  const tabs = [
    { key: 'leagues', label: 'Leagues', icon: Trophy },
    { key: 'teams', label: 'Teams', icon: Users },
    { key: 'players', label: 'Players', icon: Star }
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="text-center py-6 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl text-white">
        <h1 className="text-2xl font-bold mb-2">Rankings & Ratings</h1>
        <p className="text-yellow-100">Top performers across all categories</p>
        {currentLeague && (
          <div className="mt-3 inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg">
            <span className="text-xl">{currentLeague.logo}</span>
            <span className="font-medium">{currentLeague.name}</span>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-100">
        <div className="grid grid-cols-3 gap-1">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setSelectedTab(key as any)}
              className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
                selectedTab === key
                  ? 'bg-blue-100 text-blue-700 scale-105'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} className="mb-1" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        {selectedTab === 'leagues' && renderLeagueRankings()}
        {selectedTab === 'teams' && renderTeamRankings()}
        {selectedTab === 'players' && renderPlayerRankings()}
      </div>
    </div>
  );
};
