import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';


import {ServicesInfo} from '../services/services_info.services';
import {Signal} from '../models/signal';



@Component({
  
    selector: 'signal-detail',
    templateUrl: '../views/signal-detail.html',
    providers:[ServicesInfo]

	})
 
  export class SignalDetailComponent{
     

    
 public signal:Signal;

   


 constructor(


  private _services: ServicesInfo, private _route: ActivatedRoute,

        private _router: Router

){

  
 }//fin del constructor

 ngOnInit(){

   console.log('producto-detail.component');
   this.getSignal();

 }
 
 getSignal(){
 
   this._route.params.forEach((params:Params) => {
          
         //con esto capturo el id de la URL 
      		 let id= params['id'];
           


      	 this._services.getSignalDetail(id).subscribe(

               response => {
                 
                  if(response.code==200){

                  	   this.signal = response.data;
                       console.log(this.signal);

                  	}else{

                  		this._router.navigate(['/signalMonth']);
                  	}
            

               },

               error =>{


               }//fin del error

      	 	);//fin del subscribe

 });
 

 }//fin del metodo
    
  }//fin del class SignalDetail