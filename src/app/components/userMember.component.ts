import { Component } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ServicesInfo} from '../services/services_info.services';
import {UserClient} from '../models/user_client';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import {FirebaseListObservable } from 'angularfire2/database';

@Component({
  
    selector: 'user_client-detail',
    templateUrl: '../views/userMember.html',
    providers:[ServicesInfo]

	})


export class UserMember{

network:FirebaseListObservable<any>;
 public admin;

 public linea1=[];
 public linea2=[];
 public linea3=[];
 public linea4=[];
 public linea5=[];
 public name_client_actual;
 public cant_total_member;
 public cantLine1;
 public cantLine2;
 public cantLine3;
 public cantLine4;
 public cantLine5;

  
 constructor(private _services: ServicesInfo, private _route: ActivatedRoute,

 private _router: Router, private auth: AngularFireAuth, private db: AngularFireDatabase){
   
     //este metodo me muestra los datos del usuario actualmente conectado  
      this.auth.authState.subscribe(data =>{
           console.log(data.email);
           //console.log(data.password);
           this.verificarAdmin(data.email);

        })
 
   this.network = db.list('/network');




   this._route.params.forEach((params:Params) => {
          
         //con esto capturo el id de la URL 
           let referCode_client= params['referCode_client'];
           let name_client=params['name_client'];

           this.name_client_actual=name_client;
              
               this.showNetwork(referCode_client);

            });

 }//fin del metodo constructor

 ngOnInit(){




 }//fin del metodo ngOnInit

 


showNetwork(code:string){
  

  this.db.list('/network', {
      query: {

        indexOn: 'Reference',
        orderByChild: 'Reference',
        equalTo: code
      
      }//fin del query

    }).subscribe(snapshot => {
      

     console.log(snapshot);

    //for para recorrer la linea 1
     for(let line1 of snapshot){
         
         
         
         for(let linea1List of line1.Line1)
         //console.log(line.Line1[0].ReferCode);
         
         this.linea1.push(linea1List);
       

         //if(line.Line1[0].ReferCode=="init"){

            //this.linea1.push(line.Line1);
          
          //}else{

           // this.linea1.push(line.Line1);

        //  }//fin del else

          //this.linea1.push(line.Line1);
          console.log("arriba");
          console.log(this.linea1);
          this.cant_total_member=this.linea1.length-1;
          this.cantLine1=this.linea1.length-1;
          console.log("abajo");
    
      }//fin del for
     
     


      //linea2
      for(let line2 of snapshot){
         
         for(let linea2List of line2.Line2)
        
         this.linea2.push(linea2List);
        
        this.cant_total_member+=this.linea2.length-1;
        this.cantLine2=this.linea2.length-1;

      }//fin del for

 
 

        //linea 3
       for(let line3 of snapshot){
        
        for(let linea3List of line3.Line3)

         this.linea3.push(linea3List);

         this.cant_total_member+=this.linea3.length-1;
         this.cantLine3=this.linea3.length-1;
        
        }//fin del for
  



        //linea 4
        for(let line4 of snapshot){
         
         for(let linea4List of line4.Line4)
        
         this.linea4.push(linea4List);

         this.cant_total_member+=this.linea4.length-1;
         this.cantLine4=this.linea4.length-1;

        
        }//fin del for
 


        //linea 5
        for(let line5 of snapshot){
        
         for(let linea5List of line5.Line5)
        
        this.linea5.push(linea5List);
         
        this.cant_total_member+=this.linea5.length-1;
        this.cantLine5=this.linea5.length-1;
        
        }//fin del for
  

        }).closed;

 }//fin del metodo pruebaNetwork


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
