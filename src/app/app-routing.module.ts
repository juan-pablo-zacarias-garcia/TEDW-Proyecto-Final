import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeGuestComponent } from './users/home-guest/home-guest.component';
import { SignUpComponent } from './users/sign-up/sign-up.component';
import { LoginComponent } from './users/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ProductsComponent } from './admin/products/products.component';
import { EmployeesComponent } from './admin/employees/employees.component';
import { SalesComponent } from './admin/sales/sales.component';
import { CustomersComponent } from './admin/customers/customers.component';
import { ProvidersComponent } from './admin/providers/providers.component';
import { SaleDetailsComponent } from './admin/sales/sale-details/sale-details.component';
import { CategoryesComponent } from './admin/categoryes/categoryes.component';
import { CarritoComponent } from './users/carrito/carrito.component';
const routes: Routes = [
  { path: '',   component:HomeGuestComponent},
  {path:'sign_up', component: SignUpComponent},
  {path:'login', component:LoginComponent},
  {path:'admin', component:AdminComponent},
  {path:'products', component:ProductsComponent},
  {path:'employees', component:EmployeesComponent},
  {path:'sales', component:SalesComponent},
  {path:'sale-details', component:SaleDetailsComponent},
  {path:'customers', component:CustomersComponent},
  {path:'providers', component:ProvidersComponent},
  {path:'categoryes', component:CategoryesComponent},
  {path:'carrito', component:CarritoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
