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
import { mockData } from './data/mockData';
import type { AppData } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [appData, setAppData] = useState<AppData>(mockData);

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
        ) : <Homepage {...appData} onMatchClick={(id) => { setSelectedMatchId(id); setCurrentPage('match'); }} />;
      
      case 'teams':
        return <TeamProfiles teams={appData.teams} matches={appData.matches} />;
      
      case 'players':
        return <PlayerProfiles players={appData.players} />;
      
      case 'table':
        return <LeagueTable teams={appData.teams} matches={appData.matches} />;
      
      case 'engagement':
        return <FanEngagement leaderboard={appData.fanLeaderboard} matches={appData.matches} />;
      
      case 'csr':
        return <CSRSection csrStats={appData.csrStats} />;
      
      default:
        return <Homepage {...appData} onMatchClick={(id) => { setSelectedMatchId(id); setCurrentPage('match'); }} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="pb-20">
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App;