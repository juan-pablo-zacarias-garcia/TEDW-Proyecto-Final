import { Component, OnInit, Type } from '@angular/core';
import { Interface_Categoria } from 'src/app/interfaces/int_categoria';
import { ConectionFireService } from 'src/app/conection-fire.service';




@Component({
  selector: 'app-categoryes',
  templateUrl: './categoryes.component.html',
  styleUrls: ['./categoryes.component.css']
})
export class CategoryesComponent implements OnInit {

  constructor(private conexion: ConectionFireService) { }
  //variables
  categorias_disponibles: Interface_Categoria[]=[];
  nueva_categoria: Interface_Categoria={
    id_categoria:"",
    nombre:"",
    descripcion:"",
    imagen:""
  }

    
  //metodos
  ngOnInit(): void {
     this.actualizaCategorias();
     //oculta boton de actualizar
     var btn_update = document.getElementById("btn_update");
     btn_update?.setAttribute("hidden","");
  }
  addCategoria(){
    this.nueva_categoria.id_categoria = generaId();
    if(this.nueva_categoria.nombre!="" &&  this.nueva_categoria.descripcion!="" && this.nueva_categoria.imagen!=""){
      this.conexion.addCategoria(this.nueva_categoria).then(data=>{
        if(data){
          alert("Categoria agregada: "+this.nueva_categoria.nombre);
          this.actualizaCategorias();
          //limpia los campos
          this.nueva_categoria.id_categoria="";
          this.nueva_categoria.nombre="";
          this.nueva_categoria.descripcion="";
          this.nueva_categoria.imagen="";
        }
        else{
          alert("Error al cargar la categoria");
        }
  
      }); 
    }
    else{
      alert("No se agregó ninguna categoria");
    }
  }
  deleteCategoria(categoria:Interface_Categoria){
    this.conexion.deleteCategoria(categoria.id_categoria).then(data=>{
      if(data){
        alert("Categoria eliminada: "+categoria.nombre);
        this.actualizaCategorias();
      }
    });
  }
  selectCategoria(categoria:Interface_Categoria){
        //oculta boton de nuevo
        var btn_add = document.getElementById("btn_add");
        btn_add?.setAttribute("hidden","");
        //mostrar boton de actualizar
        var btn_update = document.getElementById("btn_update");
        btn_update?.removeAttribute("hidden");
        this.nueva_categoria.id_categoria=categoria.id_categoria;
        this.nueva_categoria.nombre=categoria.nombre;
        this.nueva_categoria.descripcion=categoria.descripcion;
        this.nueva_categoria.imagen=categoria.imagen;
  }
  updateCategoria(categoria:Interface_Categoria){
    this.conexion.updateCategoria(categoria).then(data=>{
      if(data){
        alert("Categoria actualizada: "+categoria.nombre);
        this.actualizaCategorias();
        //oculta el boton de actualizar y muestra el de agregar
        var btn_add = document.getElementById("btn_add");
        btn_add?.removeAttribute("hidden");
        var btn_update = document.getElementById("btn_update");
        btn_update?.setAttribute("hidden","");
      }
      else{
        alert("Error al actualizar los datos");
      }
    })
  }

  actualizaCategorias(){
    this.conexion.getCategorias().then(data=>{
      this.categorias_disponibles=data;
    });
    this.nueva_categoria={
      id_categoria:"",
      nombre:"",
      descripcion:"",
      imagen:""
    }

  }

}

function generaId() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

