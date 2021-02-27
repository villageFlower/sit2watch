<<<<<<< HEAD
import { Component } from '@angular/core';
=======
import { Component, OnInit, Input, NgZone } from '@angular/core';
>>>>>>> 0c9426d8e54d3a199e72f92d09dda95314749f8c
import { AngularFirestore,} from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
<<<<<<< HEAD

interface MovieData {
  Title: string;
  Path: string;
  Poster: string;
  UserEmail: string
}

=======
import { Cloudinary } from '@cloudinary/angular-5.x';
import { HttpClient,HttpHeaders, HttpClientJsonpModule } from '@angular/common/http';


interface MovieData {
  Title: string;
  Poster: string;
}


>>>>>>> 0c9426d8e54d3a199e72f92d09dda95314749f8c
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
<<<<<<< HEAD
    private afStorage: AngularFireStorage
=======
    private afStorage: AngularFireStorage,
>>>>>>> 0c9426d8e54d3a199e72f92d09dda95314749f8c
  ) {
    this.movieData = {} as MovieData;
  }

<<<<<<< HEAD
  ngOnInit() {
    this.movieForm = this.fb.group({
      Title: ['', [Validators.required]],
      Poster: ['', [Validators.required]],
      Path: ['', [Validators.required]],
      UserEmail: ['', [Validators.required]]
    })
  }
=======
  public resultPost:any="";

  ngOnInit() {
    this.movieForm = this.fb.group({
      Title: ['', [Validators.required]],
      Poster: ['', [Validators.required]]
    })
    
  }
  
>>>>>>> 0c9426d8e54d3a199e72f92d09dda95314749f8c

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
<<<<<<< HEAD
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
  }
  
=======
    var link = '';
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
  }

  getPosterUrl(id) {
    return this.afStorage.ref(id).getDownloadURL()
  }
>>>>>>> 0c9426d8e54d3a199e72f92d09dda95314749f8c

}
