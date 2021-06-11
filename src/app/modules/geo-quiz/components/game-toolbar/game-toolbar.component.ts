import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Score } from 'src/app/core/models/score.model';

@Component({
  selector: 'app-game-toolbar',
  templateUrl: './game-toolbar.component.html',
  styleUrls: ['./game-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameToolbarComponent {

  @Input()
  countryToFind: string | undefined;

  @Input()
  currentScore: Score | undefined;

}
