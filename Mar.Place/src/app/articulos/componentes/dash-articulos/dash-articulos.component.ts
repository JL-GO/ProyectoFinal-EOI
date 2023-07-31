import { Component } from '@angular/core';

@Component({
  selector: 'app-dash-articulos',
  templateUrl: './dash-articulos.component.html',
  styleUrls: ['./dash-articulos.component.css']
})
export class DashArticulosComponent {

  ventanaCrear!:boolean;
  mostrarListado:boolean = true;
  alerta!:string;

  ocultartodo(){
    this.ventanaCrear = false;
    this.mostrarListado = false;
  }
  
  irCrear(){
    this.ocultartodo();
    this.ventanaCrear = true;
  }

  irListado(){
    this.ocultartodo();
    this.mostrarListado = true;
  }

  recogerDatos(event:string){
    this.ocultartodo();
    this.alerta = event;
  } 

}
