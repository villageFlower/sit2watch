import { Component, OnInit, Input, NgZone } from '@angular/core';
import { AngularFirestore,} from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpClient,HttpHeaders, HttpClientJsonpModule } from '@angular/common/http';


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

  constructor(
    private firestore: AngularFirestore,
    public alertController: AlertController,
    public fb: FormBuilder,
    private afStorage: AngularFireStorage,
  ) {
    this.movieData = {} as MovieData;
  }

  public resultPost:any="";

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

  upload(event) {
    var link = '';
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
  }

  getPosterUrl(id) {
    return this.afStorage.ref(id).getDownloadURL()
  }

}
