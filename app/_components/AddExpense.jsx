"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { addNewExpenseToDB } from "@/actions";
import { toast } from "sonner";

const AddExpense = ({id, triggerRefresh}) => {

  const [data, setData] = useState({ name: " ", amount: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewExpense = async () => {
    const finalData = {
      ...data,
      budgetId: id
    }
    const result = await addNewExpenseToDB(finalData)

    if(result){
      triggerRefresh()
      toast('New Expense Added Sucessfully')
      setData({ name: " ", amount: "" })
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-webColours-dark">
        Add New Expense
      </h2>
      <div>
        <h1 className="text-webColours-light font-semibold text-sm my-2">
          Expense Name
        </h1>
        <Input
          className="font-semibold text-lg"
          name="name"
          value={data.name}
          onChange={handleChange}
        ></Input>
      </div>
      <div className="mb-4">
        <h1 className="text-webColours-light font-semibold text-sm my-2">
          Expense Amount
        </h1>
        <Input
          className="font-semibold text-lg"
          name="amount"
          value={data.amount}
          onChange={handleChange}
          type="number"
        ></Input>
      </div>
      <Button
        className="rounded-lg w-full"
        disabled={!(data.name && data.amount)}
        onClick={() => addNewExpense()}
      >
        Add New Expense
      </Button>
    </div>
  );
};

export default AddExpense;
