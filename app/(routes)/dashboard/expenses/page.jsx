"use client";

import { deleteExpenseFromDb, getExpensesListUsingEmail } from "@/actions";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ExpensesPage = () => {
  const { user } = useUser();
  const [expenses, setExpenses] = useState([]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const fetchAllExpenses = async (email) => {
      const result = await getExpensesListUsingEmail(email);
      setExpenses(result);
    };
    user && fetchAllExpenses(user?.primaryEmailAddress?.emailAddress);
  }, [user, trigger]);

  const triggerRefresh = () => {
    setTrigger((prev) => !prev);
  };

  const deleteExpense = async (id) => {
    const result = await deleteExpenseFromDb(id)
    triggerRefresh()
    toast('Expense Deleted Sucessfully')
  }

  return (
    <div className="p-4">
      <Table className=" bg-gray-100 rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead className="text-webColours-light font-bold text-lg">
              Budget Name
            </TableHead>
            <TableHead className="text-webColours-light font-bold text-lg">
              Budget Amount
            </TableHead>
            <TableHead className="text-webColours-light font-bold text-lg">
              Name
            </TableHead>
            <TableHead className="text-webColours-light font-bold text-lg">
              Amount
            </TableHead>
            <TableHead className="text-webColours-light font-bold text-lg">
              Date
            </TableHead>
            <TableHead className="text-webColours-light font-bold text-lg">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {expenses.map((item, index) => {
            const { id, name, amount, createdAt, budgetAmount, budgetName } = item;
            const time = new Date(createdAt).toTimeString().split(" ")[0];

            return (
              <TableRow
                key={index}
                className="font-semibold text-[16px] hover:bg-webColours-light 
              h-4 hover:text-white"
              >
                <TableCell className="rounded-l-md">{budgetName}</TableCell>
                <TableCell>{budgetAmount}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{amount}</TableCell>
                <TableCell>{time}</TableCell>
                <TableCell className="rounded-r-md">
                  <Trash2Icon className="text-red-600 cursor-pointer" onClick={() => deleteExpense(id)}></Trash2Icon>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExpensesPage;
