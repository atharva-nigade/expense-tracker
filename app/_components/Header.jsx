"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { HandCoins } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { user, isSignedIn, isLoaded } = useUser();

  return (
    <div className="p-5 flex items-center justify-between shadow-sm">
      {/* Logo Container */}
      <div className="flex items-center gap-4">
        <HandCoins size={60} color="#254336"></HandCoins>
        <div className="hidden sm:flex items-center gap-1 text-3xl">
          <h2 className="font-bold text-webColours-dark">Expense</h2>
          <p className="text-gray-400">Tracker</p>
        </div>
      </div>

      {(isSignedIn && isLoaded) ? (
        <UserButton></UserButton>
      ) : (
        <Link href={"/dashboard"}>
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
