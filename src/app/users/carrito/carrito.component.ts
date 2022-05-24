import { Component, OnInit } from '@angular/core';
import { ConectionFireService } from 'src/app/conection-fire.service';
import { Interface_Carrito } from 'src/app/interfaces/int_carrito';
import { Interface_Producto } from 'src/app/interfaces/int_pruducto';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(private conexion: ConectionFireService) { }

  carrito: Interface_Carrito={
    id_carrito: "",
    id_usuario: "",
    productos: [],
    subtotal: 0
  }
  
  ngOnInit(): void {
    this.carrito={
      id_carrito: '1234',
      id_usuario: "1234",
      productos: [],
      subtotal: 0
    }
    this.conexion.getCarrito(this.carrito.id_carrito).then(data=>{
      if(data){
        this.carrito=data;
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
