import { Component, OnInit } from '@angular/core';
import { ConectionFireService } from 'src/app/conection-fire.service';
import { Interface_Carrito } from 'src/app/interfaces/int_carrito';
import { Interface_Producto } from 'src/app/interfaces/int_pruducto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  public isLogged = false;
  public user: any=this.auth.getLoggedUser();  

  constructor(private conexion: ConectionFireService, private auth: AuthService) { }

  carrito: Interface_Carrito={
    id_carrito: "",
    id_usuario: "",
    productos: [],
    subtotal: 0
  }
  
  ngOnInit(): void {
    this.carrito={
      id_carrito: '1234',
      id_usuario: this.user.uid,
      productos: [],
      subtotal: 0
    }
    this.conexion.getCarrito(this.carrito.id_carrito).then(data=>{
      if(data){
        this.carrito=data;
      }
    });
    //verifica si hay sesion activa
    this.auth.getLoggedUser().then(data=>{
      if(data?.email){
      this.user=data;
      this.isLogged=true;
      }
    });
  }

  procederPago(){
    
  }

  deleteProducto(producto:Interface_Producto){
    this.conexion.deleteProducto(this.carrito.id_carrito).then(data=>{
      if(data){
        alert("Producto eliminado");
        this.actualizaCarrito();
      }
    });
  }

  actualizaCarrito(){
    this.conexion.getProductos().then(data=>{
      this.carrito.productos=data;
    });
  }
}
