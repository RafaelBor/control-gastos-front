import { Component, inject } from '@angular/core';
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



@Component({
  selector: 'app-expenses',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatButtonModule, MatCardModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export default class ExpensesComponent {
    readonly dialog = inject(MatDialog);

    addExpense(){
      const dialogRef = this.dialog.open(AddExpensesComponent, {
        
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if (result !== undefined) {
        }
      });
    }

    
  
}
