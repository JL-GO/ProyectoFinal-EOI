import { Component, OnInit } from '@angular/core';
import { PeticionesPedidosServiceService } from '../../servicios/peticiones-pedidos.service.service';
import { PedidosModel } from 'src/app/modelos/modelo-pedidos/pedidos.model';
import { Observable } from 'rxjs';
import { PeticionesArticulosServiceService } from 'src/app/articulos/servicios/peticiones-articulos.service.service';
import { PeticionesUsuariosServiceService } from 'src/app/usuarios/servicios/peticiones-usuarios.service.service';
import { UsuariosModel } from 'src/app/modelos/modelo-usuarios/usuarios.model';
import { ArticulosModel } from 'src/app/modelos/modelo-articulos/articulos.model';

@Component({
  selector: 'app-get-pedidos',
  templateUrl: './get-pedidos.component.html',
  styleUrls: ['./get-pedidos.component.css']
})
export class GetPedidosComponent implements OnInit{

  pedidos!: Observable<Array<PedidosModel>>
  pedidosConTotal: Array<PedidosModel> = new Array<PedidosModel>;

  seleccionBorrar!: boolean;
  seleccionModificar!: boolean;
  busqueda:string="";
  idSeleccionado!: string;
  pedidoSeleccionado!: PedidosModel;

  usuarios: Map<string, UsuariosModel> = new Map<string, UsuariosModel>;
  articulos: Map<string, ArticulosModel> = new Map<string, ArticulosModel>;

  constructor(private servicioPedidos: PeticionesPedidosServiceService, private servicioArticulos: PeticionesArticulosServiceService,
    private servicioUsuarios: PeticionesUsuariosServiceService) {
  }

  ngOnInit(): void {
    this.obtenerDatosGlobales();
  }

  obtenerDatosGlobales(){
    this.pedidosConTotal = []
    this.busquedaArticulos();
    this.busquedaUsuarios();
  }

  buscarPedidos() {
    this.pedidosConTotal = [];
    if (this.busqueda.length == 0) {
      this.servicioPedidos.obtenerPedidos().subscribe({
        next: (respuesta: Array<PedidosModel>) => {
          respuesta.forEach(pedido => {
            let contadorPrecio = 0;
            pedido.articulos!.forEach(articulos => {
              contadorPrecio += this.articulos.get(articulos.id!)?.precio! * articulos.cantidad!
            });
            pedido.precioTotal = contadorPrecio;
            this.pedidosConTotal.push(pedido);
          });
        },
        error: (error) => { console.log(error) }
      })
    }else{
      this.servicioPedidos.obtenerPedidosPorNombre(this.busqueda).subscribe({
        next: (respuesta: Array<PedidosModel>) => {
          respuesta.forEach(pedido => {
            let contadorPrecio = 0;
            pedido.articulos!.forEach(articulos => {
              contadorPrecio += this.articulos.get(articulos.id!)?.precio! * articulos.cantidad!
            });
            pedido.precioTotal = contadorPrecio;
            this.pedidosConTotal.push(pedido);
          });
        },
        error: (error) => { console.log(error) }
      });
    }
  }

  busquedaUsuarios() {
    this.servicioUsuarios.obtenerUsuarios().subscribe({
      next: (respuesta: Array<UsuariosModel>) => {
        respuesta.forEach(usuario => {
          this.usuarios.set(usuario._id!, usuario);
        });
      },
      error: (error) => { console.log(error)},
      complete: () => {
        this.buscarPedidos();
       }
    })
  }

  busquedaArticulos() {
    this.servicioArticulos.obtenerArticulos().subscribe({
      next: (respuesta: Array<ArticulosModel>) => {
        respuesta.forEach(articulo => {
          this.articulos.set(articulo._id!, articulo);
        });
      },
      error: (error) => { console.log(error) }
    })
  }

  irBorrar(id: string) {
    this.idSeleccionado = id;
    this.seleccionBorrar = true;
    this.seleccionModificar = false;
  }

  finModificacion(evento: boolean) {
    if (!evento) {
      this.obtenerDatosGlobales();
    }
    this.idSeleccionado = "";
    this.seleccionModificar = false;
  }

  irActualizar(id: string, rev: string, nombreUsuario:string, idUsuario:string) {
    this.seleccionModificar = true;
    this.seleccionBorrar = false;
    this.idSeleccionado = id;
    this.pedidoSeleccionado = {
      _id: id,
      _rev: rev,
      usuario: idUsuario,
      nombre: nombreUsuario
    }
  }

}
