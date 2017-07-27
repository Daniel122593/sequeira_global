import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ServicesInfo} from '../services/services_info.services';
import {UserAnalyst} from '../models/user_analyst';
import {GLOBAL} from '../services/global';
import {AngularFireDatabase } from 'angularfire2/database';
import {FirebaseListObservable } from 'angularfire2/database';
import {AuthService} from '../auth.service';


@Component ({

   selector:'createUser_analyst',
   templateUrl:'../views/createUser.html',
   providers: [ServicesInfo]

	})


export class CreateUserAnalyst{

public user_analyst: UserAnalyst;
public filesToUpload;
public resultUpload;

userWeb:FirebaseListObservable<any>;
analyst:FirebaseListObservable<any>;


constructor(private _services: ServicesInfo, private _route: ActivatedRoute,

        private _router: Router, public db:AngularFireDatabase, public authService:AuthService){

      
this.user_analyst = new UserAnalyst(0,"","","","","","","","","","");
 
this.userWeb = db.list('/userWeb');
this.analyst = db.list('/analyst');

  }//fin del constructor



onSubmitAnalyst(){

if(this.filesToUpload.length>=1){
   
   this._services.makeFileRequest(GLOBAL.url+'upload-file', [], this.filesToUpload).then((result) =>{
    
        this.resultUpload=result;
		console.log(this.resultUpload.name);
		this.user_analyst.profile_picture_analyst=this.resultUpload.filename;
     
         this.saveUser_analyst();
        //this.saveUser_administrative();
        //this._router.navigate(['/users']);
        this.user_analyst.name_analyst="";
        this.user_analyst.identityCard_analyst="";
        this.user_analyst.email_analyst="";
        this.user_analyst.password_analyst="";
        this.user_analyst.hierarchy_analyst="";
        this.user_analyst.address_analyst="";
        this.user_analyst.country_analyst="";
        this.user_analyst.telephone_analyst="";
        this.user_analyst.date_analyst="";
        this.user_analyst.profile_picture_analyst="";

     }, 

     (error) => {
      
       console.log(<any>error);

     }//fin de error
 
 );



}else{
 
 alert("Debe seleccionar la imagen de perfil");

}//fin del else


}//fin del metodo onSubmitAnalyst



saveUser_analyst(){

   this._services.addUserAnalyst(this.user_analyst).subscribe(

   response =>{

     if(response.code==200){


     	}else{


     	}//fin del else

   }, error =>{

   	  console.log(<any>error);

   	}//fin del error

 	);
      
       this.authService.signup(this.user_analyst.email_analyst, this.user_analyst.password_analyst);
         
         //agregar en firebase para saber que este usuario puede entrar en la aplicacion

       this.userWeb.push({
             
              EmailAdministrative: this.user_analyst.email_analyst
              
              });


       this.analyst.push({
             
              email_analyst: this.user_analyst.email_analyst,
              password_analyst : this.user_analyst.email_analyst
              
              });


}//fin del metodo saveUser_analyst



 fileChangeEvent(fileInput: any){

     this.filesToUpload= <Array<File>>fileInput.target.files;
     console.log(this.filesToUpload);

    
    }//fin del metodo fileChange






}//fin de la clase