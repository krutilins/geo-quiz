import { Component, ChangeDetectionStrategy, Input, ViewChild } from '@angular/core';
import { Score } from 'src/app/core/models/score.model';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreBoardComponent {

  @Input()
  public scores: Score[] = [];

  @ViewChild('table-content')
  set tableContent(t: HTMLElement) {
    t
  }

}
