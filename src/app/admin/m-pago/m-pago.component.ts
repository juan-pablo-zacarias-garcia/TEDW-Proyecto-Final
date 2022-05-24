import { Component, OnInit } from '@angular/core';
import { ConectionFireService } from 'src/app/conection-fire.service';
import { Interface_Metodo_Pago } from 'src/app/interfaces/int_metodo_pago';

@Component({
  selector: 'app-m-pago',
  templateUrl: './m-pago.component.html',
  styleUrls: ['./m-pago.component.css']
})
export class MPagoComponent implements OnInit {

  constructor(private conexion: ConectionFireService) { }
  //variables
  mPagos_disponibles: Interface_Metodo_Pago[]=[];
  nuevo_mPago: Interface_Metodo_Pago={
    id_mPago:"",
    name:"",
    imagen:""
  }

    
  //metodos
  ngOnInit(): void {
     this.actualizamPagos();
     //oculta boton de actualizar
     var btn_update = document.getElementById("btn_update");
     btn_update?.setAttribute("hidden","");
  }
  addmPago(){
    this.nuevo_mPago.id_mPago = generaId();
    if(this.nuevo_mPago.name!="" && this.nuevo_mPago.imagen!=""){
      this.conexion.addmPago(this.nuevo_mPago).then(data=>{
        if(data){
          alert("Metodo de Pago agregado: "+this.nuevo_mPago.name);
          this.actualizamPagos();
          //limpia los campos
          this.nuevo_mPago.id_mPago="";
          this.nuevo_mPago.name="";
          this.nuevo_mPago.imagen="";
        }
        else{
          alert("Error al cargar el metodo de pago");
        }
  
      }); 
    }
    else{
      alert("No se agregó ningun metodo de pago");
    }
  }
  deletemPago(mPago:Interface_Metodo_Pago){
    this.conexion.deletemPago(mPago.id_mPago).then(data=>{
      if(data){
        alert("Metodo de pago eliminado: "+mPago.name);
        this.actualizamPagos();
      }
    });
  }
  selectmPago(mPago:Interface_Metodo_Pago){
    this.muestraBtnUpdate();
        this.nuevo_mPago.id_mPago=mPago.id_mPago;
        this.nuevo_mPago.name=mPago.name;
        this.nuevo_mPago.imagen=mPago.imagen;
  }
  updatemPago(mPago:Interface_Metodo_Pago){
    this.conexion.updatemPago(mPago).then(data=>{
      if(data){
        alert("Metodo de pago actualizado: "+mPago.name);
        this.actualizamPagos();
      }
      else{
        alert("Error al actualizar los datos");
      }
    })
  }

  actualizamPagos(){
    this.muestraBtnAdd();
    this.conexion.getmPagos().then(data=>{
      this.mPagos_disponibles=data;
    });
    this.nuevo_mPago={
      id_mPago:"",
      name:"",
      imagen:""
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
