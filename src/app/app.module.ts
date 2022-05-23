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
import { ToggleComponent } from './toggle/toggle.component';
import { RoutesComponent } from './routes/routes.component';
import { ChartsComponent } from './routes/charts/charts.component';
import { AdminComponent } from './admin/admin.component';
import { ProductsComponent } from './admin/products/products.component';
import { EmployeesComponent } from './admin/employees/employees.component';
import { SalesComponent } from './admin/sales/sales.component';
import { CustomersComponent } from './admin/customers/customers.component';
import { ProvidersComponent } from './admin/providers/providers.component';
import { SaleDetailsComponent } from './admin/sales/sale-details/sale-details.component';
import { CategoryesComponent } from './admin/categoryes/categoryes.component';
import { NavbarAdminComponent } from './admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from './admin/footer-admin/footer-admin.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { CarritoComponent } from './users/carrito/carrito.component';


const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBEdtmPUs1Vegbq26Fw-HKChw-SLdzTvCU",
    authDomain: "restaurant-22b46.firebaseapp.com",
    projectId: "restaurant-22b46",
    storageBucket: "restaurant-22b46.appspot.com",
    messagingSenderId: "955096161416",
    appId: "1:955096161416:web:1265f4ed4210255fe5533d",
    measurementId: "G-TQJ6PNPHMV"
  },
};

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
    LoginComponent,
    ToggleComponent,
    RoutesComponent,
    ChartsComponent,
    AdminComponent,
    ProductsComponent,
    EmployeesComponent,
    SalesComponent,
    CustomersComponent,
    ProvidersComponent,
    SaleDetailsComponent,
    CategoryesComponent,
    NavbarAdminComponent,
    FooterAdminComponent,
    CarritoComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
