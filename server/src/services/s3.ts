import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { createReadStream } from "fs";

class StorageService {
  public client?: S3Client;

  constructor() {
    this.client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
    });
  }

  public async uploadFile(file: Express.Multer.File) {
    if (!this.client) throw new Error("[uploadFile] Could not get client");
    const upload = new Upload({
      client: this.client,
      params: {
        Bucket: process.env.AWS_BUCKET,
        Key: file.originalname,
        Body: createReadStream(file.path),
      },
    });
    return upload.done();
  }
}

export default new StorageService();
