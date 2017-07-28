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


@Injectable()
export class ServicesInfo{

public url:string;


constructor(

public _http: Http

	){

 this.url = GLOBAL.url;

	}


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
 
/*
getProductos(){
 //return "TEXTO DESDE EL SERVICIO";

 //con el return se hace el llamado de la peticion
 return this._http.get(this.url+'productos').map(res =>res.json());

}
*/



/*
addProducto(producto: Producto){
		let json = JSON.stringify(producto);
		let params = 'json='+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'productos', params, {headers: headers})
						 .map(res => res.json());
	}
*/



/*
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

*/


}//fin de la clase



