"use client";
import { AuthenticationService } from "@/auth/auth-service";
// import { useEffect } from "react";

function Store() {
  console.log("Auth at Shop: ", AuthenticationService.firebaseAuth.currentUser);
  // useEffect(() => {
  //   console.log(
  //     "Auth has changed",
  //     AuthenticationService.firebaseAuth.currentUser
  //   );
  // }, []);
  return <div>Store</div>;
}

export default Store;
