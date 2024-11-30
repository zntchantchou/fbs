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
    ? products.map((p) => {
        return (
          <div
            key={p.id}
            className="bg-slate-300 flex flex-wrap justify-center mx-2 rounded-md border-solid border-blue-300 border-2 mb-4"
          >
            <div className="flex flex-col h-[23rem] pt-1">
              <Image
                src={p.pictures[0].url}
                alt={p.name}
                height={200}
                width={250}
                className="h-[80%]"
              />
              {p.name}
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
      {/* <div className="bg-blue-300 w-full h-full grid gap-2 grid-cols-[200px_minmax(600px,_1fr)_100px]">
       */}
      <div className="w-full bg-slate-900">
        <div className="max-w-[100%] bg-gray-200 grid gap-4 grid-cols-[repeat(auto-fit,_minmax(23rem,_1fr))]">
          {/* <div className="bg-green-500 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"> */}
          {productsCards}
        </div>
      </div>
    </>
  );
}

export default Shop;
