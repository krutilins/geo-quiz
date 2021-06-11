import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Score } from 'src/app/core/models/score.model';
import { LeaderboardService } from 'src/app/core/services/leaderboard.service';

@Component({
  selector: 'app-main-menu-page',
  templateUrl: './main-menu-page.component.html',
  styleUrls: ['./main-menu-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainMenuPageComponent {

  constructor(
    private leaderBoardService: LeaderboardService,
  ) { }

  public getLeaders(): Score[] {
    return this.leaderBoardService.getLeaders().sort((a, b) => a.pointsEarned - b.pointsEarned)
  }

}
