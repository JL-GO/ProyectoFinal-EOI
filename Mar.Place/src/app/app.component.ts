import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppAutentificacionServiceService } from './servicios/autentificacion/app-autentificacion.service.service';
import { TokenModel } from './modelos/modelo-token/token.model';
import { AuthModel } from './modelos/modelo-auth/auth.model';
import { PeticionesUsuariosServiceService } from './usuarios/servicios/peticiones-usuarios.service.service';
import { UsuariosModel } from './modelos/modelo-usuarios/usuarios.model';
import { PeticionesServiceService } from './servicios/estadisticas/peticiones.service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  formAcceso: FormGroup;
  accesoPermitido: boolean = false;
  nombreUsuario!: string;

  recuentoTotal: Array<number> = [0,0,0]

  constructor(private fb: FormBuilder, private serviceAuth: AppAutentificacionServiceService, 
    private servicio: PeticionesUsuariosServiceService, private servicioEstadisticas: PeticionesServiceService) {

    this.formAcceso = fb.group(
      {
        "username": ["mk1", Validators.required],
        "password": ["mk1", Validators.required],
      }
    );
  }

  ngOnInit(): void {
    this.servicioEstadisticas.obtenerObservable().subscribe(estadisticas => {
      this.recuentoTotal = estadisticas;
    });
  }

  autentificarse(form: AuthModel) {

    this.serviceAuth.postAuth(form).subscribe(
      {
        next: (respuesta: TokenModel) => {
          this.serviceAuth.setToken(respuesta);
          this.accesoPermitido = true;
          this.nombreUsuario = form.username;
        },
        error: error => console.log(error),
        complete: () => { 
          this.obtenerIdUsuarioConectado(form);
          this.servicioEstadisticas.ActualizarDatos();
        }
      })
  }

  irMenuLogin() {
    this.accesoPermitido = false;
  }

  obtenerIdUsuarioConectado(form: AuthModel) {

    this.servicio.obtenerUsuariosPorNombre(this.nombreUsuario).subscribe(
      {
        next: (respuesta: Array<UsuariosModel>) => {
          respuesta.forEach(element => {
            if (element.username == form.username && element.password == form.password) {
              this.serviceAuth.setUsuarioActivo(element);                           
            }
          });
        },
        error: error => console.log(error)
      }
    )
  }
}