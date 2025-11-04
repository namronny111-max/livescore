export interface League {
  id: string;
  name: string;
  logo: string;
  country: string;
  region: string;
  description: string;
  totalTeams: number;
  totalPlayers: number;
  foundedYear: number;
  rating: number;
  rankPosition: number;
}

export interface Team {
  id: string;
  name: string;
  logo: string;
  color: string;
  sport: string;
  leagueId: string;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  roster: string[];
  rating: number;
  rankPosition: number;
}

export interface Player {
  id: string;
  name: string;
  photo: string;
  team: string;
  teamId: string;
  leagueId: string;
  position: string;
  goals: number;
  assists: number;
  mvpVotes: number;
  isFanFavorite: boolean;
  bio: string;
  rating: number;
  rankPosition: number;
}

export interface Match {
  id: string;
  sport: string;
  pitch: string;
  leagueId: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  status: 'Live' | 'FT' | 'Scheduled' | 'Postponed';
  time: string;
  venue: string;
  commentary: CommentaryItem[];
  fanReactions: { [key: string]: number };
  date: string;
}

export interface CommentaryItem {
  id: string;
  time: string;
  text: string;
  type: 'goal' | 'card' | 'substitution' | 'general';
}

export interface FanLeaderboardEntry {
  id: string;
  name: string;
  points: number;
  badges: string[];
  avatar: string;
}

export interface CSRStats {
  peopleScreened: number;
  donationsCollected: number;
  healthChecksCompleted: number;
  wellnessParticipants: number;
}

export interface SocialPost {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  image?: string | null;
  type: 'text' | 'image' | 'video';
}

export interface Prediction {
  id: string;
  matchId: string;
  userId: string;
  predictedWinner: string;
  predictedScore?: { home: number; away: number };
  points: number;
  status: 'pending' | 'correct' | 'incorrect';
}

export interface RankingEntry {
  id: string;
  name: string;
  logo: string;
  rating: number;
  position: number;
  sport?: string;
  team?: string;
  league?: string;
  stats: { [key: string]: any };
}

export interface AppData {
  leagues: League[];
  matches: Match[];
  teams: Team[];
  players: Player[];
  socialPosts: SocialPost[];
  fanLeaderboard: FanLeaderboardEntry[];
  csrStats: CSRStats;
}