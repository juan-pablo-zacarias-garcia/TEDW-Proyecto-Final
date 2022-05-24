import { Component, Input, OnInit } from '@angular/core';
import { ConectionFireService } from 'src/app/conection-fire.service';
import { Interface_Producto } from 'src/app/interfaces/int_pruducto';
import { Interface_Categoria } from 'src/app/interfaces/int_categoria';
import { Interface_Carrito } from 'src/app/interfaces/int_carrito';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  @Input() isLogged: any;
  public user: any;

  constructor(private conexion: ConectionFireService, private auth:AuthService) { 
  }

  categorias: Interface_Categoria[]=[];
  productos: Interface_Producto[]=[];
  productos_carrito: Interface_Producto[]=[];
  carrito: Interface_Carrito={
    id_usuario: '',
    productos: [],
    subtotal: 0
  }


  ngOnInit(): void {
    this.auth.getLoggedUser().then(data=>{
      if(data?.email){
      this.user=data;
      this.isLogged=true;
      this.carrito.id_usuario=this.user.uid;

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

      }
    });

    this.conexion.getCategorias().then(data=>{
      this.categorias=data;
    });
    this.conexion.getProductos().then(data=>{
      this.productos = data;
    });
  }

    selectCategoria(id_categoria: String){
      console.log(id_categoria);
      if(id_categoria!=""){
        this.conexion.getProductosCat(id_categoria).then(data=>{
          this.productos=data;
        });
      }
      else{
        this.conexion.getProductos().then(data=>{
          this.productos = data;
        });
      }
    }

    addCarrito(producto:Interface_Producto){
      this.carrito.id_usuario=this.user.uid;
      this.productos_carrito.push(producto);
      console.log(this.productos_carrito);
      this.carrito.productos=this.productos_carrito;
      this.conexion.updateCarrito(this.carrito).then(data=>{
        if(data){
          alert("Producto agregado al carrito: "+producto.nombre);
        }
      });
    }

  }



