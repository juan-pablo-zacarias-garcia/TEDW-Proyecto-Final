import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  IngresarWithGoogle(){
    this.authService.loginWithGoogle().then(res => {
      console.log("Inicio sesion con Google correctamente: ",res);
    })
    this.authService.getLoggedUser().then(data=>{
      console.log("Usuario logueado: ",data);
    })
  }

}
