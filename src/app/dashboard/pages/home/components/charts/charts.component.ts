import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';

import {Chart, registerables} from 'chart.js'
Chart.register(...registerables)
@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule, MatDividerModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent implements OnInit{
  public data = {
    labels: [
      'Gasolina',
      'Restaurantes',
      'Despensa',
      'Juegos',
      'Fiestas',
      'Luz'
    ],
    datasets: [{
      label: 'Mis gastos',
      data: [300, 50, 100, 100, 200, 200],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(86, 255, 162)',
        'rgb(255, 86, 241)',
        'rgb(143, 27, 71)'

      ],
      hoverOffset: 5
    }]
  };
  public config: any = {
    type: 'doughnut',
    data: this.data

  }
  chart: any
  ngOnInit(): void {
    this.chart = new Chart('myChart', this.config);
  }
}
