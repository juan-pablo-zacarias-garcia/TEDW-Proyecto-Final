import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afauth: AngularFireAuth) { }

  async register(email: string, password: string){
    try{
      return await this.afauth.signInWithEmailAndPassword(email, password);
    }
    catch(err){
      console.log("Error al registrarse", err);
      return null;
    }
  }

  async login(email: string, password: string){
    try{
      return await this.afauth.signInWithEmailAndPassword(email, password);
    }
    catch(err){
      console.log("Error en el login", err);
      return null;
    }
  }

  async loginWithGoogle(){
    try{
      return await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    catch(err){
      console.log("Error en el login con Google", err);
      return null;
    }
  }
  getLoggedUser(){
    return this.afauth.authState.pipe(first()).toPromise();
  }
  async logOut(){
    return await this.afauth.signOut().then(data=>{
      return data;
    });
  }
}
