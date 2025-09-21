import { Component, computed, input, OnChanges, signal, SimpleChanges } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { ExpensesByMonth } from '../../interfaces/month.interface';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';



@Component({
  selector: 'app-expenses-list',
  standalone: true,
  imports: [MatListModule,MatDividerModule, MatIconModule, MatCheckboxModule, CommonModule],
  templateUrl: './expenses-list.component.html',
  styleUrl: './expenses-list.component.css'
})
export class ExpensesListComponent implements OnChanges {
  public expenses = input<ExpensesByMonth[]>();

  expensesWithCheck = signal<ExpensesByMonth[]>([]);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['expenses']) {
      const modified = (this.expenses() ?? []).map(exp => ({
        ...exp,
        checked: true
      }));
      this.expensesWithCheck.set(modified);
    }
  }

  totalSelectedExpense = computed(() =>
    this.expensesWithCheck()
      .filter(e => e.checked)
      .reduce((sum, e) => sum + Number(e.totalExpense), 0)
  );

  toggleCheck(index: number) {
    const updated = [...this.expensesWithCheck()];
    updated[index].checked = !updated[index].checked;
    this.expensesWithCheck.set(updated);
  }


}
