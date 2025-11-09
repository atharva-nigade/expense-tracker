'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';

export function RecentExpenses() {
  const [expenses, setExpenses] = useState([]);   // always an array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const res = await fetch('/api/expenses?limit=5');
        const data = await res.json();

        // handle both shapes: array or { expenses: [...] }
        const list = Array.isArray(data) ? data : (data.expenses ?? []);
        setExpenses(list);
      } catch (error) {
        console.error('Failed to fetch expenses:', error);
        setExpenses([]); // keep it an array to avoid .length crash
      } finally {
        setLoading(false);
      }
    }
    fetchExpenses();
  }, []);

  if (loading) {
    return (
      <div className="glass-card p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-white/10 rounded w-48" />
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-white/10 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Recent Expenses</h2>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/expenses" className="flex items-center gap-2">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      {expenses.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground mb-4">No expenses yet</p>
          <Button asChild>
            <Link href="/expenses/new">Add your first expense</Link>
          </Button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Note</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">
                    {new Date(expense.spent_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </TableCell>
                  <TableCell>
                    {expense.category_name ? (
                      <Badge variant="secondary" className="bg-white/5 hover:bg-white/10">
                        {expense.category_name}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground text-sm">Uncategorized</span>
                    )}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {expense.note || '-'}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ₹{(expense.amount_cents / 100).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
