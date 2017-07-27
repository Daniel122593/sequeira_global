import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ServicesInfo} from '../services/services_info.services';
import {User_administrative} from '../models/user_administrative';
import {GLOBAL} from '../services/global';
import {AngularFireDatabase } from 'angularfire2/database';
import {FirebaseListObservable } from 'angularfire2/database';
import {AuthService} from '../auth.service';
@Component ({

   selector:'createUser_administrative',
   templateUrl:'../views/createAdministrative.html',
   providers: [ServicesInfo]

	})


export class CreateUserAdministrative{

  
public user_administrative: User_administrative;
public filesToUpload;
public resultUpload;


userWeb:FirebaseListObservable<any>;
administrative:FirebaseListObservable<any>; 
 
  constructor(private _services: ServicesInfo, private _route: ActivatedRoute,

        private _router: Router, public db:AngularFireDatabase, public authService:AuthService){

      
this.user_administrative = new User_administrative(0,"","","","","","","","","","");
 
this.userWeb = db.list('/userWeb');
this.administrative = db.list('/administrative');

  }//fin del constructor
  

onSubmitUserAdministrative(){

  if(this.filesToUpload.length>=1){
 
      this._services.makeFileRequest(GLOBAL.url+'upload-file', [], this.filesToUpload).then((result) =>{
    
        this.resultUpload=result;
		console.log(this.resultUpload.name);
		this.user_administrative.profile_picture_administrative=this.resultUpload.filename;
     
        this.saveUser_administrative();
      //  this._router.navigate(['/users']);
        this.user_administrative.name_administrative="";
        this.user_administrative.identityCard="";
        this.user_administrative.email_administrative="";
        this.user_administrative.password_administrative="";
        this.user_administrative.hierarchy_administrative="";
        this.user_administrative.address_administrative="";
        this.user_administrative.country_administrative="";
        this.user_administrative.telephone_administrative="";
        this.user_administrative.date_administrative="";
        this.user_administrative.profile_picture_administrative="";

     }, 

     (error) => {

     	console.log(<any>error);

     }//fin del error

     );

  }else{
    

  }//fin del else

}//fin del onSubmitUserAdministrative


saveUser_administrative(){
  
 this._services.addUserAdministrative(this.user_administrative).subscribe(

   response =>{

     if(response.code==200){


     	}else{

     	}//fin del else

   }, error =>{

   	  console.log(<any>error);

   	}//fin del error

 	);
      
       this.authService.signup(this.user_administrative.email_administrative, this.user_administrative.password_administrative);

       this.userWeb.push({
             
              EmailAdministrative: this.user_administrative.email_administrative
              
             
              });
        

       this.administrative.push({
             
              email_administrative: this.user_administrative.email_administrative,
              password_administrative: this.user_administrative.password_administrative
              
             
              });

}//fin del metodo saveUser_administrative


 fileChangeEvent(fileInput: any){

     this.filesToUpload= <Array<File>>fileInput.target.files;
     console.log(this.filesToUpload);

    
    }//fin del metodo fileChange




}//fin de la clase CreateUserAdministrative