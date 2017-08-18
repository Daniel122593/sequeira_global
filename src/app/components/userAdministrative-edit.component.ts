import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import {ServicesInfo} from '../services/services_info.services';
import {User_administrative} from '../models/user_administrative';
import {GLOBAL} from '../services/global';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
   
    selector:'userAdministrative-edit',
    templateUrl:'../views/userAdministrative-edit.html',
    providers:[ServicesInfo]

	})


export class UserAdministrativeEdit {

 
  public user_administrative: User_administrative;
 	public filesToUpload;
 	public resultUpload;
 	public is_edit;
  public admin;

constructor(
 
      private _services: ServicesInfo,
      private _route: ActivatedRoute,
      private _router: Router,
      private auth: AngularFireAuth,
      private db: AngularFireDatabase
       
        ){
 
            //este metodo me muestra los datos del usuario actualmente conectado  
          this.auth.authState.subscribe(data =>{
           console.log(data.email);
           //console.log(data.password);
           this.verificarAdmin(data.email);

        })
            this.user_administrative = new User_administrative(0,"","","","","","","","","","","");

            this.is_edit=true;


 	}//fin del constructor

 
 ngOnInit(){

    this.getUserAdministrative();

 }//fin del metodo ngOnInit


onSubmitUserAdministrative(){

if(this.filesToUpload && this.filesToUpload.length>=1){


 	this._services.makeFileRequest(GLOBAL.url+'upload-file', [], this.filesToUpload).then((result) =>{

			 this.resultUpload=result;
          	 this.user_administrative.profile_picture_administrative=this.resultUpload.filename;

          	 this.updateUserAdmi();
 		},

 		error =>{

 			 console.log(<any>error);

 		}//fin del error
 	);

}else{

 this.updateUserAdmi();
}//fin del else

}//fin del metodo

updateUserAdmi(){

 this._route.params.forEach((params:Params) => {
          
         //con esto capturo el id de la URL 
      		 let id= params['id'];
               
              this._services.updateUserAdministrative(id, this.user_administrative).subscribe(
				response => {
					if(response.code == 200){
						this._router.navigate(['/users']);
					}else{
						
					}
				},

				error => {
	
					console.log(<any>error);
				}
			);



      		 });

}//fin del metodo updateUserAdministrative


  //toma las imagenes y las guarda en un array
 fileChangeEvent(fileInput: any){

     this.filesToUpload= <Array<File>>fileInput.target.files;
     console.log(this.filesToUpload);

}//fin del metodo


 getUserAdministrative(){
 
   this._route.params.forEach((params:Params) => {
          
         //con esto capturo el id de la URL 
      		 let id= params['id'];


      	 this._services.getUserAdministrativeDetail(id).subscribe(

               response => {
                 
                  if(response.code==200){

                  	   this.user_administrative = response.data;

                  	}else{

                  		//this._router.navigate(['/users']);
                  	}
            
               },

               error =>{


               }//fin del error

      	 	);//fin del subscribe

 });
 

 }//fin del metodo


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
 

}//fin del metodo UserAdministrativeEdit




