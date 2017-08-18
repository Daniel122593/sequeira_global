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

}//fin de la clase CreateUserAnalystEmailPassword
