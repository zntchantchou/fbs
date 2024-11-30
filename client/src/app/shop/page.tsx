"use client";
import { AuthenticationService } from "@/auth/auth-service";
import { useGetProductsQuery } from "@/state/api";
import Header from "../(components)/Header";
import Image from "next/image";

function Shop() {
  console.log("Auth at Shop: ", AuthenticationService.firebaseAuth.currentUser);
  const { data: products, isLoading: isLoadingProducts } =
    useGetProductsQuery();

  const productsCards = products
    ? [...products, ...products, ...products].map((p, i) => {
        return (
          <div
            key={i}
            className="flex flex-wrap justify-center mx-2 rounded-md border-solid border-2 border-gray-200"
          >
            <div className="flex flex-col h-[28rem] pt-2 cursor-pointer">
              <Image
                src={p.pictures[0].url}
                alt={p.name}
                height={200}
                width={300}
                className="h-[75%] rounded-md"
              />
              <div className="px-2 py-2 h-[25%] flex flex-col">
                <span className="font-bold text-lg"> {p.name} </span>
                <span className="italic"> {p.brand} </span>
                <span className="text-lg"> {p.price} €</span>
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
        <div className="max-w-[100%] grid gap-4 grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))]">
          {productsCards}
        </div>
      </div>
    </>
  );
}

export default Shop;
