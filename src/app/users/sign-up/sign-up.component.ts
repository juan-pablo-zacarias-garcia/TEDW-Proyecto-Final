import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  usuario = {
    email: '',
    password: '',
  }

  Register(){
    console.log(this.usuario);
    const { email, password } = this.usuario;
    this.authService.register(email, password).then(res => {
      console.log("Se registro correctamente: ",res);
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
