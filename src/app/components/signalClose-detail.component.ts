import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';


import {ServicesInfo} from '../services/services_info.services';
import {Signal} from '../models/signal';
import {UserAnalyst} from '../models/user_analyst';

@Component({
  
    selector: 'signalClose-detail',
    templateUrl: '../views/signalClose-detail.html',
    providers:[ServicesInfo]

	})


  export class SignalCloseDetailComponent{
     
     public signal:Signal;
     public user_analyst:UserAnalyst;
      
 constructor(


  private _services: ServicesInfo, private _route: ActivatedRoute,

        private _router: Router

 ){

  
 }//fin del constructor

 
 ngOnInit(){

  this.getSignal();

 }//fin del metodo



 getSignal(){
 
   this._route.params.forEach((params:Params) => {
          
         //con esto capturo el id de la URL 
      		 let id= params['id'];
           


      	 this._services.getSignalDetailClose(id).subscribe(

               response => {
                 
                  if(response.code==200){

                  	   this.signal = response.data;
                       console.log(this.signal);
                       this.getName();

                  	}else{

                  	
                  		alert("No se puede mirar los detalles en este momento");
                  	
                  	}//fin del else
            

               },

               error =>{


               }//fin del error

      	 	);//fin del subscribe

 });
 

 }//fin del metodo


 getName(){
    
      this._services.getNameAnalyst(this.signal.id_analyst).subscribe(
         
         response => {

          if(response.code==200){

             this.user_analyst = response.data;
             
          }else{
             
            
            }//fin del else

          },

          error =>{

             console.log(<any>error);

          }//fin del error


        );

 }//fin del metodo

  }//fin de la clase