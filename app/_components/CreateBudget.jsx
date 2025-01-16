"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { insertNewBudget } from "@/actions";
import { toast } from "sonner";

const CreateBudget = ({ refreshData }) => {
  const [data, setData] = useState({ name: " ", amount: "" });
  const { user } = useUser();

  const saveData = async () => {
    const finalData = {
      email: user?.primaryEmailAddress?.emailAddress,
      ...data,
    };
    const result = await insertNewBudget(finalData);
    if (result) {
      toast("New Budget Created Sucessfully");
      refreshData();
      setData({ name: " ", amount: "" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="bg-slate-100 p-10 rounded-lg flex flex-col items-center justify-center border-2 border-dashed
           cursor-pointer hover:shadow-md text-xl font-semibold h-36"
          >
            <h2>+</h2>
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Expense</DialogTitle>
            <div>
              <h1 className="text-webColours-light font-semibold text-sm my-2">
                Budget Name
              </h1>
              <Input
                className="font-semibold text-lg"
                name="name"
                value={data.name}
                onChange={handleChange}
              ></Input>
            </div>
            <div>
              <h1 className="text-webColours-light font-semibold text-sm my-2">
                Budget Amount
              </h1>
              <Input
                className="font-semibold text-lg"
                name="amount"
                value={data.amount}
                onChange={handleChange}
                type="number"
              ></Input>
            </div>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                onClick={() => {
                  saveData();
                }}
                className="rounded-lg w-full"
                disabled={!(data.name && data.amount)}
              >
                Create Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateBudget;
