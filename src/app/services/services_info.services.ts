import { Injectable } from '@angular/core'; //necesario para los clientes 
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Signal} from '../models/signal';
import {User_partner} from '../models/user_partner';
import {User_administrative} from '../models/user_administrative';
import {UserAnalyst} from '../models/user_analyst';
import {BankPartner} from '../models/bank_partner';
import { GLOBAL } from './global';
import {UserClient} from '../models/user_client';


@Injectable()
export class ServicesInfo{

public url:string;
public info=[];

constructor(

public _http: Http

	){

 this.url = GLOBAL.url;

	}//fin del constructor


 //metodo para obtener a todos los usuarios administradores
  getUserAdministrative(){

    return this._http.get(this.url+'user_administrative').map(res =>res.json());

   }//fin del metodo getSignal



//metodo para agregar las señales
addSignal(signal:Signal){
 let json = JSON.stringify(signal);
 let params = 'json='+json;
 let headers = new Headers ({'Content-Type':'application/x-www-form-urlencoded'});
 
 return this._http.post(this.url+'signal', params, {headers: headers})
                   .map(res => res.json()); 

}//fin del metodo addSignal


//metodo para mostrar todos los datos de la señal del dia
getSignal(){

return this._http.get(this.url+'signal').map(res =>res.json());

}//fin del metodo getSignal



//metodo para mostrar todos los datos de la señal del dia
getSignalMonth(){

return this._http.get(this.url+'signalMonth').map(res =>res.json());

}//fin del metodo getSignal

getGlobalTime(){

return this._http.get(this.url+'hour').map(res =>res.json());

}//fin del metodo getSignal


//metodo para mostrar todos los datos de la señal del dia
getSignalAll(){

return this._http.get(this.url+'signalAll').map(res =>res.json());

}//fin del metodo getSignal


//muestra el detalle de una señal en especifico
getSignalDetail(id){
  
  return this._http.get(this.url+'signal/'+id).map(res =>res.json());

}//fin del metodo getSignal

//muestra el detalle de una señal en especifico que se encuentra cerrada
getSignalDetailClose(id){
  
  return this._http.get(this.url+'signalClose/'+id).map(res =>res.json());

}//fin del metodo getSignal

//metodo para modificar una señal
editSignal(id, signal:Signal){
 
 let json= JSON.stringify(signal); 
 let params = "json="+json;
 let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

 return this._http.post(this.url+'signal-update/'+id, params, {headers: headers})
                                   .map(res =>res.json());

}//fin del metodo

//metodo para eliminar productos
deleteSignal(id){
  
  return this._http.get(this.url+'delete-signal/'+id)
                       .map(res => res.json());

}//fin del metodo 


//codigo para guardar la imagen 
makeFileRequest(url: string, params: Array<string>, files: Array<File>){

 return new Promise((resolve, reject) =>{

       var formData : any = new FormData();

       var xhr = new XMLHttpRequest();

       for(var i=0; i< files.length; i++){


             formData.append('uploads[]', files[i], files[i].name);
       }

       xhr.onreadystatechange = function(){

      if(xhr.readyState==4){

            if(xhr.status==200){

             resolve(JSON.parse(xhr.response));
          
            }else{
            
             reject(xhr.response);
            }
      

      }

       };
     
      xhr.open("POST", url, true);
      xhr.send(formData);

 });

}


//metodo para agregar las señales
addUserPartner(user_partner:User_partner){
 let json = JSON.stringify(user_partner);
 let params = 'json='+json;
 let headers = new Headers ({'Content-Type':'application/x-www-form-urlencoded'});
 
 return this._http.post(this.url+'user_partner', params, {headers: headers})
                   .map(res => res.json()); 


}//fin del metodo addSignal


//metodo para el id y nombre de los socios preferentes
getInfoPartner(){

 return this._http.get(this.url+'user_partner_simple').map(res =>res.json());

}//fin del metodo getSignal
   

//metodo para agregar las señales
addBankPartner(bank_partner:BankPartner){
 let json = JSON.stringify(bank_partner);
 let params = 'json='+json;
 let headers = new Headers ({'Content-Type':'application/x-www-form-urlencoded'});
 
 return this._http.post(this.url+'bank_partner', params, {headers: headers})
                   .map(res => res.json()); 


}//fin del metodo addSignal
 


addUserAdministrative(user_administrative:User_administrative){
 let json = JSON.stringify(user_administrative);
 let params = 'json='+json;
 let headers = new Headers ({'Content-Type':'application/x-www-form-urlencoded'});
 
 return this._http.post(this.url+'user_administrative', params, {headers: headers})
                   .map(res => res.json()); 


}//fin del metodo addSignal

//muestra el detalle de un usuario administrativo en especifico
getUserAdministrativeDetail(id){
  
  return this._http.get(this.url+'user_administrative/'+id).map(res =>res.json());

}//fin del metodo getSignal


//metodo para modificar un usuario administrativo
updateUserAdministrative(id, user_administrative:User_administrative){
 
 let json= JSON.stringify(user_administrative); 
 let params = "json="+json;
 let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

 return this._http.post(this.url+'userAdministrative-update/'+id, params, {headers: headers})
                                   .map(res =>res.json());

}//fin del metodo

addUserAnalyst(user_analyst:UserAnalyst){
 let json = JSON.stringify(user_analyst);
 let params = 'json='+json;
 let headers = new Headers ({'Content-Type':'application/x-www-form-urlencoded'});
 
 return this._http.post(this.url+'user_analyst', params, {headers: headers})
                   .map(res => res.json()); 


}//fin del metodo addSignal





 //metodo para obtener a todos los usuarios administradores
  getUserAnalyst(){

    return this._http.get(this.url+'user_analyst').map(res =>res.json());

   }//fin del metodo getUserAnalyst


   //muestra el detalle de un usuario administrativo en especifico
getUserAnalystDetail(id){
  
  return this._http.get(this.url+'user_analyst/'+id).map(res =>res.json());

}//fin del metodo getSignal


//metodo para modificar un usuario administrativo
updateUserAnalyst(id, user_analyst:UserAnalyst){
 
 let json= JSON.stringify(user_analyst); 
 let params = "json="+json;
 let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

 return this._http.post(this.url+'userAnalyst-update/'+id, params, {headers: headers})
                                   .map(res =>res.json());

}//fin del metodo


//metodo para el id y nombre de los usuarios analistas
getInfoAnalyst(){

 return this._http.get(this.url+'user_analyst_simple').map(res =>res.json());

}//fin del metodo getInfoAnalyst

getNameAnalyst(id){

 return this._http.get(this.url+'user_analyst_name/'+id).map(res =>res.json());

}//fin del metodo getInfoAnalyst



//metodo para mostrar todos los datos de la señal del dia
getUserPartner(){

return this._http.get(this.url+'user_partner').map(res =>res.json());

}//fin del metodo getSignal

 

//muestra el detalle de un usuario preferente especifico
getUserPartnerDetail(id){
  
  return this._http.get(this.url+'user_partner/'+id).map(res =>res.json());

}//fin del metodo getSignal


//metodo para modificar un usuario preferente especifico
updateUserPartner(id, user_partner:User_partner){
 
 let json= JSON.stringify(user_partner); 
 let params = "json="+json;
 let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

 return this._http.post(this.url+'user_partner-update/'+id, params, {headers: headers})
                                   .map(res =>res.json());

}//fin del metodo


//metodo para agregar usuarios clientes
addUserClient(user_client:UserClient[]){
 let json = JSON.stringify(user_client);
 let params = 'json='+json;
 let headers = new Headers ({'Content-Type':'application/x-www-form-urlencoded'});
 
 return this._http.post(this.url+'user_client', params, {headers: headers})
                   .map(res => res.json()); 


}//fin del metodo addUserClient


//metodo para obtener a todos los usuarios clientes
getUserClient(){

 return this._http.get(this.url+'user_client').map(res =>res.json());

}//fin del metodo getSignal


//muestra el detalle de un cliente en especifico
getClientDetail(id){
  
  return this._http.get(this.url+'user_client/'+id).map(res =>res.json());

}//fin del metodo getClientDetail


//metodo para obtener todos los datos para firebase
  getInfo(){

    return this._http.get(this.url+'info').map(res =>res.json());

 }//fin del metodo getInfo


//metodo que modifica el estado de la los registros de info
updateState(this,info=[]){
  
 let json= JSON.stringify(info); 
 let params = "json="+json;
 let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

 return this._http.post(this.url+'update-info', params, {headers: headers})
                                   .map(res =>res.json());


}//fin del metodo updateState



}//fin de la clase



