import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import {ServicesInfo} from '../services/services_info.services';
import {Signal} from '../models/signal';
import {GLOBAL} from '../services/global';

@Component({
   
    selector:'signal-edit',
    templateUrl:'../views/signal-edit.html',
    providers:[ServicesInfo]

	})

 export class SignalEditComponent{

 	public titulo: string;
 	public signal: Signal;
 	public filesToUpload;
 	public resultUpload;
 	public is_edit;

 	constructor(
 
      private _services: ServicesInfo,
      private _route: ActivatedRoute,
      private _router: Router
       
        ){
 
      this.titulo="Editar Sigal";
            this.signal = new Signal(0,"","","","","","","","","","","","","","","","","","","","","","","");
      this.is_edit=true;


 	}//fin del constructor

    ngOnInit(){

    	console.log(this.titulo);
    	this.getSignal();

    	}//fin del metodo ngOnInit
    


   
 //modifica los atributos de un producto en especifico
 onSubmitSignal(){
 
 
   

   if(this.filesToUpload && this.filesToUpload.length>=1){


 	this._services.makeFileRequest(GLOBAL.url+'upload-file', [], this.filesToUpload).then((result) =>{

        
          console.log(this.signal);
          this.resultUpload=result;
          this.signal.graph_image=this.resultUpload.filename;
          console.log(this.signal.graph_image);

          this.updateSignal();
 		},

       (error) => {

          console.log(error);
       	}//fin del error
   

 		);

 
 }else {

 	
   this.updateSignal();

 }



   }//fin del onSubmitSignal

  
   //metodo que es llamado en el onSubmit para modificar producto
   updateSignal(){

   	 this._route.params.forEach((params:Params) => {
          
         //con esto capturo el id de la URL 
      		 let id= params['id'];
              
            this.signal.date=this.signal.year+'-'+this.signal.month+'-'+this.signal.day;

						
            this._services.editSignal(id, this.signal).subscribe(
														response => {
															if(response.code == 200){
																this._router.navigate(['/signal']);
															}else{
																console.log(response);
															}
														},
														error => {
                              console.log('entra aqui la vara');
															console.log(<any>error);
														}
													);
             });

   }//fin de updateSignal



     //toma las imagenes y las guarda en un array
   fileChangeEvent(fileInput: any){

     this.filesToUpload= <Array<File>>fileInput.target.files;
     console.log(this.filesToUpload);

     }//fin del metodo


 getSignal(){
 
   this._route.params.forEach((params:Params) => {
          
         //con esto capturo el id de la URL 
      		 let id= params['id'];


      	 this._services.getSignalDetail(id).subscribe(

               response => {
                 
                  if(response.code==200){

                  	   this.signal = response.data;

                  	}else{

                  		this._router.navigate(['/signal']);
                  	}
            

               },

               error =>{


               }//fin del error

      	 	);//fin del subscribe

 });
 

 }//fin del metodo




onDeleteSignal(id){
  
   this._services.deleteSignal(id).subscribe(

     response => {
        
          if(response.code==200){
                 
                 this._router.navigate(['/signal']);

            }//fin del if
                 
            else{  

                  alert('Error al eliminar el producto');

              }//fin del else
     },

     error => {
 
      console.log(<any>error);

     }//fin de opcion de error

    );

   }//fin del metodo onDeleteProducto












 }//fin de la clase