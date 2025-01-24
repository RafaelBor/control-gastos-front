import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-salary',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, MatSelectModule,MatRadioModule],
  templateUrl: './salary.component.html',
  styleUrl: './salary.component.css'
})
export default class SalaryComponent {

}
