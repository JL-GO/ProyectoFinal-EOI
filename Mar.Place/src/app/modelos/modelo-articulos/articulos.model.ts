export class ArticulosModel {
    _id?:string;
    _rev?:string;
    nombre?:string;
    precio?:number;
    stock?:number;
    seleccionados?:number=0; 
}

export class Articulo{
    id!:string;
    cantidad!:any;
}
