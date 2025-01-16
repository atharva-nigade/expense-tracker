"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/nextjs";
import { BadgeIndianRupeeIcon, Coins, ReceiptIndianRupee } from "lucide-react";
import React, { useEffect, useState } from "react";

const CardInfo = ({ userBudgetData }) => {
  // console.log(userBudgetData);
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  const { user } = useUser();

  useEffect(() => {
    const calculateData = async () => {
      let _totalBudget = 0;
      let _totalSpend = 0;

      userBudgetData.forEach((element) => {
        _totalBudget += parseFloat(element.amount) || 0;
        _totalSpend += parseFloat(element.totalSpend) || 0;
      });

      setTotalBudget(_totalBudget);
      setTotalSpend(_totalSpend);
    };
    userBudgetData && calculateData();
  }, [user, userBudgetData]);

  return (
    <>
      {userBudgetData && userBudgetData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="p-5 border shadow-md rounded-lg text-lg font-semibold bg-gray-200">
            <h1 className="text-gray-500 flex items-center gap-2">
              Total Budget
              <span className="p-1 bg-webColours-dark rounded-full">
                <Coins size={25} color="white"></Coins>
              </span>
            </h1>
            <h2 className="text-webColours-light font-bold">
              Rs: {totalBudget}
            </h2>
          </div>

          <div className="p-5 border shadow-md rounded-lg text-lg font-semibold bg-gray-200">
            <h1 className="text-gray-500 flex items-center gap-2">
              Total Spend
              <span className="p-1 bg-webColours-dark rounded-full">
                <ReceiptIndianRupee
                  size={25}
                  color="white"
                ></ReceiptIndianRupee>
              </span>
            </h1>
            <h2 className="text-webColours-light font-bold">
              Rs: {totalSpend}
            </h2>
          </div>

          <div className="p-5 border shadow-md rounded-lg text-lg font-semibold bg-gray-200">
            <h1 className="text-gray-500 flex items-center gap-2">
              Total Budgets
              <span className="p-1 bg-webColours-dark rounded-full">
                <BadgeIndianRupeeIcon
                  size={25}
                  color="white"
                ></BadgeIndianRupeeIcon>
              </span>
            </h1>
            <h2 className="text-webColours-light font-bold">
              {userBudgetData.length}
            </h2>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Skeleton className="h-28 bg-gray-300 rounded-lg"></Skeleton>
          <Skeleton className="h-28 bg-gray-300 rounded-lg"></Skeleton>
          <Skeleton className="h-28 bg-gray-300 rounded-lg"></Skeleton>
        </div>
      )}
    </>
  );
};

export default CardInfo;
