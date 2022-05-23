export interface Interface_Usuarios {
    clave_usuario:String;
    correo: String;
    nombre: String;
    primer_apellido:String;
    segundo_apellido:String;
    sexo:String;
    edad:number;
    direccion: Direccion;
}
export interface Direccion{
    calle:String;
    ciudad:String;
    colonia:String;
    cp:String;
    estado:String;
    no_ext:number;
    no_int:number;
    referencia:String;
}
