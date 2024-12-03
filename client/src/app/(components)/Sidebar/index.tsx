"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import {
  CircleXIcon,
  Clipboard,
  LucideIcon,
  SlidersHorizontal,
} from "lucide-react";
import BassIcon from "@/assets/bass.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "dashboard");
  const dispatch = useAppDispatch();
  const toggleSidebar = () => {
    if (!isSidebarCollapsed) dispatch(setIsSidebarCollapsed(true));
  };
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  return (
    <Link
      href={href}
      onClick={() => {
        dispatch(toggleSidebar);
      }}
    >
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        }
        hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
          isActive ? "bg-blue-200" : ""
        }`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />
        <span className={`${isCollapsed ? "hidden" : "block"} font-medium`}>
          {label}
        </span>
      </div>
    </Link>
  );
};
function Sidebar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };
  const onLogoClick = () => {
    if (!isSidebarCollapsed) toggleSidebar();
    router.push("/shop");
  };
  const panelWidth = isSidebarCollapsed ? "w-0 md:w-16" : "w-[100vw] sm:w-64";
  const sidebarClassnames = `fixed flex flex-col transition-all bg-white duration-300 overflow-hidden h-full border-r-solid border-r-[.2rem] border-r-slate-200 z-40 ${panelWidth}`;
  return (
    <div className={sidebarClassnames}>
      {/* LOGO */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? "px-5" : "px-8"
        }`}
      >
        <Image
          src={BassIcon}
          alt="website icon"
          height={46}
          onClick={onLogoClick}
          className="cursor-pointer rounded-full"
        />
        <h1
          className={`${
            isSidebarCollapsed ? "hidden" : "block"
          } font-extrabold text-xl`}
        >
          Buy Basses
        </h1>
        {!isSidebarCollapsed && (
          <button
            className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
            onClick={toggleSidebar}
          >
            <CircleXIcon className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* MENU ITEMS */}
      <div className="flex-grow mt-8">
        <SidebarLink
          href="/admin/products"
          icon={Clipboard}
          label="Products"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/admin/settings"
          icon={SlidersHorizontal}
          label="Settings"
          isCollapsed={isSidebarCollapsed}
        />
      </div>
      {/* FOOTER */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-gray-500">
          &copy; 2024 Inventor
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
