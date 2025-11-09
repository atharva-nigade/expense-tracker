'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export function ExpenseForm({ expense = null }) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    amount: expense ? (expense.amount_cents / 100).toString() : '',
    spentAt: expense?.spent_at || new Date().toISOString().split('T')[0],
    // DO NOT use empty string here
    categoryId: expense?.category_id ? String(expense.category_id) : undefined,
    note: expense?.note || '',
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : (data.categories ?? []));
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setCategories([]);
      }
    }
    fetchCategories();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const url = expense ? `/api/expenses/${expense.id}` : '/api/expenses';
      const method = expense ? 'PATCH' : 'POST';

      // Map sentinel 'none' to null
      const categoryId = formData.categoryId === 'none' ? null : formData.categoryId;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(formData.amount),
          spentAt: formData.spentAt,
          categoryId,
          note: formData.note,
          currency: 'INR',
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: 'Success',
          description: expense ? 'Expense updated successfully' : 'Expense added successfully',
        });
        router.push('/expenses');
        router.refresh();
      } else {
        toast({ title: 'Error', description: data.error || 'Failed to save expense', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Error', description: 'Something went wrong', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 space-y-6">
      {/* Amount */}
      <div className="space-y-2">
        <Label htmlFor="amount">Amount (₹)</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          required
          className="bg-white/5 border-white/10"
        />
      </div>

      {/* Date */}
      <div className="space-y-2">
        <Label htmlFor="spentAt">Date</Label>
        <Input
          id="spentAt"
          type="date"
          value={formData.spentAt}
          onChange={(e) => setFormData({ ...formData, spentAt: e.target.value })}
          required
          className="bg-white/5 border-white/10"
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.categoryId}
          onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
        >
          <SelectTrigger className="bg-white/5 border-white/10">
            <SelectValue placeholder="Select category (optional)" />
          </SelectTrigger>
          <SelectContent className="glass-card">
            {/* Use a non-empty sentinel value */}
            <SelectItem value="none">Uncategorized</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={String(cat.id)}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Note */}
      <div className="space-y-2">
        <Label htmlFor="note">Note</Label>
        <Textarea
          id="note"
          placeholder="Add a note (optional)"
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          className="bg-white/5 border-white/10 min-h-[100px]"
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? 'Saving...' : expense ? 'Update Expense' : 'Add Expense'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
}
