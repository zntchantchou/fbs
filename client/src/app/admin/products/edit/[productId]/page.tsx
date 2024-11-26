"use client";

import { FormValues } from "@/app/(components)/components.types";
import Header from "@/app/(components)/Header";
import Input from "@/app/(components)/forms/Input/Input";
import TextArea from "@/app/(components)/forms/TextArea/TextArea";
import Uploader from "@/app/(components)/Uploader";
import {
  Product,
  ProductPicture,
  useGetCategoriesQuery,
  useGetProductByIdQuery,
  // useGetProductByIdQuery,
} from "@/state/api";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ImageListType } from "react-images-uploading";
import ValidationError from "@/app/(components)/forms/ValidationError/ValidationError";

interface ProductForm extends FormValues, Product {
  price: number;
  name: string;
  stockQuantity: number;
  pictures: ProductPicture[];
  category: string;
  brand: string;
  description: string;
  model: string;
}

const emptyFormValues: ProductForm = {
  price: 10,
  name: "",
  stockQuantity: 0,
  pictures: [],
  category: "4 strings",
  brand: "",
  description: "",
  model: "",
};

type Props = {
  params: { productId: string };
};

function EditProduct({ params }: Props) {
  const [pictures, setPictures] = useState<ImageListType>([]);
  const [initialFormState, _] = useState(emptyFormValues);
  const labelClassnames = "block my-2 text-sm font-medium text-gray-700";

  console.log("SLUG IS: ", params);
  const {
    data: productData,
    error: productError,
    isLoading: productLoading,
  } = useGetProductByIdQuery(params.productId);

  const { register, handleSubmit, formState, setValue } = useForm<ProductForm>({
    defaultValues: initialFormState,
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<ProductForm> = async (formValues) => {
    if (!formState.isValid || !pictures.length) return;
    const requestData = new FormData();
    requestData.set("name", formValues.name);
    requestData.set("price", formValues.price.toString());
    requestData.set("description", formValues.description);
    requestData.set("model", formValues.model);
    requestData.set("brand", formValues.brand);
    requestData.set("stockQuantity", formValues.stockQuantity.toString());
    requestData.set("category", formValues.category);

    if (pictures) {
      for (const pic of pictures) {
        if (pic.file) {
          const buffer = await pic.file.arrayBuffer();
          const asBlob = new Blob([new Uint8Array(buffer)], {
            type: pic.file.type,
          });
          requestData.append("pictures", asBlob, pic.file.name);
        }
      }
      console.log("REQUEST DATA pic 1: ", requestData.get("pictures"));
      // const created = await roduct(requestData);
      // if (created) {
      //   console.log("Product has been created: ", created);
      // }
    }
  };

  useEffect(() => {
    if (productData) {
      const keys = Object.keys(emptyFormValues);
      for (const key of keys) {
        setValue(key, productData[key]);
      }
    }
  }, [productData, setValue]);

  const {
    data: categories,
    error: categoriesError,
    isLoading: isLoadingCategories,
  } = useGetCategoriesQuery();

  // const handleReset = () => {
  //   setFormData(initialForm);
  // };

  const updateImages = (images: ImageListType) => {
    setPictures(images);
  };

  if (!productData || !Object.values(productData).length) {
    return <div>Could not access product</div>;
  }
  console.log("productData : ", productData);
  return (
    <div className="w-full h-full flex justify-center min-w-[300px]">
      <div className="w-full md:w-3/5 xl:w-2/5 flex flex-col items-center md:flex md:flex-col md:items-center text-start">
        {/* FORM */}
        <form
          className="w-5/6 lg:w-full md:flex-col md:items-center mt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Header name="Edit a product" />
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
          <Uploader
            imageGalleryMaxHeight="200px"
            onUpdate={updateImages}
            pictures={productData.pictures}
          />

          {/* {pictures.length < 1 && formState.isSubmitted && (
            <ValidationError
              fieldName="pictures"
              label="Please upload at least one picture"
            />
          )} */}
          <div className="flex flex-col md:flex-row max-w-2xl">
            <button
              className="py-3 px-6 bg-green-700 text-white rounded hover:bg-green-900"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
        <div></div>
      </div>
    </div>
  );
}
export default EditProduct;
