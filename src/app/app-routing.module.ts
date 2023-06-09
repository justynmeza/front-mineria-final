import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { GamesComponent } from './views/games/games.component';
import { AdministratorComponent } from './views/administrator/administrator.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'games', component: GamesComponent},
  { path: 'administrator', component: AdministratorComponent},
  { path: '', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
