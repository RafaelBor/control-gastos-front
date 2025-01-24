import { Component, inject } from '@angular/core';
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
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

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
     MatSelectModule
  ],
  templateUrl: './add-expenses.component.html',
  styleUrl: './add-expenses.component.css'
})
export class AddExpensesComponent {

  readonly dialog = inject(MatDialog);


}
