import { getUserFromToken } from '@/lib/get-user';
import { redirect } from 'next/navigation';
import { Header } from '@/components/header';
import { DashboardStats } from '@/components/dashboard-stats';
import { RecentExpenses } from '@/components/recent-expenses';

export default async function DashboardPage() {
  const user = await getUserFromToken();

  if (!user) {
    redirect('/auth/sign-in');
  }

  return (
    <div className="min-h-screen">
      <Header user={user} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user.name || 'there'}! Here's your financial overview.
          </p>
        </div>

        <DashboardStats />
        <RecentExpenses />
      </main>
    </div>
  );
}
