import React from "react";
import Sidebar from "../sidebar";
import { Header } from "../header";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex w-full min-h-screen sm:max-h-none md:max-h-screen p-3">
      <Sidebar />
      <div className="flex flex-col w-full p-3">
        <Header />
        <div className="flex flex-grow w-full bg-gray-200/20 dark:bg-neutral-600/20 rounded-md mt-6 overflow-hidden min-h-0">
          {children}
        </div>
      </div>
    </main>
  );
};
