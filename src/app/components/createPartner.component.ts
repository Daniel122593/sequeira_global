import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ServicesInfo} from '../services/services_info.services';
import {User_partner} from '../models/user_partner';
import {GLOBAL} from '../services/global';

@Component({
 
   selector:'createPartner',
   templateUrl:'../views/createPartner.html'


	})

export class CreatePartner {

public user_partner:User_partner;

public filesToUpload_identity;
public resultUpload_identity;
public filesToUpload_voucher;
public resultUpload_voucher;
	
 constructor( private _services: ServicesInfo, private _route: ActivatedRoute,
 	private _router:Router){
  
  this.user_partner = new User_partner(0,"","","","","","","","","","","","","","","","","");

}//fin del constructor

 onSubmitUserPartner(){


 if (this.filesToUpload_identity.length>=1){
 
this._services.makeFileRequest(GLOBAL.url+'upload-file', [], this.filesToUpload_identity).then((result) =>{

          
          this.resultUpload_identity=result;
          console.log(this.resultUpload_identity.name);
          this.user_partner.img_identity_partner=this.resultUpload_identity.filename;
                 
          //this.getHour();
          //this.saveSignal();
          //this.insertFirebase();

           //insert en firebase
  
     },
     
     (error) => {

          console.log(error);
         }//fin del error
   

     );

} else {

  
   //this.getHour();
   //this.saveSignal();
   //this.insertFirebase();

 }//fin del else

 
//////////////////segunda imagen///////////////////////////////
 if (this.filesToUpload_voucher.length>=1){
 
this._services.makeFileRequest(GLOBAL.url+'upload-file', [], this.filesToUpload_voucher).then((result) =>{

          
          this.resultUpload_voucher=result;
          console.log(this.resultUpload_voucher.name);
          this.user_partner.img_voucher_partner=this.resultUpload_voucher.filename;
                  

                 this.saveUser_partner();
          //this.getHour();
          //this.saveSignal();
          //this.insertFirebase();

           //insert en firebase
  
     },
     
     (error) => {

          console.log(error);
         }//fin del error
   

     );

} else {

  this.saveUser_partner();
   //this.getHour();
   //this.saveSignal();
   //this.insertFirebase();

 }//fin del else


  }//fin del metodo onSubmitUserPartner



 saveUser_partner(){
    alert("entra aqui");
    console.log(this.user_partner);

   this._services.addUserPartner(this.user_partner).subscribe(
    
     response =>{
       
       if(response.code==200){
             

       }else{

          
       }//fin del else

     }, error =>{

       console.log(<any>error);

     }//fin del error

   	);

 }//fin del saveUser_partner


     fileChangeEventIdentity(fileInput: any){

     this.filesToUpload_identity= <Array<File>>fileInput.target.files;
     console.log(this.filesToUpload_identity);

    
        }//fin del metodo fileChangeEventIdentity


     fileChangeEventVoucher(fileInput: any){

     this.filesToUpload_voucher= <Array<File>>fileInput.target.files;
     console.log(this.filesToUpload_voucher);

     }//fin del metodo fileChangeEventVoucher



}//fin de la clase CreatePartner