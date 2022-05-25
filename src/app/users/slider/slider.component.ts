import { Component, OnInit } from '@angular/core';
import { ConectionFireService } from 'src/app/conection-fire.service';
import { Interface_Categoria } from 'src/app/interfaces/int_categoria';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  constructor(private conexion: ConectionFireService) { }
  
  categorias: Interface_Categoria[]=[];

  ngOnInit(): void {
    this.conexion.getCategorias().then(data=>{
      this.categorias=data;
    });
  }

}
