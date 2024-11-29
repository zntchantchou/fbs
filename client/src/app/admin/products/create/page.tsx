"use client";

import {
  FormValues,
  PictureDragItem,
} from "@/app/(components)/components.types";
import Header from "@/app/(components)/Header";
import Input from "@/app/(components)/forms/Input/Input";
import TextArea from "@/app/(components)/forms/TextArea/TextArea";
import Uploader from "@/app/(components)/Uploader";
import { useCreateProductMutation, useGetCategoriesQuery } from "@/state/api";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ImageListType } from "react-images-uploading";
import ValidationError from "@/app/(components)/forms/ValidationError/ValidationError";
import { useRouter } from "next/navigation";
import Select from "react-select";

interface ProductForm extends FormValues {
  price: number;
  name: string;
  stockQuantity: number;
  pictures: ImageListType;
  category: { label: string; value: string };
  brand: string;
  description: string;
  model: string;
}

const initialFormValues: ProductForm = {
  price: 0,
  name: "",
  stockQuantity: 0,
  pictures: [],
  category: { label: "4 strings", value: "" },
  brand: "",
  description: "",
  model: "",
};

function CreateProduct() {
  const [pictures, setPictures] = useState<PictureDragItem[]>([]);
  const labelClassnames = "block my-2 text-sm font-medium text-gray-700";
  const { data: categories } = useGetCategoriesQuery();
  const getCategoryOptions = () => {
    if (categories) {
      return categories.map((c) => ({ label: c.name, value: c.id }));
    }
    return [];
  };
  const [createProduct, { error: createProductError }] =
    useCreateProductMutation();
  const router = useRouter();
  const { register, handleSubmit, formState, setValue, control } =
    useForm<ProductForm>({
      defaultValues: { ...initialFormValues },
      mode: "onChange",
    });
  useEffect(() => {
    //  set default category
    if (Array.isArray(categories)) {
      setValue("category", {
        label: categories[0].name,
        value: categories[0].id,
      });
    }
  }, [categories, setValue]);

  const onSubmit: SubmitHandler<ProductForm> = async (formValues) => {
    if (Object.keys(formState.errors).length || !pictures.length) return;
    const requestData = new FormData();
    requestData.set("name", formValues.name);
    requestData.set("price", formValues.price.toString());
    requestData.set("description", formValues.description);
    requestData.set("model", formValues.model);
    requestData.set("brand", formValues.brand);
    requestData.set("stockQuantity", formValues.stockQuantity.toString());
    requestData.set("category", formValues.category.value);

    if (pictures) {
      const sortedPictures = pictures.sort((a, b) => a.index - b.index);
      for (const pic of sortedPictures) {
        if (pic.file) {
          const buffer = await pic.file.arrayBuffer();
          const asBlob = new Blob([new Uint8Array(buffer)], {
            type: pic.file.type,
          });
          requestData.append("pictures", asBlob, pic.file.name);
        }
      }
      const created = await createProduct(requestData);
      if (created) {
        router.push("/admin/products/edit/" + created.data.id);
      }
    }
  };

  const updateImages = (images: PictureDragItem[]) => {
    setPictures(images);
  };
  if (createProductError) {
    return <p>{createProductError && "error"}</p>;
  }
  return (
    <div className="w-full h-full flex justify-center min-w-[300px]">
      <div className="w-full md:w-3/5 xl:w-2/5 flex flex-col items-center md:flex md:flex-col md:items-center text-start">
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
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isSearchable={false}
                isClearable={false}
                options={getCategoryOptions()}
              />
            )}
          />
          <ValidationError
            fieldName="category"
            errors={formState.errors}
            options={{ required: true }}
          />
          {/* PICTURES */}
          <label htmlFor="Pictures" className={labelClassnames}>
            Pictures
          </label>
          {pictures.length < 1 && formState.isSubmitted && (
            <ValidationError
              fieldName="pictures"
              label="Please upload at least one picture"
            />
          )}
          {/* DROP ZONE */}
          <Uploader imageGalleryMaxHeight="200px" onUpdate={updateImages} />
          <div className="flex flex-col md:flex-row max-w-2xl">
            <button
              className="py-3 px-6 bg-green-700 text-white rounded hover:bg-green-900"
              type="submit"
            >
              Create
            </button>
            <button className="mt-2 md:mt-0 md:ml-2 py-3 px-8 bg-red-500 text-white rounded hover:bg-red-700">
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
