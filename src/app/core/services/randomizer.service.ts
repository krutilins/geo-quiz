import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomizerService {

  public getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  public getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
