import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ArticulosModel } from 'src/app/modelos/modelo-articulos/articulos.model';
import { PeticionesArticulosServiceService } from '../../servicios/peticiones-articulos.service.service';

@Component({
  selector: 'app-update-articulos',
  templateUrl: './update-articulos.component.html',
  styleUrls: ['./update-articulos.component.css']
})
export class UpdateArticulosComponent {
  
  articulos!: Observable<Array<ArticulosModel>>;
  form:FormGroup;
  
  @Input()
  articuloSeleccionado!: ArticulosModel;

  @Output()
  finModificar: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private servicio: PeticionesArticulosServiceService,private fb:FormBuilder) {
    this.articulos = this.servicio.obtenerArticulos();
    this.form = fb.group(
      {
        "nombre":["", Validators.required],
				"precio":["", Validators.required],
        "stock":["", Validators.required],
      }
    );
  }

  peticionModificar(form:ArticulosModel){
    this.servicio.actualizarArticulo(this.articuloSeleccionado._id!,this.articuloSeleccionado._rev!,form).subscribe(
      {
        next: (respuesta: ArticulosModel) => {
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
