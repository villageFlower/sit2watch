import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NetworkInterface } from '@ionic-native/network-interface/ngx';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(
    public alertController: AlertController,
    private firestore: AngularFirestore,
    public loading: LoadingController,
    private Http: HttpClient,
    private networkInterface: NetworkInterface,
    public toastController: ToastController,
    private router : Router
    
    ) {
      
    }
    


    private loader: HTMLIonLoadingElement;
    private loaderLoading = false;



    async presentToast() {
      const toast = await this.toastController.create({
        message: 'Room key copied to clipboard',
        duration: 2000
      });
      toast.present();
    }


    public showLoading(message: string) {
        this.loaderLoading = true;
        this.loading.create({
            message,
            showBackdrop: true
        }).then(load => {
            this.loader = load;
            load.present().then(() => { this.loaderLoading = false; });
        });
    }

    public dismissLoading() {
        const interval = setInterval(() => {
            if (this.loader || !this.loaderLoading) {
                this.loader.dismiss().then(() => { this.loader = null; clearInterval(interval)});
            } else if (!this.loader && !this.loaderLoading) {
                clearInterval(interval);
            }
        }, 500);
    }


    async showCreate() {
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
              this.createRoom(data.room_name)
            }
          }
        ]
      });
  
      await alert.present();
    }

    async showEnter() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Join',
        inputs: [
          {
            name: 'room_key',
            type: 'text',
            placeholder: 'Room Key'
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
            text: 'Enter',
            handler: (data) => {
              console.log(data);
              localStorage.setItem("going_to",data.room_key)
              this.enterRoom(data.room_key)
        this.dismissLoading()
        this.router.navigate(['/tabs/tab3'])
              
            }
          }
        ]
      });
  
      await alert.present();
    }

    makeKey(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
   }

   

    createRoom(name){
      this.showLoading("Creating....")
      let key = this.makeKey(6)
      this.firestore.collection('room')
      .add({
        name: name,
        key: key,
        selected_movie:"https://res.cloudinary.com/dl0qwntge/video/upload/v1614446859/movie/blackWidow_nrzffk.mp4",
        creator: localStorage.getItem("email"),
        viewer:""
      })
      .then(res => {
        console.log(res.id)
        localStorage.setItem("my_room_id",res.id)
        localStorage.setItem("going_to",res.id)
        this.dismissLoading()
        this.router.navigate(['/tabs/movies'])
      })
      .catch(error => console.log(error));
    }

    enterRoom(key){
      this.firestore.collection("room").doc(key).update({viewer:localStorage.getItem("email")})
    }
}
