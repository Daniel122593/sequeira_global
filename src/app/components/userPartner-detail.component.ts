import { Component } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {ServicesInfo} from '../services/services_info.services';
import {User_partner} from '../models/user_partner';


@Component({
  
    selector: 'user_partner-detail',
    templateUrl: '../views/user_partner-detail.html',
    providers:[ServicesInfo]

	})


export class UserPartnerDetail{

 public user_partner = User_partner;
 



 constructor(private _services: ServicesInfo, private _route: ActivatedRoute,

 private _router: Router){
   
  
 }//fin del metodo constructor
 

 ngOnInit(){

  this.getUserPartner();

 }//fin del metodo 

 getUserPartner(){

   this._route.params.forEach((params:Params) => {
          
         //con esto capturo el id de la URL 
      		 let id= params['id'];
 
 this._services.getUserPartnerDetail(id).subscribe(

               response => {
                 
                  if(response.code==200){

                  	   this.user_partner = response.data;
                       

                  	}else{

                  		this._router.navigate(['/users']);

                  	}//fin del else
            

                    },

               error =>{

                 console.log(<any>error);

               }//fin del error

      	 	   );//fin del subscribe


               });


  }//fin del metodo getUserPartner

}//fin de la clase