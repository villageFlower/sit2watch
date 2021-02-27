import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import * as PluginsLibrary from '@jeepq/capacitor';
import { AngularFireStorage } from '@angular/fire/storage';
const { CapacitorVideoPlayer, Device } = Plugins;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  videoPlayer: any;

  constructor(
    private storage : AngularFireStorage,
  ) {}


  async ngAfterViewInit() {
    const info = await Device.getInfo();
    if (info.platform === "ios" || info.platform === "android") {
      this.videoPlayer = CapacitorVideoPlayer;
    } else {
      this.videoPlayer = PluginsLibrary.CapacitorVideoPlayer
    }
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
  }
}
