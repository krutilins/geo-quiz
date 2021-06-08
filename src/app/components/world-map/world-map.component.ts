import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BatutaCountry } from 'src/app/models/batuta-country.model';
import { Score } from 'src/app/models/score.modle';
import { LeaderboardService } from 'src/app/services/leaderboard.service';
import { RandomizerService } from 'src/app/services/randomizer.service';
import { ScoreService } from 'src/app/services/score.service';
import { contries } from 'src/assets/batuta-countries';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorldMapComponent {

  public countries: BatutaCountry[] = [...contries];
  public countryToFind: BatutaCountry | null = null;

  constructor(
    private scoreService: ScoreService,
    private randomizer: RandomizerService,
    private leaderBoardService: LeaderboardService
  ) {
    this.countryToFind = this.selectNextCountry();
  }

  public makeAttemptToFindCountry($event: MouseEvent) {

    const $element = $event.target as HTMLElement;

    const countryCode = $element.id;
    const countryName = $element.attributes.getNamedItem('title')?.value

    if (countryCode && countryName) {
      const intendendCountry = {
        name: countryName,
        code: countryCode
      }


      if (intendendCountry.code.toLowerCase() === this.countryToFind?.code.toLowerCase()) {
        $element.classList.add('correct')
        this.scoreService.incrementScore();
        this.countryToFind = this.selectNextCountry();
      } else {
        this.scoreService.decrementAttempt();
        if (this.scoreService.score.attemptsLeft) {
          $element.classList.add('incorrect')
          this.countryToFind = this.selectNextCountry();
        } else {

          this.leaderBoardService.saveScore(this.scoreService.score);
          this.scoreService.resetScore();
          this.countries = [...contries];

        }
      }
    }
  }


  public getCurrentScore(): Score {
    return this.scoreService.score;
  }

  public counntryToFind(): string {
    return this.countryToFind?.name || 'unselected';
  }

  public selectNextCountry(): BatutaCountry {
    if (this.countryToFind) {
      this.countries.filter(country => country.code !== this.countryToFind?.code)
    }

    return this.countries[this.randomizer.getRandomInt(this.countries.length)]
  }

  public points(): number {
    return this.scoreService?.score?.pointsEarned || 0;
  }

  public attempts(): number {
    return this.scoreService?.score?.attemptsLeft || 3;
  }

}
