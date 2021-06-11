import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'main-menu',
    loadChildren: () => import('./modules/main-menu/main-menu.module').then(m => m.MainMenuModule)
  },
  {
    path: 'geo-quiz',
    loadChildren: () => import('./modules/geo-quiz/geo-quiz.module').then(m => m.GeoQuizModule)
  },
  {
    path: '', pathMatch: 'full', redirectTo: 'main-menu'
  },
  {
    path: '**', redirectTo: 'main-menu'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
