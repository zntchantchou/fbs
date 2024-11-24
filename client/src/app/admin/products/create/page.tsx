"use client";

import { FormValues } from "@/app/(components)/components.types";
import Header from "@/app/(components)/Header";
import Input from "@/app/(components)/forms/Input/Input";
import TextArea from "@/app/(components)/forms/TextArea/TextArea";
import Uploader from "@/app/(components)/Uploader";
import { useCreateProductMutation, useGetCategoriesQuery } from "@/state/api";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ImageListType } from "react-images-uploading";
import ValidationError from "@/app/(components)/forms/ValidationError/ValidationError";

interface ProductForm extends FormValues {
  price: number;
  name: string;
  stockQuantity: number;
  pictures: ImageListType;
  category: string;
  brand: string;
  description: string;
  model: string;
}

const initialFormValues: ProductForm = {
  price: 0,
  name: "",
  stockQuantity: 0,
  pictures: [],
  category: "4 strings",
  brand: "",
  description: "",
  model: "",
};

function CreateProduct() {
  const [pictures, setPictures] = useState<ImageListType>([]);
  const labelClassnames = "block my-2 text-sm font-medium text-gray-700";
  const [createProduct, _] = useCreateProductMutation();
  const { register, handleSubmit, formState } = useForm<ProductForm>({
    defaultValues: initialFormValues,
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<ProductForm> = (data) => {
    console.log("[onSubmit] DATA: \n", data);
  };

  const {
    data: categories,
    error: categoriesError,
    isLoading: isLoadingCategories,
  } = useGetCategoriesQuery();

  useEffect(() => {
    console.log("FORMSTATE CHANGED ", formState);
    console.log("FORMSTATE CHANGED isValid", formState.isValid);
    console.log("FORMSTATE CHANGED submitCount", formState.submitCount);
    console.log("FORMSTATE CHANGED errors", formState.errors);
  }, [formState]);

  // const handleReset = () => {
  //   setFormData(initialForm);
  // };

  const updateImages = (images: ImageListType) => {
    console.log("updateImage ", images);
    setPictures(images);
  };

  // const handleCreateProduct = async (e: FormEvent<HTMLElement>) => {
  //   console.log("handleCreateProduct ");
  //   e.preventDefault();
  //   if (
  //     !formData.name ||
  //     !formData.price ||
  //     !formData.stockQuantity ||
  //     (formData.pictures && formData?.pictures?.length < 1) ||
  //     !formData.category ||
  //     !formData.description ||
  //     !formData.model ||
  //     !formData.brand
  //   ) {
  //     console.error("VALIDATION ERROR: ");
  //     return;
  //   }
  //   const requestData = new FormData();

  //   requestData.set("name", formData.name as string);
  //   requestData.set("price", formData.price?.toString() as string);
  //   requestData.set("description", formData.description as string);
  //   requestData.set("model", formData.model as string);
  //   requestData.set("brand", formData.brand as string);
  //   requestData.set(
  //     "stockQuantity",
  //     formData.stockQuantity?.toString() as string
  //   );
  //   requestData.set("category", formData.category as string);
  //   if (formData.pictures) {
  //     for (const pic of formData.pictures) {
  //       if (pic.file) {
  //         const buffer = await pic.file.arrayBuffer();
  //         const asBlob = new Blob([new Uint8Array(buffer)], {
  //           type: pic.file.type,
  //         });
  //         requestData.append("pictures", asBlob, pic.file.name);
  //       }
  //     }
  //     console.log("REQUEST DATA pic 1: ", requestData.get("pictures"));
  //     const created = await createProduct(requestData);
  //     if (created) {
  //       console.log("Product has been created: ", created);
  //     }
  //   }
  // };

  return (
    <div className="w-full h-full flex justify-center min-w-[300px]">
      <div className="w-full md:w-3/5 xl:w-2/5 flex flex-col items-center md:flex md:flex-col md:items-center text-start">
        {/* TITLE */}
        {/* FORM */}
        <form
          className="w-5/6 lg:w-full md:flex-col md:items-center mt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Header name="Create a product" />
          {/* PRODUCT NAME */}
          <Input
            errors={formState.errors}
            register={register}
            registerOptions={{ required: true, minLength: 3 }}
            type="text"
            name="name"
            label="name"
            placeholder="name"
          />

          <Input
            errors={formState.errors}
            register={register}
            registerOptions={{ required: true, minLength: 2 }}
            type="text"
            name="brand"
            label="brand"
            placeholder="brand"
          />
          {/* MODEL */}
          <Input
            errors={formState.errors}
            register={register}
            registerOptions={{ required: true, minLength: 1 }}
            type="text"
            name="model"
            label="model"
            placeholder="model"
          />
          {/* DESCRIPTION */}
          <TextArea
            errors={formState.errors}
            register={register}
            registerOptions={{ required: true, minLength: 10 }}
            rows={4}
            name="description"
            label="description"
            placeholder="description"
          />
          {/* PRICE */}
          <Input
            errors={formState.errors}
            register={register}
            registerOptions={{ required: true, min: 10 }}
            type="number"
            name="price"
            label="price"
            placeholder="price"
          />
          {/* STOCK QUANTITY */}
          <Input
            errors={formState.errors}
            register={register}
            registerOptions={{ required: true, min: 10 }}
            type="number"
            name="stockQuantity"
            label="Stock quantity"
            placeholder="Stock quantity"
          />

          <label htmlFor="category" className={labelClassnames}>
            Category
          </label>
          <select
            className="bg-blue-200 h-10 rounded px-6 w-full md:max-w-32"
            {...register("category", { required: true })}
          >
            {categories &&
              categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
          </select>
          <ValidationError
            fieldName="category"
            errors={formState.errors}
            options={{ required: true }}
          />
          {/* PICTURES */}
          <label htmlFor="Pictures" className={labelClassnames}>
            Pictures
          </label>
          {/* DROP ZONE */}
          <Uploader imageGalleryMaxHeight="200px" onUpdate={updateImages} />
          {pictures.length < 1 && formState.isSubmitted && (
            <ValidationError
              fieldName="pictures"
              label="Please upload at least one picture"
            />
          )}
          <div className="flex flex-col md:flex-row max-w-2xl">
            <button className="py-3 px-6 bg-green-700 text-white rounded hover:bg-green-900">
              Create
            </button>
            <button
              className="mt-2 md:mt-0 md:ml-2 py-3 px-8 bg-red-500 text-white rounded hover:bg-red-700"
              type="submit"
            >
              Reset
            </button>
          </div>
        </form>
        <div></div>
      </div>
    </div>
  );
}
export default CreateProduct;
