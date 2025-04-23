import { Platform } from 'react-native';


export interface TimelineItem {
  id?: number;
  type: string;
  data: any;
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