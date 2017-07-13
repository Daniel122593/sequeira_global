import { Injectable } from '@angular/core';
import {AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


import {Observable} from 'rxjs/Observable';


@Injectable()
export class AuthService {
 user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth) { 
     
       this.user = firebaseAuth.authState;

  }//fin del constructor
   

 signup(email:string, password:string){

  this.firebaseAuth
  .auth
  .createUserWithEmailAndPassword(email, password)
  .then( value => {

      console.log('success!', value);
  })
  .catch(err => {

       console.log("Error en autenticación");
  	});

 }//fin del signup


login(email:string, password:string){

  this.firebaseAuth
  .auth
  .signInWithEmailAndPassword(email, password)
  .then( value => {

      console.log('success!', value);
  })
  .catch(err => {

       console.log("Error en autenticación");
  	});

 }//fin del login

 logout(){
  
  this.firebaseAuth
  .auth
  .signOut();

 }//fin del logout


}//fin de la clase
