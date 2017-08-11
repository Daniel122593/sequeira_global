import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AngularFireDatabase } from 'angularfire2/database';
import {FirebaseListObservable } from 'angularfire2/database';
import {UserAnalyst} from '../models/user_analyst';
import {ServicesInfo} from '../services/services_info.services';
import {GLOBAL} from '../services/global';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({

    selector:'createUser',
    templateUrl:'../views/createUser.html',
    providers: [ServicesInfo]

	})


export class CreateUser {
   
  public user_analyst: UserAnalyst;
  public admin;
  analyst:FirebaseListObservable<any>;

  constructor(private _services: ServicesInfo, private activatedRoute: ActivatedRoute, private _router: Router, private db:AngularFireDatabase,  private auth: AngularFireAuth){
     
      //este metodo me muestra los datos del usuario actualmente conectado  
      this.auth.authState.subscribe(data =>{
           console.log(data.email);
           //console.log(data.password);
           this.verificarAdmin(data.email);

        })
     
   this.user_analyst = new UserAnalyst(0,"","","","","","","","","","");

    db.list('/analyst').subscribe(snapshot => {
          for (let user of snapshot){
            console.log(user.Email);
            }
          });
     
 
  	}//fin del constructor
    

  
  
//verifica que tipo de usuario es el que esta actualmente conectado
 verificarAdmin(email:string){
  
   this.db.list('/administrative', {
      query: {

        indexOn: 'email_administrative',
        orderByChild: 'email_administrative',
        equalTo: email
      
      }

    }).subscribe(snapshot => {
 
     var administrative_length = snapshot.length;

     if(administrative_length>=1){ 

         for(let user of snapshot){
          
             if(user.email_administrative){
               
               this.admin=true;

              }else{
              
               this.admin=false;

              }

          }//fin del for
       

      }//fin del if

       else{

       }

   }).closed;//fin del subscribe

 }//fin del metodo verificarAdmin




}//fin de la clase CreateUser