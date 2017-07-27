import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ServicesInfo } from '../services/services_info.services';
import {AuthService} from '../auth.service';
import {FirebaseListObservable } from 'angularfire2/database';
import {UserAnalyst} from '../models/user_analyst';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
 
  selector:'userAnalyst',
  templateUrl:'../views/userAnalyst.html'


	})


export class UserAnalystPrincipal{

 
public user_array : UserAnalyst[];
public admin;



constructor(private _services:ServicesInfo, private _route: ActivatedRoute, private _router: Router, private auth: AngularFireAuth,
  private db: AngularFireDatabase) {
      
       //este metodo me muestra los datos del usuario actualmente conectado  
      this.auth.authState.subscribe(data =>{
           
           this.verificarAdmin(data.email);

        })
       
    }//fin del constructor


 ngOnInit(){

   this._services.getUserAnalyst().subscribe(


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


   	)//fin del subscribe
  

 }//fin del metodo ngOnInit
 
 

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




}//fin de la clase 