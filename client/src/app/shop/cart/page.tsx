"use client";

import { emptyCart } from "@/state";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function Cart() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("CART");
    dispatch(emptyCart());
  }, [dispatch]);
  return <div>Cart</div>;
}

export default Cart;
