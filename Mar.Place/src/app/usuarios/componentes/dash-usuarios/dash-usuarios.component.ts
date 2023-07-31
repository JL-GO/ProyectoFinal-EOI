import { Component } from '@angular/core';

@Component({
  selector: 'app-dash-usuarios',
  templateUrl: './dash-usuarios.component.html',
  styleUrls: ['./dash-usuarios.component.css']
})
export class DashUsuariosComponent {
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
