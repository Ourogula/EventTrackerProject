import { RaceListComponent } from './components/race-list/race-list.component';
import { UpdateRaceFormComponent } from './components/update-race-form/update-race-form.component';
import { CreateRaceFormComponent } from './components/create-race-form/create-race-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
{ path: 'home', component: HomeComponent },
{ path: 'races', component: RaceListComponent },
{ path: 'races/:id', component: RaceListComponent },
{ path: 'create', component: CreateRaceFormComponent },
{ path: 'update/:id', component: UpdateRaceFormComponent },
{ path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
