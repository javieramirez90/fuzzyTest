import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FuzzySearchComponent } from './fuzzy-search/fuzzy-search.component'
import { NavbarComponent } from './navbar/navbar.component'


const appRoutes: Routes = [
  { path: '', component: NavbarComponent},
  { path: 'fuzzy', component: FuzzySearchComponent },
  { path: '**', component: NavbarComponent}
];


@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
