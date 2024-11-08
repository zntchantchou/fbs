"use client";

import {
  NewProduct,
  useCreateProductMutation,
  useGetProductsQuery,
} from "@/state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import Header from "@/app/(components)/Header";
import Rating from "@/app/(components)/Rating";
import CreateProductModal from "./CreateProductModal";
import ProductIcon from "@/assets/product.png";
import Image from "next/image";

function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: products, isError, isLoading } = useGetProductsQuery();
  const [createProduct] = useCreateProductMutation();
  const handleCreateProduct = async (productData: NewProduct) =>
    await createProduct(productData);

  const productsList = products?.map((product) => {
    const rating = product.rating ? (
      <div className="flex items-center mt-2">
        <Rating rating={product.rating} />
      </div>
    ) : null;
    return (
      <div
        key={product.productId}
        className="border shadow rounded-md p-4 max-w-full w-full mx-auto"
      >
        <div className="flex flex-col items-center">
          <Image height={100} src={ProductIcon} alt="a product" />
          <h3 className="text-lg text-gray-900 font-semibold">
            {product.name}
          </h3>
          <p className="text-gray-800">${product.price.toFixed(2)}</p>
          <div className="text-sm text-gray-600 mt-1">
            Stock: {product.stockQuantity}
          </div>
          {rating}
        </div>
        {/* MODAL */}
        <CreateProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateProduct}
        />
      </div>
    );
  });
  if (isLoading) {
    return <div className="py-4"> Loading... </div>;
  }

  if (isError || !products) {
    console.log(
      "FAILED TO FETCH products",
      process.env.NEXT_PUBLIC_API_BASE_URL
    );
    console.log("FULL ENV = ", process.env);
    return (
      <div className="text-center py-4 text-red-500">
        Failed to fetch products...
      </div>
    );
  }
  return (
    <div className="mx-auto pb-5 w-full">
      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            type="text"
            className="w-full py-2 px-4 rounded bg-white"
            placeholder="Search for a product.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="products" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" />
          Create product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
        {isLoading ? <div>Loading...</div> : productsList}
      </div>
    </div>
  );
}

export default Products;
