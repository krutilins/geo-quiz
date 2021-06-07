import { Injectable } from '@angular/core';
import { Score } from '../models/score.modle';
import { v4 as uuid } from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private _score: Score = {
    id: uuid(),
    nickname: 'Without Nickname',
    pointsEarned: 0,
    attemptsLeft: 3
  };

  get score(): Score {
    return {
      ...this._score
    };
  }

  public incrementScore(): void {
    this._score.pointsEarned++;
  }

  public setNickname(nickname: string): void {
    this._score.nickname = nickname;
  }

  public decrementAttempt(): void {
    this._score.attemptsLeft--;
  }

  public resetScore(): void {
    this.score.pointsEarned = 0;
    this.score.attemptsLeft = 3;
  }

}
