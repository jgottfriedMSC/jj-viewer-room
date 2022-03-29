import { Component, OnInit, ViewChild } from '@angular/core';
import { YouTubePlayer, YouTubePlayerModule } from '@angular/youtube-player';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  constructor() { }
  src: string = "GYAB4Td62zI";
  text:string = "Test";
  input:string = "";
  @ViewChild(YouTubePlayer) youtubePlayer!: YouTubePlayer ;
  ngOnInit(): void {
  }
  onStateChange(event: YT.OnStateChangeEvent): void {
    if (event.data === YT.PlayerState.CUED) {
    
    }
    else if(event.data == YT.PlayerState.PAUSED){
      this.pause();
    }
    else if(event.data == YT.PlayerState.PLAYING){
      
    }
    else if(event.data == YT.PlayerState.ENDED){
      
    }
    else if(event.data == YT.PlayerState.UNSTARTED){

    }
    else if(event.data == YT.PlayerState.BUFFERING){
      
    }
  }
  onReady(event: YT.PlayerEvent): void {
    event.target.playVideo();
  }
  onKey(value: string) {
    this.input = value;
  }
  getNextVideo(): void{
    this.src = this.input;
  }
  pause(): void{
    this.text = "Erfolgreich";
  }

}
