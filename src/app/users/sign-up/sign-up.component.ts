import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private authService: AuthService, private rutas: Router) { }

  ngOnInit(): void {
  }


  IngresarWithGoogle(){
    this.authService.loginWithGoogle().then(res => {
      console.log("Inicio sesion con Google correctamente: ",res);
    });
    this.authService.logOut().then(data=>{
      this.rutas.navigateByUrl('/login');
    })
  }

}
