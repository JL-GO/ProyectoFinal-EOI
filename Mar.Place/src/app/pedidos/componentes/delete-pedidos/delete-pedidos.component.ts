import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { PedidosModel } from 'src/app/modelos/modelo-pedidos/pedidos.model';
import { PeticionesPedidosServiceService } from '../../servicios/peticiones-pedidos.service.service';
import { PeticionesServiceService } from 'src/app/servicios/estadisticas/peticiones.service.service';

@Component({
  selector: 'app-delete-pedidos',
  templateUrl: './delete-pedidos.component.html',
  styleUrls: ['./delete-pedidos.component.css']
})
export class DeletePedidosComponent {

  
  pedidos!: Observable<Array<PedidosModel>>

  @Input()
  idPedido!: string;

  @Output()
  finBorrar: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private servicio: PeticionesPedidosServiceService, private servicioEstadisticas: PeticionesServiceService) {
    this.pedidos = this.servicio.obtenerPedidos();
  }

  volver(cancelado:boolean) {
    this.finBorrar.emit(cancelado);
  }

  peticionBorrar(rev: string) {
    this.servicio.borrarPedido(this.idPedido, rev).subscribe(
      {
        next: (respuesta: PedidosModel) => {
          console.log(respuesta);
          this.volver(false);
          this.servicioEstadisticas.ActualizarDatos();
        },
        error: error => console.log(error)
      }
    )}
}
