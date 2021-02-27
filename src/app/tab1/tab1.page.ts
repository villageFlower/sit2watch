import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    public alertController: AlertController,
    private firestore: AngularFirestore,
    public loadingController: LoadingController,
    private Http: HttpClient,
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
