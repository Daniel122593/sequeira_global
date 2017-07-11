import {Component} from '@angular/core';

import {ServicesInfo} from '../services/services_info.services';
import {Signal} from '../models/signal';
import {GLOBAL} from '../services/global';

@Component ({

   selector:'createSignal',
   templateUrl:'../views/createSignal.html',
   providers: [ServicesInfo]

	})


export class CreateSignalComponent{
  
  public signal: Signal;
  public filesToUpload;
  public resultUpload;

 constructor( private _services: ServicesInfo){
  
  this.signal = new Signal(0,"","","","","","","","","","","");

 }//fin del constructor


  onSubmitSignal(){
   console.log(this.signal);

   if(this.filesToUpload.length>=1){
   
      this._services.makeFileRequest(GLOBAL.url+'upload-file', [], this.filesToUpload).then((result) =>{

          console.log(result);
        
          this.resultUpload=result;
          console.log(this.resultUpload.name);
          this.signal.graph=this.resultUpload.filename;
          console.log(this.signal.graph+'hola');

          this.saveSignal();
            
     },

      (error) => {

          console.log(error);
         }//fin del error
   

     );


       }else {

   alert('entra aqui');

   this.saveSignal();


 }

  }//fin del metodo inSubmitSignal

  
  saveSignal(){
  
    
    this.signal.date=this.signal.year+'-'+this.signal.month+'-'+this.signal.day;

    this._services.addSignal(this.signal).subscribe(
          

         response => {
           
            if(response.code==200){

            }else{

              console.log(response);
            }//fin del else

         }, error =>{

             console.log(<any>error);
 
           }//fin de error

      );
 
  }//fin del metodo saveSignal
  

  
     
   fileChangeEvent(fileInput: any){

     this.filesToUpload= <Array<File>>fileInput.target.files;
     console.log(this.filesToUpload);

     }//fin del metodo
   

}//fin del componente



