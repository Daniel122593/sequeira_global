import { Component } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ServicesInfo} from '../services/services_info.services';
import {UserClient} from '../models/user_client';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  
    selector: 'user_client-detail',
    templateUrl: '../views/userClient-detail.html',
    providers:[ServicesInfo]

	})



export class UserClientDetail{

 
 public user_client = UserClient;
 public admin;

  
 constructor(private _services: ServicesInfo, private _route: ActivatedRoute,

 private _router: Router, private auth: AngularFireAuth, private db: AngularFireDatabase){
   
     //este metodo me muestra los datos del usuario actualmente conectado  
      this.auth.authState.subscribe(data =>{
           console.log(data.email);
           //console.log(data.password);
           this.verificarAdmin(data.email);

        })

 }//fin del metodo constructor

 ngOnInit(){

 this.getUserClient();


 }//fin del metodo ngOnInit

 getUserClient(){

   this._route.params.forEach((params:Params) => {
          
         //con esto capturo el id de la URL 
      		 let id= params['id'];
             
          
 this._services.getClientDetail(id).subscribe(

               response => {
                 
                  if(response.code==200){

                  	   this.user_client = response.data;
                       

                  	}else{

                  		this._router.navigate(['/users']);

                  	}//fin del else
            

               },

               error =>{

                 console.log(<any>error);

               }//fin del error

      	 	);//fin del subscribe


      		  });


 }//fin del metodo getUserAnalyst




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








}//fin de la clase
