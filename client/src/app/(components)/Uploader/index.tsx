"use client";

import Image from "next/image";
import { useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";

type UploaderProps = { imageGalleryMaxHeight?: string };

function Uploader({ imageGalleryMaxHeight }: UploaderProps) {
  const [images, setImages] = useState<ImageListType>([]);

  const maxNumber = 5;
  const imageGalleryMaxHeightCss = imageGalleryMaxHeight
    ? `max-h-[${imageGalleryMaxHeight}]`
    : "";

  const onChange = async (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    console.log("ONCHANGE --------- \n");
    for (const img of imageList) {
      console.log("ArrayBuffer \n", img.file?.arrayBuffer());
      const AB = await img.file?.arrayBuffer();
    }
    setImages(imageList);
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
            <div
              className={`w-full overflow-y-auto bg-slate-50 max-w-2xl ${imageGalleryMaxHeightCss}`}
            >
              {imageList.map((image, index) => {
                return image.dataString ? (
                  <div
                    key={index}
                    className="mb-4 border-gray-400 border-2 rounded-md p-2 w-full h-32 md:max-w-2xl flex"
                  >
                    <Image
                      src={image.dataString}
                      width={70}
                      height={70}
                      alt="uploaded image of the product"
                    />
                    {/* image controls */}
                    <div className="w-full h-full px-3">
                      <div className="w-full h-1/3 flex justify-between items-center px-2">
                        <p className="max-w-2xl text-gray-600">
                          Picture {index} : {image.file?.name}
                        </p>
                      </div>
                      <div className="w-full h-2/3 flex items-center justify-start px-2 mr-6">
                        <button
                          type="submit"
                          className="mb-4 mr-2 py-2 px-6 h-10 flex items-center justify-center bg-blue-500 text-white rounded hover:bg-blue-700"
                          onClick={() => onImageUpdate(index)}
                        >
                          Update
                        </button>
                        <button
                          type="submit"
                          className="mb-4 py-4 px-6 h-10 flex items-center justify-center bg-red-500 text-white rounded hover:bg-red-700"
                          onClick={() => onImageRemove(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
            <button onClick={onImageRemoveAll}></button>
          </div>
        )}
      </ImageUploading>
    </>
  );
}

export default Uploader;
