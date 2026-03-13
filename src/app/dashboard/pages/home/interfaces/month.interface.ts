export interface Month {
    id:              string;
    date_month:      Date;
    salary_montly:   number;
    savings_montly:  number;
    expenses_montly: number;
}

export interface ExpensesByMonth {
    categoryId:   string;
    categoryName: string;
    color:        string;
    totalExpense: string;
    checked?: boolean
}