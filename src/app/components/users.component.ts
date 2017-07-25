import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ServicesInfo } from '../services/services_info.services';
import {AuthService} from '../auth.service';
import {FirebaseListObservable } from 'angularfire2/database';
import {User_administrative} from '../models/user_administrative';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({

      selector:'users',
      templateUrl:'../views/users.html'

	})


export class UsersComponent{
 
public user_array : User_administrative[];
public admin;



constructor(private _services:ServicesInfo, private _route: ActivatedRoute, private _router: Router, private auth: AngularFireAuth,
  private db: AngularFireDatabase) {
      
       //este metodo me muestra los datos del usuario actualmente conectado  
      this.auth.authState.subscribe(data =>{
         
           this.verificarAdmin(data.email);

        })
       
    }//fin del constructor

    
 ngOnInit(){

   this._services.getUserAdministrative().subscribe(


    result=>{

       if(result.code!=200){

       	}else{

         this.user_array=result.data;
         console.log(this.user_array);
       	}//fin del else

    },
  
    error => {
  
     console.log(<any>error);

    }//fin del error


   	)
  

 }//fin del metodo ngOnInit
 




 verificarAdmin(email:string){
  
   this.db.list('/analyst', {
      query: {

        indexOn: 'email_analyst',
        orderByChild: 'email_analyst',
        equalTo: email
      
      }

    }).subscribe(snapshot => {
 
     var analyst_length = snapshot.length;

     if(analyst_length>=1){ 

         for(let user of snapshot){
          
             if(user.email_analyst){
               
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


}//fin de la clase 

