"use client";

import {
  FormValues,
  PictureDragItem,
} from "@/app/(components)/components.types";
import Header from "@/app/(components)/Header";
import Input from "@/app/(components)/forms/Input/Input";
import TextArea from "@/app/(components)/forms/TextArea/TextArea";
import Uploader from "@/app/(components)/Uploader";
import {
  ProductPicture,
  useEditProductMutation,
  useGetCategoriesQuery,
  useGetProductByIdQuery,
} from "@/state/api";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ValidationError from "@/app/(components)/forms/ValidationError/ValidationError";
import Select from "react-select";

interface ProductForm extends FormValues {
  price: number;
  name: string;
  stockQuantity: number;
  pictures: ProductPicture[];
  category: { label: string; value: string };
  brand: string;
  description: string;
  model: string;
}

const emptyFormValues: ProductForm = {
  price: 10,
  name: "",
  stockQuantity: 0,
  pictures: [],
  category: { label: "4 strings", value: "" },
  brand: "",
  description: "",
  model: "",
};

type Props = {
  params: { productId: string };
};

function EditProduct({ params }: Props) {
  const [pictures, setPictures] = useState<PictureDragItem[]>([]);
  const [initialFormState, _] = useState(emptyFormValues);
  const [editProduct] = useEditProductMutation();
  const { data: categories } = useGetCategoriesQuery();
  const labelClassnames = "block my-2 text-sm font-medium text-gray-700";
  const { data: productData } = useGetProductByIdQuery(params.productId);
  const { register, handleSubmit, formState, setValue, control } =
    useForm<ProductForm>({
      defaultValues: initialFormState,
      mode: "onChange",
    });
  const onSubmit: SubmitHandler<ProductForm> = async (formValues) => {
    if (hasFormError() || !pictures.length) return;
    const requestData = new FormData();
    requestData.set("name", formValues.name);
    requestData.set("price", formValues.price.toString());
    requestData.set("description", formValues.description);
    requestData.set("model", formValues.model);
    requestData.set("brand", formValues.brand);
    requestData.set("stockQuantity", formValues.stockQuantity.toString());
    requestData.set("category", formValues.category.value);
    if (pictures) {
      for (const pic of pictures) {
        if (pic.file) {
          // handle pictures that are being uploaded for the first time
          const buffer = await pic.file.arrayBuffer();
          const asBlob = new Blob([new Uint8Array(buffer)], {
            type: pic.file.type,
          });
          requestData.append("pictureFiles", asBlob, pic.file.name);
        }
      }
      const picturesData = [...pictures].map(({ id, index, filename }) => ({
        id,
        index,
        filename,
      }));
      requestData.append("picturesData", JSON.stringify(picturesData));
      await editProduct({
        updatedProduct: requestData,
        productId: params.productId,
      });
    }
  };
  // initialize form from stored product
  useEffect(() => {
    if (productData) {
      const keys = Object.keys(emptyFormValues);
      for (const key of keys) {
        if (key === "category") {
          console.log("KEY", key);
          console.log("VALUE", productData[key].id);
          setValue(key, {
            label: productData[key].name,
            value: productData[key].id,
          });
        } else {
          setValue(key, productData[key]);
        }
      }
    }
  }, [productData, setValue]);

  const hasFormError = () => {
    return !!Object.keys(formState.errors).length;
  };

  const updateImages = (images: PictureDragItem[]) => {
    setPictures(images);
  };

  if (!productData || !Object.values(productData).length) {
    return <div>Could not access product</div>;
  }
  return (
    <div className="w-full h-full flex justify-center min-w-[300px]">
      <div className="w-full md:w-3/5 xl:w-2/5 flex flex-col items-center md:flex md:flex-col md:items-center text-start">
        {/* FORM */}
        <form
          className="w-5/6 lg:w-full md:flex-col md:items-center"
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
          {/* {categories && categories.length && */}
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
                options={categories.map((c) => ({
                  label: c.name,
                  value: c.id,
                }))}
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
          {/* DROP ZONE */}
          <Uploader
            imageGalleryMaxHeight="200px"
            onUpdate={updateImages}
            pictures={productData.pictures}
          />
          {pictures.length < 1 && formState.isSubmitted && (
            <ValidationError
              fieldName="pictures"
              label="Please upload at least one picture"
            />
          )}
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
