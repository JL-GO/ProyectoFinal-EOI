import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticulosModel } from 'src/app/modelos/modelo-articulos/articulos.model';
import { PeticionesArticulosServiceService } from '../../servicios/peticiones-articulos.service.service';
import { PeticionesServiceService } from 'src/app/servicios/estadisticas/peticiones.service.service';

@Component({
  selector: 'app-delete-articulos',
  templateUrl: './delete-articulos.component.html',
  styleUrls: ['./delete-articulos.component.css']
})
export class DeleteArticulosComponent {

  articulos!: Observable<Array<ArticulosModel>>

  @Input()
  idArticulo!: string;

  @Output()
  finBorrar: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private servicio: PeticionesArticulosServiceService, private servicioEstadisticas: PeticionesServiceService) {
    this.articulos = this.servicio.obtenerArticulos();
  }

  volver(cancelado:boolean) {
    this.finBorrar.emit(cancelado);
  }

  peticionBorrar(rev: string) {
    this.servicio.borrarArticulo(this.idArticulo, rev).subscribe(
      {
        next: (respuesta: ArticulosModel) => {
          console.log(respuesta);
          this.volver(false);
          this.servicioEstadisticas.ActualizarDatos();
        },
        error: error => console.log(error)
      }
    )}
}

