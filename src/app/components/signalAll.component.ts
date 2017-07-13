import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ServicesInfo } from '../services/services_info.services';
import { Signal } from '../models/signal';

@Component({

selector: 'signalAll',
templateUrl: '../views/signalAll.html',
providers:[ServicesInfo]

})


export class SignalAll{

 public signal_array : Signal[];


  constructor(
   
   private _services:ServicesInfo, private _route: ActivatedRoute,

        private _router: Router

 	){

 	}//fin del metodo constructor


 	 ngOnInit(){
  
  this._services.getSignalAll().subscribe(
     
     result=>{
      
       if(result.code!=200){
      
       	}//fin del if

       	else{

         this.signal_array=result.data;
         console.log(this.signal_array);

       		}//fin del else

     },

     error => {
        
       console.log(<any>error);


     	}//fin del else

  	)

 }//fin del metodo ngOnInit


}//fin de la clase SignalMonth