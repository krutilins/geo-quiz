import { Injectable } from '@angular/core';
import { Score } from '../models/score.model';
import { v4 as uuid } from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private _score: Score = {
    id: uuid(),
    nickname: localStorage.getItem('user') || 'Without Nickname',
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
    localStorage.setItem('user', nickname);
    this._score.nickname = nickname;
  }

  public getNickname(): string {
    return this._score.nickname;
  }

  public decrementAttempt(): void {
    this._score.attemptsLeft--;
  }

  public resetScore(): void {
    this._score.pointsEarned = 0;
    this._score.attemptsLeft = 3;
  }

}
