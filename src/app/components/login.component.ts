import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ServicesInfo} from '../services/services_info.services';
import {GLOBAL} from '../services/global';



@Component ({

   selector:'login',
   templateUrl:'../views/login.html',
   providers: [ServicesInfo]
   
    })



export class LoginComponent{
  
  //public signal: Signal;
  

 constructor( private _services: ServicesInfo, private _route: ActivatedRoute,

        private _router: Router){

 }//fin del constructor







 }//fin de la clase
