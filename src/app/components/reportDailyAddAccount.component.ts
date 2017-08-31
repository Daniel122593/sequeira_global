import { Component} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { ServicesInfo } from '../services/services_info.services';
import { AuthService} from '../auth.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
     selector:"reportDailyAddAccount",
     templateUrl:"../views/reportDailyAddAccount.html"

	})

 
 export class ReportDailyAddAccount{

 public admin;
 public newAccount=[];
 public accountOld=[];
 account:FirebaseListObservable<any>;

 constructor(private _services:ServicesInfo, private _route: ActivatedRoute, private _router: Router, private auth: AngularFireAuth,
  private db: AngularFireDatabase) {

      //este metodo me muestra los datos del usuario actualmente conectado  
      this.auth.authState.subscribe(data =>{
           console.log(data.email);
           //console.log(data.password);
           this.verificarAdmin(data.email);

        })

    this.account = db.list('/account');

  

}//fin del metodo constructor

  

 
addAllAccount(){

  this.saveNewAccount();
  this.saveNewAccountOld();

  this._router.navigate(['/reportDailyAccount']);

}//fin del metodo addAllAcount

saveNewAccount(){

  

   this.db.list('/account').subscribe(snapshot => {

          
          for (var user of snapshot){
            
              if(user.State=="1"){

            this.newAccount.push(user);
          
          }else{


          }//fin del else
            
       }//fin del for
          
       

      this._services.addNewAccount(this.newAccount).subscribe(

     response => {
      
       if(response.code==200){
           

       

       }else{
         

       

       }//fin del else

     }, error =>{
          
      
      console.log(<any>error);
        
          

     }//fin del error


    );


  
 }); 
 

}//fin del metodo saveNewAccount




saveNewAccountOld(){


   this.db.list('/account').subscribe(snapshot => {

          
          for (var user of snapshot){
             
              //aqui filtra las que tienen estado "0" son las que no se utilizan
              if(user.State=="0"){

            this.accountOld.push(user);
          
          }else{


          }//fin del else
            
       }//fin del for
          
       

      this._services.addNewAccountOld(this.accountOld).subscribe(

     response => {
      
       if(response.code==200){
           

       }else{
         

     }//fin del else

     }, error =>{
          
      
      console.log(<any>error);
        
          

     }//fin del error


    );

 }); 
 

}//fin del metodo saveNewAccountOld






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


