import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ScoreService } from 'src/app/services/score.service';

@Component({
  selector: 'app-nickname-updater',
  templateUrl: './nickname-updater.component.html',
  styleUrls: ['./nickname-updater.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NicknameUpdaterComponent {

  public nickname: string = '';

  constructor(private scoreService: ScoreService) { }

  public updateNickname(): void {
    this.scoreService.setNickname(this.nickname);
  }

}
