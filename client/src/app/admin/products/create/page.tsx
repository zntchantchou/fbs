"use client";

import Header from "@/app/(components)/Header";
import Uploader from "@/app/(components)/Uploader";
import { useCreateProductMutation, useGetCategoriesQuery } from "@/state/api";
import { ChangeEvent, FormEvent, useState } from "react";
import { ImageListType } from "react-images-uploading";

type ProductForm = {
  price: number | null;
  name: string | null;
  stockQuantity: number | null;
  pictures: ImageListType | null;
};

const initialForm: ProductForm = {
  price: null,
  name: null,
  stockQuantity: null,
  pictures: null,
};

function CreateProduct() {
  // const [pictures, setPictures] = useState<ImageListType>([]);
  const [formData, setFormData] = useState<ProductForm>(initialForm);
  const [createProduct, createProductResult] = useCreateProductMutation();
  const {
    data: categories,
    error: categoriesError,
    isLoading: isLoadingCategories,
  } = useGetCategoriesQuery();

  const updateImages = (images: ImageListType) => {
    console.log("updateImage ", images);
    // setPictures(images);
    if (images) setFormData({ ...formData, pictures: images } as ProductForm);
  };

  const handleCreateProduct = async (e: FormEvent<HTMLElement>) => {
    console.log("handleCreateProduct ");
    e.preventDefault();
    if (
      !formData.name ||
      !formData.price ||
      !formData.stockQuantity ||
      (formData.pictures && formData?.pictures?.length < 1)
    ) {
      console.log("VALIDATION ERROR: ");
      return;
    }
    const requestData = new FormData();
    if (formData.name) {
      requestData.set("name", formData.name as string);
    }
    if (formData.name) {
      requestData.set("name", formData.name as string);
    }
    requestData.set("price", formData.price?.toString() as string);
    requestData.set(
      "stockQuantity",
      formData.stockQuantity?.toString() as string
    );
    if (formData.pictures) {
      for (const pic of formData.pictures) {
        if (pic.file) {
          const buffer = await pic.file.arrayBuffer();
          const asBlob = new Blob([new Uint8Array(buffer)], {
            type: pic.file.type,
          });
          requestData.append("pictures", asBlob, pic.file.name);
        }
      }
      console.log("REQUEST DATA pic 1: ", requestData.get("pictures"));
      const created = await createProduct(requestData);
      if (created) {
        console.log("Product has been created: ", created);
      }
    }
  };

  const labelClassnames = "block my-3 text-sm font-medium text-gray-700";
  const inputClassnames =
    "block w-full max-w-2xl border-gray-400 border-2 rounded-md mb-4 mt-2 p-2";

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const numericFields = ["price", "stockQuantity"];
    setFormData({
      ...formData,
      [name]: numericFields.includes(name) ? parseFloat(value) : value,
    } as ProductForm);
  };

  return (
    <div className="w-full h-full flex justify-center min-w-[300px]">
      <div className="w-full md:w-3/5 xl:w-2/5 flex flex-col items-center md:flex md:flex-col md:items-center text-start">
        {/* TITLE */}
        {/* FORM */}
        <div className="lg:w-full md:flex-col md:items-center mt-4">
          <Header name="Create a product" />
          {/* PRODUCT NAME */}
          <label htmlFor="productName" className={labelClassnames}>
            Product Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="name"
            onChange={handleChange}
            value={formData?.name || ""}
            className={inputClassnames}
          />
          <label htmlFor="productPrice" className={labelClassnames}>
            Price
          </label>
          {/* PRICE */}
          <input
            type="number"
            name="price"
            min={1}
            placeholder="Price"
            onChange={handleChange}
            value={formData?.price || 0}
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
            min={0}
            onChange={handleChange}
            value={formData?.stockQuantity || 0}
            className={inputClassnames}
          />

          {/* CATEGORY */}
          <label htmlFor="category" className={labelClassnames}>
            Category
          </label>
          <select
            name="category"
            className="bg-blue-200 h-10 rounded px-6"
            onChange={handleChange}
          >
            {categories &&
              categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
          </select>
          {/* PICTURES */}
          <label htmlFor="Pictures" className={labelClassnames}>
            Pictures
          </label>

          {/* DROP ZONE */}
          <Uploader imageGalleryMaxHeight="300px" onUpdate={updateImages} />
          <div className="flex flex-col md:flex-row max-w-2xl">
            <button
              className="py-3 px-6 bg-green-700 text-white rounded hover:bg-green-900"
              onClick={handleCreateProduct}
            >
              Create
            </button>
            <button
              className="mt-2 md:mt-0 md:ml-2 py-3 px-8 bg-red-500 text-white rounded hover:bg-red-700"
              // onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default CreateProduct;
