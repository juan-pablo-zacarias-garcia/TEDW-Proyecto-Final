import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './users/navbar/navbar.component';
import { FooterComponent } from './users/footer/footer.component';
import { OfferComponent } from './users/offer/offer.component';
import { ClientsComponent } from './users/clients/clients.component';
import { BookComponent } from './users/book/book.component';
import { AboutComponent } from './users/about/about.component';
import { FoodComponent } from './users/food/food.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    OfferComponent,
    ClientsComponent,
    BookComponent,
    AboutComponent,
    FoodComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
