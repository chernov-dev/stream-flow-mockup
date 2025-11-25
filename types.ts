export enum ViewState {
  PROFILE_SELECT = 'PROFILE_SELECT',
  DASHBOARD = 'DASHBOARD',
  LIVE_TV = 'LIVE_TV',
  MOVIES = 'MOVIES',
  SERIES = 'SERIES',
  EPG = 'EPG',
  SETTINGS = 'SETTINGS',
  DETAILS = 'DETAILS',
  PLAYER = 'PLAYER',
}

export interface Profile {
  id: string;
  name: string;
  avatar: string; // URL or color code
  isKid: boolean;
}

export interface Channel {
  id: string;
  name: string;
  category: string;
  logo: string;
  currentProgram?: string;
  progress?: number;
}

export interface Episode {
  id: string;
  number: number;
  title: string;
  duration: string;
  description: string;
  thumbnail?: string;
}

export interface Season {
  id: string;
  number: number;
  episodes: Episode[];
}

export interface MediaItem {
  id: string;
  title: string;
  cover: string;
  backdrop?: string;
  rating: number;
  year: number;
  description: string;
  category: string; // Action, Drama, etc.
  duration?: string;
  cast?: string[];
  director?: string;
  seasons?: Season[];
}

export interface EPGItem {
  id: string;
  channelId: string;
  title: string;
  start: string; // HH:mm
  end: string;   // HH:mm
  description: string;
}

export interface SettingsConfig {
  streamFormat: 'HLS' | 'MPEG-TS';
  bufferSize: number;
  parentalControl: boolean;
}