import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, Filter, TrendingUp, Award } from 'lucide-react';
import type { Match } from '../types';

interface ResultsProps {
  matches: Match[];
  currentLeagueId: string;
}

export const Results: React.FC<ResultsProps> = ({ matches, currentLeagueId }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [selectedSport, setSelectedSport] = useState<string>('all');

  const leagueMatches = matches.filter(m => m.leagueId === currentLeagueId);

  const completedMatches = leagueMatches.filter(m => m.status === 'FT');
  const liveMatches = leagueMatches.filter(m => m.status === 'Live');
  const upcomingMatches = leagueMatches.filter(m => m.status === 'Scheduled');

  const sports = ['all', ...Array.from(new Set(leagueMatches.map(m => m.sport)))];

  const filterMatches = (matchList: Match[]) => {
    let filtered = matchList;

    if (selectedSport !== 'all') {
      filtered = filtered.filter(m => m.sport.toLowerCase() === selectedSport.toLowerCase());
    }

    return filtered;
  };

  const getMatchResult = (match: Match, teamId: string) => {
    const isHome = match.homeTeam.id === teamId;
    const teamScore = isHome ? match.homeScore : match.awayScore;
    const opponentScore = isHome ? match.awayScore : match.homeScore;

    if (teamScore > opponentScore) return 'W';
    if (teamScore < opponentScore) return 'L';
    return 'D';
  };

  const getResultColor = (result: string) => {
    if (result === 'W') return 'bg-green-100 text-green-700 border-green-300';
    if (result === 'L') return 'bg-red-100 text-red-700 border-red-300';
    return 'bg-yellow-100 text-yellow-700 border-yellow-300';
  };

  const renderMatchCard = (match: Match) => {
    const homeResult = getMatchResult(match, match.homeTeam.id);
    const awayResult = getMatchResult(match, match.awayTeam.id);

    return (
      <div
        key={match.id}
        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar size={14} />
            <span>{match.date}</span>
            <span className="text-gray-400">•</span>
            <span>{match.sport}</span>
          </div>
          {match.status === 'FT' && (
            <div className="flex items-center space-x-1 bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
              <CheckCircle size={12} />
              <span>Full Time</span>
            </div>
          )}
          {match.status === 'Live' && (
            <div className="flex items-center space-x-1 bg-red-50 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>LIVE</span>
            </div>
          )}
          {match.status === 'Scheduled' && (
            <div className="flex items-center space-x-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
              <Clock size={12} />
              <span>{match.time}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1 flex items-center space-x-3">
            <div className="text-2xl">{match.homeTeam.logo}</div>
            <div>
              <div className="font-semibold">{match.homeTeam.name}</div>
              <div className="text-xs text-gray-500">{match.homeTeam.sport}</div>
            </div>
            {match.status === 'FT' && (
              <div className={`px-2 py-1 rounded border font-bold text-xs ${getResultColor(homeResult)}`}>
                {homeResult}
              </div>
            )}
          </div>

          <div className="text-center px-4">
            {(match.status === 'FT' || match.status === 'Live') ? (
              <div className="text-2xl font-bold">
                <span className={match.homeScore > match.awayScore ? 'text-green-600' : 'text-gray-700'}>
                  {match.homeScore}
                </span>
                <span className="text-gray-400 mx-2">-</span>
                <span className={match.awayScore > match.homeScore ? 'text-green-600' : 'text-gray-700'}>
                  {match.awayScore}
                </span>
              </div>
            ) : (
              <div className="text-sm text-gray-400 font-medium">
                VS
              </div>
            )}
            <div className="text-xs text-gray-500 mt-1">{match.venue}</div>
          </div>

          <div className="flex-1 flex items-center justify-end space-x-3">
            {match.status === 'FT' && (
              <div className={`px-2 py-1 rounded border font-bold text-xs ${getResultColor(awayResult)}`}>
                {awayResult}
              </div>
            )}
            <div className="text-right">
              <div className="font-semibold">{match.awayTeam.name}</div>
              <div className="text-xs text-gray-500">{match.awayTeam.sport}</div>
            </div>
            <div className="text-2xl">{match.awayTeam.logo}</div>
          </div>
        </div>

        {match.status === 'FT' && Object.keys(match.fanReactions).length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Fan Reactions:</span>
              {Object.entries(match.fanReactions).slice(0, 4).map(([emoji, count]) => (
                <div key={emoji} className="flex items-center space-x-1 bg-gray-50 px-2 py-1 rounded-full">
                  <span>{emoji}</span>
                  <span className="text-xs font-medium text-gray-600">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 space-y-6">
      <div className="text-center py-6 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl text-white">
        <h1 className="text-2xl font-bold mb-2">Match Results</h1>
        <p className="text-green-100">Complete match history and scores</p>
      </div>

      <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-3">
          <Filter size={16} className="text-gray-500" />
          <span className="text-sm font-semibold text-gray-700">Filter by Sport</span>
        </div>
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

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="text-green-600" size={24} />
            <TrendingUp className="text-green-600" size={16} />
          </div>
          <div className="text-2xl font-bold text-green-700">{filterMatches(completedMatches).length}</div>
          <div className="text-xs text-green-600 font-medium">Completed</div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <Award className="text-red-600" size={16} />
          </div>
          <div className="text-2xl font-bold text-red-700">{filterMatches(liveMatches).length}</div>
          <div className="text-xs text-red-600 font-medium">Live Now</div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <Clock className="text-blue-600" size={24} />
            <Calendar className="text-blue-600" size={16} />
          </div>
          <div className="text-2xl font-bold text-blue-700">{filterMatches(upcomingMatches).length}</div>
          <div className="text-xs text-blue-600 font-medium">Upcoming</div>
        </div>
      </div>

      {filterMatches(liveMatches).length > 0 && (
        <div>
          <h3 className="font-bold text-lg mb-3 flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
            Live Matches
          </h3>
          <div className="space-y-3">
            {filterMatches(liveMatches).map(match => renderMatchCard(match))}
          </div>
        </div>
      )}

      {filterMatches(completedMatches).length > 0 && (
        <div>
          <h3 className="font-bold text-lg mb-3 flex items-center">
            <CheckCircle className="text-green-600 mr-2" size={20} />
            Completed Matches
          </h3>
          <div className="space-y-3">
            {filterMatches(completedMatches).map(match => renderMatchCard(match))}
          </div>
        </div>
      )}

      {filterMatches(upcomingMatches).length > 0 && (
        <div>
          <h3 className="font-bold text-lg mb-3 flex items-center">
            <Clock className="text-blue-600 mr-2" size={20} />
            Upcoming Matches
          </h3>
          <div className="space-y-3">
            {filterMatches(upcomingMatches).map(match => renderMatchCard(match))}
          </div>
        </div>
      )}

      {filterMatches([...completedMatches, ...liveMatches, ...upcomingMatches]).length === 0 && (
        <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
          <Calendar size={32} className="mx-auto mb-3 text-gray-400" />
          <h3 className="font-bold text-gray-600 mb-2">No Matches Found</h3>
          <p className="text-gray-500">No matches available for the selected filters</p>
        </div>
      )}
    </div>
  );
};
