import { getUserFromToken } from '@/lib/get-user';
import { redirect } from 'next/navigation';
import { Header } from '@/components/header';
import { ExpenseForm } from '@/components/expense-form';

export default async function NewExpensePage() {
  const user = await getUserFromToken();

  if (!user) {
    redirect('/auth/sign-in');
  }

  return (
    <div className="min-h-screen">
      <Header user={user} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Add Expense</h1>
            <p className="text-muted-foreground">
              Record a new expense transaction
            </p>
          </div>

          <ExpenseForm />
        </div>
      </main>
    </div>
  );
}
