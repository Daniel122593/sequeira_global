import { Injectable } from '@angular/core';
import {AngularFireDatabase } from 'angularfire2/database';
import {FirebaseListObservable } from 'angularfire2/database';
import {Upload} from './upload';
import * as firebase from 'firebase';

@Injectable()
export class UploadRService {

 constructor( private db: AngularFireDatabase) { }



private basePath:string = 'ImgReal';
  uploads: FirebaseListObservable<any>;


public pushUpload(upload: Upload, name_photo:string) {
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/`+name_photo).put(upload.file);

  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL
        upload.name = upload.file.name
        this.saveFileData(upload)
      }
    );

  }//fin del metodo pushUpload

  
  // Escribe los detalles de la imagen en la base de datos de firebase
  private saveFileData(upload: Upload) {
    this.db.list(`${this.basePath}/`).push(upload);
  }//fin del metodo



}//fin de la clase