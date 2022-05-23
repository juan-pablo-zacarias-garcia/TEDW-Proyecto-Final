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
  usuario = {
    email: '',
    password: ''
  }

  Ingresar(){
    console.log(this.usuario);
    const { email, password } = this.usuario;
    this.authService.login(email, password).then(res => {
      console.log("Inicio sesion correctamente: ",res);
    })
  }

  IngresarWithGoogle(){
    console.log(this.usuario);
    const { email, password } = this.usuario;
    this.authService.loginWithGoogle(email, password).then(res => {
      console.log("Inicio sesion con Google correctamente: ",res);
    })
  }

}
