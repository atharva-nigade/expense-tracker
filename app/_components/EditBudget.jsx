"use client"

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PenIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useUser } from "@clerk/nextjs";
import { getSpecificIdBudget, getUserBudget, updateBudget } from "@/actions";
import { toast } from "sonner";

const EditBudget = ({id, triggerRefresh}) => {

  const {user} = useUser()
  const [data, setData] = useState({ name: " ", amount: "" });

  const saveData = async () => {
    const finalData = {
      email: user?.primaryEmailAddress?.emailAddress,
      ...data,
    };

    const result = await updateBudget(id, finalData);

    if(result){
      toast("Budget Updated Sucessfully")
      triggerRefresh()
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userBudgetData = await getSpecificIdBudget(id)
    const {name, amount} = {...userBudgetData}
    setData({name, amount})
    }
    id && fetchData()
  }, [id])
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <PenIcon></PenIcon> Edit Budget
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit the Budget</DialogTitle>
          </DialogHeader>

          <DialogDescription asChild>
          <div>
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
          </div>
          </DialogDescription>

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
    </div>
  );
};

export default EditBudget;
