import { Expense } from "./expense.interface";
import { ExpensesByMonth, Month } from "./month.interface";

export interface DataMonthResponse {
    month: Month,
    expenses: ExpensesByMonth[]
}