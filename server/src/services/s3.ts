import { MetadataEntry, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { createReadStream, readFile } from "fs";
import { Readable } from "stream";

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

  public async uploadFile({
    productId,
    file,
    filename,
  }: {
    productId: string;
    file: Express.Multer.File;
    filename: string;
  }) {
    console.log("FILE AT UPLOAD ", file);
    if (!this.client) throw new Error("[uploadFile] Could not get client");
    const upload = new Upload({
      client: this.client,
      params: {
        Bucket: process.env.AWS_BUCKET,
        Key: productId + "/" + filename,
        Body: createReadStream(file.path),
      },
    });
    upload.on("httpUploadProgress", (progress) => {
      console.log("UPLOADING: ", progress);
    });
    return upload.done();
    // return this.client?.send(
    //   new PutObjectCommand({
    //     Body: file.buffer,
    //     Key: productId + "/" + filename,
    //     Bucket: process.env.AWS_BUCKET,
    //     // ContentLength: file.size ,
    //   })
    // );
  }
}

export default new StorageService();
