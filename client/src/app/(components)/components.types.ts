import { ImageListType } from "react-images-uploading";

export type FormValues = {
  [index: string]: string | number | ImageListType;
};
