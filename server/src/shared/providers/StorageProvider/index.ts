import { LocalStorageProvider } from './implementations/LocalStorageProvider';
import { StorageProvider } from './IStorageProvider';

export const storageProvider: StorageProvider = new LocalStorageProvider();
