import { Component } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ServicesInfo} from '../services/services_info.services';
import {UserAnalyst} from '../models/user_analyst';


@Component({
  
    selector: 'user_analyst-detail',
    templateUrl: '../views/user_analyst-detail.html',
    providers:[ServicesInfo]

	})



export class UserAnalystDetail{


 public user_analyst = UserAnalyst;

 
 constructor(private _services: ServicesInfo, private _route: ActivatedRoute,

 private _router: Router){
   
  
 }//fin del metodo constructor

 
 ngOnInit(){
  
  this.getUserAnalyst();

 }//fin del metodo ngOnInit


 getUserAnalyst(){

   this._route.params.forEach((params:Params) => {
          
         //con esto capturo el id de la URL 
      		 let id= params['id'];
 
 this._services.getUserAnalystDetail(id).subscribe(

               response => {
                 
                  if(response.code==200){

                  	   this.user_analyst = response.data;
                       

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




}//fin de la clase