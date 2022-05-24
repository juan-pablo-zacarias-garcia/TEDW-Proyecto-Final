import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-guest',
  templateUrl: './home-guest.component.html',
  styleUrls: ['./home-guest.component.css']
})
export class HomeGuestComponent implements OnInit {

  public isLogged = false;
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

}
