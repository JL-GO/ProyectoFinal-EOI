import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PeticionesArticulosServiceService } from 'src/app/articulos/servicios/peticiones-articulos.service.service';
import { ArticulosModel } from 'src/app/modelos/modelo-articulos/articulos.model';
import { PedidosModel } from 'src/app/modelos/modelo-pedidos/pedidos.model';
import { UsuariosModel } from 'src/app/modelos/modelo-usuarios/usuarios.model';
import { PeticionesPedidosServiceService } from 'src/app/pedidos/servicios/peticiones-pedidos.service.service';
import { PeticionesUsuariosServiceService } from 'src/app/usuarios/servicios/peticiones-usuarios.service.service';

@Injectable({
  providedIn: 'root'
})
export class PeticionesServiceService {

  totalArticulos!:number;
  totalUsuarios!:number;
  totalPedidos!:number;

  estadisticasSubject = new Subject<any>();

  constructor(private articulos: PeticionesArticulosServiceService, private pedidos: PeticionesPedidosServiceService,
    private usuarios:PeticionesUsuariosServiceService) {}

    enviarDatos(){
      
      let totales: Array<number> = [this.totalUsuarios, this.totalArticulos, this.totalPedidos];
      this.estadisticasSubject.next(totales);
    }

    obtenerObservable(){
      return this.estadisticasSubject.asObservable();
    }

    ActualizarDatos(){
      this.articulos.obtenerArticulos().subscribe({
        next: (articulos:Array<ArticulosModel>) => {
          this.totalArticulos = articulos.length;          
        },
        error: error => {console.log(error)
        },
        complete:() => {
          this.obtenerUsuarios();
        },
      });
    }

    obtenerUsuarios(){
      this.usuarios.obtenerUsuarios().subscribe({
        next: (usuarios:Array<UsuariosModel>) => {
          this.totalUsuarios = usuarios.length;
        },
        error: error => {console.log(error)
        },
        complete:() => {
          this.obtenerPedidos();
        },
      });
    }

    obtenerPedidos(){
      this.pedidos.obtenerPedidos().subscribe({
        next: (pedidos:Array<PedidosModel>) => {
          this.totalPedidos = pedidos.length;
        },
        error: error => {console.log(error)
        },
        complete:() => {
          this.enviarDatos();
        },
      });
    }

}
