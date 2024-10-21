"use client";
import PopularProducts from "@/app/dashboard/cards/PopularProducts";
import PurchaseSummary from "./cards/PurchaseSummary";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      {/* <div className="row-span-3 xl:row-span-6 bg-gray-500">One</div> */}
      <PopularProducts />
      <PurchaseSummary />
      <div className="row-span-3 xl:row-span-6 bg-gray-500">Two</div>
      <div className="row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-gray-500">
        Three
      </div>
      <div className="row-span-3 bg-gray-500">Four</div>
      <div className="row-span-1 xl:row-span-2 bg-gray-500">Five</div>
      <div className="row-span-1 xl:row-span-2 bg-gray-500">Six</div>
      <div className="row-span-1 xl:row-span-2 bg-gray-500">Seven</div>
    </div>
  );
}
