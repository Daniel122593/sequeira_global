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
  history:FirebaseListObservable<any>;
  
  public admin;
  public userActive=[];
  public userDesactive=[];
  public cantActive;
  public cantDesactive;
  public signal_positive=[];
  public signal_negative=[];
  public month_number:number;
  public month_current:string;
  public cant_signal_positive;
  public cant_signal_negative;
  public number_pip;
  public pip_positive=[];
  public pip_negative=[];
  public cant_pip_positive;
  public cant_pip_negative;


  constructor(private translate: TranslateService, private activatedRoute: ActivatedRoute, public authService:AuthService,

    private db:AngularFireDatabase) {
         

        
        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/es|en/) ? browserLang : 'es');


         this.db.list('/users').subscribe(snapshot => {

          
          for (var user of snapshot){
                 
                 if(user.State=="1"){
                   
                   this.userActive.push(user);

                 }else{
                  
                   this.userDesactive.push(user);
                 
                 }//fin del else
 

                
              }//fin del for
               
                
                this.cantActive=this.userActive.length;
                this.cantDesactive=this.userDesactive.length;


            });//fin



              //obtener numero del mes actual
               var d = new Date();
               var n = d.getMonth();
               this.month_number=n;

              
             

               this.month_current = this.month_number.toString();
               
               //identifica que señales fueron positivas y que señales fueron negativas
               this.db.list('/history').subscribe(snapshot => {

                  for (var user of snapshot){

                      //toma las señales del mes actual y que fueron positivas
                     if(user.Month_Actual_Number==this.month_current && user.R_Trend=="arrow-dropup-circle"){
                   
                      this.signal_positive.push(user);
                       
                       //toma las señales del mes actual y que fueron negativas
                    }else if(user.Month_Actual_Number==this.month_current && user.R_Trend=="arrow-dropdown-circle"){
                  
                      this.signal_negative.push(user);
                 
                    }//fin del else if 

                    else{

                      }//fin del else
 
                  }//fin del for 

                   this.cant_signal_positive=this.signal_positive.length;
                   this.cant_signal_negative=this.signal_negative.length;

               });//fin



               //identifica que señales tienen pips megativos y cuales tienen pips positivos
               this.db.list('/history').subscribe(snapshot => {

                  for (var user of snapshot){

                      this.number_pip=parseInt(user.Pips);

                      console.log(this.number_pip);

                      //toma las señales del mes actual y que fueron positivas
                     if(this.number_pip>0 && user.Month_Actual_Number==this.month_current){
                   
                      this.pip_positive.push(user);
                       
                       //toma las señales del mes actual y que fueron negativas
                    }else if(this.number_pip<0 && user.Month_Actual_Number==this.month_current){
                  
                      this.pip_negative.push(user);
                 
                    }//fin del else if 

                    else{

                      }//fin del else
 
                  }//fin del for 

                   this.cant_pip_positive=this.pip_positive.length;
                   this.cant_pip_negative=this.pip_negative.length;

                   console.log(this.cant_pip_positive);
                   console.log(this.cant_pip_negative);

               });//fin


              
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
