"use client";
import { AuthenticationService } from "@/services/auth-service";
import { Product, useGetProductsQuery } from "@/state/api";
import Header from "../(components)/Header";
import Image from "next/image";
import { Heart, ShoppingBasket } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addItemToCart } from "@/state/cart";
import {
  addItemToWishlist,
  productIdsInWishlistSelector,
} from "@/state/wishlist";
import { useAppSelector } from "../redux";

function Shop() {
  console.log("Auth at Shop: ", AuthenticationService.firebaseAuth.currentUser);
  const { data: products, isLoading: isLoadingProducts } =
    useGetProductsQuery();
  const router = useRouter();
  const dispatch = useDispatch();
  const onAddToCart = (product: Product) => {
    dispatch(addItemToCart(product));
  };
  const onAddToWishlist = (product: Product) => {
    dispatch(addItemToWishlist(product));
  };
  const getIconWishlistColor = (productId: string) => {
    return isInWishList(productId) ? "#ff795e" : "white";
  };
  const wishListProductIds = useAppSelector(productIdsInWishlistSelector);
  const isInWishList = (productId: string) =>
    wishListProductIds.includes(productId);

  const formatImageUrl = (url: string) =>
    url.startsWith("/") ? "/pictures" + url : url;
  const productsCards = products
    ? products.map((p, i) => {
        return (
          <div key={i} className="flex flex-wrap justify-center mx-2">
            <div className="flex flex-col h-[23rem] relative">
              <div className="h-[75%] cursor-pointer relative">
                <div
                  onClick={() => onAddToWishlist(p)}
                  className="bg-slate-100 w-[2.5rem] h-[2.5rem] rounded-full hover:bg-slate-300 flex items-center justify-center absolute bottom-1 right-1"
                >
                  <Heart
                    color={getIconWishlistColor(p.id)}
                    fill={getIconWishlistColor(p.id)}
                    width={25}
                    height={25}
                    className="text-slate-900 font-bold rounded-full cursor-pointer"
                  />
                </div>
                <Image
                  onClick={() => {
                    router.push("/shop/product/" + p.id);
                  }}
                  src={formatImageUrl(p.pictures[0].url)}
                  alt={p.name}
                  height={200}
                  width={300}
                  className="h-[100%]"
                />
              </div>
              <div className="px-2 py-2 h-[25%] w-full flex">
                <div className="w-1/2 h-full flex flex-col justify-center">
                  <span className="font-bold text-md"> {p.name} </span>
                  <span className="italic"> {p.brand} </span>
                  <span className="text-lg"> {p.price} €</span>
                </div>
                <div className="w-1/2 flex flex-col justify-around items-end">
                  <button
                    onClick={() => onAddToCart(p)}
                    className="p-2 box-content bg-slate-100 border-solid border-2 border-slate-900 text-slate-900 rounded-full hover:bg-slate-200 flex items-center "
                  >
                    add to cart <ShoppingBasket height={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })
    : null;
  if (isLoadingProducts) return <div>loading...</div>;
  return (
    <>
      <Header name="All Basses" />
      {/* GRID */}
      <div className="w-full flex justify-center py-6">
        <div className="sm:w-[90%] md:w-[80%] lg:w-[60%] max-w-[100%] grid gap-4 grid-cols-[repeat(auto-fit,_minmax(230px,_1fr))]">
          {productsCards}
        </div>
      </div>
    </>
  );
}

export default Shop;
