import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticulosModel } from 'src/app/modelos/modelo-articulos/articulos.model';
import { PeticionesArticulosServiceService } from '../../servicios/peticiones-articulos.service.service';
import { PeticionesPedidosServiceService } from 'src/app/pedidos/servicios/peticiones-pedidos.service.service';
import { PedidosModel } from 'src/app/modelos/modelo-pedidos/pedidos.model';

@Component({
  selector: 'app-get-articulos',
  templateUrl: './get-articulos.component.html',
  styleUrls: ['./get-articulos.component.css']
})
export class GetArticulosComponent {

  articulos!: Observable<Array<ArticulosModel>>
  
  seleccionBorrar!:boolean;
  seleccionModificar!:boolean;
  busqueda:string="";
  idSeleccionado!:string;
  articuloSeleccionado!:ArticulosModel;

  articulosNumeroVecesPedidos: Map <string, number> = new Map <string, number>();

  constructor(private servicioArticulos:PeticionesArticulosServiceService, private servicioPedidos: PeticionesPedidosServiceService){}
  
  ngOnInit(): void {
    this.buscarPedidos();
  }

  buscarTodos(){
    this.articulos = this.servicioArticulos.obtenerArticulosConNumeroPedidos(this.busqueda,this.articulosNumeroVecesPedidos)
  }

  buscarPedidos(){
    this.articulosNumeroVecesPedidos.clear();
    this.servicioPedidos.obtenerPedidos().subscribe({
      next: (pedidos:Array<PedidosModel>) =>{
        pedidos.forEach(ped => {
          ped.articulos?.forEach(articulo => {
            if(!this.articulosNumeroVecesPedidos.has(articulo.id!)){
              this.articulosNumeroVecesPedidos.set(articulo.id!,articulo.cantidad!);
            }else{
              this.articulosNumeroVecesPedidos
              .set(articulo.id!,articulo.cantidad! + this.articulosNumeroVecesPedidos.get(articulo.id!)!);
            }
          })
        });
        this.buscarTodos();
      },
      error: (error) => {console.log(error)},
    })
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
    console.log(this.articulosNumeroVecesPedidos);
    
  }

  irActualizar(id:string,rev:string){
    this.seleccionModificar = true;
    this.seleccionBorrar = false;
    this.idSeleccionado = id;
    this.articuloSeleccionado = {
      _id : id,
      _rev : rev
    }
  }

}
