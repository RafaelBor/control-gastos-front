import { CommonModule } from '@angular/common';
import { Component, computed, input, OnInit, SimpleChanges } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';

import {Chart, registerables} from 'chart.js'
import { Expense } from '../../interfaces/expense.interface';
import { ExpensesByMonth } from '../../interfaces/month.interface';
Chart.register(...registerables)
@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule, MatDividerModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent implements OnInit{
  public expenses = input<ExpensesByMonth[]>();
  public noData: boolean = false;

  // Creamos un Signal calculado para los datos del gráfico
  public chartData = computed(() => {
    const expenses = this.expenses(); // Obtener el valor de expenses
    if(expenses){
      // Verificamos si hay datos
    if (expenses.length === 0) {
      this.noData = true; // Si no hay datos, mostramos el mensaje
    } else {
      this.noData = false; // Si hay datos, ocultamos el mensaje
    }

    // Devolvemos la estructura para el gráfico
    return {
      labels: expenses.map(expense => expense.categoryName),
      datasets: [{
        label: 'Mis gastos',
        data: expenses.map(expense => Number(expense.totalExpense)),
        backgroundColor: expenses.map(expense => expense.color),
        hoverOffset: 5
      }]
    };
    }else{
      return {
        labels: [],
        datasets: [{
          label: 'Mis gastos',
          data: [],
          backgroundColor: [],
          hoverOffset: 5
        }]
    }
  }
  });

  public config: any = {
    type: 'doughnut',  // Tipo de gráfico
    data: this.chartData()  // Usamos el Signal calculado para los datos
  };

  chart: any;

  ngOnInit(): void {
    // Inicializamos el gráfico con la configuración
    this.chart = new Chart('myChart', this.config);
  }

  // Si el Signal de `expenses` cambia, actualizamos el gráfico
  ngDoCheck(): void {
    if (this.chart) {
      this.chart.data = this.chartData();  // Actualiza los datos del gráfico
      this.chart.update();  // Vuelve a dibujar el gráfico
    }
  }
}
