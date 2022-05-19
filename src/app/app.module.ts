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
import { HomeGuestComponent } from './users/home-guest/home-guest.component';
import { SignUpComponent } from './users/sign-up/sign-up.component';
import { SliderComponent } from './users/slider/slider.component';
import { LoginComponent } from './users/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    OfferComponent,
    ClientsComponent,
    BookComponent,
    AboutComponent,
    FoodComponent,
    HomeGuestComponent,
    SignUpComponent,
    SliderComponent,
    LoginComponent 
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
