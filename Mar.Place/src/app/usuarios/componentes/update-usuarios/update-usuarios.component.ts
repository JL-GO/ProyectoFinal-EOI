import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuariosModel } from 'src/app/modelos/modelo-usuarios/usuarios.model';
import { PeticionesUsuariosServiceService } from '../../servicios/peticiones-usuarios.service.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-usuarios',
  templateUrl: './update-usuarios.component.html',
  styleUrls: ['./update-usuarios.component.css']
})
export class UpdateUsuariosComponent {

  usuarios!: Observable<Array<UsuariosModel>>;
  form:FormGroup;
  
  @Input()
  usuarioSeleccionado!: UsuariosModel;

  @Output()
  finModificar: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private servicioUsuarios: PeticionesUsuariosServiceService,private fb:FormBuilder) {
    this.usuarios = this.servicioUsuarios.obtenerUsuarios();
    this.form = fb.group(
      {
        "username":["", Validators.required],
				"password":["", Validators.required],
      }
    );
  }

  peticionModificar(form:UsuariosModel){
    this.servicioUsuarios.actualizarUsuario(this.usuarioSeleccionado._id!,this.usuarioSeleccionado._rev!,form).subscribe(
      {
        next: (respuesta: UsuariosModel) => {
          console.log(respuesta);
          this.volver(false);
        },
        error: error => console.log(error)
      }) 
  }
  
  volver(cancelado:boolean) {
    this.finModificar.emit(cancelado);
  }

}
