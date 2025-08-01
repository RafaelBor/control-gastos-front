import { User } from "../../../../auth/interfaces/user.interface";
import { Category } from "./category.interface";
import { Month } from "./month.interface";

export interface Expense {
    id:         string;
    date:       Date;
    expense:    string;
    monthId:    string;
    categoryId: string;
    detail:     string;
    usuario:    User;
    month:      Month;
    category:   Category;
}