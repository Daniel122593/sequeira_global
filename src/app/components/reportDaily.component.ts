import { Component} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { ServicesInfo } from '../services/services_info.services';
import { AuthService} from '../auth.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
     selector:"reportDailyAccount",
     templateUrl:"../views/reportDailyAccount.html"

	})

 
 export class ReportDailyAccount{

 public admin;
 public newAccount=[];
 public accountOld=[];


 constructor(private _services:ServicesInfo, private _route: ActivatedRoute, private _router: Router, private auth: AngularFireAuth,
  private db: AngularFireDatabase) {

      //este metodo me muestra los datos del usuario actualmente conectado  
      this.auth.authState.subscribe(data =>{
           console.log(data.email);
           //console.log(data.password);
           this.verificarAdmin(data.email);

        })

    


}//fin del metodo constructor


  
saveNewAccount(){

  

   
 

}//fin del metodo saveNewAccount







 closeAndUpdateAccount(){


 //trae de firebase todos los registros en el objetp account
this.db.list('/account').subscribe(snapshot => {

          console.log(snapshot);
          for (var user of snapshot){
            
              if(user.State=="1" && user.Block=="true"){
         
                this.changeStateAccountInput(user.$key);
          
          }else if(user.State=="0" && user.Block=="true"){

                this.changeStateAccountOutput(user.$key);
          }//fin del else
            
       }//fin del for
          
      
  
 }); 
   
   //este metodo lleva el update para cambiar el estado del reporte generado 
    this.updateInput();
    this.updateOutput();
    location.href = "http://localhost:4200/clientUser";

 }//fin del metodo closeAndUpdateReport



changeStateAccountInput(key:string){
 
 var account:FirebaseObjectObservable<any>;
 account = this.db.object('/account/' + key);
 account.update({State:"2"});
 

}//fin del metodo


changeStateAccountOutput(key:string){
 
 var account:FirebaseObjectObservable<any>;
 account = this.db.object('/account/' + key);
 account.update({State:"-1"});
 

}//fin del metodo










 updateInput(){
  
   this._services.update_account_broker_input(this.newAccount).subscribe(

     response => {
      
       if(response.code==200){
           

       }else{
         

     }//fin del else

     }, error =>{
          
      
      console.log(<any>error);
        
 
     }//fin del error


    );

 }//fin del metodo updateInput



 
 updateOutput(){
  
   this._services.update_account_broker_output(this.accountOld).subscribe(

     response => {
      
       if(response.code==200){
           

       }else{
         

     }//fin del else

     }, error =>{
          
      
      console.log(<any>error);
        
 
     }//fin del error


    );

 }//fin del metodo updateInput



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


