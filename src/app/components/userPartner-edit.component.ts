import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import {ServicesInfo} from '../services/services_info.services';
import {User_partner} from '../models/user_partner';
import {GLOBAL} from '../services/global';

@Component({
   
    selector:'userPartner-edit',
    templateUrl:'../views/user_partner-edit.html',
    providers:[ServicesInfo]

	})



export class UserPartnerEdit {

    public user_partner: User_partner;
 	public filesToUpload;
 	public resultUpload;
 	public is_edit;


 constructor(
 
      private _services: ServicesInfo,
      private _route: ActivatedRoute,
      private _router: Router
       
        ){
 
     
            this.user_partner= new User_partner(0,"","","","","","","","","","","","","","","","","");

            this.is_edit=true;


 	}//fin del constructor


    ngOnInit(){
       
       this.getUserPartner();

    }//fin del metodo ngOnInit

 	onSubmitUserPartner(){
     
      if(this.filesToUpload && this.filesToUpload.length>=1){


 	this._services.makeFileRequest(GLOBAL.url+'upload-file', [], this.filesToUpload).then((result) =>{

			 this.resultUpload=result;
          	 this.user_partner.img_identity_partner=this.resultUpload.filename;

          	 this.updateUserPart();
 		},

 		error =>{

 			 console.log(<any>error);

 		}//fin del error
 	);

  }else{

 this.updateUserPart();

}//fin del else


 	}//fin del metodo onSubmitUserPartner


 	updateUserPart(){
              this._route.params.forEach((params:Params) => {
 		      //con esto capturo el id de la URL 
      		 let id= params['id'];
               
              this._services.updateUserPartner(id, this.user_partner).subscribe(
				response => {
					if(response.code == 200){

            location.reload();
					 
					}else{
						
					}
				},

				error => {
	        location.reload();
					console.log(<any>error);
				}
			  
			   );



      		 });


 	}//fin del updatUserPartner


 	  //toma las imagenes y las guarda en un array
  fileChangeEvent(fileInput: any){

     this.filesToUpload= <Array<File>>fileInput.target.files;
     console.log(this.filesToUpload);

  }//fin del metodo 






 getUserPartner(){
 
   this._route.params.forEach((params:Params) => {
          
         //con esto capturo el id de la URL 
      		 let id= params['id'];


      	 this._services.getUserPartnerDetail(id).subscribe(

               response => {
                 
                  if(response.code==200){

                  	   this.user_partner = response.data;

                  	}else{

                  		//this._router.navigate(['/users']);
                  	}
            
               },

               error =>{


               }//fin del error

      	 	);//fin del subscribe

 });
 

 }//fin del metodo


}//fin de la clase

