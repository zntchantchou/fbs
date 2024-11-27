import { X } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { PictureDragItem } from "@/app/(components)/components.types";

type Props = {
  id?: string;
  index: number;
  filename: string;
  url: string;
  onDelete: (index: number) => void;
  moveCard?: (fromIndex: number, toIndex) => void;
};
const DRAG_ITEM_TYPE = "picture";

function UploaderItem({ index, filename, url, moveCard, onDelete }: Props) {
  const dragItemRef = useRef<HTMLDivElement>(null);
  const [_, drag] = useDrag({
    type: DRAG_ITEM_TYPE,
    item: { filename, index, url },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [__, drop] = useDrop<PictureDragItem, void>({
    accept: DRAG_ITEM_TYPE,
    drop(droppedItem, _) {
      if (index !== droppedItem.index) {
        moveCard(droppedItem.index, index);
      }
    },
  });
  drag(drop(dragItemRef));
  return (
    <div
      key={index}
      ref={dragItemRef}
      className="mb-4 cursor-move border-gray-300 bg-gray-200 hover:bg-gray-300 border-2 rounded-md p-2 flex justify-center h-20 md:max-w-2xl relative"
    >
      <div
        className="absolute top-2 right-2 rounded-full h-10 w-10 flex items-center justify-center"
        aria-label="delete the image"
        onClick={() => onDelete(index)}
      >
        {/* DELETE IMAGE ICON */}
        <X className="hover:text-gray-400 cursor-pointer" height={16} />
      </div>
      <div className=" h-full flex items-center bold text-white p-1 w-16">
        <div className="h-[2.5rem] w-[2.5rem] rounded-full bg-slate-400 text-bold text-lg flex items-center justify-center">
          {index + 1}
        </div>
      </div>{" "}
      <div className="w-3/4 flex justify-center ">
        <Image
          src={url}
          width={100}
          height={150}
          alt="uploaded image of the product"
        />
        <div className="h-full w-full flex pl-4 justify-end items-center ">
          <span className="font-bold mr-2">file: </span>
          <p className="max-w-2xl text-gray-600">
            {filename.slice(0, 26)} {filename.length > 30 && "..."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UploaderItem;
