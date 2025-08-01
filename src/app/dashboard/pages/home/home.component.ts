import { Component, inject, OnInit } from '@angular/core';
import { TotalsComponent } from './components/totals/totals.component';
import { ExpensesListComponent } from './components/expenses-list/expenses-list.component';
import { ChartsComponent } from './components/charts/charts.component';
import { FilterComponent } from './components/filter/filter.component';
import { HomeService } from './services/home.service';
import { GetFilterDate } from './interfaces/get-filter-date.interface';
import { ExpensesByMonth, Month } from './interfaces/month.interface';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DownloadReportComponent } from './components/download-report/download-report.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TotalsComponent,
    ExpensesListComponent,
    ChartsComponent,
    FilterComponent,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent implements OnInit {

  private readonly homeService = inject(HomeService)
  month!: Month | null | undefined;
  expenses!: ExpensesByMonth[]
  readonly dialog = inject(MatDialog);
  filterDate!: GetFilterDate;

  ngOnInit(): void {
      this.initializeMonths()
  }

  getDataFilter(data:GetFilterDate){
    this.filterDate = data;
    this.onGetDataCharts()
  }

  initializeMonths(){
    this.homeService.initializeMonths().subscribe({
      next: res => {
        console.log(res)
      },
      error: err => {
        console.log(err)
      }
    })
  }

  onGetDataCharts(){
    const {month, year} = this.filterDate;
    this.homeService.getDataCharts(year, month).subscribe({
      next: res => {
        this.month = res.month;
        this.month.savings_montly = Math.max(
          0,
          Number(this.month.salary_montly) - Number(this.month.expenses_montly)
        );
        this.expenses = res.expenses;
      },
      error: err => {
        this.month = null
        this.expenses = []
        console.log(err)
      }
    })
  }

  openDownload(){
    const dialogRef = this.dialog.open(DownloadReportComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
