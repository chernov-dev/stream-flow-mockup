import { Profile, Channel, MediaItem, EPGItem } from './types';

export const MOCK_PROFILES: Profile[] = [
  { id: '1', name: 'Dad', avatar: 'https://picsum.photos/id/1005/200/200', isKid: false },
  { id: '2', name: 'Mom', avatar: 'https://picsum.photos/id/1011/200/200', isKid: false },
  { id: '3', name: 'Kids', avatar: 'https://picsum.photos/id/1025/200/200', isKid: true },
];

export const MOCK_CHANNELS: Channel[] = [
  { id: 'c1', name: 'BBC News', category: 'News', logo: 'https://picsum.photos/id/20/50/50', currentProgram: 'World News Today', progress: 45 },
  { id: 'c2', name: 'Discovery', category: 'Documentary', logo: 'https://picsum.photos/id/25/50/50', currentProgram: 'Planet Earth III', progress: 10 },
  { id: 'c3', name: 'HBO', category: 'Movies', logo: 'https://picsum.photos/id/30/50/50', currentProgram: 'The Last of Us', progress: 80 },
  { id: 'c4', name: 'ESPN', category: 'Sports', logo: 'https://picsum.photos/id/35/50/50', currentProgram: 'NBA Live: Lakers vs Warriors', progress: 95 },
  { id: 'c5', name: 'Cartoon Network', category: 'Kids', logo: 'https://picsum.photos/id/40/50/50', currentProgram: 'Adventure Time', progress: 30 },
  { id: 'c6', name: 'CNN', category: 'News', logo: 'https://picsum.photos/id/45/50/50', currentProgram: 'The Situation Room', progress: 60 },
];

export const MOCK_MOVIES: MediaItem[] = [
  { id: 'm1', title: 'Inception', cover: 'https://picsum.photos/seed/inception/300/450', rating: 4.8, year: 2010, category: 'Sci-Fi', description: 'A thief who steals corporate secrets through the use of dream-sharing technology.' },
  { id: 'm2', title: 'The Dark Knight', cover: 'https://picsum.photos/seed/batman/300/450', rating: 4.9, year: 2008, category: 'Action', description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham.' },
  { id: 'm3', title: 'Interstellar', cover: 'https://picsum.photos/seed/interstellar/300/450', rating: 4.7, year: 2014, category: 'Sci-Fi', description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.' },
  { id: 'm4', title: 'Lion King', cover: 'https://picsum.photos/seed/lion/300/450', rating: 4.5, year: 1994, category: 'Animation', description: 'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.' },
  { id: 'm5', title: 'Pulp Fiction', cover: 'https://picsum.photos/seed/pulp/300/450', rating: 4.8, year: 1994, category: 'Crime', description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine.' },
];

export const MOCK_SERIES: MediaItem[] = [
  { id: 's1', title: 'Breaking Bad', cover: 'https://picsum.photos/seed/breaking/300/450', rating: 5.0, year: 2008, category: 'Drama', description: 'A high school chemistry teacher turned methamphetamine manufacturing drug dealer.' },
  { id: 's2', title: 'Stranger Things', cover: 'https://picsum.photos/seed/stranger/300/450', rating: 4.6, year: 2016, category: 'Sci-Fi', description: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.' },
];

export const MOCK_EPG: EPGItem[] = [
  { id: 'e1', channelId: 'c1', title: 'Morning News', start: '08:00', end: '09:00', description: 'Daily morning updates.' },
  { id: 'e2', channelId: 'c1', title: 'Business Daily', start: '09:00', end: '10:00', description: 'Market updates and analysis.' },
  { id: 'e3', channelId: 'c1', title: 'Weather Report', start: '10:00', end: '10:15', description: 'Global weather forecast.' },
  { id: 'e4', channelId: 'c1', title: 'Tech Talk', start: '10:15', end: '11:00', description: 'Latest in technology.' },
  { id: 'e5', channelId: 'c3', title: 'Movie: The Matrix', start: '08:00', end: '10:30', description: 'A computer hacker learns about the true nature of his reality.' },
  { id: 'e6', channelId: 'c3', title: 'Behind the Scenes', start: '10:30', end: '11:00', description: 'Making of popular movies.' },
];