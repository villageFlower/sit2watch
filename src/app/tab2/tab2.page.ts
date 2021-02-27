import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

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
  studentList = [];
  studentData: MovieData;
  studentForm: FormGroup;

  constructor(
    private firestore: AngularFirestore,
    public alertController: AlertController,
    public fb: FormBuilder
  ) {}

  create_movie(record) {
    return this.firestore.collection(this.collectionName).add(record)
  }

}
