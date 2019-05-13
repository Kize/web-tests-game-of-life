import { Component, EventEmitter, Output } from '@angular/core';

export const INITIAL_WIDTH = 20;
export const INITIAL_HEIGHT = 10;
export const INITIAL_IS_PAUSED = true;

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent {
  @Output()
  randomizeRequest = new EventEmitter();

  @Output()
  widthRequest = new EventEmitter<number>();

  @Output()
  heightRequest = new EventEmitter<number>();

  @Output()
  isPausedRequest = new EventEmitter<boolean>();

  isPaused = INITIAL_IS_PAUSED;
  width = INITIAL_WIDTH;
  height = INITIAL_HEIGHT;

  onClickPause() {
    this.isPaused = !this.isPaused;
    this.isPausedRequest.emit(this.isPaused);
  }

  onClickRandomize() {
    this.randomizeRequest.emit();
  }

  onChangeWidth() {
    this.widthRequest.emit(this.width);
  }

  onChangeHeight() {
    this.heightRequest.emit(this.height);
  }
}
