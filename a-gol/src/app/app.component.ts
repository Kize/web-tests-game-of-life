import { Component } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  projectType = 'Angular';

  width: number;
  height: number;
  isPaused: boolean;

  randomizeNotifier = new ReplaySubject();

  onWidthMessage(width: number) {
    this.width = width;
  }

  onHeightMessage(height: number) {
    this.height = height;
  }

  onIsPausedMessage(isPaused: boolean) {
    this.isPaused = isPaused;
  }

  onRandomizeMessage() {
    this.randomizeNotifier.next();
  }
}
