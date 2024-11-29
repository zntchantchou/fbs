"use client";
import { AuthenticationService } from "@/auth/auth-service";
// import { useEffect } from "react";

function Shop() {
  console.log("Auth at Shop: ", AuthenticationService.firebaseAuth.currentUser);
  // useEffect(() => {
  //   console.log(
  //     "Auth has changed",
  //     AuthenticationService.firebaseAuth.currentUser
  //   );
  // }, []);
  return <div>Shop</div>;
}

export default Shop;
