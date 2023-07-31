export class PedidosModel {
    _id?:string; //"f436517f05a2a7c71054b22fd50b6495",
    _rev?:string; // "3-302d4ce564359f21d4a7202bc4d62b40",
    tabla?:string = "PEDIDO";
    usuario?:string; // "f436517f05a2a7c71054b22fd50acdcd",
    nombre?:string; //"MI PEDIDO RAM",
    fecha?:string; // "12/12/2021",
    articulos?:Array<ArtEnPedidosModel>;
    precioTotal?:number;
}

export class ArtEnPedidosModel {
    id?:string; // "f436517f05a2a7c71054b22fd50afe44",
    cantidad?:number;  // "2"
}
