
import { Interface_Producto } from "./int_pruducto";
export interface Interface_Pedido{
    id_pedido: String;
    id_usuario: String;
    status:String;
    platillos: Interface_Producto[];
    total:number;
}