import { ImageListType } from "react-images-uploading";

export type FormValues = {
  [index: string]: string | number | ImageListType;
};

export type StoredPicture = {
  url: string;
  filename: string;
  index: number;
  delete?: boolean;
};
