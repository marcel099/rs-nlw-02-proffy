import { LocalStorageProvider } from './implementations/LocalStorageProvider';

export interface StorageProvider {
  save(file: string, folder: string): Promise<string>;
  delete(file: string, folder: string): Promise<void>;
}

export const storageProvider = new LocalStorageProvider();
