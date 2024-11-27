"use client";

import { useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import UploaderItem from "./UploaderItem";
import { StoredPicture } from "../components.types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
type UploaderProps = {
  imageGalleryMaxHeight?: string;
  onUpdate: (images: ImageListType) => void;
  onUpdateStoredPictures?: (images: StoredPicture[]) => void;
  pictures?: StoredPicture[];
};

// CREATE A COMMON TYPE

function Uploader({
  imageGalleryMaxHeight,
  onUpdate,
  onUpdateStoredPictures,
  pictures,
}: UploaderProps) {
  const [images, setImages] = useState<ImageListType>([]);
  const [existingImages, setExistingImages] =
    useState<StoredPicture[]>(pictures);
  const maxNumber = 5;
  const imageGalleryMaxHeightCss = imageGalleryMaxHeight
    ? `max-h-[${imageGalleryMaxHeight}]`
    : "";
  const filteredExistingImages =
    existingImages && existingImages.length
      ? existingImages.filter((img) => !img.delete)
      : [];
  const onChange = async (imageList: ImageListType) => {
    console.log("ONCHANGE --------- \n");
    setImages(imageList);
    onUpdate(imageList);
  };

  const onRemoveExistingImage = (index: number) => {
    console.log("On remove existing ", index);
    const updatedImages = existingImages.map((img) => {
      if (img.index === index) return { ...img, delete: true };
      return img;
    });
    setExistingImages(updatedImages);
    // hoist deleted images to parent for deletion
    onUpdateStoredPictures(updatedImages);
  };

  // const uploadedImages = (images: ImageListType) => {
  //   return images.map((image, index) => {
  //     return image.dataURL ? (
  //       <div key={index}>
  //         <Image src={image.dataURL} alt="uploaded image of the product" />
  //       </div>
  //     ) : null;
  //   });
  // };
  // useEffect(() => {
  //   if(pictures && pictures.length > 0 && existingImages.length === 0) {

  //   }
  // }, [pictures]);

  // DROP ZONE
  return (
    <>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="dataString"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageRemove,
          onImageUpdate,
          isDragging,
          dragProps,
        }) => (
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
              onClick={onImageRemoveAll}
            >
              Remove all
            </button>
            <DndProvider backend={HTML5Backend}>
              <div
                className={`w-full overflow-y-auto max-w-2xl ${imageGalleryMaxHeightCss}`}
              >
                {/* EXISTING (STORED) IMAGES */}
                {filteredExistingImages &&
                  filteredExistingImages.length > 0 &&
                  filteredExistingImages.map((p) => (
                    <UploaderItem
                      onRemove={onRemoveExistingImage}
                      src={p.url}
                      key={p.filename}
                      filename={p.filename}
                      index={p.index}
                    />
                  ))}
                {/* NEWLY ADDED IMAGES */}
                {/* Always sorted by chronological order. Needs another array with correct indexes */}
                {imageList.map((image, index) => {
                  return (
                    <UploaderItem
                      src={image.dataString}
                      filename={image.file.name}
                      index={index + filteredExistingImages.length}
                      onRemove={onImageRemove}
                      onUpdate={onImageUpdate}
                      key={image.file.name}
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
