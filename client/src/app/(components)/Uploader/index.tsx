"use client";

import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import UploaderItem from "./UploaderItem";
import { PictureDragItem, StoredPicture } from "../components.types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";

type UploaderProps = {
  imageGalleryMaxHeight?: string;
  onUpdate: (images: ImageListType) => void;
  onUpdateStoredPictures?: (images: StoredPicture[]) => void;
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
            convertImageToPictureDragItem(img, dragItems.length - 1 + index)
          ),
      ]);
    }
    console.log("added more than one; ", updatedIndexes);
    setImages(imageList);
    onUpdate(imageList);
  };

  const movePicture = (fromIndex: number, toIndex: number) => {
    setDragItems(
      dragItems.map((item) => {
        if (item.index === toIndex) return { ...item, index: fromIndex };
        if (item.index === fromIndex) return { ...item, index: toIndex };
        return item;
      })
    );
    console.log("updatedItems : ", dragItems);
  };

  const onImageDelete = (index: number) => {
    setDragItems(
      [...dragItems]
        .filter((item) => item.index !== index)
        // make sure indexes are always in sync as we delete by index
        .map((item, index) => ({ ...item, index }))
    );
  };

  const onDeleteAll = () => {
    setDragItems([]);
  };
  // DROP ZONE
  return (
    <>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="url"
      >
        {({ onImageUpload, onImageRemoveAll, isDragging, dragProps }) => (
          <div>
            <div
              onClick={onImageUpload}
              {...dragProps}
              className={`w-full max-w-2xl h-20 mb-4 border-dashed ${
                isDragging ? "bg-blue-500 text-white" : "bg-blue-300"
              } cursor-pointer border-indigo-500 border-2 rounded-md text-blue-600 text-md flex items-center justify-center`}
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
            <DndProvider backend={HTML5Backend}>
              <div
                className={`w-full max-h-[30vh] overflow-y-auto max-w-2xl ${imageGalleryMaxHeightCss}`}
              >
                {dragItems
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
            </DndProvider>
            <button onClick={onImageRemoveAll}></button>
          </div>
        )}
      </ImageUploading>
    </>
  );
}

export default Uploader;
