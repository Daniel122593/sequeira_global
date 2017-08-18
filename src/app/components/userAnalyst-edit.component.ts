import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import {ServicesInfo} from '../services/services_info.services';
import {UserAnalyst} from '../models/user_analyst';
import {GLOBAL} from '../services/global';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
   
    selector:'user_analyst_edit',
    templateUrl:'../views/user_analyst-edit.html',
    providers:[ServicesInfo]

	})


export class UserAnalystEdit {


  public user_analyst: UserAnalyst;
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
 
     
            this.user_analyst = new UserAnalyst(0,"","","","","","","","","","","");

            this.is_edit=true;
        
            //este metodo me muestra los datos del usuario actualmente conectado  
            this.auth.authState.subscribe(data =>{
           console.log(data.email);
           //console.log(data.password);
           this.verificarAdmin(data.email);

        })

 	}//fin del constructor
  
  ngOnInit(){

  	this.getUserAnalyst();

  }//fin del metodo ngOnInit
  
  onSubmitAnalyst(){

    if(this.filesToUpload && this.filesToUpload.length>=1){
          
		this._services.makeFileRequest(GLOBAL.url+'upload-file', [], this.filesToUpload).then((result) =>{

			 this.resultUpload=result;
          	 this.user_analyst.profile_picture_analyst=this.resultUpload.filename;

          	 this.updateUserAna();
 			
 			},

 		error =>{

 			 console.log(<any>error);

 		}//fin del error
 	);


    }else{

 	  this.updateUserAna();

    }//fin del else

  }//fin del metodo onSubmitAnalyst


 
updateUserAna(){

 this._route.params.forEach((params:Params) => {
          
         //con esto capturo el id de la URL 
      		 let id= params['id'];
              
              this._services.updateUserAnalyst(id, this.user_analyst).subscribe(
				response => {
					if(response.code == 200){

						location.reload();

					}else{

            location.reload();
						
					}
				},

				error => {
	
					console.log(<any>error);
          location.reload();
				}
			);



      		 });

}//fin del metodo updateUserAdministrative



  //toma las imagenes y las guarda en un array
 fileChangeEvent(fileInput: any){

     this.filesToUpload= <Array<File>>fileInput.target.files;
     console.log(this.filesToUpload);

}//fin del metodo





 getUserAnalyst(){
 
   this._route.params.forEach((params:Params) => {
          
         //con esto capturo el id de la URL 
      		 let id= params['id'];


      	 this._services.getUserAnalystDetail(id).subscribe(

               response => {
                 
                  if(response.code==200){

                  	   this.user_analyst = response.data;

                  	}else{

                  		//this._router.navigate(['/users']);
                  	}
            
               },

               error =>{


               }//fin del error

      	 	);//fin del subscribe

 });

   }//fin del metodo getUserAnalyst


   
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

}//fin de la clase