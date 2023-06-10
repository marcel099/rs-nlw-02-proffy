import fs from 'fs';
import path from 'path';

import { uploadConfig } from '@config/upload';

import { StorageProvider } from '../IStorageProvider';

export class LocalStorageProvider implements StorageProvider {
  async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(`${uploadConfig.tmpFolder}/${folder}`, file)
    );

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    const fileName = path.resolve(`${uploadConfig.tmpFolder}/${folder}`, file);

    try {
      await fs.promises.stat(fileName);
    } catch {
      return;
    }

    await fs.promises.unlink(fileName);
  }
}
