import { Injectable } from '@angular/core';
//importamos las interfaces
import { Interface_Usuarios } from './interfaces/int_usuario';
import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';
import { doc,getFirestore, collection, getDocs, addDoc, deleteDoc, query, where, setDoc} from 'firebase/firestore/lite';
import { getStorage, ref } from "firebase/storage";
import { Interface_Categoria } from './interfaces/int_categoria';
import { Interface_Producto } from './interfaces/int_pruducto';
import { Interface_Carrito } from './interfaces/int_carrito';


@Injectable({
  providedIn: 'root'
})
export class ConectionFireService {

  constructor() { }
  //inicializar firebase
  app = initializeApp(environment.firebaseConfig);
  db = getFirestore(this.app);
  storage = getStorage(this.app);
  // Create a storage reference from our storage service
  storageRef = ref(this.storage);

  //seccion de uusarios
 
  //obtener todos los usuarios
  async  getUsers(){
    const usuarios = collection(this.db, 'usuarios');
    const usuariosSnapshot = await getDocs(usuarios);
    const usuariosList = usuariosSnapshot.docs.map( doc=>doc.data()) as Interface_Usuarios[];
    return usuariosList;
    }
  //obtener un usuario
    async getUser(clave_usuario:String){
      const coleccion = collection(this.db, '/usuarios');
      const q = query(coleccion, where("clave_usuario", "==", clave_usuario));
      const querySnapshot = await getDocs(q);
      if(querySnapshot){
        return <Interface_Usuarios>querySnapshot.docs[0].data();
      }
      else{
        return null;
      }    
    }
    async addUser( usuario:Interface_Usuarios ){
      try {
        const docRef = await addDoc(collection(this.db, "usuarios"), usuario);
        return true;
      } catch (e) {
        return false;
      }
    }
    async updateUser(usuario: Interface_Usuarios){
      try{
        const coleccion = collection(this.db, '/usuarios');
        const q = query(coleccion, where("clave_usuario", "==", usuario.clave_usuario));
        const referencia = await (await getDocs(q)).docs[0].ref;
        await setDoc(referencia, usuario);
        return true;
  
      }catch(e){
        return null;
      }
    }
    async deleteUser(clave_usuario:String){
      try{
        const coleccion = collection(this.db, '/usuarios');
        const q = query(coleccion, where("clave_usuario", "==", clave_usuario));
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
