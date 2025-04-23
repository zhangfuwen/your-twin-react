import { Platform } from 'react-native';

export interface VideoData {
  url: string;
}

export interface AudioData {
  url: string;
}

export interface PhotoData {
  url: string;
}

export interface TextData {
  content: string;
}

export interface SlidesData {
  urls: string[];
}

export type TimelineItemData = VideoData | AudioData | PhotoData | TextData | SlidesData;

export interface TimelineItem {
  id?: number;
  type: 'video' | 'audio' | 'photo' | 'text' | 'slides';
  data: TimelineItemData;
  comment?: string;
  metaTime?: Date;
  metaLocation?: string;
}  

export interface Database  {
  
  initialize(): Promise<void>;
  insert(item: any): Promise<number>;
  query(sql: string, params?: any[]): Promise<any[]>;
  update(item: any): Promise<void>;
  delete(id: number): Promise<void>;
}
let db: Database;

if (Platform.OS !== 'web') {

  const NativeDatabaseModule = require('./nativeDb');
  const NativeDatabase = NativeDatabaseModule.NativeDatabase

  db = new NativeDatabase();

} else {

  const WebDatabaseModule = require('./webDb');
  const WebDatabase = WebDatabaseModule.WebDatabase

  db = new WebDatabase()
}



export { db };