import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameToolbarComponent } from './components/game-toolbar/game-toolbar.component';
import { NicknameUpdaterComponent } from './components/nickname-updater/nickname-updater.component';
import { WorldMapComponent } from './components/world-map/world-map.component';

@NgModule({
  declarations: [
    AppComponent,
    LeaderboardComponent,
    GameToolbarComponent,
    NicknameUpdaterComponent,
    WorldMapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
