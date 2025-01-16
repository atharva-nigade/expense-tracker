"use client"

import { HandCoins, House, Landmark, ReceiptIndianRupee, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideNav = () => {

  const menuList = [
    {id: 1, name:"Dashboard", path: '/dashboard', icon: <House></House>},
    {id: 2, name: "Budgets", path:'/dashboard/budgets', icon: <Landmark></Landmark>},
    {id: 3, name: "Expenses", path:'/dashboard/expenses', icon: <ReceiptIndianRupee></ReceiptIndianRupee>},
    {id: 4, name: "Upgrade", path:'/dashboard/upgrade', icon: <ShieldCheck></ShieldCheck>},
  ]

  const path = usePathname();
  
  return (
    <div className="p-3 border h-full shadow-sm">
      <div className="flex items-center gap-2">
        <HandCoins size={50} color="#254336"></HandCoins>
        <div className="flex items-center gap-1 text-[23px]">
          <h2 className="font-bold text-webColours-dark">Expense</h2>
          <p className="text-gray-400 ">Tracker</p>
        </div>
      </div>
      
      <hr  className="bg-slate-500 w-full my-2"/>
      <div className="mt-5">
        {
          menuList.map((menu) => (
            <Link href={menu.path} key={menu.id}>
              <h2 className={`flex items-center gap-3
              p-4 rounded-xl font-semibold text-xl hover:bg-webColours-light
              transition-all hover:text-white mb-2 
              ${(path === menu.path) ? ("bg-webColours-dark text-white ") : ("")}`}>
              {menu.icon}{menu.name}
              </h2>
            </Link>
          ))
        }
      </div>


    </div>
  );
};

export default SideNav;
