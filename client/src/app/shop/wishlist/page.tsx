"use client";
import { Product } from "@/state/api";
import Header from "@/app/(components)/Header";
import Image from "next/image";
import { Heart, ShoppingBasket } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addItemToCart } from "@/state/cart";
import { addItemToWishlist } from "@/state/wishlist";
import { useAppSelector } from "@/app/redux";

function Wishlist() {
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const router = useRouter();
  const dispatch = useDispatch();
  const onAddToCart = (product: Product) => {
    dispatch(addItemToCart(product));
  };
  const onAddToWishlist = (product: Product) => {
    dispatch(addItemToWishlist(product));
  };

  const itemsCards =
    wishlistItems.length > 0
      ? wishlistItems.map((p, i) => {
          return (
            <div key={i} className="flex flex-wrap justify-center mx-2">
              <div className="flex flex-col h-[23rem] relative">
                <div className="h-[75%] cursor-pointer relative">
                  <div
                    onClick={() => onAddToWishlist(p.product)}
                    className="bg-slate-100 w-[2.2rem] h-[2.2rem] rounded-full hover:bg-slate-200 flex items-center justify-center absolute bottom-1 right-1"
                  >
                    <Heart
                      fill="#ff795e"
                      color="#ff795e"
                      width={20}
                      height={20}
                      className="font-bold rounded-full cursor-pointer"
                    />
                  </div>
                  <Image
                    onClick={() => {
                      router.push("/shop/product/" + p.productId);
                    }}
                    src={p.product.pictures[0]?.url}
                    alt={p.product.name}
                    height={200}
                    width={300}
                    className="h-[100%]"
                  />
                </div>
                <div className="px-2 py-2 h-[25%] w-full flex">
                  <div className="w-1/2 h-full flex flex-col justify-center">
                    <span className="font-bold text-md">
                      {" "}
                      {p.product.name}{" "}
                    </span>
                    <span className="italic"> {p.product.brand} </span>
                    <span className="text-lg"> {p.product.price} €</span>
                  </div>
                  <div className="w-1/2 flex flex-col justify-around items-end">
                    <button
                      onClick={() => onAddToCart(p.product)}
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
  const content = (
    <div className="w-full flex justify-center py-6">
      <div className="sm:w-[90%] md:w-[80%] lg:w-[60%] max-w-[100%] grid gap-4 grid-cols-[repeat(auto-fit,_minmax(230px,_1fr))]">
        {itemsCards}
      </div>
    </div>
  );
  const emptyCartContent = (
    <div className="w-full h-full flex justify-center items-center py-6">
      <div className="font-bold bg-slate-300 h-[25rem] flex flex-col items-center justify-center w-[100%] sm:w-[90%] md:w-[80%] lg:w-[60%]">
        <Heart height={20} className="mb-4" />
        <p className="text-lg">Your wishlist is currently empty.</p>
      </div>
    </div>
  );
  return (
    <div className="w-full hull min-w-[300px]">
      <Header name="My wishlist" />
      {wishlistItems.length > 0 ? content : emptyCartContent}
      {/* GRID */}
    </div>
  );
}

export default Wishlist;
