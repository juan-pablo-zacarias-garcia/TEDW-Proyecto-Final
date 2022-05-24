import { Component, OnInit } from '@angular/core';
import { ConectionFireService } from 'src/app/conection-fire.service';
import { Interface_Producto } from 'src/app/interfaces/int_pruducto';
import { Interface_Categoria } from 'src/app/interfaces/int_categoria';
import { Interface_Carrito } from 'src/app/interfaces/int_carrito';


@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  constructor(private conexion: ConectionFireService) { 
  }

  categorias: Interface_Categoria[]=[];
  productos: Interface_Producto[]=[];
  productos_carrito: Interface_Producto[]=[];
  carrito: Interface_Carrito={
    id_carrito: '1234',
    id_usuario: "1234",
    productos: [],
    subtotal: 0
  }


  ngOnInit(): void {
    this.conexion.getCategorias().then(data=>{
      this.categorias=data;
    });
    this.conexion.getProductos().then(data=>{
      this.productos = data;
    });
    this.conexion.getCarrito(this.carrito.id_carrito).then(data=>{
      if(data){
        alert("El carrito ya existe");
        this.productos_carrito=data.productos;
      }
    }).catch(
      data=>{
        this.conexion.addCarrito(this.carrito);
      }
    );
    
    
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
      this.productos_carrito.push(producto);
      this.carrito.productos=this.productos_carrito;
      this.conexion.updateCarrito(this.carrito).then(data=>{
        if(data){
          alert("Producto agregado al carrito: "+producto.nombre);
        }
      });
    }

  }

  function generaId() {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }


