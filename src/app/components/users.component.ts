import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ServicesInfo } from '../services/services_info.services';
import {AuthService} from '../auth.service';
import {FirebaseListObservable } from 'angularfire2/database';
import {User_administrative} from '../models/user_administrative';


@Component({

      selector:'users',
      templateUrl:'../views/users.html'

	})


export class UsersComponent{
 
public user_array : User_administrative[];
 

constructor(private _services:ServicesInfo, private _route: ActivatedRoute, private _router: Router) {
        
      
       
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
 


}//fin de la clase 

