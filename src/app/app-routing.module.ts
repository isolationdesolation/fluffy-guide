import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {AppComponent} from "./app.component";
import {FlatPageComponent} from "src/app/flatPage/flatPage.component";
import {FlatsListComponent} from "src/app/flats/flatsList.component"

const routes: Routes = [
  {path: '',redirectTo: '/flats', pathMatch : 'full'},
  {path: 'flats', component: FlatsListComponent},
  {path: 'flats/:id', component: FlatPageComponent}, 
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
