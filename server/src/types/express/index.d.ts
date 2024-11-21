import { DecodedIdToken } from "firebase-admin/auth";

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: DecodedIdToken;
      stream?: ReadableStream;
    }
  }
}
