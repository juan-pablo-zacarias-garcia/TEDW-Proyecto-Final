import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ConectionFireService } from 'src/app/conection-fire.service';
import { Interface_Carrito } from 'src/app/interfaces/int_carrito';
import { Interface_Producto } from 'src/app/interfaces/int_pruducto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private rutas: Router, private conexion: ConectionFireService) { }

  productos_carrito: Interface_Producto[]=[];
  carrito: Interface_Carrito={
    id_usuario: '',
    productos: [],
    subtotal: 0
  }

  ngOnInit(): void {
  }

  IngresarWithGoogle(){
    this.authService.loginWithGoogle().then(res => {
      console.log("Inicio sesion con Google correctamente: ",res);
      this.carrito={
        id_usuario: <string>res?.user?.uid,
        productos:[],
        subtotal: 0
      };
      //crea el carrito si no existe

      this.conexion.getCarrito(this.carrito.id_usuario).then(data=>{
        if(data){
          console.log("El carrito ya existe");
          this.productos_carrito=data.productos;
        }
      }).catch(
        data=>{
          this.conexion.addCarrito(this.carrito);
        }
      );

      if(res?.user?.email=="17030990@itcelaya.edu.mx"){
        this.rutas.navigateByUrl('/admin');
      }else{
        this.rutas.navigateByUrl('/');
      }
    });
  }


}
