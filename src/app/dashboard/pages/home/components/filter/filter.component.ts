import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';




@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatIconModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {

  months: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  visibleMonths: string[] = []; // Meses visibles
  currentIndex: number = 0; // Índice del primer mes visible
  selectedMonth: string  | null = null;; // Índice del mes seleccionado
  years: number[] = []; // Lista de años
  selectedYear: number | null = null; // Año seleccionado

  constructor() {
    this.initializeVisibleMonths();
    this.setCurrentMonth(); // Seleccionar el mes actual al cargar
    this.generateYears(50);
    this.selectedYear = new Date().getFullYear(); // Establecer el año actual como seleccionado por defecto

  }

  generateYears(totalYears: number): void {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: totalYears }, (_, i) => currentYear - i);

  }

  initializeVisibleMonths() {
    this.visibleMonths = this.months.slice(this.currentIndex, this.currentIndex + 3);
  }

  setCurrentMonth() {
    const currentMonthIndex = new Date().getMonth(); // Obtiene el índice del mes actual (0-11)
    this.currentIndex = Math.max(0, Math.min(currentMonthIndex - 1, this.months.length - 3));
    this.initializeVisibleMonths();
    this.selectedMonth = this.months[currentMonthIndex]; // Selecciona el mes actual
  }

  previousMonth() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.initializeVisibleMonths();
    }
  }

  nextMonth() {
    if (this.currentIndex + 3 < this.months.length) {
      this.currentIndex++;
      this.initializeVisibleMonths();
    }
  }

  selectMonth(month: string) {
    this.selectedMonth = month;
    console.log(`Selected month: ${this.selectedMonth}`);
  }

  isSelected(month: string): boolean {
    return this.selectedMonth === month;
  }
}
