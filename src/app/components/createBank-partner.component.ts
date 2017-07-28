import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ServicesInfo} from '../services/services_info.services';
import {BankPartner} from '../models/bank_partner';
import {User_partner} from '../models/user_partner';
import {GLOBAL} from '../services/global';


@Component ({

   selector:'bank_partner',
   templateUrl:'../views/bank_partner.html',
   providers: [ServicesInfo]

	})


export class CreateBankPartner{

 public bank_partner: BankPartner;
 public user_partner: User_partner;

   constructor( private _services: ServicesInfo, private _route: ActivatedRoute,

        private _router: Router){
     
      this.bank_partner = new BankPartner(0,"","","",0);

 }//fin del constructor
  
  
 onSubmitBankPartner(){
   
   this._services.addBankPartner(this.bank_partner).subscribe(

     response => {
      
       if(response.code==200){
        
          this._router.navigate(['/createBankPartner']);
          location.reload(true);
       }else{

          this._router.navigate(['/createBankPartner']);
          location.reload(true);
       }//fin del else

     }, error =>{
           this._router.navigate(['/createBankPartner']);
           location.reload(true);
          console.log(<any>error);

          

     }//fin del error


   	);


 }//fin del metodo onSubmitBankPartner
 
 ngOnInit(){


   this._services.getInfoPartner().subscribe(
      
      response => {
      
        if(response.code==200){

        	this.user_partner=response.data;
        	console.log(this.user_partner);
        }else{


        }

      },

      error =>{

      	 console.log(<any>error);
      }//fin del error


   	);





 }


}//fin de la clase CreateBankPartner