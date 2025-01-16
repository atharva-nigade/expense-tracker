"use client";

import { UserButton } from "@clerk/nextjs";
import { AlignJustify } from "lucide-react";
import React from "react";
import { useState } from "react";
import SideNav from "./SideNav";
import { Button } from "@/components/ui/button";

const DashboardHeader = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  return (
    <div className="">
      <div className="p-4 border justify-between shadow-sm flex md:items-center md:justify-end">
        <div className="block md:hidden">
          <Button onClick={() => toggleSidebar()}><AlignJustify></AlignJustify></Button>
        </div>
        <div>
          <UserButton></UserButton>
        </div>
      </div>

      <div
        className="fixed top-0 left-0 h-full bg-gray-100 shadow-md transform transition-transform duration-300 ease-in-out"
        style={{
          transform: isSidebarVisible ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <SideNav></SideNav>
      </div>
    </div>
  );
};

export default DashboardHeader;
