import { S3Client } from "@aws-sdk/client-s3";

class StorageService {
  bucket?: S3Client;
  constructor() {
    this.bucket = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_ACCESS_KEY_ID as string,
      },
    });
  }
}

export default new StorageService();
