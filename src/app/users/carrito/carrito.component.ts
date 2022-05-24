import { Component, OnInit } from '@angular/core';
import { ConectionFireService } from 'src/app/conection-fire.service';
import { Interface_Producto } from 'src/app/interfaces/int_pruducto';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(private conexion: ConectionFireService) { }

  ngOnInit(): void {
  }

  procederPago(){
    
  }

  deleteProducto(){
    
  }
}
