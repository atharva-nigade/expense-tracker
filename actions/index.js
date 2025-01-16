import { drizzle } from "drizzle-orm/neon-http";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/db/schema";

// Initialize the database connection
const db = drizzle(
  "postgresql://neondb_owner:IbqO7fy1edMs@ep-sweet-recipe-a5sc47nj.us-east-2.aws.neon.tech/expense_db?sslmode=require"
);

export const getUserBudget = async (userEmail) => {
  const tableEmail = Budgets.email;
  const result = await db
    .select()
    .from(Budgets)
    .where(eq(userEmail, tableEmail));
  return result
};

export const insertNewBudget = async (data) => {
  const newBudget = await db.insert(Budgets).values(data)
  return newBudget
}

export const updateBudget = async(id, data) => {
  const result = await db.update(Budgets).set(data)
  .where(eq(Budgets.id, id))
  return result
}

export const getAllUserBudget = async (userEmail) => {
  const tableEmail = Budgets.email;
  const result = await db
    .select({
      ...getTableColumns(Budgets),
      totalSpend:sql `SUM(${Expenses.amount})`.mapWith(Number),
      totalItems: sql `count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
    .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
    .where(eq(tableEmail, userEmail))
    .groupBy(Budgets.id)
    .orderBy(desc(Budgets.id))
  
  return result;
}

export const getSpecificIdBudget = async (id) => {
  const result = await db
    .select()
    .from(Budgets)
    .where(eq(Budgets.id, id)) 
  return result[0];
}

export const getExpensesListUsingEmail = async (userEmail) => {
  const result = await db
  .select({
    id: Expenses.id,
    name: Expenses.name,
    amount: Expenses.amount,
    createdAt: Expenses.createdAt,
    budgetName: Budgets.name,
    budgetAmount: Budgets.amount
  })
  .from(Budgets)
  .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
  .where(eq(Budgets.email, userEmail))
  return result
}

export const getExpenseInfo = async (userEmail, id) => {
  const tableEmail = Budgets.email;
  const result = await db
    .select({
      ...getTableColumns(Budgets),
      totalSpend:sql `SUM(${Expenses.amount})`.mapWith(Number),
      totalItems: sql `count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
    .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
    .where(eq(tableEmail, userEmail))
    .where(eq(Budgets.id, id))
    .groupBy(Budgets.id)
  
  return result[0];
}


export const addNewExpenseToDB = async (data) => {
  const result = await db.insert(Expenses).values(data)
  return result
}

export const getExpensesList = async (id) => {
  const result = await db
  .select()
  .from(Expenses)
  .where(eq(Expenses.budgetId, id))
  .orderBy(desc(Expenses.id))
  return result;
}


export const deleteExpenseFromDb = async (id) => {
  const result = await db.delete(Expenses)
  .where(eq(Expenses.id, id))
  return result
}

export const deleteBudgetDB = async (id) => {
  const deleteExpense = await db.delete(Expenses).where(eq(Expenses.budgetId, id));

  let result = '';

  if (deleteExpense) {
    result = await db.delete(Budgets).where(eq(Budgets.id, id));
  } else {
    console.error("Failed to delete related expenses");
  }
  
  return result;
};
