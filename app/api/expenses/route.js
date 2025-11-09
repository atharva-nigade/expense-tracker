import { NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/get-user';
import supabase from '@/lib/db';

export async function GET(req) {
  try {
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const categoryId = searchParams.get('categoryId');
    const q = searchParams.get('q');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;

    let query = supabase
      .from('expenses')
      .select('*, categories(id, name, color)', { count: 'exact' })
      .eq('user_id', user.id)
      .order('spent_at', { ascending: false })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (from) {
      query = query.gte('spent_at', from);
    }
    if (to) {
      query = query.lte('spent_at', to);
    }
    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }
    if (q) {
      query = query.ilike('note', `%${q}%`);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Query error:', error);
      return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 });
    }

    return NextResponse.json({
      expenses: data,
      total: count,
      page,
      limit,
      pages: Math.ceil(count / limit)
    });
  } catch (e) {
    console.error('Server error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { amount, currency, note, spentAt, categoryId } = await req.json();

    if (!amount || !spentAt) {
      return NextResponse.json({ error: 'Amount and date are required' }, { status: 400 });
    }

    const amountCents = Math.round(parseFloat(amount) * 100);

    if (amountCents < 0) {
      return NextResponse.json({ error: 'Amount must be positive' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('expenses')
      .insert({
        user_id: user.id,
        amount_cents: amountCents,
        currency: currency || 'INR',
        note: note || null,
        spent_at: spentAt,
        category_id: categoryId || null
      })
      .select('*, categories(id, name, color)')
      .single();

    if (error) {
      console.error('Insert error:', error);
      return NextResponse.json({ error: 'Failed to create expense' }, { status: 500 });
    }

    return NextResponse.json({ expense: data });
  } catch (e) {
    console.error('Server error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
