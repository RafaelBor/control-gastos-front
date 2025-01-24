import { Component } from '@angular/core';
import { TotalsComponent } from './components/totals/totals.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ChartsComponent } from './components/charts/charts.component';
import { FilterComponent } from './components/filter/filter.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TotalsComponent,
    CategoriesComponent,
    ChartsComponent,
    FilterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent {

}
