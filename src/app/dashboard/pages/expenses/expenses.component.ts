import { Component, inject, OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {
  MatDialog
} from '@angular/material/dialog';
import { AddExpensesComponent } from './components/add-expenses/add-expenses.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpensesService } from './services/expenses.service';
import { Expense } from '../home/interfaces/expense.interface';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AlertService } from '../../../commons/services/alert.service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-expenses',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatButtonModule, MatCardModule, CommonModule, FormsModule, MatIconModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export default class ExpensesComponent implements OnInit {
    readonly dialog = inject(MatDialog);
    private readonly expenseService = inject(ExpensesService)
    private readonly alertService = inject(AlertService)
    selectedDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    formatedDate: string = '';
    expenses: Expense[] = [];
    totalExpense: number = 0;

    constructor(){}

    ngOnInit(): void {
        this.formatedDate = this.selectedDate.toISOString().split('T')[0];
        this.listExpensesByDate(this.formatedDate)
    }

    addExpense(){
      const dialogRef = this.dialog.open(AddExpensesComponent, {
        data: {
          date: this.formatedDate,
          idExpense: null
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.listExpensesByDate(this.formatedDate);
      });
    }

    addCategory(){
      this.dialog.open(AddCategoryComponent, {});
    }

    onDateChange(): void{
      this.formatedDate = this.selectedDate.toISOString().split('T')[0];
      this.listExpensesByDate(this.formatedDate)
    }

    async deleteExpense(idExpense: string){
      const confirm = await this.alertService.confirm('¿Estas seguro de eliminar el registro?', 'Eliminar gasto')
      
      if(!confirm) return;

      this.expenseService.deleteExpense(idExpense).subscribe({
        next: res => {
          this.alertService.success('El registro se ha eliminado correctamente.')
           this.listExpensesByDate(this.formatedDate);
        },
        error: err => {
          this.alertService.error('Hubo un error al eliminar el registro.')
        }
      })
    }

    async listExpensesByDate(date: string){
      this.expenseService.getListExpensesByDate(date).subscribe({
        next: res => {
          this.expenses     = res.expenses;
          this.totalExpense = res.totalExpense;
        },
        error: err => {
        }
      })
    }

   async editExpense(idExpense: string){
       const dialogRef = this.dialog.open(AddExpensesComponent, {
          data: {
            date: this.formatedDate,
            idExpense: idExpense
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.listExpensesByDate(this.formatedDate);
      });
    }

    
  
}
