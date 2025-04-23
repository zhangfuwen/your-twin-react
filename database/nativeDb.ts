import * as SQLite from 'expo-sqlite';
import { TimelineItem } from './db';

  
interface Database {
  insert(item: Omit<TimelineItem, 'id'>): Promise<number>;
  query(whereClause?: string, params?: any[]): Promise<TimelineItem[]>;
  update(id: number, updates: Partial<Omit<TimelineItem, 'id'>>): Promise<void>;
  delete(id: number): Promise<void>;
  initialize(): Promise<void>;
}

export class NativeDatabase implements Database {
  private db: SQLite.SQLiteDatabase;

  constructor() {
    this.db = SQLite.openDatabase('timeline.db');
  }

  async initialize(): Promise<void> {
    console.log('Initializing Native database...');
    await this.db.execAsync([{ sql: 'CREATE TABLE IF NOT EXISTS timelineItems (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, data TEXT, comment TEXT, metaTime TEXT, metaLocation TEXT)', args: [] }], false);

    const countResult = await this.db.getAsync('SELECT COUNT(*) AS count FROM timelineItems', []);
    const count = countResult?.count ?? 0;

    if (count === 0) {
      console.log('Table is empty, inserting example data...');
      const exampleData: Omit<TimelineItem, 'id'>[] = [
        {
          type: 'photo',
          data: 'path/to/photo1.jpg',
          comment: 'Beautiful sunset',
          metaTime: '2023-11-20 18:00',
          metaLocation: 'Beach',
        },
        {
          type: 'text',
          data: 'Just had a great coffee at the new cafe downtown!',
          comment: 'Highly recommend it!',
          metaTime: '2023-11-21 09:30',
          metaLocation: 'Cafe',
        },
        {
          type: 'audio',
          data: 'path/to/audio1.mp3',
          comment: 'Recorded a new song idea',
          metaTime: '2023-11-22 14:45',
          metaLocation: 'Studio',
        },
        {
          type: 'video',
          data: 'path/to/video1.mp4',
          comment: 'Amazing trip to the mountains',
          metaTime: '2023-11-23 11:00',
          metaLocation: 'Mountains',
        },
        {
          type: 'slides',
          data: JSON.stringify(['Slide 1', 'Slide 2', 'Slide 3']),
          comment: 'Presentation slides',
          metaTime: '2023-11-24 16:20',
          metaLocation: 'Office',
        },
        {
          type: 'photo',
          data: 'path/to/photo2.jpg',
          comment: 'Enjoying a sunny day',
          metaTime: '2023-11-24 12:00',
          metaLocation: 'Park',
        },
        {
          type: 'text',
          data: 'Reading a book in the afternoon.',
          comment: 'Enjoying reading time.',
          metaTime: '2023-11-25 14:00',
          metaLocation: 'Home',
        },
      ];

      for (const item of exampleData) {
        await this.insert(item);
      }
      console.log(`Successfully inserted ${exampleData.length} example items.`);
    }
    console.log('Native database initialization finished.');
  }

  async insert(item: Omit<TimelineItem, 'id'>): Promise<number> {
    const { type, data, comment, metaTime, metaLocation } = item;
    const result = await this.db.runAsync('INSERT INTO timelineItems (type, data, comment, metaTime, metaLocation) VALUES (?, ?, ?, ?, ?)', [type, data, comment, metaTime, metaLocation]);
    return result.lastInsertRowId;
  }

  async query(whereClause?: string, params: any[] = []): Promise<TimelineItem[]> {
      const query = `SELECT * FROM timelineItems ${whereClause ? `WHERE ${whereClause}` : ''}`;
      const result = await this.db.getAllAsync(query, params);
    return result as TimelineItem[];
  }

  async update(id: number, updates: Partial<Omit<TimelineItem, 'id'>>): Promise<void> {
      const setClause = Object.keys(updates)
        .map(key => `${key} = ?`)
        .join(', ');
      const values = Object.values(updates);
      await this.db.runAsync(`UPDATE timelineItems SET ${setClause} WHERE id = ?`, [...values, id]);
  }

  async delete(id: number): Promise<void> {
      await this.db.runAsync('DELETE FROM timelineItems WHERE id = ?', [id]);
  }
}