import { NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/get-user';
import supabase from '@/lib/db';

export async function GET(req, { params }) {
  try {
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('expenses')
      .select('*, categories(id, name, color)')
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
    }

    return NextResponse.json({ expense: data });
  } catch (e) {
    console.error('Server error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { amount, currency, note, spentAt, categoryId } = await req.json();

    const updates = {};
    if (amount !== undefined) {
      updates.amount_cents = Math.round(parseFloat(amount) * 100);
      if (updates.amount_cents < 0) {
        return NextResponse.json({ error: 'Amount must be positive' }, { status: 400 });
      }
    }
    if (currency !== undefined) updates.currency = currency;
    if (note !== undefined) updates.note = note;
    if (spentAt !== undefined) updates.spent_at = spentAt;
    if (categoryId !== undefined) updates.category_id = categoryId;

    const { data, error } = await supabase
      .from('expenses')
      .update(updates)
      .eq('id', params.id)
      .eq('user_id', user.id)
      .select('*, categories(id, name, color)')
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Expense not found or update failed' }, { status: 404 });
    }

    return NextResponse.json({ expense: data });
  } catch (e) {
    console.error('Server error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', params.id)
      .eq('user_id', user.id);

    if (error) {
      return NextResponse.json({ error: 'Failed to delete expense' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Server error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
