import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';

interface MovieData {
  Title: string;
  Path: string;
  Poster: string;
  UserEmail: string
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

  constructor(
    private firestore: AngularFirestore,
    public alertController: AlertController,
    public fb: FormBuilder
  ) {
    this.movieData = {} as MovieData;
  }

  ngOnInit() {
    this.movieForm = this.fb.group({
      Title: ['', [Validators.required]],
      Poster: ['', [Validators.required]],
      Path: ['', [Validators.required]],
      UserEmail: ['', [Validators.required]]
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

}
