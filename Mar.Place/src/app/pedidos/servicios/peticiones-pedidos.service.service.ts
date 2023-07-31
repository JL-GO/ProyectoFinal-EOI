import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PedidosModel } from 'src/app/modelos/modelo-pedidos/pedidos.model';
import { HttpModel } from 'src/app/modelos/modelo-peticiones/http.model';
import { AppAutentificacionServiceService } from 'src/app/servicios/autentificacion/app-autentificacion.service.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeticionesPedidosServiceService extends HttpModel<PedidosModel> {

    constructor(http: HttpClient, private auth:AppAutentificacionServiceService) {
      super(http);
    }
  
    crearPedido(pedido:PedidosModel):Observable<PedidosModel>{      
      pedido.usuario = this.auth.UsuarioActivo._id;
      return this.postElem(environment.URL_PEDIDO,pedido);
    }
  
    obtenerPedidos():Observable<Array<PedidosModel>>{
      return this.getAll(environment.URL_PEDIDO);
    }
  
    obtenerPedidosPorNombre(nombre:string):Observable<Array<PedidosModel>>{
      return this.getId(environment.URL_PEDIDO,`nombre/${nombre}`);
    }

    borrarPedido(id:string, rev:string):Observable<PedidosModel>{
      return this.deleteId(environment.URL_PEDIDO,id,rev);
    }
  
    actualizarPedido(id:string, rev:string, pedido:PedidosModel ):Observable<PedidosModel>{
      return this.putElem(environment.URL_PEDIDO,id,rev,pedido);
    }
}
