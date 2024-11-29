"use client";

import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import UploaderItem from "./UploaderItem";
import { PictureDragItem, StoredPicture } from "../components.types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect, useState } from "react";

type UploaderProps = {
  imageGalleryMaxHeight?: string;
  onUpdate: (images: PictureDragItem[]) => void;
  onDelete?: (images: PictureDragItem) => void;
  pictures?: StoredPicture[];
};

function Uploader({
  imageGalleryMaxHeight,
  onUpdate,
  pictures = [],
}: UploaderProps) {
  const [images, setImages] = useState<ImageListType>([]);

  const convertImageToPictureDragItem = (
    image: ImageType,
    index: number
  ): PictureDragItem => {
    return {
      url: image.url,
      filename: image.file.name,
      id: null,
      index,
      file: image.file,
    };
  };
  const [dragItems, setDragItems] = useState<PictureDragItem[]>(pictures);
  const maxNumber = 15;
  const imageGalleryMaxHeightCss = imageGalleryMaxHeight
    ? `max-h-[${imageGalleryMaxHeight}]`
    : "";

  const onChange = async (
    imageList: ImageListType,
    updatedIndexes: number[]
  ) => {
    if (Array.isArray(updatedIndexes) && !isNaN(updatedIndexes[0])) {
      // add one or more items to the actual list of draggable items
      setDragItems([
        ...dragItems,
        ...imageList
          .slice(-1 * updatedIndexes.length)
          .map((img, index) =>
            convertImageToPictureDragItem(img, dragItems.length + index)
          ),
      ]);
    }
    console.log("added more than one; ", [...dragItems]);
    setImages(imageList);
  };

  useEffect(() => {
    console.log("[Uploader] USE EFFECT ON UPDATE");
    onUpdate(dragItems);
  }, [dragItems, onUpdate]);

  // useEffect(() => {
  //   console.log("[UPLOADER USEFFECT] Pictures : ", pictures);
  //   if (pictures !== dragItems) {
  //     setDragItems(pictures);
  //   }
  // }, [pictures, setDragItems, dragItems]);

  const movePicture = (fromIndex: number, toIndex: number) => {
    console.log("updatedItems BEFORE: ", dragItems);
    setDragItems(
      dragItems.map((item) => {
        if (item.index === toIndex) return { ...item, index: fromIndex };
        if (item.index === fromIndex) return { ...item, index: toIndex };
        return item;
      })
    );
    console.log("updatedItems AFTER: ", dragItems);
  };

  const onImageDelete = (index: number) => {
    setDragItems(
      [...dragItems]
        .filter((item) => item.index !== index)
        .map((item, index) => ({ ...item, index })) // make sure indexes are always in sync as we delete by index
    );
  };

  const onDeleteAll = () => {
    setDragItems([]);
  };
  // DROP ZONE
  return (
    <DndProvider backend={HTML5Backend}>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="url"
      >
        {({ onImageUpload, isDragging, dragProps }) => (
          <div>
            <div
              onClick={onImageUpload}
              {...dragProps}
              className={`w-full max-w-2xl h-20 mb-4 border-dashed ${
                isDragging ? "bg-blue-500 text-white" : "bg-blue-300"
              } cursor-pointer border-indigo-500 hover:bg-blue-400 hover:text-white border-2 rounded-md text-blue-700 text-md flex items-center justify-center`}
            >
              Drop a file here or click to browse
            </div>
            <button
              type="submit"
              className="mb-4 py-2 px-4 bg-gray-400 text-white rounded hover:bg-gray-600"
              onClick={onDeleteAll}
            >
              Remove all
            </button>

            <div
              className={`w-full max-h-[30vh] overflow-y-auto max-w-2xl py-2 ${imageGalleryMaxHeightCss}`}
            >
              {dragItems.length > 0 &&
                [...dragItems]
                  .sort((a, b) => a.index - b.index)
                  .map((item, index) => {
                    return (
                      <UploaderItem
                        key={index}
                        url={item.url}
                        filename={item.filename}
                        index={index}
                        onDelete={onImageDelete}
                        moveCard={movePicture}
                      />
                    );
                  })}
            </div>
          </div>
        )}
      </ImageUploading>
    </DndProvider>
  );
}

export default Uploader;
