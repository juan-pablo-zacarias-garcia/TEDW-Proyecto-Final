import { Component, OnInit } from '@angular/core';
import { ConectionFireService } from '../conection-fire.service';
import { Interface_Empleado } from '../interfaces/int_empleado';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private conexion: ConectionFireService) { }
  //variables
  empleados_disponibles: Interface_Empleado[]=[];

  ngOnInit(): void {
  }

}
