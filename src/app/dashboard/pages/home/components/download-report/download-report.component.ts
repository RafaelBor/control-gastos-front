import { Component, input } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { ExpensesByMonth } from '../../interfaces/month.interface';
import { CommonModule } from '@angular/common';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
  } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, DateAdapter  } from '@angular/material/core'; // Para usar Date nativo
import { HomeService } from '../../services/home.service';
import { AlertService } from '../../../../../commons/services/alert.service';




@Component({
  selector: 'app-download-report',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDatepickerModule,
    MatNativeDateModule
       
    ],
  templateUrl: './download-report.component.html',
  styleUrl: './download-report.component.css'
})
export class DownloadReportComponent {

    range: FormGroup;
    maxDate: Date;
    constructor(
      private readonly fb: FormBuilder, 
      private readonly adapter: DateAdapter<Date>,
      private readonly homeService: HomeService,
      private readonly alertService: AlertService
    ) {
      this.range = this.fb.group({
        start: [null],
        end: [null]
      });
      this.adapter.setLocale('es-MX');

      const today = new Date();
      this.maxDate = new Date(today.getFullYear(), 11, 31);
    }

  chosenMonthHandler(normalizedMonth: Date, controlName: string, datepicker: any) {
  const selectedYear = normalizedMonth.getFullYear();
  const currentYear = new Date().getFullYear();
    this.range.get(controlName)?.setValue(normalizedMonth);
      if (selectedYear > currentYear) {
    return; // ignora selección
  }

  this.range.get(controlName)?.setValue(normalizedMonth);
  datepicker.close();
  }

  download(){
    const { start, end } = this.range.value;

    const startDate = this.formatDate(start);
    const endDate = this.formatDate(end);

    console.log('start:', startDate); // Ej: 2025-07-01
    console.log('end:', endDate);     // Ej: 2025-09-01

    this.homeService.downloadReport(startDate, endDate).subscribe({
      next: res => {
        const url = window.URL.createObjectURL(res);
        window.open(url, '_blank');
        this.range.reset();
      },
      error: err => {
        this.alertService.error('Hubo un error al generarse el reporte');
        console.log(err)
      }
    })
  }



  formatDate(date: Date): string {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
