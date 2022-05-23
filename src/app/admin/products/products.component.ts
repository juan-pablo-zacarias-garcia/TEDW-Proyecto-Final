import { Component, OnInit } from '@angular/core';
import { ConectionFireService } from 'src/app/conection-fire.service';
import { Interface_Producto } from 'src/app/interfaces/int_pruducto';
import { Interface_Categoria } from 'src/app/interfaces/int_categoria';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private conexion:ConectionFireService) { }
  //variables
  productos_disponibles: Interface_Producto[]=[];
  categorias: Interface_Categoria[]=[];
  nuevo_producto: Interface_Producto={
    id_producto: "",
    nombre: "",
    descripcion: "",
    imagen: "",
    id_categoria: "",
    costo: 0.0
  }

  ngOnInit(): void {
    this.actualizaProductos();
    //recupera la lista de categorias
    this.conexion.getCategorias().then(data=>{
      if(data){
        this.categorias=data;
      }
    })
  }

  actualizaProductos(){
    this.nuevo_producto={
      id_producto: "",
      nombre: "",
      descripcion: "",
      imagen: "",
      id_categoria: "",
      costo: 0.0
    }
    this.conexion.getProductos().then(data=>{
      if(data){
        this.productos_disponibles = data;
      }
    })
  }

  addProducto(producto:Interface_Producto){
    this.nuevo_producto.id_producto=generaId();
    var categoria =document.getElementById('categoria');
    if(this.nuevo_producto.id_producto!="" 
    && this.nuevo_producto.nombre!="" 
    && this.nuevo_producto.descripcion!="" 
    && this.nuevo_producto.imagen!=""
    && this.nuevo_producto.id_categoria!=""
    && this.nuevo_producto.costo>=0){
      this.conexion.addProducto(producto).then(data=>{
        alert("Producto agregado exitosamente: "+this.nuevo_producto.nombre);
      });
    }
  }

  selectCategoria(id_categoria:String){
    console.log("Categoria: "+id_categoria);
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
