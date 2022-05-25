import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() isLogged: any; 
  public user: any=this.auth.getLoggedUser();  

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getLoggedUser().then(data=>{
      if(data?.email){
      this.user=data;
      this.isLogged=true;
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
