import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private firestore: AngularFirestore) { }

  getAllMovies() {
    return this.firestore.collection('movie_list').valueChanges({idField: 'id'});
  }

  getUser(email) {
    return this.firestore.collection('user').doc(email).valueChanges();
  }
}
