import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Homepage } from './components/Homepage';
import { SocialFeed } from './components/SocialFeed';
import { MatchCenter } from './components/MatchCenter';
import { TeamProfiles } from './components/TeamProfiles';
import { PlayerProfiles } from './components/PlayerProfiles';
import { LeagueTable } from './components/LeagueTable';
import { FanEngagement } from './components/FanEngagement';
import { CSRSection } from './components/CSRSection';
import { LeagueSelector } from './components/LeagueSelector';
import { Rankings } from './components/Rankings';
import { Results } from './components/Results';
import { mockData } from './data/mockData';
import type { AppData } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [currentLeagueId, setCurrentLeagueId] = useState('lira-gala');
  const [appData, setAppData] = useState<AppData>(mockData);

  const currentLeagueTeams = appData.teams.filter(t => t.leagueId === currentLeagueId);
  const currentLeaguePlayers = appData.players.filter(p => p.leagueId === currentLeagueId);
  const currentLeagueMatches = appData.matches.filter(m => m.leagueId === currentLeagueId);

  const updateMatchScore = (matchId: string, homeScore: number, awayScore: number) => {
    setAppData(prev => ({
      ...prev,
      matches: prev.matches.map(match =>
        match.id === matchId
          ? { ...match, homeScore, awayScore }
          : match
      )
    }));
  };

  const addFanReaction = (matchId: string, reaction: string) => {
    setAppData(prev => ({
      ...prev,
      matches: prev.matches.map(match =>
        match.id === matchId
          ? {
              ...match,
              fanReactions: {
                ...match.fanReactions,
                [reaction]: (match.fanReactions[reaction] || 0) + 1
              }
            }
          : match
      )
    }));
  };

  const handleSocialLike = (postId: string) => {
    setAppData(prev => ({
      ...prev,
      socialPosts: prev.socialPosts.map(post =>
        post.id === postId
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    }));
  };

  const handleSocialComment = (postId: string, comment: string) => {
    setAppData(prev => ({
      ...prev,
      socialPosts: prev.socialPosts.map(post =>
        post.id === postId
          ? { ...post, comments: post.comments + 1 }
          : post
      )
    }));
  };

  const handleLeagueChange = (leagueId: string) => {
    setCurrentLeagueId(leagueId);
    setCurrentPage('home');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'feed':
        return (
          <SocialFeed
            posts={appData.socialPosts}
            onLike={handleSocialLike}
            onComment={handleSocialComment}
          />
        );

      case 'match':
        return selectedMatchId ? (
          <MatchCenter
            match={appData.matches.find(m => m.id === selectedMatchId)!}
            onReaction={addFanReaction}
            onBack={() => setCurrentPage('home')}
          />
        ) : (
          <Homepage
            matches={currentLeagueMatches}
            teams={currentLeagueTeams}
            players={currentLeaguePlayers}
            onMatchClick={(id) => {
              setSelectedMatchId(id);
              setCurrentPage('match');
            }}
          />
        );

      case 'results':
        return (
          <Results
            matches={appData.matches}
            currentLeagueId={currentLeagueId}
          />
        );

      case 'rankings':
        return (
          <Rankings
            leagues={appData.leagues}
            teams={appData.teams}
            players={appData.players}
            currentLeagueId={currentLeagueId}
          />
        );

      case 'teams':
        return (
          <TeamProfiles
            teams={currentLeagueTeams}
            matches={currentLeagueMatches}
          />
        );

      case 'players':
        return <PlayerProfiles players={currentLeaguePlayers} />;

      case 'table':
        return (
          <LeagueTable
            teams={currentLeagueTeams}
            matches={currentLeagueMatches}
          />
        );

      case 'engagement':
        return (
          <FanEngagement
            leaderboard={appData.fanLeaderboard}
            matches={currentLeagueMatches}
          />
        );

      case 'csr':
        return <CSRSection csrStats={appData.csrStats} />;

      default:
        return (
          <Homepage
            matches={currentLeagueMatches}
            teams={currentLeagueTeams}
            players={currentLeaguePlayers}
            onMatchClick={(id) => {
              setSelectedMatchId(id);
              setCurrentPage('match');
            }}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200 p-4">
        <LeagueSelector
          leagues={appData.leagues}
          currentLeagueId={currentLeagueId}
          onLeagueChange={handleLeagueChange}
        />
      </div>
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="pb-20">
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App;
