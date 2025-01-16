"use client";
import { deleteBudgetDB, getExpenseInfo, getExpensesList } from "@/actions";
import BudgetItem from "@/app/_components/BudgetItem";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import AddExpense from "@/app/_components/AddExpense";
import ExpenseListTable from "@/app/_components/ExpenseListTable";
import { Button } from "@/components/ui/button";
import { PenIcon, Trash2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import EditBudget from "@/app/_components/EditBudget";

const ExpensesComponent = ({ params }) => {
  const { user } = useUser();
  const [expenseInfo, setExpenseInfo] = useState("");
  const [id, setId] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [expenseList, setExpenseList] = useState([]);
  const router = useRouter()

  useEffect(() => {
    const fetchId = async () => {
      const result = await params;
      setId(result.id);
    };
    fetchId();
  }, [params]);

  useEffect(() => {
    const fetchExpense = async (userEmail) => {
      if (user && id) {
        const value = await getExpenseInfo(userEmail, id);
        setExpenseInfo(value);
      }
    };
    user && fetchExpense(user?.primaryEmailAddress?.emailAddress);
  }, [id, user, trigger]);

  useEffect(() => {
    const fetchUserExpense = async () => {
      const result = await getExpensesList(id);
      setExpenseList(result);
    };
    fetchUserExpense();
  }, [id, user, trigger]);

  const triggerRefresh = () => {
    setTrigger((prev) => !prev);
  };

  const deleteBudget = async () => {
    const result = await deleteBudgetDB(id);
    router.replace('/dashboard/budgets')
    toast('Budget Deleted sucessfully')
  }

  return (
    <div className="p-5">
      <div className="flex flex-col sm:flex-row  sm:items-center sm:justify-between p-3">
        <h2 className="text-3xl text-webColours-dark font-bold mb-5">
          My Expenses
        </h2>

        <div className="flex items-center gap-2 mb-3">
        <EditBudget id={id} triggerRefresh={triggerRefresh}></EditBudget>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              Delete Budget <Trash2Icon></Trash2Icon>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                budget along with your expenses
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteBudget()}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 justify-between">
        {expenseInfo ? (
          <BudgetItem budget={expenseInfo}></BudgetItem>
        ) : (
          <Skeleton className="h-63 md:h-32 bg-gray-200" />
        )}
        <div className="col-span-2 border shadow-md p-4 rounded-lg">
          <AddExpense
            id={id}
            triggerRefresh={() => triggerRefresh()}
          ></AddExpense>
        </div>
      </div>
      <div className="mt-5">
        <h2 className="text-3xl text-webColours-dark font-bold mb-5">
          Latest Expenses
        </h2>
        <ExpenseListTable
          expenses={expenseList}
          triggerRefresh={() => triggerRefresh()}
        ></ExpenseListTable>
      </div>
    </div>
  );
};

export default ExpensesComponent;
