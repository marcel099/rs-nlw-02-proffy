import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import fs from 'fs';
import mime from 'mime';
import path from 'path';

import { uploadConfig } from '@config/upload';

import { IStorageProvider } from '../IStorageProvider';

export class S3StorageProvider implements IStorageProvider {
  constructor() {
    this.client = new S3Client({
      region: process.env.AWS_BUCKET_REGION,
    });
  }

  private client: S3Client;

  async save(file: string, folder: string): Promise<string> {
    const filePath = path.resolve(uploadConfig.tmpFolder, file);

    const fileContent = await fs.promises.readFile(filePath);
    const ContentType = mime.getType(filePath);

    await this.client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: `${folder}/${file}`,
        ACL: 'public-read',
        Body: fileContent,
        ContentType: ContentType !== null ? ContentType : undefined,
      })
    );

    await fs.promises.unlink(filePath);

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: `${folder}/${file}`,
      })
    );
  }
}
