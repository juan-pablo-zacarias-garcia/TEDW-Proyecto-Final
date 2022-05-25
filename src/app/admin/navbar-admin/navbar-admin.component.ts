import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {
  public isLogged: any; 
  public user: any=this.auth.getLoggedUser();

  constructor(private auth: AuthService, private rutas: Router) { }

  ngOnInit(): void { 
    this.auth.getLoggedUser().then(data=>{
      if(data?.email){
      this.user=data;
      this.isLogged=true;
      }else{
        this.rutas.navigateByUrl('/');
      }
    });
  }

  signOut(){
    this.auth.logOut().then(data=>{
      console.log("La sesion se ha cerrado correctamente",data);
    }
    ).catch((error)=>{
      console.log("Ha ocurrido un error al salir");
    });
  }

}
