import { Component, Inject, inject, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ExpensesService } from '../../services/expenses.service';
import { CategoriesService } from '../../../home/services/category.service';
import { Category } from '../../../home/interfaces/category.interface';
import { AlertService } from '../../../../../commons/services/alert.service';
import { Expense } from '../../../home/interfaces/expense.interface';

@Component({
  selector: 'app-add-expenses',
  standalone: true,
  imports: [
    MatFormFieldModule,
     MatInputModule,
     FormsModule,
     MatButtonModule,
     MatDialogTitle,
     MatDialogContent,
     MatDialogActions,
     MatDialogClose,
     MatSelectModule,
     ReactiveFormsModule
  ],
  templateUrl: './add-expenses.component.html',
  styleUrl: './add-expenses.component.css'
})
export class AddExpensesComponent implements OnInit {

  readonly dialog = inject(MatDialog);
  private readonly expensesService = inject(ExpensesService)
  private  readonly categoriesService = inject(CategoriesService)
  expenseForm: FormGroup;
  isUpdate = false;
  categories: Category[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) private  readonly data: any,
    private readonly fb: FormBuilder,
    private  readonly dialogRef: MatDialogRef<AddExpensesComponent>,
    private  readonly alertService: AlertService
  ){
    this.expenseForm = this.fb.group({
        expense: [null, [Validators.required]],
        categoryId: ['', [Validators.required]],
        detail: ['', [Validators.required]],
        date: [this.data.date, [Validators.required]],
    });
  }

  ngOnInit(): void {
      this.onListCategories()
      this.getExpenseById()
  }


  onSaveExpense(){
    console.log(this.expenseForm.value)
    this.expensesService.saveExpense(this.expenseForm.value).subscribe({
      next: res => {
        this.alertService.success('Se realizo el registro correctamente.')
        this.dialogRef.close();
      },
      error: err => {
        this.alertService.error('Hubo un error al realizar el registro');
        console.log(err)
      }
    })
  }

  onListCategories(){
    this.categoriesService.getlist().subscribe({
      next: res => {
        this.categories = res;
      },
      error: err => {
        console.log(err)
      }
    })
  }

  getExpenseById(){

    if(!this.data.idExpense){
      return;
    }
    this.isUpdate = true;
    this.expensesService.getExpenseById(this.data.idExpense).subscribe({
      next: res => {
        this.expenseForm.patchValue({
          expense: Number(res.expense),
          categoryId: res.category.id,
          detail: res.detail
        })
      },
      error: err => {
        console.log(err)
      }
    })

  }

  onUpdateExpense(){
    this.expensesService.updateExpense(this.expenseForm.value, this.data.idExpense).subscribe({
      next: res => {
        this.alertService.success('Se realizo la actualizacion correctamente.')
        this.dialogRef.close();
      },
      error: err => {
        this.alertService.error('Hubo un error al realizar la actualizacion');
        console.log(err)
      }
    })
  }


}
