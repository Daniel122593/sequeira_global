import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ServicesInfo} from '../services/services_info.services';
import {Signal} from '../models/signal';
import {GLOBAL} from '../services/global';
import {AngularFireDatabase } from 'angularfire2/database';
import {FirebaseListObservable } from 'angularfire2/database';



//imports de upload 
import { UploadService } from '../uploads/shared/upload.service';
import { Upload } from '../uploads/shared/upload';
import * as _ from "lodash";


@Component ({

   selector:'createSignal',
   templateUrl:'../views/createSignal.html',
   providers: [ServicesInfo]

	})

export class CreateSignalComponent{
  
  public signal: Signal;
  public filesToUpload;
  public resultUpload;
   
  //estos son para la imagen en firebase
  selectedFiles: FileList;
  currentUpload: Upload;


  signals:FirebaseListObservable<any>;

 constructor( private _services: ServicesInfo, private _route: ActivatedRoute,

        private _router: Router, public db:AngularFireDatabase, private upSvc: UploadService){
  
      this.signal = new Signal(0,"","","","","","","","","","","","","","","","","","","","","","");

  this.signals = db.list('/signals');

 }//fin del constructor


  onSubmitSignal(){
   console.log(this.signal);

   if(this.filesToUpload.length>=1){
   
      this._services.makeFileRequest(GLOBAL.url+'upload-file', [], this.filesToUpload).then((result) =>{

       
        
          this.resultUpload=result;
          console.log(this.resultUpload.name);
          this.signal.graph_image=this.resultUpload.filename;
      

          this.saveSignal();


           //insert en firebase
  
     },

      (error) => {

          console.log(error);
         }//fin del error
   

     );


       }else {

   alert('entra aqui');

   this.saveSignal();


 }//fin del else

  }//fin del metodo inSubmitSignal

  
  saveSignal(){
    
     var address_signal:string;
     var color_signal:string;

    this.signal.date=this.signal.year+'-'+this.signal.month+'-'+this.signal.day;
    this.signal.condition_signal="Abierta";
     
   
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


          if(this.signal.type_trend=="Alcista"){
             
             address_signal="arrow-dropup-circle";
             color_signal="green";

             

           }else{
           
             address_signal="arrow-dropdown-circle";
             color_signal="red";


           }//fin del else


          this.signals.push({
              Instrument: this.signal.instrument,
              Price_a:  this.signal.open_price,
              E_Trend: address_signal,
              E_Color: color_signal,
              TP1: this.signal.tp1,
              TP2: this.signal.tp2,
              SL:  this.signal.sl,
              Date_A: this.signal.date,
              Img_E:  this.signal.graph_image
             
              });

           this.uploadSingle();
 
  }//fin del metodo saveSignal
  
  
   fileChangeEvent(fileInput: any){

     this.filesToUpload= <Array<File>>fileInput.target.files;
     console.log(this.filesToUpload);

     this.selectedFiles = fileInput.target.files;
     

     }//fin del metodo


    uploadSingle() {
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload,this.signal.graph_image)
  }
   

}//fin del componente



