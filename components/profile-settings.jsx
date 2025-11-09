'use client';

import { useState } from 'react';
import { User, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export function ProfileSettings({ user }) {
  const [name, setName] = useState(user?.name || '');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function handleUpdateProfile(e) {
    e.preventDefault();
    setLoading(true);

    try {
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-6">Account Information</h2>

        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={user?.email || ''}
                disabled
                className="pl-9 bg-white/5 border-white/10 opacity-50"
              />
            </div>
            <p className="text-xs text-muted-foreground">Email cannot be changed</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-9 bg-white/5 border-white/10"
              />
            </div>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </div>

      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4">Account Details</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-2 border-b border-white/10">
            <span className="text-muted-foreground">Member since</span>
            <span className="font-medium">
              {new Date(user?.created_at).toLocaleDateString('en-IN', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">User ID</span>
            <span className="font-mono text-xs">{user?.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
