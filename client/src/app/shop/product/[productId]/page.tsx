"use client";
import Image from "next/image";
import { useGetProductByIdQuery } from "@/state/api";
import { addItemToCart } from "@/state/cart";
import { ShoppingBasket } from "lucide-react";
import { useDispatch } from "react-redux";
import Header from "@/app/(components)/Header";

type Props = {
  params: { productId: string };
};

function ViewProduct({ params }: Props) {
  const {
    data: product,
    error,
    isLoading,
  } = useGetProductByIdQuery(params.productId);
  const dispatch = useDispatch();

  const labelClassnames = "block my-2 text-sm font-medium text-gray-700";
  const images = product
    ? product.pictures.map((pic, i) => (
        <Image
          src={pic.url}
          key={pic.id}
          alt={pic.filename}
          width={i === 0 ? 300 : 130}
          height={i === 0 ? 100 : 130}
          className={i > 0 ? "mt-2" : ""}
        />
      ))
    : [];
  const onAddToCart = () => {
    console.log("[ViewProduct] onAddtoCart");
    dispatch(addItemToCart(product));
  };
  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (product)
    return (
      <>
        <Header name="Product" />
        <div className="w-full h-full py-6 flex justify-center min-w-[300px] overflow-hidden">
          <div className="flex flex-col items-start sm:flex-row sm:w-[90%] md:w-[80%] lg:w-[60%]">
            <div className="h-full flex flex-col min-w-[300px]">
              {!!images.length && images}
            </div>
            <div className="h-full sm:ml-4">
              <div className="text-lg font-bold">
                <label className={labelClassnames}>Model</label>
                {product.brand} - {product.model}
              </div>
              <label className={labelClassnames}>Price</label>
              <div className="font-bold">{product.price} € </div>
              <label className={labelClassnames}>Category</label>
              <div className="font-bold">{product.category.name}</div>
              <label className={labelClassnames}>Description</label>
              <div className="text-md max-w-[100%] overflow-hidden">
                <span>{product.description}</span>
              </div>
              <label className={labelClassnames}>Stock quantity</label>
              <div className="font-bold">{product.stockQuantity}</div>
              <div className="w-[100%] flex justify-center">
                <button
                  onClick={onAddToCart}
                  className="px-2 py-3 sm:py-2 mt-4 w-[70vw] sm:w-[fit-content] flex justify-center box-content bg-slate-900 text-white rounded-full hover:bg-slate-700 items-center"
                >
                  <span>add to cart</span> <ShoppingBasket height={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  return <div>Product {params.productId}</div>;
}

export default ViewProduct;
