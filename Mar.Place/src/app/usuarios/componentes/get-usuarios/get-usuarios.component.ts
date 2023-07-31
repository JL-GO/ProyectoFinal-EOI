import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { PeticionesUsuariosServiceService } from '../../servicios/peticiones-usuarios.service.service';
import { UsuariosModel } from 'src/app/modelos/modelo-usuarios/usuarios.model';
import { PeticionesPedidosServiceService } from 'src/app/pedidos/servicios/peticiones-pedidos.service.service';
import { PedidosModel } from 'src/app/modelos/modelo-pedidos/pedidos.model';
import { Articulo, ArticulosModel } from 'src/app/modelos/modelo-articulos/articulos.model';
import { PeticionesArticulosServiceService } from 'src/app/articulos/servicios/peticiones-articulos.service.service';


@Component({
  selector: 'app-get-usuarios',
  templateUrl: './get-usuarios.component.html',
  styleUrls: ['./get-usuarios.component.css']
})
export class GetUsuariosComponent implements OnInit {

  usuarios!: Observable<Array<UsuariosModel>>
  
  seleccionBorrar!:boolean;
  seleccionModificar!:boolean;
  busqueda:string ="";

  idSeleccionado!:string;
  usuarioSeleccionado!:UsuariosModel;
  totalPedidosPorUsuario: Map <string, number> = new Map <string, number>();

  articulosPorUsuario: Map <string, Map<string,number>> = new Map <string, Map<string,number>>();

  mapaConArticulos:Map <string, string> = new Map<string,string>();

  constructor(private servicioUsuarios:PeticionesUsuariosServiceService, private servicioPedidos: PeticionesPedidosServiceService,
    private servicioArticulos: PeticionesArticulosServiceService){}


  ngOnInit(): void {
    this.buscarPedidos();
  }

  buscarTodos(){
    this.usuarios = this.servicioUsuarios.obtenerUsuarios();
  }

  busquedaPorNombre(){
    this.usuarios = this.servicioUsuarios.obtenerUsuariosPorNombre(this.busqueda);   
  }

  buscarPedidos(){
    this.articulosPorUsuario.clear();
    this.totalPedidosPorUsuario.clear();
    this.servicioPedidos.obtenerPedidos().subscribe({
      next: (pedidos:Array<PedidosModel>) =>{
        
        pedidos.forEach(ped => {
          if(!this.totalPedidosPorUsuario.has(ped.usuario!)){
            this.totalPedidosPorUsuario.set(ped.usuario!, 1)            
          }else{
            this.totalPedidosPorUsuario.set(ped.usuario!,  this.totalPedidosPorUsuario.get(ped.usuario!)! + 1)
          }     

          let producto = new Map <string, number>();
          ped.articulos!.forEach(articulo => {

            if(this.articulosPorUsuario.get(ped.usuario!)?.has(articulo.id!)){
              producto.set(articulo.id!,articulo.cantidad!+ this.articulosPorUsuario.get(ped.usuario!)?.get(articulo.id!)! );
            }else{
              producto.set(articulo.id!,articulo.cantidad!);
            }
          });

          if (this.articulosPorUsuario.has(ped.usuario!)) {
            for (const [clave,valor] of producto) {
              this.articulosPorUsuario.get(ped.usuario!)!.set(clave,valor)
            }
          }else{
            this.articulosPorUsuario.set(ped.usuario!, producto); 
          }     
      })    
      this.obtenerArticulo();  
      if (this.busqueda == "") {
        this.buscarTodos();
      }else{
        this.busquedaPorNombre();
      } 
    },
      error: (error) => {console.log(error)},
    })
  }

  obtenerArticulo(){
    this.mapaConArticulos.clear();
    this.servicioArticulos.obtenerArticulos().subscribe({
      next: (articulos:Array<ArticulosModel>) =>{
        articulos.forEach(art => {
          this.mapaConArticulos.set(art._id!,art.nombre!);
        });
      }
    })
  }

  obtenerMasComprados(idUsuario:string):Array<any>{    
    
    let tresPrimeros = []

    for (const [a,b] of this.articulosPorUsuario.get(idUsuario!)!.entries()) {
    
      let pareja:Articulo = new Articulo()
      pareja.cantidad = b;
      pareja.id = a;

      tresPrimeros.push(pareja)      
    }  

    return tresPrimeros.sort((a, b) => {
      const valueA = Object.values(a)[0];
      const valueB = Object.values(b)[0];
      return valueB - valueA;
    });
    
  }

  irBorrar(id:string){
    this.idSeleccionado = id;
    this.seleccionBorrar = true;
    this.seleccionModificar = false;
  }

  finModificacion(evento:boolean){
    if(!evento){
      this.buscarPedidos();
    }
    this.idSeleccionado = "";
  }

  irActualizar(id:string,rev:string){
    this.seleccionModificar = true;
    this.seleccionBorrar = false;
    this.idSeleccionado = id;
    this.usuarioSeleccionado = {
      _id : id,
      _rev : rev
    }
  }
}
