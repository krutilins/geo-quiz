import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Score } from 'src/app/models/score.modle';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaderboardComponent {

  @Input()
  public scores: Score[] = [];

}
