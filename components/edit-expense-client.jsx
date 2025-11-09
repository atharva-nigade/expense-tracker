'use client';

import { useEffect, useState } from 'react';
import { ExpenseForm } from '@/components/expense-form';
import { useToast } from '@/hooks/use-toast';

export function EditExpenseClient({ expenseId }) {
  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchExpense() {
      try {
        const res = await fetch(`/api/expenses/${expenseId}`);
        const data = await res.json();

        if (res.ok) {
          setExpense(data.expense);
        } else {
          toast({
            title: 'Error',
            description: 'Expense not found',
            variant: 'destructive',
          });
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load expense',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }

    fetchExpense();
  }, [expenseId, toast]);

  if (loading) {
    return (
      <div className="glass-card p-6 animate-pulse">
        <div className="space-y-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-white/10 rounded w-24" />
              <div className="h-10 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!expense) {
    return (
      <div className="glass-card p-6">
        <p className="text-center text-muted-foreground">Expense not found</p>
      </div>
    );
  }

  return <ExpenseForm expense={expense} />;
}
