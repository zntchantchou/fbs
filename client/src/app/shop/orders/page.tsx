import Header from "@/app/(components)/Header";

function Orders() {
  return (
    <div>
      <Header name="My Orders" />
      <div className="w-full py-6 h-full flex flex-col items-center min-w-[300px] justify-center">
        {/* CONTAINER FOR CENTERING */}
        {/* {!!storeCartItems.length ? cartContent : emptyCartContent} */}
      </div>
    </div>
  );
}

export default Orders;
