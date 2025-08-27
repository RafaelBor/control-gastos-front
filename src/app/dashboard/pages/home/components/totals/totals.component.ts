import { Component, HostListener, input, OnInit } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { Month } from '../../interfaces/month.interface';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-totals',
  standalone: true,
  imports: [MatGridListModule, MatIconModule, CommonModule],
  templateUrl: './totals.component.html',
  styleUrl: './totals.component.css'
})
export class TotalsComponent implements OnInit {
  gridCols: number = 3
  rowHeight: string = '2:1';
  public month = input<Month | null >();

  ngOnInit(): void {
    this.adjustGrid(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const width = (event.target as Window).innerWidth;
    this.adjustGrid(width);
  }

  adjustGrid(width: number) {
    if (width < 768) {
      // Pantallas pequeñas (como móviles)
      this.gridCols = 1;
    } else {
      // Pantallas más grandes
      this.gridCols = 3;
    }
  }

}
