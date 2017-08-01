import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ServicesInfo } from '../services/services_info.services';
import {User_partner} from '../models/user_partner';

@Component({

   selector:'preferredUser',
   templateUrl:'../views/preferredUser.html'


	})


 export class PreferredUser{
    
 public user_array : User_partner[];


 constructor(private _services:ServicesInfo, private _route: ActivatedRoute, private _router: Router) {
      
           
  }//fin del constructor


   ngOnInit(){

   this._services.getUserPartner().subscribe(

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
  

 }//fin de la clase

 