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
      className="mb-4 border-gray-400 border-2 rounded-md p-2 w-full h-32 md:max-w-2xl flex"
    >
      <Image
        src={src}
        width={70}
        height={70}
        alt="uploaded image of the product"
      />
      {/* image controls */}
      <div className="w-full h-full px-3">
        <div className="w-full h-1/3 flex justify-between items-center px-2">
          <p className="max-w-2xl text-gray-600">
            Picture {index} : {filename}
          </p>
        </div>
        <div className="w-full h-2/3 flex items-center justify-start px-2 mr-6">
          {onUpdate && (
            <button
              type="submit"
              className="mb-4 mr-2 py-2 px-6 h-10 flex items-center justify-center bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={() => onUpdate(index)}
            >
              Update
            </button>
          )}
          <button
            type="submit"
            className="mb-4 py-4 px-6 h-10 flex items-center justify-center bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => (onRemove ? onRemove(index) : () => {})}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploaderItem;
