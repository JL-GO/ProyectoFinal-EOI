import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ArticulosModel } from 'src/app/modelos/modelo-articulos/articulos.model';
import { HttpModel } from 'src/app/modelos/modelo-peticiones/http.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeticionesArticulosServiceService extends HttpModel<ArticulosModel> {

  constructor(http: HttpClient) {
    super(http);
  }

  crearArticulo(articulo:ArticulosModel):Observable<ArticulosModel>{
    return this.postElem(environment.URL_ARTICULO, articulo);
  }

  obtenerArticulos():Observable<Array<ArticulosModel>>{
    return this.getAll(environment.URL_ARTICULO);
  }

  obtenerArticulosPorNombre(nombre:string):Observable<Array<ArticulosModel>>{
    return this.getId(environment.URL_ARTICULO,nombre);
  }

  obtenerArticulosparaCarro():Observable<Array<ArticulosModel>>{
    return this.obtenerArticulos().pipe(
      map(
        (art: Array<ArticulosModel>) => {
          return art.map(a=>{
            a.seleccionados=0;
            return a;
          })
        })
		)}


  obtenerArticulosConNumeroPedidos(busqueda:string = "", mapaArticulosPedidos:any):Observable<Array<ArticulosModel>>{
    if(busqueda != ""){
      return this.obtenerArticulosPorNombre(busqueda).pipe(
        map(
          (art: Array<ArticulosModel>) => {
            return art.map(a=>{
              if(mapaArticulosPedidos.has(a._id!)){
                a.seleccionados = mapaArticulosPedidos.get(a._id!);
              }else{
                a.seleccionados=0;
              }
              return a;
            })
          })
      )
    }else{
    return this.obtenerArticulos().pipe(
      map(
        (art: Array<ArticulosModel>) => {
          return art.map(a=>{
            if(mapaArticulosPedidos.has(a._id!)){
              a.seleccionados = mapaArticulosPedidos.get(a._id!);
            }else{
              a.seleccionados=0;
            }
            return a;
          })
        })
		)}
  }

  

  borrarArticulo(id:string, rev:string):Observable<ArticulosModel>{
    return this.deleteId(environment.URL_ARTICULO,id,rev);
  }

  actualizarArticulo(id:string, rev:string, articulo:ArticulosModel ):Observable<ArticulosModel>{
    return this.putElem(environment.URL_ARTICULO,id,rev,articulo);
  }

}
