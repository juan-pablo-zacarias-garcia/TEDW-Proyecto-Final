import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConectionFireService } from 'src/app/conection-fire.service';
import { Interface_Carrito } from 'src/app/interfaces/int_carrito';
import { Interface_Metodo_Pago } from 'src/app/interfaces/int_metodo_pago';
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

  constructor(private conexion: ConectionFireService, private auth: AuthService, private rutas: Router) { }

  subtotal=0;
  cantidad_productos=0;
  metodos: Interface_Metodo_Pago[]=[];
  metodo:String='No seleccinado';
  carrito: Interface_Carrito={
    id_usuario: "",
    productos: [],
    subtotal: 0
  }
  check: any="Nada";
  
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
    this.conexion.getmPagos().then(data=>{
      if(data){
        this.metodos = data;
      }
    })
  }

  pagar(total: number){
    alert("Se ha realizado el pago con su cuenta de "+this.metodo+((this.check)?' La factura se enviará al correo '+this.user.email:' no se generó factura'));
    this.conexion.deleteCarrito(this.user.uid).then(data=>{
      if(data){
          this.rutas.navigateByUrl('/#section_food');
      }
    });
  }
  selectMetodo(metodo: any){
    this.metodo=(metodo.target.value);
  }

  deleteProducto(producto:Interface_Producto){
    this.carrito.productos = this.carrito.productos.filter((item) => item !== producto);
    this.conexion.updateCarrito(this.carrito);
    alert("El siguiente producto se ha eliminado de su carrito: "+producto.nombre);
    this.actualizaCarrito();
  }

  actualizaCarrito(){
    this.conexion.updateCarrito(this.carrito);
    this.calcular_subtotal();
  }

  calcular_subtotal(){
    this.subtotal=0;
    for(let i=0; i<this.carrito.productos.length; i++){
      this.subtotal = this.subtotal + <number>this.carrito.productos[i].costo;
    }
  }


}
