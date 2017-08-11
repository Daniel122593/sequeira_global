import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ServicesInfo} from '../services/services_info.services';
import {User_partner} from '../models/user_partner';
import {GLOBAL} from '../services/global';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

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
public admin;

 constructor( private _services: ServicesInfo, private _route: ActivatedRoute,
 	private _router:Router, private auth: AngularFireAuth, private db: AngularFireDatabase){
  
  this.user_partner = new User_partner(0,"","","","","","","","","","","","","","","","","");
  this.auth.authState.subscribe(data =>{
           console.log(data.email);
           //console.log(data.password);
           this.verificarAdmin(data.email);

        })

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
    
    console.log(this.user_partner);

   this._services.addUserPartner(this.user_partner).subscribe(
    
     response =>{
       
       if(response.code==200){
             
          this._router.navigate(['/preferredUser']);
       }else{

          this._router.navigate(['/preferredUser']);
       }//fin del else

     }, error =>{

       console.log(<any>error);
         this._router.navigate(['/preferredUser']);
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


//verifica que tipo de usuario es el que esta actualmente conectado
 verificarAdmin(email:string){
  
   this.db.list('/administrative', {
      query: {

        indexOn: 'email_administrative',
        orderByChild: 'email_administrative',
        equalTo: email
      
      }

    }).subscribe(snapshot => {
 
     var administrative_length = snapshot.length;

     if(administrative_length>=1){ 

         for(let user of snapshot){
          
             if(user.email_administrative){
               
               this.admin=true;

              }else{
              
               this.admin=false;

              }

          }//fin del for
       

      }//fin del if

       else{

       }

   }).closed;//fin del subscribe

 }//fin del metodo verificarAdmin

}//fin de la clase CreatePartner