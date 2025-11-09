import { getUserFromToken } from '@/lib/get-user';
import { redirect } from 'next/navigation';
import { Header } from '@/components/header';
import { CategoriesList } from '@/components/categories-list';

export default async function CategoriesPage() {
  const user = await getUserFromToken();

  if (!user) {
    redirect('/auth/sign-in');
  }

  return (
    <div className="min-h-screen">
      <Header user={user} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Categories</h1>
          <p className="text-muted-foreground">
            Organize your expenses with categories
          </p>
        </div>

        <CategoriesList />
      </main>
    </div>
  );
}
