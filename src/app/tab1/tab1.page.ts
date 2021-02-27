import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import { ToastController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    public alertController: AlertController,
    private firestore: AngularFirestore,
    private firebaseAuthentication: AngularFireAuth,
    public toastController: ToastController,
    private router: Router,
    private firestorage: AngularFireStorage,
    public loadingController: LoadingController,
    private Http: HttpClient,
    private sanitizer: DomSanitizer,
    ) {}

    async presentAlertPrompt() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Create Room',
        inputs: [
          {
            name: 'room_name',
            type: 'text',
            placeholder: 'Name of your room'
          },

        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Create',
            handler: (data) => {
              console.log(data);
            }
          }
        ]
      });
  
      await alert.present();
    }

}
