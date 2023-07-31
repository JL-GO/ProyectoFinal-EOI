import { Component, EventEmitter, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeticionesUsuariosServiceService } from '../../servicios/peticiones-usuarios.service.service';
import { UsuariosModel } from 'src/app/modelos/modelo-usuarios/usuarios.model';
import { PeticionesServiceService } from 'src/app/servicios/estadisticas/peticiones.service.service';

@Component({
  selector: 'app-create-usuarios',
  templateUrl: './create-usuarios.component.html',
  styleUrls: ['./create-usuarios.component.css']
})
export class CreateUsuariosComponent {
  
  form:FormGroup;

  constructor(private fb:FormBuilder, private servicio:PeticionesUsuariosServiceService,
    private servicioEstadisticas: PeticionesServiceService){
 
    this.form = fb.group(
      {
        "username":["", Validators.required],
				"password":["", Validators.required],
      }
    );
  }

  @Output()
  finCrear: EventEmitter<string> = new EventEmitter<string>();

  peticionCrear(form:UsuariosModel){
    this.servicio.crearUsuario(form).subscribe(
      {
        next: (respuesta: UsuariosModel) => {
          console.log(respuesta);
          this.finCrear.emit("Exito al crear el usuario");
          this.servicioEstadisticas.ActualizarDatos();
        },
        error: error => console.log(error),
      })
  }
}
