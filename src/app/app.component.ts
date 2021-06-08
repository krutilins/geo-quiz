import { Component } from '@angular/core';
import { Score } from './models/score.modle';
import { LeaderboardService } from './services/leaderboard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private leaderBoardService: LeaderboardService) { }

  public getLeaders(): Score[] {
    return this.leaderBoardService.getLeaders().sort((a, b) => a.pointsEarned - b.pointsEarned)
  }
}
