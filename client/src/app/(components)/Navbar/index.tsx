"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { AuthenticationService } from "@/auth/auth-service";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import { Heart, Menu, Moon, ShoppingBasketIcon, Sun } from "lucide-react";
import Image from "next/image";
import Bubble from "../bubble";
import { useRouter } from "next/navigation";

function Navbar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const newCartItems = useAppSelector((state) => state.cart.totalNewItems);
  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const newWishlistItems = useAppSelector(
    (state) => state.wishlist.totalNewItems
  );
  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };
  const onWishlistClick = () => {
    router.push("/shop/wishlist");
  };
  const onCartClick = () => {
    router.push("/shop/cart");
  };

  const mainPaddingLeft = isSidebarCollapsed ? "md:pl-24" : "pl-72";
  const userInfo = AuthenticationService.getUser();

  return (
    <div
      className={`flex items-center w-full h-[6vh] px-4 ${mainPaddingLeft} bg-gray-200`}
    >
      {/* LEFT SIDE */}
      <div className="w-[5rem] flex items-center gap-5">
        <button
          className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>
      <div className="w-[100%] invisible md:visible">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="what are you looking for ?"
          className="w-full hidden md:block text-slate-800 max-w-2xl outline-none rounded-md p-2"
        />
      </div>
      {/* RIGHT SIDE */}
      <div className="flex justify-end items-center gap-5 w-[60%] min-w-[200px]">
        <div className="flex justify-between items-center gap-5">
          <div>
            <button onClick={toggleDarkMode}>
              {isDarkMode ? (
                <Sun className="cursor-pointer text-gray-500" size={24} />
              ) : (
                <Moon className="cursor-pointer text-gray-500" size={24} />
              )}
            </button>
          </div>
          {/* <Link href="settings">
            <Settings
              className="cursor-pointer text-gray-500"
              size={24}
            ></Settings>
          </Link> */}
          <div className="relative" onClick={onCartClick}>
            <ShoppingBasketIcon
              className="cursor-pointer text-gray-500"
              size={24}
            />
            {!!newCartItems && <Bubble value={newCartItems} />}
          </div>
          <div className="relative" onClick={onWishlistClick}>
            <Heart className="cursor-pointer text-gray-500" size={24} />
            {!!newWishlistItems && <Bubble value={newWishlistItems} />}
          </div>
          <div className="flex cursor-pointer items-center">
            {userInfo && userInfo.photoURL && (
              <Image
                src={userInfo.photoURL}
                height={20}
                width={20}
                alt="profile"
                className="rounded-full box-content"
              />
            )}
            <span className="ml-2 font-semibold invisible lg:visible w-0 lg:w-[100%]">
              {userInfo && userInfo.displayName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
