import { Injectable } from '@angular/core';
//importamos las interfaces
//import { Interface_Usuarios } from './interfaces/int_usuario';
import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, query, where, setDoc} from 'firebase/firestore/lite';
import { getStorage, ref } from "firebase/storage";
import { Interface_Categoria } from './interfaces/int_categoria';
import { Interface_Producto } from './interfaces/int_pruducto';
import { Interface_Carrito } from './interfaces/int_carrito';
import { Interface_Proveedor } from './interfaces/int_proveedor';
import { Interface_Empleado } from './interfaces/int_empleado';
import { Interface_Cliente } from './interfaces/int_cliente';
import { Interface_Cupon } from './interfaces/int_cupon';
import { Interface_Metodo_Pago } from './interfaces/int_metodo_pago';



@Injectable({
  providedIn: 'root'
})
export class ConectionFireService {

  constructor() { }
  //inicializar firebase
  app = initializeApp(environment.firebaseConfig, "BaseDatos");
  db = getFirestore(this.app);


  //seccion de clientes
 
  //obtener todos los clientes
  async  getClientes(){
    const clientes = collection(this.db, 'clientes');
    const clientesSnapshot = await getDocs(clientes);
    const clientesList = clientesSnapshot.docs.map( doc=>doc.data()) as Interface_Cliente[];
    return clientesList;
    }
  //obtener un usuario
    async getCliente(email:String){
      const coleccion = collection(this.db, '/clientes');
      const q = query(coleccion, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if(querySnapshot){
        return <Interface_Cliente>querySnapshot.docs[0].data();
      }
      else{
        return null;
      }    
    }
    async addCliente( cliente:Interface_Cliente ){
      try {
        const docRef = await addDoc(collection(this.db, "clientes"), cliente);
        return true;
      } catch (e) {
        return false;
      }
    }
    async updateCliente(cliente: Interface_Cliente){
      try{
        const coleccion = collection(this.db, '/clientes');
        const q = query(coleccion, where("email", "==", cliente.email));
        const referencia = await (await getDocs(q)).docs[0].ref;
        await setDoc(referencia, cliente);
        return true;
  
      }catch(e){
        return null;
      }
    }
    async deleteCliente(email:String){
      try{
        const coleccion = collection(this.db, '/clientes');
        const q = query(coleccion, where("email", "==", email));
        const referencia = await (await getDocs(q)).docs[0].ref;
        await deleteDoc(referencia);
        return true;
      }catch(e){
        return false;
      } 
    }

//seccion de categorias

 //obtener todas las categorias
 async  getCategorias(){
  const categorias = collection(this.db, 'categorias');
  const categoriasSnapshot = await getDocs(categorias);
  const categoriasList = categoriasSnapshot.docs.map( doc=>doc.data()) as Interface_Categoria[];
  return categoriasList;
  }
//obtener una categoria
  async getCategoria(clave_categoria:String){
    const coleccion = collection(this.db, '/categorias');
    const q = query(coleccion, where("id_categoria", "==", clave_categoria));
    const querySnapshot = await getDocs(q);
    if(querySnapshot){
      return <Interface_Categoria>querySnapshot.docs[0].data();
    }
    else{
      return null;
    }    
  }
  async addCategoria( categoria:Interface_Categoria ){
    try {
      const docRef = await addDoc(collection(this.db, "categorias"), categoria);
      return true;
    } catch (e) {
      return false;
    }
  }
  async updateCategoria(categoria: Interface_Categoria){
    try{
      const coleccion = collection(this.db, '/categorias');
      const q = query(coleccion, where("id_categoria", "==", categoria.id_categoria));
      const referencia = await (await getDocs(q)).docs[0].ref;
      await setDoc(referencia, categoria);
      return true;

    }catch(e){
      return null;
    }
  }
  async deleteCategoria(id_categoria:String){
    try{
      const coleccion = collection(this.db, '/categorias');
      const q = query(coleccion, where("id_categoria", "==", id_categoria));
      const referencia = await (await getDocs(q)).docs[0].ref;
      await deleteDoc(referencia);
      return true;
    }catch(e){
      return false;
    } 
  }


//seccion de cupones

//obtener todas los cupones
 async  getCupones(){
  const cupones = collection(this.db, 'cupones');
  const cuponesSnapshot = await getDocs(cupones);
  const cuponesList = cuponesSnapshot.docs.map( doc=>doc.data()) as Interface_Cupon[];
  return cuponesList;
  }
//obtener un cupon
  async getCupon(id_cupon:String){
    const coleccion = collection(this.db, '/cupones');
    const q = query(coleccion, where("id_cupon", "==", id_cupon));
    const querySnapshot = await getDocs(q);
    if(querySnapshot){
      return <Interface_Cupon>querySnapshot.docs[0].data();
    }
    else{
      return null;
    }    
  }
  async addCupon( cupon:Interface_Cupon ){
    try {
      const docRef = await addDoc(collection(this.db, "cupones"), cupon);
      return true;
    } catch (e) {
      return false;
    }
  }
  async updateCupon(cupon: Interface_Cupon){
    try{
      const coleccion = collection(this.db, '/cupones');
      const q = query(coleccion, where("id_cupon", "==", cupon.id_cupon));
      const referencia = await (await getDocs(q)).docs[0].ref;
      await setDoc(referencia, cupon);
      return true;

    }catch(e){
      return null;
    }
  }
  async deleteCupon(id_cupon:String){
    try{
      const coleccion = collection(this.db, '/cupones');
      const q = query(coleccion, where("id_cupon", "==", id_cupon));
      const referencia = await (await getDocs(q)).docs[0].ref;
      await deleteDoc(referencia);
      return true;
    }catch(e){
      return false;
    } 
  }


//seccion de metodos de pagos

//obtener todas los metodos de pago
async  getmPagos(){
  const mPagos = collection(this.db, 'mPagos');
  const mPagosSnapshot = await getDocs(mPagos);
  const mPagosList = mPagosSnapshot.docs.map( doc=>doc.data()) as Interface_Metodo_Pago[];
  return mPagosList;
  }
//obtener un cupon
  async getmPago(id_mPago:String){
    const coleccion = collection(this.db, '/mPagos');
    const q = query(coleccion, where("id_mPago", "==", id_mPago));
    const querySnapshot = await getDocs(q);
    if(querySnapshot){
      return <Interface_Metodo_Pago>querySnapshot.docs[0].data();
    }
    else{
      return null;
    }    
  }
  async addmPago( mPago:Interface_Metodo_Pago ){
    try {
      const docRef = await addDoc(collection(this.db, "mPagos"), mPago);
      return true;
    } catch (e) {
      return false;
    }
  }
  async updatemPago(mPago: Interface_Metodo_Pago){
    try{
      const coleccion = collection(this.db, '/mPagos');
      const q = query(coleccion, where("id_mPago", "==", mPago.id_mPago));
      const referencia = await (await getDocs(q)).docs[0].ref;
      await setDoc(referencia, mPago);
      return true;

    }catch(e){
      return null;
    }
  }
  async deletemPago(id_mPago:String){
    try{
      const coleccion = collection(this.db, '/mPagos');
      const q = query(coleccion, where("id_mPago", "==", id_mPago));
      const referencia = await (await getDocs(q)).docs[0].ref;
      await deleteDoc(referencia);
      return true;
    }catch(e){
      return false;
    } 
  }

//seccion de empleados

 //obtener todos los empleados
 async  getEmpleados(){
  const empleados = collection(this.db, 'empleados');
  const empleadosSnapshot = await getDocs(empleados);
  const empleadosList = empleadosSnapshot.docs.map( doc=>doc.data()) as Interface_Empleado[];
  return empleadosList;
  }
//obtener una empleado
  async getEmpleado(id_empleado:String){
    const coleccion = collection(this.db, '/empleados');
    const q = query(coleccion, where("id_empleados", "==", id_empleado));
    const querySnapshot = await getDocs(q);
    if(querySnapshot){
      return <Interface_Empleado>querySnapshot.docs[0].data();
    }
    else{
      return null;
    }    
  }
  async addEmpleado( empleado:Interface_Empleado ){
    try {
      const docRef = await addDoc(collection(this.db, "empleados"), empleado);
      return true;
    } catch (e) {
      return false;
    }
  }
  async updateEmpleado(empleado: Interface_Empleado){
    try{
      const coleccion = collection(this.db, '/empleados');
      const q = query(coleccion, where("id_empleado", "==", empleado.id_empleado));
      const referencia = await (await getDocs(q)).docs[0].ref;
      await setDoc(referencia, empleado);
      return true;

    }catch(e){
      return null;
    }
  }
  async deleteEmpleado(id_empleado:String){
    try{
      const coleccion = collection(this.db, '/empleados');
      const q = query(coleccion, where("id_empleado", "==", id_empleado));
      const referencia = await (await getDocs(q)).docs[0].ref;
      await deleteDoc(referencia);
      return true;
    }catch(e){
      return false;
    } 
  }

//seccion de proveedores

//obtener todas los proveedores
 async  getProveedores(){
  const proveedores = collection(this.db, 'proveedores');
  const proveedoresSnapshot = await getDocs(proveedores);
  const proveedoresList = proveedoresSnapshot.docs.map( doc=>doc.data()) as Interface_Proveedor[];
  return proveedoresList;
  }
//obtener una categoria
  async getProveedor(id_proveedor:String){
    const coleccion = collection(this.db, '/proveedor');
    const q = query(coleccion, where("id_proveedor", "==", id_proveedor));
    const querySnapshot = await getDocs(q);
    if(querySnapshot){
      return <Interface_Proveedor>querySnapshot.docs[0].data();
    }
    else{
      return null;
    }    
  }
  async addProveedor( proveedor:Interface_Proveedor ){
    try {
      const docRef = await addDoc(collection(this.db, "proveedores"), proveedor);
      return true;
    } catch (e) {
      return false;
    }
  }
  async updateProveedor(proveedor: Interface_Proveedor){
    try{
      const coleccion = collection(this.db, '/proveedores');
      const q = query(coleccion, where("id_proveedor", "==", proveedor.id_proveedor));
      const referencia = await (await getDocs(q)).docs[0].ref;
      await setDoc(referencia, proveedor);
      return true;

    }catch(e){
      return null;
    }
  }
  async deleteProveedor(id_proveedor:String){
    try{
      const coleccion = collection(this.db, '/proveedores');
      const q = query(coleccion, where("id_proveedor", "==", id_proveedor));
      const referencia = await (await getDocs(q)).docs[0].ref;
      await deleteDoc(referencia);
      return true;
    }catch(e){
      return false;
    } 
  }

  //seccion de productos
 
  async  getProductos(){
  const productos = collection(this.db, 'productos');
  const productosSnapshot = await getDocs(productos);
  const productosList = productosSnapshot.docs.map( doc=>doc.data()) as Interface_Producto[];
  return productosList;
  }
  async getProductosCat(id_categoria:String){
    const coleccion = collection(this.db, '/productos');
    const q = query(coleccion, where("id_categoria", "==", id_categoria));
    const productosSnapshot = await getDocs(q);
    const productosList = productosSnapshot.docs.map( doc=>doc.data()) as Interface_Producto[];
    return productosList;
  }

  async getProducto(id_producto:String){
    const coleccion = collection(this.db, '/productos');
    const q = query(coleccion, where("id_producto", "==", id_producto));
    const querySnapshot = await getDocs(q);
    if(querySnapshot){
      return <Interface_Producto>querySnapshot.docs[0].data();
    }
    else{
      return null;
    }    
  }
  async addProducto( producto:Interface_Producto ){
    try {
      const docRef = await addDoc(collection(this.db, "productos"), producto);
      return true;
    } catch (e) {
      return false;
    }
  }
  async updateProducto(producto:Interface_Producto){
    try{
      const coleccion = collection(this.db, '/productos');
      const q = query(coleccion, where("id_producto", "==", producto.id_producto));
      const referencia = await (await getDocs(q)).docs[0].ref;
      await setDoc(referencia, producto);
      return true;

    }catch(e){
      return null;
    }
  }
  async deleteProducto(id_producto:String){
    try{
      const coleccion = collection(this.db, '/productos');
      const q = query(coleccion, where("id_producto", "==", id_producto));
      const referencia = await (await getDocs(q)).docs[0].ref;
      await deleteDoc(referencia);
      return true;
    }catch(e){
      return false;
    } 
  } 

  
  //métodos de carrito
  async getCarrito(id_carrito:String){
    const coleccion = collection(this.db, '/carritos');
    const q = query(coleccion, where("id_carrito", "==", id_carrito));
    const querySnapshot = await getDocs(q);
    if(querySnapshot){
      return <Interface_Carrito>querySnapshot.docs[0].data();
    }
    else{
      return null;
    }    
  }
  async addCarrito( carrito:Interface_Carrito ){
    try {
      const docRef = await addDoc(collection(this.db, "carritos"), carrito);
      return true;
    } catch (e) {
      return false;
    }
  }

  async updateCarrito(carrito:Interface_Carrito){
    try{
      const coleccion = collection(this.db, '/carritos');
      const q = query(coleccion, where("id_carrito", "==", carrito.id_carrito));
      const referencia = await (await getDocs(q)).docs[0].ref;
      await setDoc(referencia, carrito);
      return true;
    }catch(e){
      return null;
    }
  }
  async deleteCarrito(id_carrito:String){
    try{
      const coleccion = collection(this.db, '/carritos');
      const q = query(coleccion, where("id_carrito", "==", id_carrito));
      const referencia = await (await getDocs(q)).docs[0].ref;
      await deleteDoc(referencia);
      return true;
    }catch(e){
      return false;
    } 
  } 


  
}
