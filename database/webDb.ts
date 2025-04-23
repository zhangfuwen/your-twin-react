import { Database, TimelineItem } from './db';

export class WebDatabase implements Database {
  private data: { [id: number]: TimelineItem } = {};
  private nextId: number = 1;

  async initialize(): Promise<void> {
    this.data = {};
    this.nextId = 1;
    console.log('WebDatabase initialized.');
  }

  async insert(item: Omit<TimelineItem, 'id'>): Promise<number> {
    const id = this.nextId++;
    this.data[id] = { id, ...item };
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
      this.data[id] = { ...this.data[id], ...updates };
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