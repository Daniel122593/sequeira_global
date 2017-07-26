import { Component } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {ServicesInfo} from '../services/services_info.services';
import {User_administrative} from '../models/user_administrative';


@Component({
  
    selector: 'user_administrative-detail',
    templateUrl: '../views/user_administrative-detail.html',
    providers:[ServicesInfo]

	})


export class UserAdministrativeDetail{

 public user_administrative = User_administrative;
 


 constructor(private _services: ServicesInfo, private _route: ActivatedRoute,

 private _router: Router){
   
  
 }//fin del metodo constructor


 ngOnInit(){
 
 this.getUserAdministrative();

 }//fin del metodo ngOnInit

 
 getUserAdministrative(){

   this._route.params.forEach((params:Params) => {
          
         //con esto capturo el id de la URL 
      		 let id= params['id'];
 
 this._services.getUserAdministrativeDetail(id).subscribe(

               response => {
                 
                  if(response.code==200){

                  	   this.user_administrative = response.data;
                       

                  	}else{

                  		this._router.navigate(['/users']);

                  	}//fin del else
            

               },

               error =>{

                 console.log(<any>error);

               }//fin del error

      	 	);//fin del subscribe




      		  });


 }//fin del metodo getUserAdministrative









}//fin de la clase