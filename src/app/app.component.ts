import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import {AuthService} from './auth.service';
import {AngularFireDatabase } from 'angularfire2/database';
import {FirebaseListObservable } from 'angularfire2/database';
import {Subscription } from 'rxjs';
import {Router, ActivatedRoute} from '@angular/router';
import {OnInit, OnDestroy} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: "./app.component.html"
})

export class AppComponent { 

  private subscription: Subscription;
  email:string;
  password:string;
  users:FirebaseListObservable<any>;
  public admin;

   
  constructor(private translate: TranslateService, private activatedRoute: ActivatedRoute, public authService:AuthService,

    private db:AngularFireDatabase) {
       
        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/es|en/) ? browserLang : 'es');

  
    }//fin del constructor

    changeLanguage(lang){
        this.translate.use(lang);
    }

    ngOnInit() {
    // subscribe to router event
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
        let locale = param['locale'];
        if (locale !== undefined){
            this.translate.use(locale);
        }
      });
     
     
     //console.log(this.users);
  }//fin del ngOnInit
 
    
  login(){
     this.authService.login(this.email, this.password);
     this.password = "";

    }//fin del metodo login

   logout(){
    
     this.authService.logout();
    }//fin del metodo logout


  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }//fin del metodo ngOnDestroy

  

}//fin de la clase
