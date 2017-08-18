import { Component} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { ServicesInfo } from '../services/services_info.services';
import { AuthService} from '../auth.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserClient} from '../models/user_client';


@Component({
     selector:"clientUser",
     templateUrl:"../views/clientUser.html"


	})

 export class ClientUser{


 	  public user_cli=[];
 	  users:FirebaseListObservable<any>;
 	  usersClient:FirebaseListObservable<any>;
 	  public userClient_array : UserClient[];
 	  public admin;

constructor(private _services:ServicesInfo, private _route: ActivatedRoute, private _router: Router, private auth: AngularFireAuth,
  private db: AngularFireDatabase) {

      //este metodo me muestra los datos del usuario actualmente conectado  
      this.auth.authState.subscribe(data =>{
           console.log(data.email);
           //console.log(data.password);
           this.verificarAdmin(data.email);

        })
       
      this.usersClient = db.list('/users');
    }//fin del constructor
 

ngOnInit(){
 
 this.getClient();

}//fin del metodo ngOnInit

saveClients(){


        this.db.list('/users').subscribe(snapshot => {

          
          for (var user of snapshot){
          	console.log("entro");
            console.log(user.Email+user.Country);
            
            this.user_cli.push(user);
            
       }//fin del for

      this._services.addUserClient(this.user_cli).subscribe(

     response => {
      
       if(response.code==200){
           

       location.reload();

       }else{
         

       location.reload();

       }//fin del else

     }, error =>{
          
       location.reload();
          console.log(<any>error);
        
          

     }//fin del error


   	);


    
     

 }); 
        


}//fin del saveClients



getClient(){

this._services.getUserClient().subscribe(

 result => {


 	if(result.code!=200){


 	}else{
      
      this.userClient_array=result.data;
      console.log(this.userClient_array);
 	}//fin del else


},

 error => {

     console.log(<any>error);

   }//fin de error

  )

    }//fin del metodo getUserClient
     

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