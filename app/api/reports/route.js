import { NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/get-user';
import supabase from '@/lib/db';

export async function GET(req) {
  try {
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const month = searchParams.get('month');
    const year = searchParams.get('year');

    const today = new Date();
    const targetMonth = month ? parseInt(month) : today.getMonth() + 1;
    const targetYear = year ? parseInt(year) : today.getFullYear();

    const startDate = `${targetYear}-${String(targetMonth).padStart(2, '0')}-01`;
    const endDate = new Date(targetYear, targetMonth, 0);
    const endDateStr = `${targetYear}-${String(targetMonth).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`;

    const { data: expenses, error } = await supabase
      .from('expenses')
      .select('amount_cents, spent_at, category_id, categories(name, color)')
      .eq('user_id', user.id)
      .gte('spent_at', startDate)
      .lte('spent_at', endDateStr);

    if (error) {
      console.error('Query error:', error);
      return NextResponse.json({ error: 'Failed to fetch report data' }, { status: 500 });
    }

    const totalCents = expenses.reduce((sum, exp) => sum + exp.amount_cents, 0);

    const byCategory = expenses.reduce((acc, exp) => {
      const catName = exp.categories?.name || 'Uncategorized';
      if (!acc[catName]) {
        acc[catName] = {
          name: catName,
          color: exp.categories?.color || 'gray',
          total: 0,
          count: 0
        };
      }
      acc[catName].total += exp.amount_cents;
      acc[catName].count += 1;
      return acc;
    }, {});

    const byDate = expenses.reduce((acc, exp) => {
      if (!acc[exp.spent_at]) {
        acc[exp.spent_at] = 0;
      }
      acc[exp.spent_at] += exp.amount_cents;
      return acc;
    }, {});

    const dailySpend = Object.entries(byDate).map(([date, amount]) => ({
      date,
      amount
    })).sort((a, b) => a.date.localeCompare(b.date));

    return NextResponse.json({
      month: targetMonth,
      year: targetYear,
      total: totalCents,
      totalFormatted: (totalCents / 100).toFixed(2),
      expenseCount: expenses.length,
      byCategory: Object.values(byCategory).sort((a, b) => b.total - a.total),
      dailySpend,
      avgPerDay: expenses.length > 0 ? (totalCents / new Date(targetYear, targetMonth, 0).getDate()) : 0
    });
  } catch (e) {
    console.error('Server error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
