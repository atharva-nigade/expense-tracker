import { date } from "drizzle-orm/mysql-core";
import { Trash2Icon } from "lucide-react";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteExpenseFromDb } from "@/actions";
import { toast } from "sonner";

const ExpenseListTable = ({ expenses, triggerRefresh }) => {

  const deleteExpense = async (id) => {
    const result = await deleteExpenseFromDb(id)
    triggerRefresh()
    toast('Expense Deleted Sucessfully')
  }

  return (
    <div className="w-full p-2">
      <Table className=" bg-gray-100 w-[600px]">
        <TableHeader>
          <TableRow>
            <TableHead className="text-webColours-light font-bold text-lg">Name</TableHead>
            <TableHead className="text-webColours-light font-bold text-lg">Amount</TableHead>
            <TableHead className="text-webColours-light font-bold text-lg">Date</TableHead>
            <TableHead className="text-webColours-light font-bold text-lg">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {expenses.map((item, index) => {
            const { id, name, amount, createdAt } = item;
            const time = new Date(item.createdAt).toTimeString().split(" ")[0];

            return (
              <TableRow key={index} className="font-semibold text-[16px] hover:bg-webColours-light h-4 hover:text-white">
                <TableCell>{name}</TableCell>
                <TableCell>{amount}</TableCell>
                <TableCell>{time}</TableCell>
                <TableCell>
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

export default ExpenseListTable;
