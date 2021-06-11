import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeoQuizPageComponent } from './pages/geo-quiz-page/geo-quiz-page.component';
import { GameToolbarComponent } from './components/game-toolbar/game-toolbar.component';
import { SharedModule } from '../shared/shared.module';
import { GeoQuizRoutingModule } from './geo-quiz-routing.module';
import { MapBoxComponent } from './components/map-box/map-box.component';

@NgModule({
  declarations: [
    GameToolbarComponent,
    GeoQuizPageComponent,
    MapBoxComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GeoQuizRoutingModule
  ],
  bootstrap: [
    GeoQuizPageComponent
  ]
})
export class GeoQuizModule { }
