"use client";
import { AuthenticationService } from "@/auth/auth-service";
import { useGetProductsQuery } from "@/state/api";
import Header from "../(components)/Header";
import Image from "next/image";
import { Heart, ShoppingBasket } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addCartItem } from "@/state";

function Shop() {
  console.log("Auth at Shop: ", AuthenticationService.firebaseAuth.currentUser);
  const { data: products, isLoading: isLoadingProducts } =
    useGetProductsQuery();
  const router = useRouter();
  const dispatch = useDispatch();
  const onAddToCart = () => {
    dispatch(addCartItem());
  };
  const productsCards = products
    ? [...products, ...products, ...products].map((p, i) => {
        return (
          <div
            key={i}
            className="flex flex-wrap justify-center mx-2 rounded-md"
          >
            <div className="flex flex-col h-[23rem]">
              <Image
                onClick={() => {
                  router.push("/shop/product/" + p.id);
                }}
                src={p.pictures[0].url}
                alt={p.name}
                height={200}
                width={300}
                className="h-[75%] rounded-md cursor-pointer"
              />
              <div className="px-2 py-2 h-[25%] w-full flex">
                <div className="w-1/2 h-full flex flex-col justify-center">
                  <span className="font-bold text-md"> {p.name} </span>
                  <span className="italic"> {p.brand} </span>
                  <span className="text-lg"> {p.price} €</span>
                </div>
                <div className="w-1/2 flex flex-col justify-around items-end">
                  {/* <div className="bg-slate-900 h-[3rem] rounded-full flex items-center justify-center"> */}
                  <Heart
                    width={30}
                    height={30}
                    className="text-slate-100 font-bold bg-slate-900 rounded-full hover:bg-slate-700 cursor-pointer"
                  />
                  {/* </div> */}
                  <button
                    onClick={() => onAddToCart()}
                    className="px-2 box-content bg-slate-900 text-white rounded-full hover:bg-slate-700 flex items-center "
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
      <div className="w-full">
        <div className="max-w-[100%] grid gap-4 grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))]">
          {productsCards}
        </div>
      </div>
    </>
  );
}

export default Shop;
