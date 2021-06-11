import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainMenuRoutingModule } from './main-menu-routing.module';
import { MainMenuPageComponent } from './pages/main-menu-page/main-menu-page.component';
import { ScoreBoardComponent } from './components/score-board/score-board.component';
import { SharedModule } from '../shared/shared.module';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [
    MainMenuPageComponent,
    ScoreBoardComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MainMenuRoutingModule
  ]
})
export class MainMenuModule { }
