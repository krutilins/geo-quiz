import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BatutaCountry } from 'src/app/core/models/batuta-country.model';
import { Score } from 'src/app/core/models/score.model';
import { LeaderboardService } from 'src/app/core/services/leaderboard.service';
import { RandomizerService } from 'src/app/core/services/randomizer.service';
import { ScoreService } from 'src/app/core/services/score.service';
import { contries } from 'src/assets/batuta-countries';

@Component({
  selector: 'app-geo-quiz-page',
  templateUrl: './geo-quiz-page.component.html',
  styleUrls: ['./geo-quiz-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoQuizPageComponent {


  public countries: BatutaCountry[] = [...contries];
  public countryToFind: BatutaCountry | null = null;

  constructor(
    private scoreService: ScoreService,
    private randomizer: RandomizerService,
    private leaderBoardService: LeaderboardService,
  ) {
    this.randomNextCountry();
  }

  public makeAttemptToFindCountry($event: MouseEvent) {
    const $element = $event.target as HTMLElement;

    const intendendCountry = {
      name: $element.attributes.getNamedItem('title')?.value,
      code: $element.id
    }

    if (intendendCountry.code && intendendCountry.name) {
      if (this.isCorrectChoice(intendendCountry)) {
        this.handleCorrectChoice($element);
      } else {
        this.handleIncorrectChoice($element);
      }
    }
  }

  public isCorrectChoice(intendendCountry: BatutaCountry): boolean {
    return intendendCountry.code.toLowerCase() === this.countryToFind?.code.toLowerCase();
  }

  public handleCorrectChoice($element: HTMLElement): void {
    $element.classList.add('correct')
    this.scoreService.incrementScore();
    this.randomNextCountry();
  }

  public handleIncorrectChoice($element: HTMLElement): void {
    this.scoreService.decrementAttempt();
    if (this.scoreService.score.attemptsLeft) {
      $element.classList.add('incorrect')
      this.randomNextCountry();
    } else {
      this.clearSVGMap($element);
      this.leaderBoardService.saveScore(this.scoreService.score);
      this.scoreService.resetScore();
      this.countries = [...contries];
    }
  }

  public clearSVGMap($element: HTMLElement): void {
    $element.parentElement?.querySelectorAll('.incorrect').forEach(elem => elem.classList.remove('incorrect'))
    $element.parentElement?.querySelectorAll('.correct').forEach(elem => elem.classList.remove('correct'))
  }

  public getCurrentScore(): Score {
    return this.scoreService.score;
  }

  public counntryToFind(): string {
    return this.countryToFind?.name || 'unselected';
  }

  public randomNextCountry(): void {
    if (this.countryToFind) {
      this.countries.filter(country => country.code !== this.countryToFind?.code)
    }

    this.countryToFind = this.countries[this.randomizer.getRandomInt(this.countries.length)]
  }

  public points(): number {
    return this.scoreService?.score?.pointsEarned || 0;
  }

  public attempts(): number {
    return this.scoreService?.score?.attemptsLeft || 3;
  }

}
