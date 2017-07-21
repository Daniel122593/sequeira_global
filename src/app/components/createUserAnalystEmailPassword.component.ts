import { Component } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'user_analyst_email_password',
  templateUrl: "../views/user_analyst_email_password.html"
})

export class CreateUserAnalystEmailPassword{

email:string;
password:string;

constructor(private activatedRoute: ActivatedRoute, public authService:AuthService){

}//fin del metodo

//metodo para crear usuarios analistas de la applicacion
signup(){

this.authService.signup(this.email, this.password);
this.email=this.password = '';

}//fin del metodo singup


}//fin de la clase CreateUserAnalystEmailPassword
