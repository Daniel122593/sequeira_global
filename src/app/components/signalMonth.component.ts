import {Component} from '@angular/core';
import { ServicesInfo } from '../services/services_info.services';
import { Signal } from '../models/signal';

@Component({

selector: 'signalMonth',
templateUrl: '../views/signalMonth.html',
providers:[ServicesInfo]

})


export class SignalMonth{

 public signal_array : Signal[];


  constructor(
   
   private _services:ServicesInfo

 	){

 	}//fin del metodo constructor


 	 ngOnInit(){
  
  this._services.getSignalMonth().subscribe(
     
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