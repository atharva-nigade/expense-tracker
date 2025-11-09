'use client';

import Link from 'next/link';
import { Command, TrendingUp, PieChart, Calendar, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="glass-header">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Command className="w-6 h-6 text-primary" />
            <span className="font-semibold text-lg">ExpenseTracker</span>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/auth/sign-in">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/sign-up">Get started now</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/5 hover:bg-white/10 mb-8"
              >
                Try it out for free!
              </Button>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Manage your finance effortlessly with ExpenseTracker
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              ExpenseTracker helps you manage money with clarity—smart tools, clean design, and real-time insights.
            </p>

            <Button size="lg" asChild className="mb-4">
              <Link href="/auth/sign-up">Get started now</Link>
            </Button>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary">★</span>
                ))}
              </div>
              <span>Loved by 100k+ users</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20 max-w-6xl mx-auto">
            {[
              {
                icon: TrendingUp,
                title: 'Track Expenses',
                description: 'Monitor all your spending in one place with detailed insights',
              },
              {
                icon: PieChart,
                title: 'Categorize',
                description: 'Organize expenses by custom categories for better analysis',
              },
              {
                icon: Calendar,
                title: 'Reports',
                description: 'View detailed reports and trends over time',
              },
              {
                icon: Shield,
                title: 'Secure',
                description: 'Your financial data is encrypted and protected',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="glass-card p-6 hover:bg-white/10 transition-all"
              >
                <feature.icon className="w-8 h-8 mb-4 text-primary" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="glass-card p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start tracking your expenses today
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of users who are taking control of their finances
            </p>
            <Button size="lg" asChild>
              <Link href="/auth/sign-up">Get started now</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 ExpenseTracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
