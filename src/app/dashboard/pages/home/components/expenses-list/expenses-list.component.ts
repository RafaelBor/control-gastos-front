import { Component, input } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { ExpensesByMonth } from '../../interfaces/month.interface';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-expenses-list',
  standalone: true,
  imports: [MatListModule,MatDividerModule, MatIconModule, CommonModule],
  templateUrl: './expenses-list.component.html',
  styleUrl: './expenses-list.component.css'
})
export class ExpensesListComponent {
  public expenses = input<ExpensesByMonth[]>();

}
