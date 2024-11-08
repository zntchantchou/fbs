import { v4 } from "uuid";
import Header from "@/app/(components)/Header";
import { ChangeEvent, FormEvent, useState } from "react";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => void;
};

function CreateProductModal({
  isOpen,
  onCreate,
  onClose,
}: CreateProductModalProps) {
  const labelClassnames = "block my-1 text-sm font-medium text-gray-700";
  const inputClassnames =
    "block w-full border-gray-400 border-2 rounded-md mb-2 p-2";
  const [formData, setFormData] = useState({
    productId: v4(),
    name: "",
    price: 0,
    stockQuantity: 0,
    rating: 0,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericFields = ["price", "stockQuantity", "rating"];
    setFormData({
      ...formData,
      [name]: numericFields.includes(name) ? parseFloat(value) : value,
    });
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Create new product" />
        <form onSubmit={handleSubmit} className="mt-10">
          {/* PRODUCT NAME */}
          <label htmlFor="productName" className={labelClassnames}>
            Product Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="name"
            onChange={handleChange}
            value={formData.name}
            className={inputClassnames}
          />
          <label htmlFor="productPrice" className={labelClassnames}>
            Price
          </label>
          {/* PRICE */}
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={formData.price}
            className={inputClassnames}
          />
          {/* STOCK QUANTITY */}
          <label htmlFor="stockQuantity" className={labelClassnames}>
            Stock quantity
          </label>
          <input
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            onChange={handleChange}
            value={formData.stockQuantity}
            className={inputClassnames}
          />
          {/* RATING */}
          <label htmlFor="rating" className={labelClassnames}>
            Rating
          </label>
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            onChange={handleChange}
            value={formData.rating}
            className={inputClassnames}
          />
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Create
          </button>
          <button
            type="submit"
            className="ml-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProductModal;
