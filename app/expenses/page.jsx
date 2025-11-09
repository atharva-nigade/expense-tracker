import { getUserFromToken } from '@/lib/get-user';
import { redirect } from 'next/navigation';
import { Header } from '@/components/header';
import { ExpensesList } from '@/components/expenses-list';

export default async function ExpensesPage() {
  const user = await getUserFromToken();

  if (!user) {
    redirect('/auth/sign-in');
  }

  return (
    <div className="min-h-screen">
      <Header user={user} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Expenses</h1>
          <p className="text-muted-foreground">
            Track and manage all your expenses
          </p>
        </div>

        <ExpensesList />
      </main>
    </div>
  );
}
