"use client";

import Header from "@/app/(components)/Header";
import ProductCard from "@/app/(components)/shop/ProductCard/ProductCard";
import { Heart } from "lucide-react";
import { useAppSelector } from "@/app/redux";

function Wishlist() {
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const itemsCards =
    wishlistItems.length > 0
      ? wishlistItems.map((p) => (
          <ProductCard key={p.productId} product={p.product} />
        ))
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
      <Header name="My Wishlist" />
      {wishlistItems.length > 0 ? content : emptyCartContent}
      {/* GRID */}
    </div>
  );
}

export default Wishlist;
