import { Database, TimelineItem, VideoData, AudioData, PhotoData, TextData, SlidesData } from './db';

export class WebDatabase implements Database {
  private data: { [id: number]: TimelineItem } = {};
  private nextId: number = 1;

  private insertFakeData(): void {
    const now = new Date().toLocaleDateString();
    const fakeData: TimelineItem[] = [
      {        
        type: 'video',
        data: { url: 'https://www.example.com/video1.mp4' } as VideoData,
        comment: 'Cool video!',
        metaTime: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 2).toLocaleDateString(), // 2 days ago
        metaLocation: 'Home',
      },
      {
        type: 'audio',
        data: { url: 'https://www.example.com/audio1.mp3' } as AudioData,
        comment: 'Nice song!',
        metaTime: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 1).toLocaleDateString(), // 1 day ago
        metaLocation: 'Car',
      },
      {
        type: 'photo',
        data: { url: 'https://www.example.com/photo1.jpg' } as PhotoData,
        comment: 'Beautiful landscape!',
        metaTime: now,
        metaLocation: 'Park',
      },
       {
        type: 'text',
        data: { content: 'This is a text post.' } as TextData,
        comment: 'My thoughts for today.',        
        metaTime: new Date(new Date().getTime() - 1000 * 60 * 30).toLocaleDateString(), // 30 minutes ago
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
        } as SlidesData,
        comment: 'Presentation slides.',
        metaTime: new Date(new Date().getTime() - 1000 * 60 * 60 * 2).toLocaleDateString(), // 2 hours ago
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