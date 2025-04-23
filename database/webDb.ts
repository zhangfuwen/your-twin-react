import { Database, TimelineItem } from './db';

export class WebDatabase implements Database {
  private data: { [id: number]: TimelineItem } = {};
  private nextId: number = 1;

  private insertFakeData(): void {
    const now = Date.now();
    const fakeData: Omit<TimelineItem, 'id'>[] = [
      {
        timestamp: now,
        text: 'This is the first fake timeline item.',
      },
      {
        type: 'event',
        data: { title: 'Meeting with John', description: 'Discuss project updates' },
        comment: 'Met with John to discuss project updates. Things are progressing well.',
        metaTime: now - 3600000, // 1 hour ago
        metaLocation: 'Office',
      },
      {
        type: 'thought',
        data: { content: 'Idea for a new feature' },
        comment: 'Had an idea for a new feature while brainstorming. Need to explore this further.',
        metaTime: now - 7200000, // 2 hours ago
        metaLocation: 'Home',
      },
    ];

    fakeData.forEach(item => {
      const { type, data, comment, metaTime, metaLocation } = item;
      this.insert({ type, data, comment, metaTime, metaLocation });
    });
  }

  async initialize(): Promise<void> {
    this.data = {};
    this.nextId = 1;
    console.log('WebDatabase initialized.');
    this.insertFakeData();
  }

  async insert(item: Omit<TimelineItem, 'id'>): Promise<number> {
    const id = this.nextId++;
    this.data[id] = {
      id,
      type: item.type,
      data: item.data,
      comment: item.comment,
      metaTime: item.metaTime,
      metaLocation: item.metaLocation,
    };
    return id;
  }
  async query(condition: Partial<TimelineItem> = {}): Promise<TimelineItem[]> {
    return Object.values(this.data).filter(item => {
      return Object.keys(condition).every(key => {
        return item[key as keyof TimelineItem] === condition[key as keyof TimelineItem];
      });
    });
  }

  async update(id: number, updates: Partial<Omit<TimelineItem, 'id'>>): Promise<void> {
    if (this.data[id]) {
      this.data[id] = {
        ...this.data[id],
        type: updates.type !== undefined ? updates.type : this.data[id].type,
        data: updates.data !== undefined ? updates.data : this.data[id].data,
        comment: updates.comment !== undefined ? updates.comment : this.data[id].comment,
        metaTime: updates.metaTime !== undefined ? updates.metaTime : this.data[id].metaTime,
        metaLocation: updates.metaLocation !== undefined ? updates.metaLocation : this.data[id].metaLocation,
      }
    } else {
        throw new Error(`Item with id ${id} not found.`);
    }
  }

  async delete(id: number): Promise<void> {
    if (this.data[id]) {
      delete this.data[id];
    } else {
        throw new Error(`Item with id ${id} not found.`);
    }
  }
}