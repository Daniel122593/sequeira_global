import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AngularFireDatabase } from 'angularfire2/database';
import {FirebaseListObservable } from 'angularfire2/database';
import {UserAnalyst} from '../models/user_analyst';
import {ServicesInfo} from '../services/services_info.services';
import {GLOBAL} from '../services/global';
@Component({

    selector:'createUser',
    templateUrl:'../views/createUser.html',
    providers: [ServicesInfo]

	})


export class CreateUser {
   
  public user_analyst: UserAnalyst;

  analyst:FirebaseListObservable<any>;

  constructor(private _services: ServicesInfo, private activatedRoute: ActivatedRoute, private _router: Router, private db:AngularFireDatabase){
    
     
   this.user_analyst = new UserAnalyst(0,"","","","","","","","","");

    db.list('/analyst').subscribe(snapshot => {
          for (let user of snapshot){
            console.log(user.Email);
            }
          });
     
 
  	}//fin del constructor
    

  
  




}//fin de la clase CreateUser