import { Component, OnInit } from '@angular/core';
import { ConectionFireService } from 'src/app/conection-fire.service';
import { Interface_Cupon } from 'src/app/interfaces/int_cupon';

@Component({
  selector: 'app-cupones',
  templateUrl: './cupones.component.html',
  styleUrls: ['./cupones.component.css']
})
export class CuponesComponent implements OnInit {

  constructor(private conexion: ConectionFireService) { }
  //variables
  cupones_disponibles: Interface_Cupon[]=[];
  nuevo_cupon: Interface_Cupon={
    id_cupon:"",
    name:"",
    imagen:"",
    discount:""
  }

    
  //metodos
  ngOnInit(): void {
     this.actualizaCupones();
     //oculta boton de actualizar
     var btn_update = document.getElementById("btn_update");
     btn_update?.setAttribute("hidden","");
  }
  addCupon(){
    this.nuevo_cupon.id_cupon = generaId();
    if(this.nuevo_cupon.name!="" && this.nuevo_cupon.imagen!="" &&  this.nuevo_cupon.discount!=""){
      this.conexion.addCupon(this.nuevo_cupon).then(data=>{
        if(data){
          alert("Cupon agregado: "+this.nuevo_cupon.name);
          this.actualizaCupones();
          //limpia los campos
          this.nuevo_cupon.id_cupon="";
          this.nuevo_cupon.name="";
          this.nuevo_cupon.imagen="";
          this.nuevo_cupon.discount="";
        }
        else{
          alert("Error al cargar el cupon");
        }
  
      }); 
    }
    else{
      alert("No se agregó ningun cupon");
    }
  }
  deleteCupon(cupon:Interface_Cupon){
    this.conexion.deleteCupon(cupon.id_cupon).then(data=>{
      if(data){
        alert("Cupon eliminado: "+cupon.name);
        this.actualizaCupones();
      }
    });
  }
  selectCupon(cupon:Interface_Cupon){
    this.muestraBtnUpdate();
        this.nuevo_cupon.id_cupon=cupon.id_cupon;
        this.nuevo_cupon.name=cupon.name;
        this.nuevo_cupon.imagen=cupon.imagen;
        this.nuevo_cupon.discount=cupon.discount;
  }
  updateCupon(cupon:Interface_Cupon){
    this.conexion.updateCupon(cupon).then(data=>{
      if(data){
        alert("Cupon actualizado: "+cupon.name);
        this.actualizaCupones();
      }
      else{
        alert("Error al actualizar los datos");
      }
    })
  }

  actualizaCupones(){
    this.muestraBtnAdd();
    this.conexion.getCupones().then(data=>{
      this.cupones_disponibles=data;
    });
    this.nuevo_cupon={
      id_cupon:"",
      name:"",
      imagen:"",
      discount:""
    }

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