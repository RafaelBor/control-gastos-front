import { Component } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';



@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MatListModule,MatDividerModule, MatIconModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

}
