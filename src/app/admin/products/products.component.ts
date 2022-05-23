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
    costo: 0.0,
    cantidad:0
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
    this.muestraBtnAdd();
    this.nuevo_producto={
      id_producto: "",
      nombre: "",
      descripcion: "",
      imagen: "",
      id_categoria: "",
      costo: 0.0,
      cantidad:0
    }
    this.conexion.getProductos().then(data=>{
      if(data){
        this.productos_disponibles = data;
      }
    })
  }

  addProducto(producto:Interface_Producto){
    this.nuevo_producto.id_producto=generaId();
    if(this.nuevo_producto.id_producto!="" 
    && this.nuevo_producto.nombre!="" 
    && this.nuevo_producto.descripcion!="" 
    && this.nuevo_producto.imagen!=""
    && this.nuevo_producto.id_categoria!=""
    && this.nuevo_producto.costo>=0){
      this.conexion.addProducto(producto).then(data=>{
        alert("Producto agregado exitosamente: "+this.nuevo_producto.nombre);
        this.actualizaProductos();
      });
    }
    else{
      alert("Los campos del producto no están completos");
    }
  }
  updateProducto(producto:Interface_Producto){
    this.conexion.updateProducto(producto).then(data=>{
      if(data){
        alert("Producto actualizado: "+producto.nombre);
        this.actualizaProductos();
      }
      else{
        alert("Error al actualizar los datos");
      }
    })
  }
  deleteProducto(producto: Interface_Producto){
    this.conexion.deleteProducto(producto.id_producto).then(data=>{
      if(data){
        alert("Producto eliminado: "+producto.nombre);
        this.actualizaProductos();
      }
      else{
        alert("Error el producto: "+producto.nombre+" no se pudo eliminar")
      }
    });
  }
  selectProducto(producto:Interface_Producto){
    this.nuevo_producto=producto;
    this.muestraBtnUpdate();
  }

  selectCategoria(event:any){
    this.nuevo_producto.id_categoria = event.target.value;
  }

  muestraBtnAdd(){
    //oculta el boton de actualizar y muestra el de agregar
    var btn_add = document.getElementById("btn_add");
    btn_add?.removeAttribute("hidden");
    var btn_update = document.getElementById("btn_update");
    btn_update?.setAttribute("hidden","");
  }
  muestraBtnUpdate(){
    //oculta boton de nuevo
    var btn_add = document.getElementById("btn_add");
    btn_add?.setAttribute("hidden","");
    //mostrar boton de actualizar
    var btn_update = document.getElementById("btn_update");
    btn_update?.removeAttribute("hidden");
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
