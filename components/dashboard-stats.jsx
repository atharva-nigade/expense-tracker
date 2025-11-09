'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, Calendar, Wallet, PieChart } from 'lucide-react';

export function DashboardStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();

        const res = await fetch(`/api/reports?month=${month}&year=${year}`);
        const data = await res.json();

        const expensesRes = await fetch('/api/expenses?limit=1000');
        const expensesData = await expensesRes.json();

        const todayStr = today.toISOString().split('T')[0];
        const todayExpenses = expensesData.expenses.filter(
          (e) => e.spent_at === todayStr
        );
        const todayTotal = todayExpenses.reduce((sum, e) => sum + e.amount_cents, 0);

        setStats({
          today: todayTotal,
          month: data.total,
          topCategory: data.byCategory[0] || null,
          expenseCount: data.expenseCount,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card p-6 animate-pulse">
            <div className="h-4 bg-white/10 rounded w-24 mb-4" />
            <div className="h-8 bg-white/10 rounded w-32" />
          </div>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: 'Today Spend',
      value: `₹${((stats?.today || 0) / 100).toFixed(2)}`,
      icon: Wallet,
      color: 'text-blue-400',
    },
    {
      title: 'This Month',
      value: `₹${((stats?.month || 0) / 100).toFixed(2)}`,
      icon: Calendar,
      color: 'text-green-400',
    },
    {
      title: 'Top Category',
      value: stats?.topCategory?.name || 'None',
      subtitle: stats?.topCategory
        ? `₹${(stats.topCategory.total / 100).toFixed(2)}`
        : null,
      icon: PieChart,
      color: 'text-amber-400',
    },
    {
      title: 'Transactions',
      value: stats?.expenseCount || 0,
      icon: TrendingUp,
      color: 'text-purple-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <div key={index} className="glass-card p-6 hover:bg-white/10 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="text-sm text-muted-foreground">{stat.title}</div>
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
          </div>
          <div className="text-2xl font-bold mb-1">{stat.value}</div>
          {stat.subtitle && (
            <div className="text-xs text-muted-foreground">{stat.subtitle}</div>
          )}
        </div>
      ))}
    </div>
  );
}
