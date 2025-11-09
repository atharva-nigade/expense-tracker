# ExpenseTracker - Complete Setup Guide

## Quick Start

This guide will help you set up the ExpenseTracker application from scratch.

## Step 1: Supabase Setup

### 1.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/sign in
2. Click "New Project"
3. Fill in:
   - Project name: `expense-tracker` (or your choice)
   - Database password: Generate a strong password
   - Region: Choose closest to your users
4. Wait for the project to be created (~2 minutes)

### 1.2 Get Your API Keys

1. In your Supabase project dashboard, go to "Settings" → "API"
2. Copy these values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

### 1.3 Database Migration Already Done

The database schema has already been applied to your Supabase project via the MCP tool. You should see these tables:
- `users`
- `categories`
- `expenses`

To verify, go to "Table Editor" in your Supabase dashboard.

## Step 2: Local Project Setup

### 2.1 Clone and Install

```bash
# Navigate to project directory
cd /path/to/project

# Install dependencies
npm install
```

### 2.2 Environment Variables

Create a `.env.local` file in the project root:

```env
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Supabase (from Step 1.2)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# JWT Secret (generate a strong random string)
JWT_SECRET=your-secret-minimum-32-characters-long
COOKIE_NAME=expensetracker_session
```

**Important:**
- Replace `your-project` and `your-anon-key-here` with actual values from Supabase
- Generate a strong JWT_SECRET (at least 32 characters)
- NEVER commit `.env.local` to version control

### 2.3 Generate JWT Secret

You can generate a secure JWT secret using Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and use it as your `JWT_SECRET`.

## Step 3: Run the Application

### Development Mode

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

## Step 4: Create Your First Account

1. Visit `http://localhost:3000`
2. Click "Get started now"
3. Fill in:
   - Name: Your name
   - Email: your@email.com
   - Password: Minimum 8 characters
4. Click "Sign up"
5. You'll be automatically signed in and redirected to the dashboard

## Step 5: Add Sample Data (Optional)

### Create Categories

1. Navigate to "Categories" in the header
2. Click "Add Category"
3. Create categories like:
   - Food (Rose color)
   - Transport (Sky color)
   - Shopping (Amber color)
   - Entertainment (Purple color)

### Add Expenses

1. Click "Add Expense" button
2. Fill in:
   - Amount: e.g., 250.50
   - Date: Select today or any date
   - Category: Choose from your categories
   - Note: "Lunch at restaurant" (optional)
3. Click "Add Expense"
4. Repeat to add more expenses

## Verification Checklist

After setup, verify everything works:

- [ ] Sign up creates a new account
- [ ] Sign in works with correct credentials
- [ ] Dashboard shows KPI cards (will show zeros initially)
- [ ] Can create categories with different colors
- [ ] Can add expenses with amount, date, and category
- [ ] Expenses list shows all added expenses
- [ ] Can edit an expense
- [ ] Can delete an expense
- [ ] Reports page shows monthly summary
- [ ] Can sign out and sign back in
- [ ] Session persists across page refreshes

## Troubleshooting

### "Unauthorized" errors

**Problem:** API calls return 401 Unauthorized

**Solutions:**
1. Check that your Supabase URL and anon key are correct in `.env.local`
2. Restart the dev server after changing `.env.local`
3. Clear browser cookies and sign in again

### "Failed to fetch" errors

**Problem:** API calls fail to reach the server

**Solutions:**
1. Make sure the dev server is running (`npm run dev`)
2. Check that you're accessing `http://localhost:3000` (not a different port)
3. Verify firewall isn't blocking localhost connections

### Database connection errors

**Problem:** "Failed to connect to database"

**Solutions:**
1. Verify your Supabase project is active (not paused)
2. Check your database password if directly connecting
3. Confirm the `NEXT_PUBLIC_SUPABASE_URL` format is correct

### JWT/Cookie issues

**Problem:** Session doesn't persist or authentication fails

**Solutions:**
1. Ensure `JWT_SECRET` is at least 32 characters
2. Check that `COOKIE_NAME` is set correctly
3. Try clearing browser cookies
4. In development, make sure cookies aren't blocked

### Build errors

**Problem:** `npm run build` fails

**Solutions:**
```bash
# Clean and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

## Production Deployment

### Environment Variables

For production deployment (e.g., Vercel, Netlify), set these environment variables:

```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
JWT_SECRET=your_production_jwt_secret_at_least_32_chars
COOKIE_NAME=expensetracker_session
```

### Deployment Checklist

- [ ] Set all environment variables in hosting platform
- [ ] JWT_SECRET is different from development
- [ ] NEXT_PUBLIC_APP_URL matches your domain
- [ ] Supabase project is in production mode
- [ ] RLS policies are properly configured
- [ ] Test authentication flow end-to-end
- [ ] Test all CRUD operations
- [ ] Verify reports and analytics work

## Security Best Practices

1. **Never commit secrets**: Always use `.env.local` and add it to `.gitignore`
2. **Strong JWT secret**: Use cryptographically secure random strings (32+ chars)
3. **HTTPS in production**: Always use HTTPS for production deployments
4. **Rotate secrets**: Periodically update JWT_SECRET in production
5. **Monitor access**: Check Supabase logs for suspicious activity
6. **Rate limiting**: Consider adding rate limiting for auth endpoints

## Support

For issues or questions:
1. Check this setup guide first
2. Review the main README.md
3. Check Supabase documentation for database issues
4. Check Next.js documentation for framework issues

## Next Steps

Once everything is working:

1. **Customize categories**: Add categories that match your spending patterns
2. **Import existing data**: If you have CSV exports from other apps
3. **Set budgets**: Plan to add budget tracking features
4. **Mobile optimization**: Test on mobile devices and tablets
5. **Export reports**: Add CSV/PDF export functionality
6. **Recurring expenses**: Implement recurring expense tracking

Happy tracking! 💰
