import { Component, OnInit } from '@angular/core';
import { ConectionFireService } from 'src/app/conection-fire.service';
import { Interface_Proveedor } from 'src/app/interfaces/int_proveedor';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {

  constructor(private conexion: ConectionFireService) { }
  //variables
  proveedores_disponibles: Interface_Proveedor[]=[];
  nuevo_proveedor: Interface_Proveedor={
    id_proveedor:"",
    name:"",
    residence:"",
    email:"",
    phone:"",
    rfc:"",
    date_of_admission:""
  }

    
  //metodos
  ngOnInit(): void {
     this.actualizaProveedor();
     //oculta boton de actualizar
     var btn_update = document.getElementById("btn_update");
     btn_update?.setAttribute("hidden","");
  }
  addProveedor(){
    this.nuevo_proveedor.id_proveedor = generaId();
    if(this.nuevo_proveedor.name!="" &&  this.nuevo_proveedor.residence!="" && this.nuevo_proveedor.email!="" && this.nuevo_proveedor.phone!="" && this.nuevo_proveedor.rfc!="" && this.nuevo_proveedor.date_of_admission!=""){
      this.conexion.addProveedor(this.nuevo_proveedor).then(data=>{
        if(data){
          alert("Proveedor agregado: "+this.nuevo_proveedor.name);
          this.actualizaProveedor();
          //limpia los campos
          this.nuevo_proveedor.id_proveedor="";
          this.nuevo_proveedor.name="";
          this.nuevo_proveedor.residence="";
          this.nuevo_proveedor.email="";
          this.nuevo_proveedor.phone="";
          this.nuevo_proveedor.rfc="";
          this.nuevo_proveedor.date_of_admission="";
        }
        else{
          alert("Error al cargar el proveedor");
        }
  
      }); 
    }
    else{
      alert("No se agregó ningun proveedor");
    }
  }
  deleteProveedor(proveedor:Interface_Proveedor){
    this.conexion.deleteProveedor(proveedor.id_proveedor).then(data=>{
      if(data){
        alert("Proveedor eliminado: "+proveedor.name);
        this.actualizaProveedor();
      }
    });
  }
  selectProveedor(proveedor:Interface_Proveedor){
    this.muestraBtnUpdate();
        this.nuevo_proveedor.id_proveedor=proveedor.id_proveedor;
        this.nuevo_proveedor.name=proveedor.name;
        this.nuevo_proveedor.residence=proveedor.residence;
        this.nuevo_proveedor.email=proveedor.email;
        this.nuevo_proveedor.phone="";
        this.nuevo_proveedor.rfc="";
        this.nuevo_proveedor.date_of_admission="";
  }
  updateProveedor(proveedor:Interface_Proveedor){
    this.conexion.updateProveedor(proveedor).then(data=>{
      if(data){
        alert("Proveedor actualizado: "+proveedor.name);
        this.actualizaProveedor();
      }
      else{
        alert("Error al actualizar los datos");
      }
    })
  }

  actualizaProveedor(){
    this.muestraBtnAdd();
    this.conexion.getProveedores().then(data=>{
      this.proveedores_disponibles=data;
    });
    this.nuevo_proveedor={
      id_proveedor:"",
      name:"",
      residence:"",
      email:"",
      phone:"",
      rfc:"",
      date_of_admission:""
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