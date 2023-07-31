import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeticionesPedidosServiceService } from '../../servicios/peticiones-pedidos.service.service';
import { ArtEnPedidosModel, PedidosModel } from 'src/app/modelos/modelo-pedidos/pedidos.model';
import { AppAutentificacionServiceService } from 'src/app/servicios/autentificacion/app-autentificacion.service.service';
import { PeticionesArticulosServiceService } from 'src/app/articulos/servicios/peticiones-articulos.service.service';
import { ArticulosModel } from 'src/app/modelos/modelo-articulos/articulos.model';
import { PeticionesServiceService } from 'src/app/servicios/estadisticas/peticiones.service.service';

@Component({
  selector: 'app-create-pedidos',
  templateUrl: './create-pedidos.component.html',
  styleUrls: ['./create-pedidos.component.css']
})
export class CreatePedidosComponent{

  form: FormGroup;
  articulosPedido: Array<ArtEnPedidosModel> = new Array<ArtEnPedidosModel>;
  articulosDisponibles!: Array<ArticulosModel>;
  idArticuloSelecionado: string ="Selecciona un artículo";
  nombreUsuario!:string;

  carrito: Map<string, any> = new Map<string, any>();
  itemsPedidos: number = 0;
  precioCarrito: number = 0;

  constructor(private fb: FormBuilder, private servicioPedidos: PeticionesPedidosServiceService, 
    private auth: AppAutentificacionServiceService, private servicioArticulos: PeticionesArticulosServiceService,
    private servicioEstadisticas: PeticionesServiceService) {
    this.nombreUsuario = this.auth.UsuarioActivo.username!;
    this.buscarArticulos();
    this.form = fb.group(
      {
        "nombre": ["", Validators.required],
        "fecha": ["", Validators.required],
      }
    );
  }

  @Output()
  finCrear: EventEmitter<string> = new EventEmitter<string>();

  peticionCrear(form: PedidosModel) {

    this.carrito.forEach((valor, clave) => {
      
      let art:ArtEnPedidosModel = {
        id: clave,
        cantidad: valor.seleccionados
      }
      this.articulosPedido.push(art)
    });
    
    let pedido: PedidosModel = {
      nombre: form.nombre,
      fecha: form.fecha,
      articulos: this.articulosPedido,
    }

    this.servicioPedidos.crearPedido(pedido).subscribe(
      {
        next: (respuesta: PedidosModel) => {
          console.log(respuesta);
          this.finCrear.emit();
          this.servicioEstadisticas.ActualizarDatos();
        },
        error: error => console.log(error),
      })
  }

  buscarArticulos() {
    this.servicioArticulos.obtenerArticulosparaCarro().subscribe(
      {
        next: (respuesta: Array<ArticulosModel>) => {
          this.articulosDisponibles = respuesta;
        },
        error: error => console.log(error),
      }
    );
  }

  seleccionarArticulo(articulo: any) {
    console.log(articulo.target.value);
    
    this.idArticuloSelecionado = articulo.target.value;
    this.itemsPedidos = 0;
  }

  disminuirCantidad(articulo: ArticulosModel) {
    if (articulo.seleccionados! > 0 && this.itemsPedidos > 0) {
      articulo.stock!++;
      articulo.seleccionados!--;
      this.itemsPedidos--;
    }
  }

  aumentarCantidad(articulo: ArticulosModel) {
    if (articulo.stock! > 0) {
      articulo.stock!--;
      articulo.seleccionados!++;
      this.itemsPedidos++;
    }
  }

  enviaraCarrito(articulo: ArticulosModel) {

    this.itemsPedidos = 0;

    let articuloCarrito = {
      articuloCompleto: articulo,
      id: articulo._id,
      nombre: articulo.nombre,
      precio: articulo.precio,
      seleccionados: articulo.seleccionados,
    }

    if (articulo.seleccionados! > 0) {
      this.carrito.set(articulo._id!, articuloCarrito);
      this.calcularPrecioCarrito();
    }
  }

  eliminarDelCarrito(id: string, articulo:ArticulosModel) {
    this.articulosDisponibles[this.articulosDisponibles.indexOf(articulo)].stock += this.carrito.get(id).seleccionados;
    this.articulosDisponibles[this.articulosDisponibles.indexOf(articulo)].seleccionados! -= this.carrito.get(id).seleccionados;
    this.carrito.delete(id);
    this.calcularPrecioCarrito();
  }

  calcularPrecioCarrito(){
    this.precioCarrito = 0
      this.carrito.forEach((valor) => {
        this.precioCarrito += valor.precio! * valor.seleccionados!
      });
  }
}
