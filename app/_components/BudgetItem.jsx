import { IndianRupee } from "lucide-react";
import Link from "next/link";
import React from "react";

const BudgetItem = ({ budget }) => {
  const { id, name, amount, totalSpend, totalItems } = { ...budget };

  const calculateProgressWidth = (spend, total) => {
    const result = (spend / total) * 100;
    return result.toFixed(2);
  }

  return (
    <Link href={`/dashboard/expenses/${id}`}>
      <div
        className=" p-3 rounded-lg border-2
        cursor-pointer hover:shadow-md h-63 md:h-36"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-lg gap-2 font-semibold">
            <h2 className="text-webColours-dark text-re">{name}</h2>
            <h2>{totalItems} Items</h2>
          </div>
          <div
            className="flex items-center gap-1 bg-webColours-light
          p-[3px] rounded-lg"
          >
            <IndianRupee color="#ffffff"></IndianRupee>
            <h2 className="font-bold text-xl text-white">{amount}</h2>
          </div>
        </div>

        <hr className="w-full h-[2px] bg-gray-400 mb-2" />

        <div className="text-md flex items-center justify-between font-semibold">
          <h2 className="text-gray-400">
            Total Spend:{" "}
            <span className="text-webColours-light">
              {totalSpend > 0 ? totalSpend : 0}
            </span>
          </h2>
          <h2 className="text-gray-400">
            Amount Left:{" "}
            <span className=" text-webColours-light">
              {amount - totalSpend}
            </span>
          </h2>
        </div>

        <div className="w-full bg-slate-400 h-2 mt-3 rounded-lg">
          <div className='bg-webColours-primary h-2 rounded-lg'
          style={{ width: `${calculateProgressWidth(totalSpend, amount)}%` }}></div>
        </div>
      </div>
    </Link>
  );
};

export default BudgetItem;
