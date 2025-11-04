import type { AppData, Team, Player, Match, CommentaryItem, SocialPost } from '../types';

const teams: Team[] = [
  // Football Teams
  {
    id: '1',
    name: 'Thunder Hawks',
    logo: '⚡',
    color: '#3B82F6',
    sport: 'Football',
    wins: 4,
    draws: 1,
    losses: 0,
    goalsFor: 12,
    goalsAgainst: 3,
    points: 13,
    roster: ['John Smith', 'Mike Johnson', 'David Wilson']
  },
  {
    id: '2',
    name: 'Fire Dragons',
    logo: '🔥',
    color: '#EF4444',
    sport: 'Football',
    wins: 3,
    draws: 2,
    losses: 0,
    goalsFor: 10,
    goalsAgainst: 4,
    points: 11,
    roster: ['Alex Brown', 'Chris Davis', 'Ryan Miller']
  },
  // Volleyball Teams
  {
    id: '3',
    name: 'Storm Eagles',
    logo: '🌪️',
    color: '#10B981',
    sport: 'Volleyball',
    wins: 3,
    draws: 1,
    losses: 1,
    goalsFor: 85,
    goalsAgainst: 72,
    points: 10,
    roster: ['James Wilson', 'Mark Taylor', 'Luke Anderson']
  },
  {
    id: '4',
    name: 'Ice Wolves',
    logo: '❄️',
    color: '#6366F1',
    sport: 'Volleyball',
    wins: 2,
    draws: 2,
    losses: 1,
    goalsFor: 78,
    goalsAgainst: 75,
    points: 8,
    roster: ['Tom Harris', 'Ben Clark', 'Sam Roberts']
  },
  // Netball Teams
  {
    id: '5',
    name: 'Golden Arrows',
    logo: '🏹',
    color: '#F59E0B',
    sport: 'Netball',
    wins: 4,
    draws: 0,
    losses: 1,
    goalsFor: 95,
    goalsAgainst: 68,
    points: 12,
    roster: ['Sarah Johnson', 'Emma Davis', 'Lisa Brown']
  },
  {
    id: '6',
    name: 'Silver Stars',
    logo: '⭐',
    color: '#8B5CF6',
    sport: 'Netball',
    wins: 3,
    draws: 1,
    losses: 1,
    goalsFor: 82,
    goalsAgainst: 75,
    points: 10,
    roster: ['Maria Garcia', 'Anna Wilson', 'Kate Miller']
  },
  // Tug of War Teams
  {
    id: '7',
    name: 'Power Bulls',
    logo: '🐂',
    color: '#DC2626',
    sport: 'Tug of War',
    wins: 5,
    draws: 0,
    losses: 0,
    goalsFor: 15,
    goalsAgainst: 3,
    points: 15,
    roster: ['Strong Mike', 'Heavy Tom', 'Muscle Joe']
  },
  {
    id: '8',
    name: 'Iron Giants',
    logo: '🏋️',
    color: '#374151',
    sport: 'Tug of War',
    wins: 3,
    draws: 1,
    losses: 1,
    goalsFor: 12,
    goalsAgainst: 8,
    points: 10,
    roster: ['Big Ben', 'Titan Tim', 'Giant Gary']
  },
  // Aerobics Teams
  {
    id: '9',
    name: 'Rhythm Dancers',
    logo: '💃',
    color: '#EC4899',
    sport: 'Aerobics',
    wins: 4,
    draws: 0,
    losses: 1,
    goalsFor: 92,
    goalsAgainst: 85,
    points: 12,
    roster: ['Grace Kelly', 'Rhythm Rose', 'Dance Diana']
  },
  {
    id: '10',
    name: 'Flex Masters',
    logo: '🤸',
    color: '#06B6D4',
    sport: 'Aerobics',
    wins: 3,
    draws: 1,
    losses: 1,
    goalsFor: 88,
    goalsAgainst: 82,
    points: 10,
    roster: ['Flex Felix', 'Stretch Sam', 'Bend Betty']
  }
];

const players: Player[] = [
  {
    id: '1',
    name: 'John Smith',
    photo: '🏃‍♂️',
    team: 'Thunder Hawks',
    position: 'Forward',
    goals: 8,
    assists: 3,
    mvpVotes: 15,
    isFanFavorite: true,
    bio: 'Star striker with incredible pace and finishing ability.'
  },
  {
    id: '2',
    name: 'Alex Brown',
    photo: '⚽',
    team: 'Fire Dragons',
    position: 'Midfielder',
    goals: 5,
    assists: 7,
    mvpVotes: 12,
    isFanFavorite: true,
    bio: 'Creative midfielder with excellent vision and passing.'
  },
  {
    id: '3',
    name: 'James Wilson',
    photo: '🏐',
    team: 'Storm Eagles',
    position: 'Spiker',
    goals: 24,
    assists: 18,
    mvpVotes: 20,
    isFanFavorite: false,
    bio: 'Dynamic spiker with exceptional court vision.'
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    photo: '🥅',
    team: 'Golden Arrows',
    position: 'Goal Shooter',
    goals: 32,
    assists: 12,
    mvpVotes: 18,
    isFanFavorite: true,
    bio: 'Precision shooter with incredible accuracy.'
  },
  {
    id: '5',
    name: 'Grace Kelly',
    photo: '💃',
    team: 'Rhythm Dancers',
    position: 'Lead Dancer',
    goals: 28,
    assists: 15,
    mvpVotes: 22,
    isFanFavorite: true,
    bio: 'Graceful performer with perfect rhythm and technique.'
  }
];

const commentary: CommentaryItem[] = [
  {
    id: '1',
    time: '15\'',
    text: 'GOAL! John Smith opens the scoring with a brilliant strike!',
    type: 'goal'
  },
  {
    id: '2',
    time: '23\'',
    text: 'Yellow card for aggressive tackle',
    type: 'card'
  },
  {
    id: '3',
    time: '34\'',
    text: 'Great save by the goalkeeper!',
    type: 'general'
  }
];

const matches: Match[] = [
  // Pitch 1 - Football
  {
    id: '1',
    sport: 'Football',
    pitch: 'Pitch 1',
    homeTeam: teams[0],
    awayTeam: teams[1],
    homeScore: 2,
    awayScore: 1,
    status: 'Live',
    time: '67\'',
    venue: 'Main Stadium - Pitch 1',
    commentary,
    fanReactions: {
      '🔥': 45,
      '⚡': 32,
      '❤️': 28,
      '🎉': 15
    }
  },
  // Pitch 2 - Volleyball
  {
    id: '2',
    sport: 'Volleyball',
    pitch: 'Pitch 2',
    homeTeam: teams[2],
    awayTeam: teams[3],
    homeScore: 2,
    awayScore: 1,
    status: 'Live',
    time: 'Set 3',
    venue: 'Sports Hall A - Pitch 2',
    commentary: [],
    fanReactions: {
      '🏐': 38,
      '🔥': 29,
      '💪': 22
    }
  },
  // Pitch 3 - Netball
  {
    id: '3',
    sport: 'Netball',
    pitch: 'Pitch 3',
    homeTeam: teams[4],
    awayTeam: teams[5],
    homeScore: 28,
    awayScore: 24,
    status: 'Live',
    time: 'Q3 12:45',
    venue: 'Court B - Pitch 3',
    commentary: [],
    fanReactions: {
      '🥅': 35,
      '⭐': 28,
      '🏹': 20
    }
  },
  // Pitch 5 - Tug of War
  {
    id: '4',
    sport: 'Tug of War',
    pitch: 'Pitch 5',
    homeTeam: teams[6],
    awayTeam: teams[7],
    homeScore: 2,
    awayScore: 1,
    status: 'Live',
    time: 'Round 3',
    venue: 'Field C - Pitch 5',
    commentary: [],
    fanReactions: {
      '💪': 42,
      '🐂': 35,
      '🏋️': 28
    }
  },
  // Scheduled matches
  {
    id: '5',
    sport: 'Aerobics',
    pitch: 'Main Stage',
    homeTeam: teams[8],
    awayTeam: teams[9],
    homeScore: 0,
    awayScore: 0,
    status: 'Scheduled',
    time: '15:30',
    venue: 'Main Stage',
    commentary: [],
    fanReactions: {}
  },
  {
    id: '6',
    sport: 'Football',
    pitch: 'Pitch 1',
    homeTeam: teams[1],
    awayTeam: teams[0],
    homeScore: 0,
    awayScore: 0,
    status: 'Scheduled',
    time: '18:00',
    venue: 'Main Stadium - Pitch 1',
    commentary: [],
    fanReactions: {}
  }
];

const socialPosts: SocialPost[] = [
  {
    id: '1',
    author: 'Sarah M.',
    avatar: '👩‍💼',
    content: 'What an incredible goal by John Smith! Thunder Hawks are on fire! 🔥⚡',
    timestamp: '2 min ago',
    likes: 24,
    comments: 8,
    image: null,
    type: 'text'
  },
  {
    id: '2',
    author: 'Mike Chen',
    avatar: '👨‍💻',
    content: 'The volleyball match is getting intense! Storm Eagles vs Ice Wolves - what a rally! 🏐',
    timestamp: '5 min ago',
    likes: 18,
    comments: 5,
    image: null,
    type: 'text'
  },
  {
    id: '3',
    author: 'Lisa R.',
    avatar: '👩‍⚕️',
    content: 'Just got my free health screening! Amazing initiative by Lira Corporate. Thank you! 💚',
    timestamp: '8 min ago',
    likes: 32,
    comments: 12,
    image: null,
    type: 'text'
  },
  {
    id: '4',
    author: 'David K.',
    avatar: '👨‍🎓',
    content: 'Golden Arrows dominating the netball court! Sarah Johnson is unstoppable! 🏹⭐',
    timestamp: '12 min ago',
    likes: 15,
    comments: 3,
    image: null,
    type: 'text'
  },
  {
    id: '5',
    author: 'Emma W.',
    avatar: '👩‍🎨',
    content: 'The tug of war is EPIC! Power Bulls showing their strength 💪🐂',
    timestamp: '15 min ago',
    likes: 28,
    comments: 9,
    image: null,
    type: 'text'
  }
];

export const mockData: AppData = {
  matches,
  teams,
  players,
  socialPosts,
  fanLeaderboard: [
    {
      id: '1',
      name: 'Sarah Johnson',
      points: 1250,
      badges: ['Super Fan', 'Predictor', 'Quiz Master'],
      avatar: '👩‍💼'
    },
    {
      id: '2',
      name: 'Mike Chen',
      points: 980,
      badges: ['Match Analyst', 'Photo King'],
      avatar: '👨‍💻'
    },
    {
      id: '3',
      name: 'Lisa Rodriguez',
      points: 850,
      badges: ['Team Spirit', 'Wellness Warrior'],
      avatar: '👩‍⚕️'
    }
  ],
  csrStats: {
    peopleScreened: 347,
    donationsCollected: 28500,
    healthChecksCompleted: 156,
    wellnessParticipants: 423
  }
};