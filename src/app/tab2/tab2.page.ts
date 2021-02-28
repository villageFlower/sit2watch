import { Component, OnInit, Input, NgZone } from '@angular/core';
import { AngularFirestore, } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as tf from '@tensorflow/tfjs';
import { HttpClient, HttpHeaders, HttpClientJsonpModule } from '@angular/common/http';
import * as mobilenet from '@tensorflow-models/mobilenet';


interface MovieData {
  Title: string;
  Poster: string;
}


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  collectionName = 'movie';
  movieData: MovieData;
  movieForm: FormGroup;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  uploadState: Observable<string>;
  baseimg= null;
  image;
  prediction

  constructor(
    private firestore: AngularFirestore,
    public alertController: AlertController,
    public fb: FormBuilder,
    private afStorage: AngularFireStorage,
  ) {
    this.movieData = {} as MovieData;
  }

  public resultPost: any = "";

  ngOnInit() {
    this.movieForm = this.fb.group({
      Title: ['', [Validators.required]],
      Poster: ['', [Validators.required]]
    })

  }


  create_movie(record) {
    return this.firestore.collection(this.collectionName).add(record)
  }

  addMovie() {
    console.log(this.movieForm.value);
    this.create_movie(this.movieForm.value).then(resp => {
      this.movieForm.reset();
    })
      .catch(error => {
        console.log(error);
      });
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  


  async upload(event) {
    //var link = '';
    //const id = Math.random().toString(36).substring(2);
    //this.ref = this.afStorage.ref(id);
    //this.task = this.ref.put(event.target.files[0]);
    const model = await tf.loadLayersModel('../assets/model.json');

    var file = event.target.files[0]
    this.getBase64(file).then(
      async data => {
        console.log(data)
        this.baseimg = data
        this.image = await this.load(this.baseimg)
        let tensor = await tf.browser.fromPixels(this.image)
        mobilenet.load().then(model => {
          // Classify the image.
          model.classify(tensor).then(predictions => {
            this.prediction = predictions
          });
        });
      });


  }


  load(url){
    return new Promise((resolve, reject) => {
      const im = new Image()
          im.crossOrigin = 'anonymous'
          im.src =url
          im.onload = () => {
            resolve(im)
          }
     })
  }
  


  getPosterUrl(id) {
    return this.afStorage.ref(id).getDownloadURL()
  }

}
