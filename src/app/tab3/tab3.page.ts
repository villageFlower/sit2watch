import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import * as PluginsLibrary from '@jeepq/capacitor';
import { AngularFireStorage } from '@angular/fire/storage';
<<<<<<< HEAD
=======
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
>>>>>>> 0c9426d8e54d3a199e72f92d09dda95314749f8c
const { CapacitorVideoPlayer, Device } = Plugins;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  videoPlayer: any;
<<<<<<< HEAD

  constructor(
    private storage : AngularFireStorage,
  ) {}

=======
  room=null;
  room_id = localStorage.getItem("going_to");
  movie = null;
  myTime= 0;
  status= null;

  constructor(
    private storage : AngularFireStorage,
    private firestore: AngularFirestore,
    public loading: LoadingController,
    private Http: HttpClient,
  ) {

  }
  ngOnInit(){
    this.firestore
    .collection("room")
    .doc(this.room_id)
    .valueChanges()
    .pipe(take(1))
    .subscribe(data=>{
      console.log(data)
      this.room = data
      this.play(this.room.selected_movie)
    })
  }
>>>>>>> 0c9426d8e54d3a199e72f92d09dda95314749f8c

  async ngAfterViewInit() {
    const info = await Device.getInfo();
    if (info.platform === "ios" || info.platform === "android") {
      this.videoPlayer = CapacitorVideoPlayer;
    } else {
      this.videoPlayer = PluginsLibrary.CapacitorVideoPlayer
    }
<<<<<<< HEAD
  }
  async play() {
    
    this.videoPlayer = PluginsLibrary.CapacitorVideoPlayer
    
    document.addEventListener('jeepCapVideoPlayerPlay', (e: CustomEvent) => { console.log('Event jeepCapVideoPlayerPlay ', e.detail) }, false);
    document.addEventListener('jeepCapVideoPlayerPause', (e: CustomEvent) => { console.log('Event jeepCapVideoPlayerPause ', e.detail) }, false);
    document.addEventListener('jeepCapVideoPlayerEnded', (e: CustomEvent) => { console.log('Event jeepCapVideoPlayerEnded ', e.detail) }, false);
    
    const res: any = await this.videoPlayer.initPlayer({mode: "embedded", url: "https://res.cloudinary.com/dl0qwntge/video/upload/v1614446859/movie/blackWidow_nrzffk.mp4", playerId: "fullscreen" });
    console.log("asdasv")
  }

  async play1() {
    this.storage.ref("public/marvel/blackWidow.mp4").getDownloadURL().subscribe(data => {
      console.log(data)
    })
=======
    this.firestore
    .collection("room")
    .doc(this.room_id)
    .valueChanges()
    .subscribe(data=>{
      console.log(data)
      this.room = data
      if(this.room.start != this.status){
        if(this.room.start){this.autoPlay()}
        else{this.autoPause()}
      }
      if(this.room.start_time != this.myTime){
        this.videoPlayer.setCurrentTime({playerId: "player", seektime: this.room.start_time})
      }
      
    })
    
  }


  async update(field) {
    return await this.firestore.collection("room").doc(this.room_id).update(field)
  }



  async play(url) {
    
    this.videoPlayer = PluginsLibrary.CapacitorVideoPlayer
    
    document.addEventListener('jeepCapVideoPlayerPlay', (e: CustomEvent) => { console.log('Event jeepCapVideoPlayerPlay ', e.detail);this.myTime=e.detail.currentTime;this.update({start_time:e.detail.currentTime,start:true}) }, false);
    document.addEventListener('jeepCapVideoPlayerPause', (e: CustomEvent) => { console.log('Event jeepCapVideoPlayerPause ', e.detail);this.myTime=e.detail.currentTime;this.update({start_time:e.detail.currentTime,start:false}) }, false);
    document.addEventListener('jeepCapVideoPlayerEnded', (e: CustomEvent) => { console.log('Event jeepCapVideoPlayerEnded ', e.detail) }, false);
    
    const res: any = await this.videoPlayer.initPlayer({mode: "embedded", url: url, playerId: "player", width:1200, height:600 });
  }

  async setTime(){
    const res: any = await this.videoPlayer.setCurrentTime({playerId: "player", seektime: this.room.start_time})
  }

  async autoPlay(){
    this.status = true
    const res: any = await this.videoPlayer.play({playerId: "player"})
  }

  async autoPause(){
    this.status = false
    const res: any = await this.videoPlayer.pause({playerId: "player"})
  }

  async play1() {
    console.log(this.room)
>>>>>>> 0c9426d8e54d3a199e72f92d09dda95314749f8c
  }
}
