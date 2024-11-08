"use client";

import StoreProvider from "./redux";

function StoreWrapper({ children }: { children: React.ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>;
}

export default StoreWrapper;
