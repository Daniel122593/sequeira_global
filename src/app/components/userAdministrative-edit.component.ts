import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import {ServicesInfo} from '../services/services_info.services';
import {User_administrative} from '../models/user_administrative';
import {GLOBAL} from '../services/global';

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


constructor(
 
      private _services: ServicesInfo,
      private _route: ActivatedRoute,
      private _router: Router
       
        ){
 
     
            this.user_administrative = new User_administrative(0,"","","","","","","","","","");

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
               console.log(this.user_administrative.profile_picture_administrative+"aquiiiiii");
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

}//fin del metodo UserAdministrativeEdit




