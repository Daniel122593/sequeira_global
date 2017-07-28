import { Component } from '@angular/core';
import { ServicesInfo } from '../services/services_info.services';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({

 selector:'finance',
 templateUrl:'../views/finance.html',
 providers:[ServicesInfo]


})


export class FinanceComponent{
 
constructor( private _services:ServicesInfo, private _route: ActivatedRoute,

        private _router: Router

	){

	}//fin del constructor


}//fin del Componente 

