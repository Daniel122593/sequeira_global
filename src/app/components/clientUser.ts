import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ServicesInfo } from '../services/services_info.services';
import {AuthService} from '../auth.service';
import {FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import {UserClient} from '../models/user_client';

@Component({
     selector:"clientUser",
     templateUrl:"../views/clientUser.html"


	})

 export class ClientUser{


 	public user_cli=[];
 	  users:FirebaseListObservable<any>;
 	  usersClient:FirebaseListObservable<any>;

constructor(private _services:ServicesInfo, private _route: ActivatedRoute, private _router: Router, private auth: AngularFireAuth,
  private db: AngularFireDatabase) {
      
      this.usersClient = db.list('/users');
       
    }//fin del constructor


saveClients(){


        this.db.list('/users').subscribe(snapshot => {

          
          for (var user of snapshot){
                 
                if(user.Sql=="0"){
             
              this.user_cli.push(user);

            
          }//fin del if
            
       }//fin del for


       for (var user of snapshot){
                 
              this.usersClient.push({
              Country: user.Country,
              Date:  user.Date,
              Email: user.Date,
              Intro: user.Intro,
              Name:  user.Name,
              ReferCode: user.ReferCode,
              Sql: "1",
              Telephone: user.Telephone
          
              });


            this.db.list("/users/"+user.$key).remove();
            
           
            
       }//fin del for



            
       
 this._services.addUserClient(this.user_cli).subscribe(

     response => {
      
       if(response.code==200){
        
          location.reload();
     
       }else{

         location.reload();
       }//fin del else

     }, error =>{
        
          console.log(<any>error);
           location.reload();
          

     }//fin del error


   	);




 }); 
                   

}//fin del saveClients



 }//fin de la clase