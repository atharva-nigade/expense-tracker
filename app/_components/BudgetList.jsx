"use client"

import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { getAllUserBudget } from '@/actions/index'
import { useUser } from '@clerk/nextjs'
import BudgetItem from './BudgetItem'
import { Skeleton } from '@/components/ui/skeleton'


const BudgetList = () => {
  const {user} = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    const fetchUserExpenses = async (usereEmail) => {
      const result = await getAllUserBudget(usereEmail);
      setBudgetList(result)
    }
    user && fetchUserExpenses(user?.primaryEmailAddress?.emailAddress)
  }, [user, trigger])

  const refreshData = () => {
    setTrigger((prev) => !prev)
  }

  return (
    <div className='mt-7'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
      <CreateBudget refreshData={()=>refreshData()}></CreateBudget>
      {
        (budgetList.length > 0) ? (
          budgetList.map((budget, index) => (
            <BudgetItem key={index} budget={budget}></BudgetItem>
          ))
        ) : (
          [1, 2, 3, 4, 5].map((index) => (
            <Skeleton className="h-63 md:h-32 bg-gray-200" key={index} />
          ))
        )
      }
      </div>
    </div>
  )
}

export default BudgetList
