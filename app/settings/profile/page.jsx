import { getUserFromToken } from '@/lib/get-user';
import { redirect } from 'next/navigation';
import { Header } from '@/components/header';
import { ProfileSettings } from '@/components/profile-settings';

export default async function ProfilePage() {
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
            <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
            <p className="text-muted-foreground">
              Manage your account information
            </p>
          </div>

          <ProfileSettings user={user} />
        </div>
      </main>
    </div>
  );
}
