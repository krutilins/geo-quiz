import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ScoreService } from 'src/app/core/services/score.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {

  public nickname: string = this.scoreService.getNickname();

  constructor(
    private scoreService: ScoreService,
    private router: Router
  ) { }

  public updateNickname(): void {
    this.scoreService.setNickname(this.nickname);
  }

  public startGame(): void {
    this.router.navigate(['geo-quiz'])
  }
}
