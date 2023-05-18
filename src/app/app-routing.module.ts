import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { GamesComponent } from './views/games/games.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'games', component: GamesComponent},
  { path: '', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
