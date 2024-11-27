import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { PictureDragItem } from "@/app/(components)/components.types";

type Props = {
  pictureId: string;
  index: number;
  filename: string;
  src: string;
  onRemove: (index: number) => void;
  moveCard?: (dragIndex: number, hoverIndex) => void;
};
const DRAG_ITEM_TYPE = "picture";

function UploaderItem({ index, filename, src, moveCard, onRemove }: Props) {
  const dragItemRef = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: DRAG_ITEM_TYPE,
    item: { filename, index, src },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop<PictureDragItem, void>({
    accept: DRAG_ITEM_TYPE,

    hover({ filename: fn }, monitor) {
      if (!dragItemRef.current) {
        console.log("NO REF");
        return;
      }
      const item = monitor.getItem();
      console.log("[hover] item ", monitor.getItem());
      console.log("[hover] filename of dragged?  ", fn);
      console.log("[hover] filename : ", filename);
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return; // prevent same spot drop...
      const hoverBoundingRect = dragItemRef.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset(); // mouse position
      const marginToTop = clientOffset.y - hoverBoundingRect.top;
      // move only if over item above by > 50%
      if (dragIndex > hoverIndex && marginToTop > hoverMiddleY) return;
      // move only if over item below by > 50%
      if (dragIndex < hoverIndex && marginToTop < hoverMiddleY) return;
    },
    drop(droppedItem, _) {
      console.log("JUST DROPPED filename: ", filename);
      console.log("JUST DROPPED at index: ", index);
      console.log("JUST DROPPED from initial index: ", droppedItem.index);
      if (index !== droppedItem.index) moveCard(index, droppedItem.index);
    },
  });
  drag(drop(dragItemRef));
  return (
    <div
      key={index}
      ref={dragItemRef}
      // data-handler-id={handlerId}
      className="mb-4 border-gray-300 bg-blue-200 border-2 rounded-md p-2 flex justify-center h-32 md:max-w-2xl relative"
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
