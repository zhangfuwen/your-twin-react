import { Database, TimelineItem } from './db';

export class WebDatabase implements Database {
  private data: { [id: number]: TimelineItem } = {};
  private nextId: number = 1;

  private insertFakeData(): void {
    const now = new Date();
    const fakeData: TimelineItem[] = [
      {
        type: 'video',
        data: { url: 'https://www.example.com/video1.mp4' },
        comment: 'Cool video!',
        metaTime: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        metaLocation: 'Home',
      },
      {
        type: 'audio',
        data: { url: 'https://www.example.com/audio1.mp3' },
        comment: 'Nice song!',
        metaTime: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
        metaLocation: 'Car',
      },
      {
        type: 'photo',
        data: { url: 'https://www.example.com/photo1.jpg' },
        comment: 'Beautiful landscape!',
        metaTime: now, // now
        metaLocation: 'Park',
      },
       {
        type: 'text',
        data: { content: 'This is a text post.' },
        comment: 'My thoughts for today.',
        metaTime: new Date(now.getTime() - 1000 * 60 * 30), // 30 minutes ago
        metaLocation: 'Office',
      },
      {
        type: 'slides',
        data: {
          urls: [
            'https://www.example.com/slide1.jpg',
            'https://www.example.com/slide2.jpg',
            'https://www.example.com/slide3.jpg',
          ],
        },
        comment: 'Presentation slides.',
        metaTime: new Date(now.getTime() - 1000 * 60 * 60 * 2), // 2 hours ago
        metaLocation: 'Conference Room',
      },
    ];

    fakeData.forEach(item => {
      this.insert(item);
    });
  }

  async initialize(): Promise<void> {
    this.data = {};
    this.nextId = 1;
    console.log('WebDatabase initialized.');
    this.insertFakeData();
  }

  async insert(item: TimelineItem): Promise<number> {
    const id = this.nextId++;
    this.data[id] = {
      id,
      ...item
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