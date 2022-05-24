import { Interface_Producto } from "./int_pruducto";

export interface Interface_Carrito{
    id_usuario: String;
    productos: Interface_Producto[];
    subtotal: Number;
}