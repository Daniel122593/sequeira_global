import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ServicesInfo} from '../services/services_info.services';
import {User_administrative} from '../models/user_administrative';
import {GLOBAL} from '../services/global';
import {AngularFireDatabase } from 'angularfire2/database';
import {FirebaseListObservable } from 'angularfire2/database';
import {AuthService} from '../auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
@Component ({

   selector:'createUser_administrative',
   templateUrl:'../views/createAdministrative.html',
   providers: [ServicesInfo]

	})

export class CreateUserAdministrative{

public user_administrative: User_administrative;
public filesToUpload;
public resultUpload;
public admin;
public presentEmail;
public checkFields;

userWeb:FirebaseListObservable<any>;
administrative:FirebaseListObservable<any>; 
 
  constructor(private _services: ServicesInfo, private _route: ActivatedRoute,

        private _router: Router, public db:AngularFireDatabase, public authService:AuthService, private auth: AngularFireAuth){

      
this.user_administrative = new User_administrative(0,"","","","","","","","","","","");
 
this.userWeb = db.list('/userWeb');
this.administrative = db.list('/administrative');

this.auth.authState.subscribe(data =>{
           console.log(data.email);
           this.presentEmail=data.email;
           this.verificarAdmin(data.email);

        })
  }//fin del constructor
  

onSubmitUserAdministrative(){

  if(this.filesToUpload==null || this.user_administrative.identityCard=="" || this.user_administrative.name_administrative =="" || this.user_administrative.email_administrative=="" || this.user_administrative.password_administrative=="" || this.user_administrative.hierarchy_administrative=="" || this.user_administrative.address_administrative=="" || this.user_administrative.country_administrative=="" || this.user_administrative.telephone_administrative=="" || this.user_administrative.date_administrative=="" || this.user_administrative.confirmPassword==""){

      this.checkFields=true;

  }else{
      
      this.checkFields=false;

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
        this.user_administrative.confirmPassword="";
        

     }, 

     (error) => {

     	console.log(<any>error);

     }//fin del error

     );

  }else{
    

  }//fin del else

  }//fin del else de validacion

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
      
       this.authService.signup(this.user_administrative.email_administrative, this.user_administrative.password_administrative, this.presentEmail, this.user_administrative.confirmPassword);

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
 
 //verifica que tipo de usuario esta actualmente logueado
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


}//fin de la clase CreateUserAdministrative