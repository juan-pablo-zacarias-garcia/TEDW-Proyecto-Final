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
  public user: any;  

  constructor(private conexion: ConectionFireService, private auth: AuthService) { }

  carrito: Interface_Carrito={
    id_usuario: "",
    productos: [],
    subtotal: 0
  }
  
  ngOnInit(): void {
    //verifica si hay sesion activa
    this.auth.getLoggedUser().then(data=>{
      if(data?.email){
      this.user=data;
      this.isLogged=true;
      }
      //obtiene los productos del carrito
     this.conexion.getCarrito(this.user.uid).then(data=>{
      if(data){
        this.carrito = data;
        //actualiza el carrito
        this.actualizaCarrito();
      }
      });
    });
  }

  procederPago(){
    
  }

  deleteProducto(producto:Interface_Producto){
    this.carrito.productos = this.carrito.productos.filter((item) => item !== producto);
    this.conexion.updateCarrito(this.carrito);
    alert("El siguiente producto se ha eliminado de su carrito: "+producto.nombre);
    this.actualizaCarrito();
  }

  actualizaCarrito(){
    this.conexion.updateCarrito(this.carrito);
  }
}
