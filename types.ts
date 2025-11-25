export enum ViewState {
  PROFILE_SELECT = 'PROFILE_SELECT',
  DASHBOARD = 'DASHBOARD',
  LIVE_TV = 'LIVE_TV',
  MOVIES = 'MOVIES',
  SERIES = 'SERIES',
  EPG = 'EPG',
  SETTINGS = 'SETTINGS',
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

export interface MediaItem {
  id: string;
  title: string;
  cover: string;
  rating: number;
  year: number;
  description: string;
  category: string; // Action, Drama, etc.
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