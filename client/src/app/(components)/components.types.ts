import { ImageListType } from "react-images-uploading";

type SelectItem = {
  label: string;
  value: string;
};
export type FormValues = {
  [index: string]: string | number | ImageListType | SelectItem;
};

export interface PictureDragItem {
  index: number;
  id?: string;
  url: string;
  filename: string;
  file?: File;
}

export interface StoredPicture extends PictureDragItem {}
