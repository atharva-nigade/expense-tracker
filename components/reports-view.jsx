'use client';

import { useEffect, useState } from 'react';
import { Calendar, TrendingUp, PieChart } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function ReportsView() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchReport();
  }, [month, year]);

  async function fetchReport() {
    setLoading(true);
    try {
      const res = await fetch(`/api/reports?month=${month}&year=${year}`);
      const data = await res.json();
      setReport(data);
    } catch (error) {
      console.error('Failed to fetch report:', error);
    } finally {
      setLoading(false);
    }
  }

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="glass-card p-6 animate-pulse">
            <div className="h-6 bg-white/10 rounded w-48 mb-4" />
            <div className="h-32 bg-white/10 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Select value={month.toString()} onValueChange={(v) => setMonth(parseInt(v))}>
            <SelectTrigger className="bg-white/5 border-white/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-card">
              {months.map((m, i) => (
                <SelectItem key={i} value={(i + 1).toString()}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={year.toString()} onValueChange={(v) => setYear(parseInt(v))}>
            <SelectTrigger className="bg-white/5 border-white/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-card">
              {years.map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white/5 rounded-xl">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-400" />
            <div className="text-sm text-muted-foreground mb-1">Total Spent</div>
            <div className="text-3xl font-bold">₹{report?.totalFormatted || '0.00'}</div>
          </div>

          <div className="text-center p-6 bg-white/5 rounded-xl">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-400" />
            <div className="text-sm text-muted-foreground mb-1">Transactions</div>
            <div className="text-3xl font-bold">{report?.expenseCount || 0}</div>
          </div>

          <div className="text-center p-6 bg-white/5 rounded-xl">
            <PieChart className="w-8 h-8 mx-auto mb-2 text-amber-400" />
            <div className="text-sm text-muted-foreground mb-1">Avg per Day</div>
            <div className="text-3xl font-bold">
              ₹{((report?.avgPerDay || 0) / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-6">Spending by Category</h2>

        {!report?.byCategory || report.byCategory.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No expenses in this period</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead className="text-center">Transactions</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">% of Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {report.byCategory.map((cat) => (
                <TableRow key={cat.name}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full bg-${cat.color}-400`} />
                      {cat.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{cat.count}</TableCell>
                  <TableCell className="text-right font-semibold">
                    ₹{(cat.total / 100).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary" className="bg-white/5">
                      {((cat.total / report.total) * 100).toFixed(1)}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {report?.dailySpend && report.dailySpend.length > 0 && (
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-6">Daily Spending</h2>
          <div className="space-y-2">
            {report.dailySpend.map((day) => (
              <div key={day.date} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-sm">
                  {new Date(day.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </span>
                <span className="font-semibold">₹{(day.amount / 100).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
