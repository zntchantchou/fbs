import { DeleteIcon, Trash2 } from "lucide-react";
import Image from "next/image";

type Props = {
  index: number;
  filename: string;
  src: string;
  onRemove: (index: number) => void;
  onUpdate?: (index: number) => void;
};

function UploaderItem({ index, filename, src, onUpdate, onRemove }: Props) {
  return (
    <div
      key={index}
      className="mb-4 border-gray-300 border-2 rounded-md p-2 flex justify-center h-32 md:max-w-2xl relative"
    >
      {/* DELETE IMAGE BUTTON */}
      <div
        className="absolute top-2 right-2 rounded-full h-10 w-10 flex items-center justify-center"
        aria-label="delete the image"
        onClick={() => onRemove(index)}
      >
        <Trash2 className="hover:text-gray-400 cursor-pointer" />
      </div>
      <div className="w-3/4 flex justify-center ">
        <Image
          src={src}
          width={100}
          height={150}
          alt="uploaded image of the product"
        />
        {/* image controls */}
        <div className="h-full w-full flex pl-4 items-center">
          <p className="max-w-2xl text-gray-600">
            Picture {index} : {filename}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UploaderItem;
