"use client"

import React, { useEffect, useState } from 'react'
import SideNav from '../_components/SideNav'
import DashboardHeader from '../_components/DashboardHeader'
import { useUser } from '@clerk/nextjs'
import { getUserBudget } from '@/actions/index'
import { useRouter } from 'next/navigation'

function DashBoardLayout({children}) {

  const {user, isLoaded, isSignedIn} = useUser();
  const router = useRouter()

  useEffect(() => {
    const fetchUserBudget = async (userEmail) => {
      if (isLoaded && isSignedIn && userEmail) {
        const budget = await getUserBudget(userEmail)
  
        // if(budget.length > 0){
        //   router.replace("/dashboard/budgets"); 
        // }
      }
    }
    fetchUserBudget(user?.primaryEmailAddress?.emailAddress)
  }, [isLoaded, isSignedIn, user])

  return (
    <div>
      <div className='fixed hidden md:w-64 md:block h-screen'>
        <SideNav></SideNav>
      </div>
      <div className='md:ml-64'>
        <DashboardHeader></DashboardHeader>
        {children}
      </div>
    </div>
  )
}

export default DashBoardLayout
