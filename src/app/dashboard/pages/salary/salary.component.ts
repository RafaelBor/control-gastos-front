import { months } from './../../../commons/utils/months_list';
import { AlertService } from './../../../commons/services/alert.service';
import { Component, OnInit, signal } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';
import { SalaryService } from './services/salary.service';
import { UserInfo } from './interfaces/user-info.interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-salary',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, MatSelectModule,MatRadioModule, MatExpansionModule, FormsModule, ReactiveFormsModule],
  templateUrl: './salary.component.html',
  styleUrl: './salary.component.css'
})
export default class SalaryComponent implements OnInit{
  readonly panelOpenState = signal(false);
  userInfo: UserInfo = {
    id: '',
    salary: 0,
    saving: 0
  };

  months = months;
  years: number[] = [];
  updateSalaryMonth: FormGroup;
  constructor( readonly salaryService: SalaryService, readonly alertService: AlertService, private readonly fb: FormBuilder ){
    this.updateSalaryMonth = this.fb.group({
          year: ['', [Validators.required]],
          month: ['', [Validators.required]],
          quantity: [0, [Validators.required]],
          type: ['', [Validators.required]],
      });
  }

  ngOnInit(): void {
      this.getUserInfo();
      this.generateYears(20);
  }

  private getUserInfo(){
    this.salaryService.getUserInfo().subscribe({
      next: res => {
        this.userInfo = res;
      },
      error: err => {
        console.log(err)
      }
    })
  }


 async updateSalary(){
  const sendUpdateSalary = {
    salary: Number(this.userInfo.salary)
  }
  this.salaryService.updateSalary(sendUpdateSalary).subscribe({
    next: res => {
      this.alertService.success('El salario mensual se actualizo correctamente')
    },
    error: err => {
      console.log(err)
      this.alertService.error('Hubo un error al actualizar el salario')
    }
  })
  }

  generateYears(totalYears: number): void {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: totalYears }, (_, i) => currentYear - i);
  }

  onUpdateSalaryMonth(){
    console.log(this.updateSalaryMonth.value)
    this.salaryService.updateSalaryByMonth(this.updateSalaryMonth.value).subscribe({
      next: res => {
        this.alertService.success( `El salario de ${this.updateSalaryMonth.value.month} se actualizo correctamente`)
      },
      error: err => {
        console.log(err)
        this.alertService.error('Hubo un error al actualizar el salario')
      }
    })
  }
}
