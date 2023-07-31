import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthModel } from 'src/app/modelos/modelo-auth/auth.model';
import { TokenModel } from 'src/app/modelos/modelo-token/token.model';
import { UsuariosModel } from 'src/app/modelos/modelo-usuarios/usuarios.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class AppAutentificacionServiceService {

  token:TokenModel = new TokenModel();
  UsuarioActivo!:UsuariosModel;

   constructor(private http:HttpClient) { }

  httpOptions={
    headers:new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  postAuth(auth:AuthModel):Observable<TokenModel>{
    return this.http.post<TokenModel>(environment.URL_AUTH, auth ,this.httpOptions);
  }

  setToken(token:TokenModel){
    this.token = token
  }

  setUsuarioActivo(usuario:UsuariosModel){
    this.UsuarioActivo = usuario
  }

  getUsuarioActivo():UsuariosModel{
    return this.UsuarioActivo
  }
}
