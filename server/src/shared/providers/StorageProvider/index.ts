import { LocalStorageProvider } from './implementations/LocalStorageProvider';
import { S3StorageProvider } from './implementations/S3StorageProvider';
import { IStorageProvider } from './IStorageProvider';

const DiskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

const disk = process.env.DISK as 'local' | 's3';

const ChosenDiskStorage = DiskStorage[disk];

export const storageProvider: IStorageProvider = new ChosenDiskStorage();
