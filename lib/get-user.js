import { getSessionToken } from './cookies';
import { verifyToken } from './auth';
import supabase from './db';

export async function getUserFromToken() {
  const token = getSessionToken();
  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload || !payload.sub) return null;

  const { data, error } = await supabase
    .from('users')
    .select('id, email, name, created_at')
    .eq('id', payload.sub)
    .single();

  if (error || !data) return null;
  return data;
}
