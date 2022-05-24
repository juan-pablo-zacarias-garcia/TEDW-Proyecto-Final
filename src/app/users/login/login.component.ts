import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private rutas: Router) { }

  ngOnInit(): void {
  }

  IngresarWithGoogle(){
    this.authService.loginWithGoogle().then(res => {
      console.log("Inicio sesion con Google correctamente: ",res);
      this.rutas.navigateByUrl('/');
    })
    this.authService.getLoggedUser().then(data=>{
      console.log("Usuario logueado: ",data);
    })
  }

}
