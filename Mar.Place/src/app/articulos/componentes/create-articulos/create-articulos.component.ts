import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticulosModel } from 'src/app/modelos/modelo-articulos/articulos.model';
import { PeticionesArticulosServiceService } from '../../servicios/peticiones-articulos.service.service';
import { PeticionesServiceService } from 'src/app/servicios/estadisticas/peticiones.service.service';

@Component({
  selector: 'app-create-articulos',
  templateUrl: './create-articulos.component.html',
  styleUrls: ['./create-articulos.component.css']
})
export class CreateArticulosComponent {
  
  form:FormGroup;

  constructor(private fb:FormBuilder, private servicio:PeticionesArticulosServiceService,
    private servicioEstadisticas: PeticionesServiceService){
 
    this.form = fb.group(
      {
        "nombre":["", Validators.required],
				"precio":["", Validators.required],
        "stock":["", Validators.required],
      }
    );
  }

  @Output()
  finCrear: EventEmitter<string> = new EventEmitter<string>();

  peticionCrear(form:ArticulosModel){
    this.servicio.crearArticulo(form).subscribe(
      {
        next: (respuesta: ArticulosModel) => {
          console.log(respuesta);
          this.finCrear.emit();
          this.servicioEstadisticas.ActualizarDatos();
        },
        error: error => console.log(error),
      })
  } 
}



