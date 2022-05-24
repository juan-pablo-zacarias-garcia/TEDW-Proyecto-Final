import { Component, OnInit } from '@angular/core';
import { ConectionFireService } from 'src/app/conection-fire.service';
import { Interface_Empleado } from 'src/app/interfaces/int_empleado';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(private conexion: ConectionFireService) { }
  //variables
  empleados_disponibles: Interface_Empleado[]=[];
  nuevo_empleado: Interface_Empleado={
    id_empleado:"",
    name:"",
    gender:"",
    age:"",
    phone:"",
    residence:"",
    email:"",
    date_of_admission:"",
    position:"",
    salary:""
  }

    
  //metodos
  ngOnInit(): void {
     this.actualizaEmpleados();
     //oculta boton de actualizar
     var btn_update = document.getElementById("btn_update");
     btn_update?.setAttribute("hidden","");
  }
  addEmpleado(){
    this.nuevo_empleado.id_empleado = generaId();
    if(this.nuevo_empleado.name!="" &&  this.nuevo_empleado.gender!="" && this.nuevo_empleado.age!="" && this.nuevo_empleado.phone!="" && this.nuevo_empleado.residence!="" && this.nuevo_empleado.email!="" && this.nuevo_empleado.date_of_admission!="" && this.nuevo_empleado.position!="" && this.nuevo_empleado.salary!=""){
      this.conexion.addEmpleado(this.nuevo_empleado).then(data=>{
        if(data){
          alert("Empleado agregado: "+this.nuevo_empleado.name);
          this.actualizaEmpleados();
          //limpia los campos
          this.nuevo_empleado.id_empleado="";
          this.nuevo_empleado.name="";
          this.nuevo_empleado.gender="";
          this.nuevo_empleado.age="";
          this.nuevo_empleado.phone="";
          this.nuevo_empleado.residence="";
          this.nuevo_empleado.email="";
          this.nuevo_empleado.date_of_admission="";
          this.nuevo_empleado.position="";
          this.nuevo_empleado.salary="";
        }
        else{
          alert("Error al cargar el empleado");
        }
  
      }); 
    }
    else{
      alert("No se agregó ningun empleado");
    }
  }
  deleteEmpleado(empleado:Interface_Empleado){
    this.conexion.deleteEmpleado(empleado.id_empleado).then(data=>{
      if(data){
        alert("Empleado eliminado: "+empleado.name);
        this.actualizaEmpleados();
      }
    });
  }
  selectEmpleado(empleado:Interface_Empleado){
    this.muestraBtnUpdate();
        this.nuevo_empleado.id_empleado=empleado.id_empleado;
        this.nuevo_empleado.name=empleado.name;
        this.nuevo_empleado.gender=empleado.gender;
        this.nuevo_empleado.age=empleado.age;
        this.nuevo_empleado.phone=empleado.phone;
        this.nuevo_empleado.residence=empleado.residence;
        this.nuevo_empleado.email=empleado.email;
        this.nuevo_empleado.date_of_admission=empleado.date_of_admission;
        this.nuevo_empleado.position=empleado.position;
        this.nuevo_empleado.salary=empleado.salary;
  }
  updateEmpleado(empleado:Interface_Empleado){
    this.conexion.updateEmpleado(empleado).then(data=>{
      if(data){
        alert("Empleado actualizado: "+empleado.name);
        this.actualizaEmpleados();
      }
      else{
        alert("Error al actualizar los datos");
      }
    })
  }

  actualizaEmpleados(){
    this.muestraBtnAdd();
    this.conexion.getEmpleados().then(data=>{
      this.empleados_disponibles=data;
    });
    this.nuevo_empleado={
      id_empleado:"",
      name:"",
      gender:"",
      age:"",
      phone:"",
      residence:"",
      email:"",
      date_of_admission:"",
      position:"",
      salary:""
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

