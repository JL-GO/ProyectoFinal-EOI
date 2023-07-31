import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpModel } from 'src/app/modelos/modelo-peticiones/http.model';
import { UsuariosModel } from 'src/app/modelos/modelo-usuarios/usuarios.model';
import { PeticionesServiceService } from 'src/app/servicios/estadisticas/peticiones.service.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeticionesUsuariosServiceService extends HttpModel<UsuariosModel> {

  constructor(http: HttpClient) {
    super(http);
  }

  crearUsuario(usuario:UsuariosModel):Observable<UsuariosModel>{
    return this.postElem(environment.URL_USUARIO, usuario);
  }

  obtenerUsuarios():Observable<Array<UsuariosModel>>{
    return this.getAll(environment.URL_USUARIO);
  }

  obtenerUsuariosPorNombre(nombre:string):Observable<Array<UsuariosModel>>{
    return this.getId(environment.URL_USUARIO,nombre);
  }

  borrarUsuario(id:string, rev:string):Observable<UsuariosModel>{
    return this.deleteId(environment.URL_USUARIO,id,rev);
  }

  actualizarUsuario(id:string, rev:string, usuario:UsuariosModel ):Observable<UsuariosModel>{
    return this.putElem(environment.URL_USUARIO,id,rev,usuario);
  }
}
