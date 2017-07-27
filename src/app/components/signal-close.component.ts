import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ServicesInfo} from '../services/services_info.services';
import {Signal} from '../models/signal';
import {GLOBAL} from '../services/global';
import {AngularFireDatabase } from 'angularfire2/database';
import {FirebaseListObservable } from 'angularfire2/database';

//imports de upload 
import { UploadRService } from '../uploads/shared/uploadR.service';
import { Upload } from '../uploads/shared/upload';
import * as _ from "lodash";

@Component ({

   selector:'signal-close',
   templateUrl:'../views/signal-close.html',
   providers: [ServicesInfo]

	})

 export class SignalCloseComponent {
    
    public titulo: string;
 	  public signal: Signal;
   	public filesToUpload;
  	public resultUpload;
 	  public is_edit;
    public hour;
    history_signals:FirebaseListObservable<any>;
    signals:FirebaseListObservable<any>;

    
  //estos son para la imagen en firebase
  selectedFiles: FileList;
  currentUpload: Upload;


 	constructor(
 
      private _services: ServicesInfo,
      private _route: ActivatedRoute,
      private _router: Router,public db:AngularFireDatabase, private upSvc: UploadRService
       
        ){
 
      this.titulo="Editar Signal";
      this.signal = new Signal(0,"","","","","","","","","","","","","","","","","","","","","","","");
      this.is_edit=true;

      this.history_signals = db.list('/history');
      this.signals = db.list('/signals');

     
 	}//fin del constructor
    



    getHour(){

    this._services.getGlobalTime().subscribe(
          

         result => {
           
            if(result.code==200){
                

                this.hour=result.data;
               

              

              var address_signal:string;
              var color_signal:string;

              var address_signal_final:string;
              var color_signal_final:string;

             if(this.signal.type_trend=="Bajista"){

                address_signal="arrow-dropdown-circle";
                color_signal="red";

              }else{
               
              address_signal="arrow-dropup-circle";
              color_signal="green";
              }


              if(this.signal.type_trend_final=="Bajista"){

                address_signal_final="arrow-dropdown-circle";
                color_signal_final="red";

              }else{
               
              address_signal_final="arrow-dropup-circle";
              color_signal_final="green";
              }
             
                console.log(this.signal.graph_image+'eerferferf');
                this.history_signals.push({
                Instrument: this.signal.instrument,
                Price_a: this.signal.open_price,
                E_Trend: address_signal,
                E_Color: color_signal,
                Date_A: this.signal.date,
                Price_c: this.signal.close_price,
                Img_R: this.signal.graph_final,
                Pips: this.signal.pip,
                R_Trend: address_signal_final,
                R_Color: color_signal_final,
                Date_C: this.signal.date_final,
                Initial_Hour: this.signal.time_initial,
                Final_Hour: this.hour

            });
              
                
               this.verificarSignal(this.signal.time_initial);

            
            }else{

            }//fin del else

         }, error =>{
            
             console.log(<any>error);
 
           }//fin de error

      );


   }//fin del metodo getHour


    ngOnInit(){

      this.getSignal();

    }//fin del metodo ngOnInit

     
     onSubmitSignal(){
 
 
   if(this.filesToUpload && this.filesToUpload.length>=1){


 	this._services.makeFileRequest(GLOBAL.url+'upload-file', [], this.filesToUpload).then((result) =>{

        
          console.log(this.signal);
          this.resultUpload=result;
          this.signal.graph_final=this.resultUpload.filename;
          console.log(this.signal.graph_final);
          
          this.getHour();
          this.updateSignal();
          this._router.navigate(['/signal-update',this.signal.id]);
 		},

       (error) => {

          console.log(error);
       	}//fin del error
   

 		);

 
 }else {

 	 this.getHour();
   this.updateSignal();
    this._router.navigate(['/signal-update',this.signal.id]);

 }//fin del else


 }//fin del onSubmitSignal


  //metodo que es llamado en el onSubmit para modificar producto
   updateSignal(){
     
     

   	 this._route.params.forEach((params:Params) => {
          
         //con esto capturo el id de la URL 
      		 let id= params['id'];
              
            this.signal.date=this.signal.year+'-'+this.signal.month+'-'+this.signal.day;
            //this.signal.date_final=this.signal.year_final+'-'+this.signal.month_final+'-'+this.signal.day_final;
 
					  console.log(this.signal);
            this._services.editSignal(id, this.signal).subscribe(
														response => {
															if(response.code == 200){
																this._router.navigate(['/signal']);
															}else{
																console.log(response);
															}
														},
														error => {
                              
															console.log(<any>error);
														}
													);
             });
               

             
              
                 this.uploadSingle();

   }//fin de updateSignal



  //toma las imagenes y las guarda en un array
   fileChangeEvent(fileInput: any){

     this.filesToUpload= <Array<File>>fileInput.target.files;
     console.log(this.filesToUpload);

     this.selectedFiles = fileInput.target.files;

     }//fin del metodo

 

     uploadSingle() {
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload,this.signal.graph_final)
  }//fin del metodo uploadSingle
 

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


 verificarSignal(hour_initial:string){
  
   this.db.list('/signals', {
      query: {

        indexOn: 'Initial_Hour',
        orderByChild: 'Initial_Hour',
        equalTo: hour_initial
      
      }

    }).subscribe(snapshot => {
 
     var signal_length = snapshot.length;

     if(signal_length>=1){ 

         for(let user of snapshot){

             //elimina un objeto especifico del json
            this.db.list("/signals/"+user.$key).remove();

          }//fin del for
       

      }//fin del if

       else{

       }

   }).closed;//fin del subscribe

 }//fin del metodo verificarAdmin




 }//fin de la clase 

