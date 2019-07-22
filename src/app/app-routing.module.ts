import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChallengesComponent} from "./challenges/challenges.component";


const routes: Routes = [
  { path: '', component: ChallengesComponent },
  { path: 'challenges', component: ChallengesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
