import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ServicesInfo} from '../services/services_info.services';
import {BankPartner} from '../models/bank_partner';
import {User_partner} from '../models/user_partner';
import {GLOBAL} from '../services/global';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component ({

   selector:'bank_partner',
   templateUrl:'../views/bank_partner.html',
   providers: [ServicesInfo]

	})


export class CreateBankPartner{

 public bank_partner: BankPartner;
 public user_partner: User_partner;
 public admin;

   constructor( private _services: ServicesInfo, private _route: ActivatedRoute,

        private _router: Router, private auth: AngularFireAuth, private db: AngularFireDatabase){
     
      this.bank_partner = new BankPartner(0,"","","",0);

      //este metodo me muestra los datos del usuario actualmente conectado  
      this.auth.authState.subscribe(data =>{
           console.log(data.email);
           //console.log(data.password);
           this.verificarAdmin(data.email);

        })

 }//fin del constructor
  
  
 onSubmitBankPartner(){
   
   this._services.addBankPartner(this.bank_partner).subscribe(

     response => {
      
       if(response.code==200){
        
          this._router.navigate(['/createBankPartner']);
          location.reload(true);
       }else{

          this._router.navigate(['/createBankPartner']);
          location.reload(true);
       }//fin del else

     }, error =>{
           this._router.navigate(['/createBankPartner']);
           location.reload(true);
          console.log(<any>error);

          

     }//fin del error


   	);


 }//fin del metodo onSubmitBankPartner
 
 ngOnInit(){


   this._services.getInfoPartner().subscribe(
      
      response => {
      
        if(response.code==200){

        	this.user_partner=response.data;
        	console.log(this.user_partner);
        }else{


        }

      },

      error =>{

      	 console.log(<any>error);
      }//fin del error


   	);


 }//fin del ngOnInit

 
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

}//fin de la clase CreateBankPartner