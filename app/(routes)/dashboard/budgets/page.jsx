import BudgetList from '@/app/_components/BudgetList'
import React from 'react'

const BudgetsPage = () => {
  return (
    <div className='p-5'>
      <h2 className='font-bold text-3xl text-gray-500'>My Budgets</h2>
      <BudgetList></BudgetList>
    </div>
  )
}

export default BudgetsPage
