import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export abstract class HttpModel <TipoObjeto>{

    constructor(private http:HttpClient){}

    getAll(url:string):Observable<Array<TipoObjeto>>{
        return this.http.get<Array<TipoObjeto>>(url);
    }

    getId(url:string,id:string):Observable<Array<TipoObjeto>>{
        return  this.http.get<Array<TipoObjeto>>(`${url}/${id}`);
      }

    postElem(url:string, elem:TipoObjeto):Observable<TipoObjeto>{
        return this.http.post<TipoObjeto>(url, elem);
    }

    putElem(url:string, id:string, rev:string, elem:TipoObjeto):Observable<TipoObjeto>{
        return this.http.put<TipoObjeto>(`${url}/${id}/${rev}`,elem);
      }
    
    deleteId(url:string, id:string, rev:string):Observable<TipoObjeto>{
        return this.http.delete<TipoObjeto>(`${url}/${id}/${rev}`);
        }
}