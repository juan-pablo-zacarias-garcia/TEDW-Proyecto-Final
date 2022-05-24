import { Component, OnInit } from '@angular/core';
import { ConectionFireService } from 'src/app/conection-fire.service';
import { Interface_Cliente } from 'src/app/interfaces/int_cliente';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  constructor(private conexion: ConectionFireService) { }
  //variables
  clientes_disponibles: Interface_Cliente[]=[];
  nuevo_cliente: Interface_Cliente={
    email:"",
    password:"",
    name:"",
    gender:"",
    age:"",
    phone:"",
    residence:""
  }

    
  //metodos
  ngOnInit(): void {
     this.actualizaClientes();
     //oculta boton de actualizar
     var btn_update = document.getElementById("btn_update");
     btn_update?.setAttribute("hidden","");
  }
  addCliente(){
    this.nuevo_cliente.email = generaId();
    if(this.nuevo_cliente.password!="" &&  this.nuevo_cliente.name!="" && this.nuevo_cliente.gender!="" && this.nuevo_cliente.age!="" && this.nuevo_cliente.phone!="" && this.nuevo_cliente.residence!=""){
      this.conexion.addCliente(this.nuevo_cliente).then(data=>{
        if(data){
          alert("Cliente agregado: "+this.nuevo_cliente.name);
          this.actualizaClientes();
          //limpia los campos
          this.nuevo_cliente.email="";
          this.nuevo_cliente.password="";
          this.nuevo_cliente.name="";
          this.nuevo_cliente.gender="";
          this.nuevo_cliente.age="";
          this.nuevo_cliente.phone="";
          this.nuevo_cliente.residence="";
        }
        else{
          alert("Error al cargar el cliente");
        }
  
      }); 
    }
    else{
      alert("No se agregó ningun cliente");
    }
  }
  deleteCliente(cliente:Interface_Cliente){
    this.conexion.deleteCliente(cliente.email).then(data=>{
      if(data){
        alert("Cliente eliminado: "+cliente.name);
        this.actualizaClientes();
      }
    });
  }
  selectCliente(cliente:Interface_Cliente){
    this.muestraBtnUpdate();
        this.nuevo_cliente.email=cliente.email;
        this.nuevo_cliente.password=cliente.password;
        this.nuevo_cliente.name=cliente.name;
        this.nuevo_cliente.gender=cliente.gender;
        this.nuevo_cliente.age=cliente.age;
        this.nuevo_cliente.phone=cliente.phone;
        this.nuevo_cliente.residence=cliente.residence;
  }
  updateCliente(cliente:Interface_Cliente){
    this.conexion.updateCliente(cliente).then(data=>{
      if(data){
        alert("Cliente actualizado: "+cliente.name);
        this.actualizaClientes();
      }
      else{
        alert("Error al actualizar los datos");
      }
    })
  }

  actualizaClientes(){
    this.muestraBtnAdd();
    this.conexion.getClientes().then(data=>{
      this.clientes_disponibles=data;
    });
    this.nuevo_cliente={
      email:"",
      password:"",
      name:"",
      gender:"",
      age:"",
      phone:"",
      residence:""
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