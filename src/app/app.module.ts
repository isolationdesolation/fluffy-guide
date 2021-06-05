import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlatsListComponent } from './flats/flatsList.component';
import { FlatPageComponent } from './flatPage/flatPage.component';
import { HttpClientModule } from '@angular/common/http';
import {PaginationDirective} from './directives/pagination.directive';
import { ActiveDirective } from './directives/active.directive';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    FlatsListComponent,
    FlatPageComponent,
    PaginationDirective,
    ActiveDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
