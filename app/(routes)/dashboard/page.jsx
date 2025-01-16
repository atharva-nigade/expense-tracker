"use client";

import { getAllUserBudget } from "@/actions";
import BarChartGraph from "@/app/_components/BarChartGraph";
import BudgetItem from "@/app/_components/BudgetItem";
import CardInfo from "@/app/_components/CardInfo";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

const DashBoardPage = () => {
  const { user } = useUser();
  const [userBudgetData, setUserBudgetData] = useState([])

  // get userBudget
  useEffect(() => {
    const fetchUserBudgetData = async (userEmail) => {
      const result = await getAllUserBudget(userEmail);
      setUserBudgetData(result) 
    }
    user && fetchUserBudgetData(user?.primaryEmailAddress?.emailAddress)
  }, [user])

  return (
    <div className="p-4">
      <h1 className="text-2xl">
        Hii
        <span className="font-semibold ml-2 text-webColours-dark">
          {user?.fullName} 🖐️
        </span>
      </h1>
      <p className="font-semibold text-gray-500">Get Full Analyze Details About Your Expenses</p>
    
    <div className="mt-7">
      <CardInfo userBudgetData={userBudgetData} user={user}></CardInfo>
    </div>

    <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 mt-8">
      <div className="lg:col-span-2">
        <BarChartGraph data={userBudgetData}></BarChartGraph>
      </div>
      <div className="lg:col-span-1">
        <h1 className="text-2xl font-semibold ml-2 text-webColours-dark mb-2">Recent Budgets</h1>
        {userBudgetData.slice(0, 2).map((item, index) => (
          <BudgetItem budget={item} key={index}></BudgetItem>
        ))}
      </div>
      </div>
    </div>
  );
};

export default DashBoardPage;
