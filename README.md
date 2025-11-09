# ExpenseTracker - Modern Expense Tracking Application

A beautiful, full-featured expense tracking web application built with Next.js, Supabase, and a stunning dark glassmorphic UI design.

## Features

- **Authentication**: Secure email/password authentication with JWT
- **Expense Management**: Add, edit, delete, and categorize expenses
- **Categories**: Create custom categories with color coding
- **Reports & Analytics**: View spending patterns, monthly summaries, and category breakdowns
- **Dashboard**: Real-time overview of spending with KPI cards
- **Dark Theme**: Beautiful glassmorphic UI with gradient backgrounds
- **Responsive Design**: Works seamlessly on desktop and mobile

## Tech Stack

- **Frontend**: Next.js 13 (App Router), React 18, JavaScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT with httpOnly cookies, bcrypt password hashing
- **API**: Next.js API routes

## Prerequisites

- Node.js 18+ and npm
- A Supabase account and project

## Environment Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```env
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   JWT_SECRET=your_jwt_secret_minimum_32_characters
   COOKIE_NAME=expensetracker_session
   NODE_ENV=development
   ```

## Database Setup

The database schema has already been created via Supabase migrations. The schema includes:

- **users** table: User accounts with email/password authentication
- **categories** table: Custom expense categories per user
- **expenses** table: Expense records with amounts, dates, and notes

All tables have Row Level Security (RLS) enabled to ensure users can only access their own data.

## Running the Application

### Development Mode
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

## Application Structure

```
/app
  /api                    # API routes
    /auth                 # Authentication endpoints
    /expenses             # Expense CRUD operations
    /categories           # Category management
    /reports              # Analytics and reporting
  /auth                   # Sign in/up pages
  /dashboard              # Main dashboard
  /expenses               # Expense list and forms
  /categories             # Category management
  /reports                # Reports and analytics
  /settings               # User settings
/components               # Reusable React components
/lib                      # Utility functions
  - db.js                 # Supabase client
  - auth.js               # JWT helpers
  - cookies.js            # Cookie management
  - get-user.js           # User session helpers
/middleware.js            # Route protection
```

## Usage

### First Time Setup

1. Visit the application at `http://localhost:3000`
2. Click "Get started now" or "Sign up"
3. Create an account with your email and password
4. You'll be redirected to the dashboard

### Adding Expenses

1. Click "Add Expense" button (header or dashboard)
2. Fill in the amount, date, category (optional), and note
3. Click "Add Expense" to save

### Managing Categories

1. Navigate to "Categories" from the header
2. Click "Add Category" to create new categories
3. Choose a name and color for organization
4. Edit or delete categories as needed

### Viewing Reports

1. Navigate to "Reports" from the header
2. Select month and year to analyze
3. View spending by category, daily trends, and totals

## Security Features

- Passwords hashed with bcrypt (cost factor 10)
- JWT stored in httpOnly, secure cookies (production)
- Row Level Security (RLS) on all database tables
- Session-based authentication with 7-day expiration
- CSRF protection via sameSite cookie policy

## Design Philosophy

The application features a modern, dark glassmorphic design inspired by premium financial applications:

- Dark gradient backgrounds (zinc/neutral/stone tones)
- Glass-effect cards with backdrop blur
- Warm accent color (amber/gold) for CTAs
- Subtle animations and transitions
- Clean typography and generous spacing
- Mobile-first responsive design

## API Endpoints

### Authentication
- `POST /api/auth/sign-up` - Create new account
- `POST /api/auth/sign-in` - Sign in to existing account
- `POST /api/auth/sign-out` - Sign out current user
- `GET /api/auth/me` - Get current user profile

### Expenses
- `GET /api/expenses` - List expenses (with filters)
- `POST /api/expenses` - Create new expense
- `GET /api/expenses/[id]` - Get single expense
- `PATCH /api/expenses/[id]` - Update expense
- `DELETE /api/expenses/[id]` - Delete expense

### Categories
- `GET /api/categories` - List categories
- `POST /api/categories` - Create category
- `PATCH /api/categories/[id]` - Update category
- `DELETE /api/categories/[id]` - Delete category

### Reports
- `GET /api/reports` - Get analytics (month/year params)

## Troubleshooting

### Build Errors
If you encounter build errors, try:
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Database Connection Issues
- Verify your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Check that your Supabase project is active
- Ensure RLS policies are properly configured

### Authentication Issues
- Verify `JWT_SECRET` is set and at least 32 characters
- Clear browser cookies if experiencing session issues
- Check that `COOKIE_NAME` matches between server and middleware

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Credits

Built with Next.js, Supabase, Tailwind CSS, and shadcn/ui.
"# expense-tracker" 
