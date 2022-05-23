
import { Interface_Platillo } from "./int_platillo";
export interface Interface_Pedido{
    id_pedido: String;
    id_usuario: String;
    status:String;
    platillos: Interface_Platillo[];
    total:number;
}