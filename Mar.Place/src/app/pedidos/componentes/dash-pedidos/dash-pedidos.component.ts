import { Component } from '@angular/core';

@Component({
  selector: 'app-dash-pedidos',
  templateUrl: './dash-pedidos.component.html',
  styleUrls: ['./dash-pedidos.component.css']
})
export class DashPedidosComponent {

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
