import React, { useState, useEffect } from 'react';
import { ArrowLeft, MessageCircle, Heart, ThumbsUp, Zap, Clock } from 'lucide-react';
import type { Match } from '../types';

interface MatchCenterProps {
  match: Match;
  onReaction: (matchId: string, reaction: string) => void;
  onBack: () => void;
}

export const MatchCenter: React.FC<MatchCenterProps> = ({ match, onReaction, onBack }) => {
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [cheerMeter, setCheerMeter] = useState({ home: 45, away: 55 });

  const reactions = [
    { emoji: '🔥', label: 'Fire' },
    { emoji: '⚡', label: 'Electric' },
    { emoji: '❤️', label: 'Love' },
    { emoji: '🎉', label: 'Party' },
    { emoji: '💪', label: 'Strong' },
    { emoji: '👏', label: 'Clap' }
  ];

  const handleReaction = (reaction: string) => {
    onReaction(match.id, reaction);
    setSelectedReaction(reaction);
    setTimeout(() => setSelectedReaction(null), 1000);
  };

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCheerMeter(prev => ({
        home: Math.max(20, Math.min(80, prev.home + (Math.random() - 0.5) * 10)),
        away: Math.max(20, Math.min(80, prev.away + (Math.random() - 0.5) * 10))
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="font-bold text-lg">Match Center</h1>
              <p className="text-sm text-gray-500">{match.venue}</p>
            </div>
          </div>
          
          {/* Live Score */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="text-center flex-1">
                <div className="text-4xl mb-2">{match.homeTeam.logo}</div>
                <div className="font-bold text-lg">{match.homeTeam.name}</div>
              </div>
              
              <div className="text-center px-6">
                <div className="text-4xl font-bold mb-2">
                  {match.homeScore} - {match.awayScore}
                </div>
                <div className="flex items-center justify-center space-x-2">
                  {match.status === 'Live' && (
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  )}
                  <span className="text-blue-100">{match.time}</span>
                </div>
              </div>
              
              <div className="text-center flex-1">
                <div className="text-4xl mb-2">{match.awayTeam.logo}</div>
                <div className="font-bold text-lg">{match.awayTeam.name}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Cheer Meter */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-bold mb-4 text-center">🎉 Fan Cheer Meter</h3>
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-lg">{match.homeTeam.logo}</span>
            <div className="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-1000"
                style={{ width: `${cheerMeter.home}%` }}
              ></div>
              <div 
                className="bg-gradient-to-l from-red-500 to-red-600 h-full rounded-full absolute top-0 right-0 transition-all duration-1000"
                style={{ width: `${cheerMeter.away}%` }}
              ></div>
            </div>
            <span className="text-lg">{match.awayTeam.logo}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>{Math.round(cheerMeter.home)}%</span>
            <span>{Math.round(cheerMeter.away)}%</span>
          </div>
        </div>

        {/* Fan Reactions */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-bold mb-4">💫 React to the Match</h3>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {reactions.map(({ emoji, label }) => (
              <button
                key={emoji}
                onClick={() => handleReaction(emoji)}
                className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                  selectedReaction === emoji
                    ? 'border-blue-500 bg-blue-50 scale-110'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="text-2xl mb-1">{emoji}</div>
                <div className="text-xs text-gray-600">{label}</div>
                <div className="text-xs font-bold text-blue-600">
                  {match.fanReactions[emoji] || 0}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Live Commentary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold flex items-center">
              <MessageCircle className="mr-2 text-blue-500" size={20} />
              Live Commentary
            </h3>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {match.commentary.length > 0 ? (
              <div className="p-4 space-y-3">
                {match.commentary.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Clock size={14} className="text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-bold text-blue-600">{comment.time}</span>
                        {comment.type === 'goal' && <span className="text-green-600">⚽</span>}
                        {comment.type === 'card' && <span className="text-yellow-500">🟨</span>}
                      </div>
                      <p className="text-gray-700">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <MessageCircle size={32} className="mx-auto mb-2 opacity-50" />
                <p>Commentary will appear here during the match</p>
              </div>
            )}
          </div>
        </div>

        {/* Match Stats Preview */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-bold mb-4">📊 Quick Stats</h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{match.homeScore}</div>
              <div className="text-sm text-gray-600">Goals</div>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{match.awayScore}</div>
              <div className="text-sm text-gray-600">Goals</div>
            </div>
          </div>
        </div>

        {/* Fan Poll */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-bold mb-4">🗳️ Fan Poll: Who will win?</h3>
          <div className="space-y-3">
            <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center">
                <span>{match.homeTeam.name} {match.homeTeam.logo}</span>
                <span className="text-blue-600 font-bold">67%</span>
              </div>
            </button>
            <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center">
                <span>{match.awayTeam.name} {match.awayTeam.logo}</span>
                <span className="text-red-600 font-bold">33%</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};