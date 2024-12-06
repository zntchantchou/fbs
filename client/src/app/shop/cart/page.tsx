"use client";

import { SelectItem } from "@/app/(components)/components.types";
import Header from "@/app/(components)/Header";
import PageLoader from "@/app/(components)/PageLoader";
import { useAppSelector } from "@/app/redux";
import ProductService from "@/services/product-service";
import { emptyCart } from "@/state";
import { useCreateOrderMutation } from "@/state/api";
import {
  deleteCartItem,
  setItemQuantity,
  setNewItemsToZero,
  totalItemsPriceSelector,
} from "@/state/cart";
import { ShoppingBasketIcon, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";

function Cart() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isWaitingForPayment, setIsWaitingForPayment] =
    useState<boolean>(false);

  const [createOrderFn, { data: orderData, error }] = useCreateOrderMutation();
  const storeCartItems = useAppSelector((state) => state.cart.items);
  const quantityOptions: SelectItem[] = Array(10)
    .fill(null)
    .map((_, index) => ({
      value: (index + 1).toString(),
      label: (index + 1).toString(),
    }));
  const deleteItem = (productId: string) => {
    dispatch(deleteCartItem(productId));
  };
  const updateQuantity = (quantity: number, productId: string) => {
    dispatch(setItemQuantity({ quantity, productId }));
  };
  useEffect(() => {
    if (orderData) {
      console.log("[USE EFFECT] Order data", orderData);
      dispatch(emptyCart());
      setIsWaitingForPayment(false);
      router.push("/shop/orders");
    }
  }, [orderData, router, error, dispatch]);

  useEffect(() => {
    if (error) {
      console.log("[USE EFFECT] error", error);
      setIsWaitingForPayment(false);
    }
  }, [error]);

  const onPay = () => {
    console.log("[onPay]");
    setIsWaitingForPayment(true);
    const items = storeCartItems.map((i) => ({
      productId: i.productId,
      quantity: i.quantity,
    }));
    createOrderFn({ items });
  };
  const totalPrice = useAppSelector(totalItemsPriceSelector);
  useEffect(() => {
    dispatch(setNewItemsToZero());
  }, [dispatch]);

  const createCartItems = () =>
    storeCartItems.map((item) => (
      <div
        key={item.productId}
        className="w-[100%] h-[9rem] flex items-center mb-2 bg-slate-100"
      >
        {/* DETAILS */}
        <div className="bg-slate-100 h-[100%] w-[250px]">
          <Image
            className="w-[100%] h-[100%]"
            width={100}
            height={100}
            src={ProductService.formatPictureUrl(item.product.pictures[0].url)}
            alt={item.product.name}
          />
        </div>
        <div className="h-full w-full p-2 flex flex-col justify-center">
          <div className="text-md my-1">
            {item.product.brand} - {item.product.model}
          </div>
          <div className="font-bold text-lg my-1">{item.product.price}€</div>
          <div className="my-1 flex items-center">
            <span className="mr-2">Quantity </span>
            <Select
              options={quantityOptions}
              defaultValue={quantityOptions.find(
                (o) => o.value === item.quantity.toString()
              )}
              onChange={(c) => {
                console.log("SELECT CHANGE QUANTITY: ", c);
                updateQuantity(parseInt(c.value), item.productId);
              }}
            />
          </div>
        </div>
        <div className="h-full p-2">
          <div
            className="rounded-full h-10 w-10 flex items-center justify-center"
            aria-label="delete the image"
            onClick={() => deleteItem(item.productId)}
          >
            {/* DELETE IMAGE ICON */}
            <X className="hover:text-gray-400 cursor-pointer" height={16} />
          </div>
        </div>
      </div>
    ));

  const cartContent = (
    <div className="flex flex-col lg:flex-row items-start w-[100%] sm:w-[90%] md:w-[80%] lg:w-[60%]">
      <div className="flex flex-col items-start w-[100%] lg:w-2/3">
        {storeCartItems.length > 0 && createCartItems()}
      </div>
      {/* PAIEMENT */}
      <div className="flex flex-col items-start w-[100%] lg:w-1/3 p-4 bg-white lg:ml-4">
        <Header name="Total" />
        <div className="w-full flex justify-between text-lg">
          sub-total
          {!Number.isNaN(totalPrice) && <span>{totalPrice} €</span>}
        </div>
        <button
          className="mt-2 py-3 px-3 bg-green-400 text-white rounded w-full hover:bg-green-500 flex justify-center items-center"
          onClick={onPay}
        >
          PAYMENT
        </button>
      </div>
    </div>
  );
  const emptyCartContent = (
    <div className="font-bold bg-slate-300 h-[25rem] flex flex-col items-center justify-center w-[100%] sm:w-[90%] md:w-[80%] lg:w-[60%]">
      <ShoppingBasketIcon height={20} className="mb-4" />
      <p className="text-lg">Your cart is currently empty.</p>
    </div>
  );
  if (isWaitingForPayment) return <PageLoader text="processing payment..." />;
  return (
    <div>
      <Header name="My Cart" />
      <div className="w-full py-6 h-full flex flex-col items-center min-w-[300px] justify-center">
        {/* CONTAINER FOR CENTERING */}
        {!!storeCartItems.length ? cartContent : emptyCartContent}
      </div>
    </div>
  );
}

export default Cart;
