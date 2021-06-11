import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeoQuizPageComponent } from './pages/geo-quiz-page/geo-quiz-page.component';

const routes: Routes = [
  { path: '', component: GeoQuizPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeoQuizRoutingModule { }
