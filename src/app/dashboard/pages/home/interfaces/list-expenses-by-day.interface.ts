import { Expense } from "./expense.interface";

export interface ExpensesByDayResponse {
    expenses:     Expense[];
    totalExpense: number;
}