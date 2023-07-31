import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PeticionesUsuariosServiceService } from '../../servicios/peticiones-usuarios.service.service';
import { Observable } from 'rxjs';
import { UsuariosModel } from 'src/app/modelos/modelo-usuarios/usuarios.model';
import { PeticionesServiceService } from 'src/app/servicios/estadisticas/peticiones.service.service';

@Component({
  selector: 'app-delete-usuarios',
  templateUrl: './delete-usuarios.component.html',
  styleUrls: ['./delete-usuarios.component.css']
})
export class DeleteUsuariosComponent {

  usuarios!: Observable<Array<UsuariosModel>>

  @Input()
  idUusario!: string;

  @Output()
  finBorrar: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private servicioUsuarios: PeticionesUsuariosServiceService,private servicioEstadisticas: PeticionesServiceService) {
    this.usuarios = this.servicioUsuarios.obtenerUsuarios();
  }

  volver(cancelado:boolean) {
    this.finBorrar.emit(cancelado);
  }

  peticionBorrar(rev: string) {
    this.servicioUsuarios.borrarUsuario(this.idUusario, rev).subscribe(
      {
        next: (respuesta: UsuariosModel) => {
          console.log(respuesta);
          this.volver(false);
          this.servicioEstadisticas.ActualizarDatos();
        },
        error: error => console.log(error)
      }
    )}
}
