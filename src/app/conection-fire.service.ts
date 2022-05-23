import { Injectable } from '@angular/core';
//importamos las interfaces
import { Interface_Usuarios } from './interfaces/int_usuario';
import { Interface_Platillo } from './interfaces/int_platillo';

import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';
import { doc,getFirestore, collection, getDocs, addDoc, deleteDoc, query, where, setDoc} from 'firebase/firestore/lite';
import { getStorage, ref } from "firebase/storage";
import { Interface_Categoria } from './interfaces/int_categoria';


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
  
}
