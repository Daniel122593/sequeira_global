import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ServicesInfo} from '../services/services_info.services';
import {Signal} from '../models/signal';
import {GLOBAL} from '../services/global';
import {AngularFireDatabase } from 'angularfire2/database';
import {FirebaseListObservable } from 'angularfire2/database';



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
    history_signals:FirebaseListObservable<any>;

 	constructor(
 
      private _services: ServicesInfo,
      private _route: ActivatedRoute,
      private _router: Router,public db:AngularFireDatabase
       
        ){
 
      this.titulo="Editar Signal";
      this.signal = new Signal(0,"","","","","","","","","","","","","","","","","","","","","","");
      this.is_edit=true;

      this.history_signals = db.list('/history');


 	}//fin del constructor
    

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
          
          this.updateSignal();
          this._router.navigate(['/signal-update',this.signal.id]);
 		},

       (error) => {

          console.log(error);
       	}//fin del error
   

 		);

 
 }else {

 	
   this.updateSignal();
    this._router.navigate(['/signal-update',this.signal.id]);

 }//fin del else


 }//fin del onSubmitSignal


  //metodo que es llamado en el onSubmit para modificar producto
   updateSignal(){
     
      var address_signal:string;
      var color_signal:string;

      var address_signal_final:string;
      var color_signal_final:string;


   	 this._route.params.forEach((params:Params) => {
          
         //con esto capturo el id de la URL 
      		 let id= params['id'];
              
            this.signal.date=this.signal.year+'-'+this.signal.month+'-'+this.signal.day;
            this.signal.date_final=this.signal.year_final+'-'+this.signal.month_final+'-'+this.signal.day_final;
 
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
                Intrument: this.signal.instrument,
                Price_a: this.signal.open_price,
                E_Trend: this.signal.type_trend,
                E_Color: "red",
                //TP1: "1.22",
                //TP2: "1.26",
                //SL: "1.14",
                Date_A: this.signal.date,
                Img_E: this.signal.graph_image,
                Price_c: this.signal.close_price,
                Img_R: this.signal.graph_final,
                Pips: this.signal.pip,
                R_Trend: address_signal,
                Date_C: this.signal.date_final
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





 }//fin de la clase 

