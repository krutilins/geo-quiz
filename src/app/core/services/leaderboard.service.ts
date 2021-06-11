import { Injectable } from '@angular/core';
import { Score } from '../models/score.model';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  private leadersLocalStorageKey = 'leaders';

  private leadersById: Map<string, Score> = new Map();

  constructor() {

    const localStorageLeaders = localStorage.getItem(this.leadersLocalStorageKey);

    if (localStorageLeaders) {
      const leaders = JSON.parse(localStorageLeaders) as Score[];

      leaders.forEach(value => {
        this.leadersById.set(value.id, value)
      })
    }

  }

  public getLeaders(): Score[] {
    const leaders: Score[] = [];

    this.leadersById.forEach((value) => {
      leaders.push(value);
    })

    return leaders.sort((a, b) => a.pointsEarned - b.pointsEarned);

  }

  public saveScore(score: Score): void {
    this.leadersById.set(score.id, score);

    const leaders: Score[] = [];
    this.leadersById.forEach((value) => {
      leaders.push(value);
    })

    localStorage.setItem(this.leadersLocalStorageKey, JSON.stringify(leaders))
  }

}
