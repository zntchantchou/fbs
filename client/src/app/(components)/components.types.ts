import { ImageListType } from "react-images-uploading";

export type FormValues = {
  [index: string]: string | number | ImageListType;
};

export interface PictureDragItem {
  index: number;
  id?: string;
  url: string;
  filename: string;
  file?: File;
}

export interface StoredPicture extends PictureDragItem {}
