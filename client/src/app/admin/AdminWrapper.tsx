"use client";

import Navbar from "@/app/(components)/Navbar";
import Sidebar from "@/app/(components)/Sidebar";
import { useAppSelector } from "../redux";
import { useEffect } from "react";

function AdminLayout({ children }: { children: React.ReactNode }) {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const mainPaddingLeft = isSidebarCollapsed ? "md:pl-24" : "pl-72";

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  });
  // const contentWidth = isSidebarCollapsed ? "w-[100vw] md:w-16" : "w-[100vw] sm:w-64";
  return (
    <div
      className={`${
        isDarkMode ? "dark" : "light"
      } flex bg-gray-50 text-gray-900 w-full min-h-screen`}
    >
      <Sidebar></Sidebar>
      <div className="h-[100vh] w-full">
        <Navbar></Navbar>
        <main
          className={`flex flex-col py-5 px-9 md:pl-32 h-[94vh] overflow-auto ${mainPaddingLeft}`}
        >
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}

function AdminWrapper({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}

export default AdminWrapper;
