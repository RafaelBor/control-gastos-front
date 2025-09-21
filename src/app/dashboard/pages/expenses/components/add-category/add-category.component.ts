import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {

  MatDialogActions,
  MatDialogClose,
  MatDialogContent,

} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoriesService } from '../../../home/services/category.service';
import { Category } from '../../../home/interfaces/category.interface';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AlertService } from '../../../../../commons/services/alert.service';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ 
      MatFormFieldModule,
       MatInputModule,
       FormsModule,
       MatButtonModule,
       MatDialogContent,
       MatDialogActions,
       MatDialogClose,
       MatSelectModule,
       ReactiveFormsModule,
       MatListModule,
       MatIconModule
      ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit{

  categories: Category[] = []
  categoryForm: FormGroup;
  selectedCategory: Category | null = null;
  isSubmitting = false;
  private  readonly categoriesService = inject(CategoriesService)
  private  readonly alertService = inject(AlertService)


  ngOnInit(): void {
      this.onListCategories()
  }

  constructor(
    private readonly fb: FormBuilder
  ){
      this.categoryForm = this.fb.group({
          name: ['', [Validators.required]],
      });
  }

  onListCategories(){
    this.categoriesService.getlist().subscribe({
      next: res => {
        this.categories = res;
      },
      error: err => {
      }
    })
  }

  sendCategory(){
    if (this.categoryForm.invalid) return;

    const categoryData = this.categoryForm.value;

    if(this.selectedCategory){
        this.categoriesService.updateCategory(categoryData, this.selectedCategory.id).subscribe({
        next: res => {
          this.resetForm();
          this.onListCategories();
          this.alertService.success('Se realizo la actualizacion correctamente.')
        },
        error: err => {
          this.alertService.error('Hubo un error al actualizar el registro');
        }
      })
    }else{
      this.isSubmitting = true;
      this.categoriesService.addCategory(categoryData).subscribe({
        next: res => {
          this.resetForm();
          this.onListCategories();
          this.alertService.success('Se realizo el registro correctamente.')
        },
        error: err => {
          this.alertService.error('Hubo un error al realizar el registro');
        },
        complete: () => {
          this.isSubmitting = false;
        }
      })
    }
  }

  editCategory(category: Category) {
  this.selectedCategory = category;
  this.categoryForm.patchValue({
    name: category.name,
    // Si tienes color o ícono también los puedes cargar aquí
  });
}

resetForm() {
  this.categoryForm.reset();
  this.selectedCategory = null;
}

}
