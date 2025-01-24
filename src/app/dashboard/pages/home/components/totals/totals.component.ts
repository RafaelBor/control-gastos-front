import { Component, HostListener, OnInit } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';



@Component({
  selector: 'app-totals',
  standalone: true,
  imports: [MatGridListModule, MatIconModule],
  templateUrl: './totals.component.html',
  styleUrl: './totals.component.css'
})
export class TotalsComponent implements OnInit {
  gridCols: number = 3
  rowHeight: string = '2:1';

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
