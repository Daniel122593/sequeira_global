import { Injectable } from '@angular/core';
import {AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase } from 'angularfire2/database';
import {FirebaseListObservable } from 'angularfire2/database';


@Injectable()
export class AuthService {
 user: Observable<firebase.User>;
 users:FirebaseListObservable<any>;
 

  constructor(private firebaseAuth: AngularFireAuth,public db:AngularFireDatabase) {
     
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
  

  var vefiricar:string ="0";

  this.firebaseAuth
  .auth
  .signInWithEmailAndPassword(email, password)
  .then( value => {
       
       console.log('entro acochis');

   this.db.list('/users').subscribe(snapshot => {

   	  console.log('entro acochis tambien');
          for (let user of snapshot){
               
              if(user.Email==email){

                  vefiricar="1";
              }//fin de if
              
            }//fin del for
          });
          
          console.log(vefiricar);
          if(vefiricar=="1"){
             this.logout();

          }else{

          }

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
