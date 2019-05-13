import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import Grid from '../../../../common/grid';
import { INITIAL_HEIGHT, INITIAL_IS_PAUSED, INITIAL_WIDTH } from '../controls/controls.component';

@Component({
  selector: 'app-grid-display',
  templateUrl: './grid-display.component.html',
  styleUrls: ['./grid-display.component.scss'],
})
export class GridDisplayComponent implements OnChanges, OnInit {

  @Input()
  width: number;

  @Input()
  height: number;

  @Input()
  isPaused: boolean;

  @Input()
  randomizeNotifier: ReplaySubject<any>;

  displayedGrid: Grid;

  constructor() {
  }

  updateDisplayedGrid(grid: Grid) {
    this.displayedGrid = grid;
  }

  onClickCell(row: number, col: number) {
    this.displayedGrid.cells[row][col] = !this.displayedGrid.cells[row][col];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.displayedGrid) {
      return;
    }

    if (changes.width) {
      const newWidth = changes.width.currentValue;
      const nextGrid = this.displayedGrid.cloneGridWithNewDimensions(newWidth, this.height);
      this.updateDisplayedGrid(nextGrid);
    }

    if (changes.height) {
      const newHeight = changes.height.currentValue;
      const nextGrid = this.displayedGrid.cloneGridWithNewDimensions(this.width, newHeight);
      this.updateDisplayedGrid(nextGrid);
    }
  }

  ngOnInit(): void {
    this.isPaused = INITIAL_IS_PAUSED;
    this.width = INITIAL_WIDTH;
    this.height = INITIAL_HEIGHT;
    this.displayedGrid = new Grid(this.width, this.height);
    this.displayedGrid.randomize();

    window.setInterval(() => {
      if (!this.isPaused) {
        this.updateDisplayedGrid(this.displayedGrid.nextGrid());
      }
    }, 50);

    this.randomizeNotifier.subscribe(() => {
      const nextGrid = new Grid(this.width, this.height);
      nextGrid.randomize();
      this.updateDisplayedGrid(nextGrid);
    });
  }


}
