import { Injectable } from '@angular/core'; //necesario para los clientes 
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Signal} from '../models/signal';
import { GLOBAL } from './global';


@Injectable()
export class ServicesInfo{

public url:string;


constructor(

public _http: Http

	){

 this.url = GLOBAL.url;

	}


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



