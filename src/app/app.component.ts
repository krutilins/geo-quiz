import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map, take } from 'rxjs/operators'
import { BatutaCountry } from './models/batuta-country.model';
import { Score } from './models/score.modle';
import { CountryListService } from './services/country-list.service';
import { LeaderboardService } from './services/leaderboard.service';
import { RandomizerService } from './services/randomizer.service';
import { ReverseGeocodingService } from './services/reverse-geocoding.service';
import { ScoreService } from './services/score.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  public options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 70,
    minZoom: 1,

  }


  public countries: BatutaCountry[] = [];
  public selectedCountry: BatutaCountry | null = null;

  constructor(
    private countryListService: CountryListService,
    private geocoding: ReverseGeocodingService,
    private scoreService: ScoreService,
    private randomizer: RandomizerService,
    private changeDetectorRef: ChangeDetectorRef,
    private leaderBoardService: LeaderboardService
  ) {
    this.countryListService.getCountries().pipe(
      take(1),
      map(countries => {
        this.countries = countries;
        this.selectedCountry = this.selectNextCountry();
        this.changeDetectorRef.detectChanges();
      })
    ).subscribe()
  }


  public ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }

  public makeAttemptToFindCountry(event: google.maps.MouseEvent) {
    this.geocoding.reverseGeocoding(event.latLng.toJSON()).pipe(
      take(1)
    ).subscribe(selectedCountry => {
      if (selectedCountry.country.toLowerCase() === this.selectedCountry?.code.toLowerCase()) {
        this.scoreService.incrementScore();
        this.selectedCountry = this.selectNextCountry();
      } else {
        this.scoreService.decrementAttempt();
        if (this.scoreService.score.attemptsLeft) {
          this.selectedCountry = this.selectNextCountry();
        } else {
          this.leaderBoardService.saveScore(this.scoreService.score);
          this.scoreService.resetScore();
        }
      }
      this.changeDetectorRef.detectChanges();
    })
  }



  public getCurrentScore(): Score {
    return this.scoreService.score;
  }

  public selectNextCountry(): BatutaCountry {
    if (this.selectedCountry) {
      this.countries.filter(country => country.code !== this.selectedCountry?.code)
    }

    return this.countries[this.randomizer.getRandomInt(this.countries.length)]
  }

  public counntryToFind(): string {
    return this.selectedCountry?.name || 'unselected';
  }

  public points(): number {
    return this.scoreService?.score?.pointsEarned || 0;
  }

  public attempts(): number {
    return this.scoreService?.score?.attemptsLeft || 3;
  }

  public getLeaders(): Score[] {
    return this.leaderBoardService.getLeaders().sort((a, b) => a.pointsEarned - b.pointsEarned)
  }
}
