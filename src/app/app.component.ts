import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';

import {AuthService} from './auth.service';

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

  constructor(private translate: TranslateService, private activatedRoute: ActivatedRoute, public authService:AuthService) {
        translate.addLangs(["es", "en"]);
        translate.setDefaultLang('es');

        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/es|en/) ? browserLang : 'es');
    }

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
  }//fin del ngOnInit
 
  

  login(){
     this.authService.login(this.email, this.password);
     this.email = this.password  ="";
    }//fin de login

   logout(){
    
     this.authService.logout();
    }//logout


  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }

}
