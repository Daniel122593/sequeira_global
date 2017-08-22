import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ServicesInfo } from '../services/services_info.services';
import {AuthService} from '../auth.service';
import {FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({

      selector:'info',
      templateUrl:'../views/info.html'

	})


export class InfoComponent{
 

public admin;
public info_data=[];
info:FirebaseListObservable<any>;

constructor(private _services:ServicesInfo, private _route: ActivatedRoute, private _router: Router, private auth: AngularFireAuth,
  private db: AngularFireDatabase) {
      
       //este metodo me muestra los datos del usuario actualmente conectado  
      this.auth.authState.subscribe(data =>{
           console.log(data.email);
           //console.log(data.password);
           this.verificarAdmin(data.email);

        })

      this.info = db.list('/info');
       
    }//fin del constructor

    
 
 //inserta los registros que se subieron a mysql con excel a firebase
 insertFirebase(){


 this._services.getInfo().subscribe(


    result=>{

       if(result.code!=200){

        }else{

         this.info_data=result.data;
          
         for(var i=0; i<this.info_data.length; i++){
            
            

            this.info.push({

               Name: this.info_data[i].nombres,
               Apellido: this.info_data[i].apellidos,
               Direccion: this.info_data[i].direccion,
               Cel: this.info_data[i].celular,
               Email: this.info_data[i].email



              });


         }//fin del for

        }//fin del else

    },
  
    error => {
  
     console.log(<any>error);

    }//fin del error


    )//fin del subscribe

 }//fin del metodo insertFirebase





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

