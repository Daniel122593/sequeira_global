import { Injectable } from '@angular/core';
import {AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase } from 'angularfire2/database';
import {FirebaseListObservable } from 'angularfire2/database';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Injectable()
export class AuthService {
 user: Observable<firebase.User>;
 userWeb:FirebaseListObservable<any>;
 analyst:FirebaseListObservable<any>;


  constructor(private firebaseAuth: AngularFireAuth,public db:AngularFireDatabase, private _route: ActivatedRoute,
  private _router:Router) {
     
       this.user = firebaseAuth.authState;
       
       this.analyst = db.list('/analyst');
       this.userWeb = db.list('/userWeb');
       
  }//fin del constructor
   

 signup(email:string, password:string){

  this.firebaseAuth
  .auth
  .createUserWithEmailAndPassword(email, password)
  .then( value => {
     
      this.analyst.push({
              email_analyst: email,
              password_analyst: password
             
              });
       
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
       
       this._router.navigate(['/home']);
       console.log(value);
        
   
     this.db.list('/userWeb', {
      query: {

        indexOn: 'EmailAdministrative',
        orderByChild: 'EmailAdministrative',
        equalTo: email
      
      }//fin del query

    }).subscribe(snapshot => {

     var user_length = snapshot.length;

     if(user_length>=1){ 

    

      }else{

        this.logout();

        }//fin del else

        }).closed;



      console.log('success!', value);
  })
  .catch(err => {

       alert("Correo y contraseña no coinciden / Email and password don´t match.");
  	});

 }//fin del login

 logout(){
  
  this.firebaseAuth
  .auth
  .signOut();
   this._router.navigate(['/home']);
 }//fin del logout


}//fin de la clase
