import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtEnPedidosModel, PedidosModel } from 'src/app/modelos/modelo-pedidos/pedidos.model';
import { PeticionesPedidosServiceService } from '../../servicios/peticiones-pedidos.service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticulosModel } from 'src/app/modelos/modelo-articulos/articulos.model';
import { PeticionesArticulosServiceService } from 'src/app/articulos/servicios/peticiones-articulos.service.service';

@Component({
  selector: 'app-update-pedidos',
  templateUrl: './update-pedidos.component.html',
  styleUrls: ['./update-pedidos.component.css']
})
export class UpdatePedidosComponent {

  form: FormGroup;
  articulosPedido: Array<ArtEnPedidosModel> = new Array<ArtEnPedidosModel>;
  articulosDisponibles!: Array<ArticulosModel>;
  idArticuloSelecionado: string = 'Selecciona un artículo';
  nombreUsuario!: string;
  pedidos!: Array<PedidosModel>;
  articulosPedidoSinModificar: Map<string, any> = new Map<string, string>();
  carrito: Map<string, any> = new Map<string, any>();
  itemsPedidos: number = 0;
  precioCarrito: number = 0;

  constructor(private fb: FormBuilder, private servicioPedidos: PeticionesPedidosServiceService,
    private servicioArticulos: PeticionesArticulosServiceService) {

    this.buscarArticulos();
    this.form = fb.group(
      {
        "nombre": ["", Validators.required],
        "fecha": ["", Validators.required],
      }
    );
  }

  @Input()
  pedidoModificar!: PedidosModel;

  @Output()
  finModificar: EventEmitter<boolean> = new EventEmitter<boolean>();

  volver(cancelado: boolean) {
    this.finModificar.emit(cancelado);
  }

  buscarArticulos() {
    this.servicioArticulos.obtenerArticulosparaCarro().subscribe(
      {
        next: (respuesta: Array<ArticulosModel>) => {
          this.articulosDisponibles = respuesta;
        },
        error: error => console.log(error),
        complete: () => {
          this.buscarPedidoActualizar()
        }
      }
    );
  }

  buscarPedidoActualizar() {
    this.servicioPedidos.obtenerPedidos().subscribe({
      next: (pedidos: Array<PedidosModel>) => {
        pedidos.forEach(pedido => {

          if (pedido._id == this.pedidoModificar._id) {
            this.form.patchValue({ nombre: pedido.nombre, fecha: pedido.fecha });
            pedido.articulos!.forEach(articulo => {
              this.articulosPedidoSinModificar.set(articulo.id!, articulo.cantidad)
            });
          }
        });
      },
      error: error => console.log(error),
      complete: () => {
        this.actualizarDisponibilidadArticulos()
      }
    })
  }

  actualizarDisponibilidadArticulos() {
    this.articulosDisponibles.forEach(articulo => {
      if (this.articulosPedidoSinModificar.has(articulo._id!)) {
        articulo.seleccionados = this.articulosPedidoSinModificar.get(articulo._id!);
        articulo.stock! -= this.articulosPedidoSinModificar.get(articulo._id!);
        this.enviaraCarrito(articulo);
      }
    });
  }

  seleccionarArticulo(articulo: any) {
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

  eliminarDelCarrito(id: string, articulo: ArticulosModel) {
    this.articulosDisponibles[this.articulosDisponibles.indexOf(articulo)].stock += this.carrito.get(id).seleccionados;
    this.articulosDisponibles[this.articulosDisponibles.indexOf(articulo)].seleccionados! -= this.carrito.get(id).seleccionados;
    this.carrito.delete(id);
    this.calcularPrecioCarrito();
  }

  calcularPrecioCarrito() {
    this.precioCarrito = 0
    this.carrito.forEach((valor) => {
      this.precioCarrito += valor.precio! * valor.seleccionados!
    });
  }

  peticionActualizar(form: PedidosModel) {

    this.carrito.forEach((valor, clave) => {

      let art: ArtEnPedidosModel = {
        id: clave,
        cantidad: valor.seleccionados
      }
      this.articulosPedido.push(art)
    });

    let pedido: PedidosModel = {
      usuario: this.pedidoModificar.usuario,
      nombre: form.nombre,
      fecha: form.fecha,
      articulos: this.articulosPedido,
    }

    this.servicioPedidos.actualizarPedido(this.pedidoModificar._id!, this.pedidoModificar._rev!,pedido).subscribe(
      {
        next: (respuesta: PedidosModel) => {
          console.log(respuesta);
          this.finModificar.emit(false);
        },
        error: error => console.log(error),
      })
  }

}



