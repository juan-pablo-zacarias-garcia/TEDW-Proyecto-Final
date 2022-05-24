import { Component, OnInit } from '@angular/core';
import { ConectionFireService } from 'src/app/conection-fire.service';
import { Interface_Producto } from 'src/app/interfaces/int_pruducto';
import { Interface_Categoria } from 'src/app/interfaces/int_categoria';


@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  constructor(private conexion: ConectionFireService) { 
  }

  categorias: Interface_Categoria[]=[];
  productos: Interface_Producto[]=[];


  ngOnInit(): void {
    this.conexion.getCategorias().then(data=>{
      this.categorias=data;
    });
    this.conexion.getProductos().then(data=>{
      this.productos = data;
    });
  }

    selectCategoria(id_categoria: String){
      console.log(id_categoria);
      if(id_categoria!=""){
        this.conexion.getProductosCat(id_categoria).then(data=>{
          this.productos=data;
        });
      }
      else{
        this.conexion.getProductos().then(data=>{
          this.productos = data;
        });
      }
    }

  }


