import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  singOut(){
    this.auth.logOut().then(data=>{
      console.log("La sesion se ha cerrado correctamente",data);
    }
    ).catch((error)=>{
      console.log("Ha ocurrido un error al salir");
    });
  }

}
