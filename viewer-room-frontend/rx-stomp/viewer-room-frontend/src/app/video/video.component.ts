import { Component, OnInit, ViewChild } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { RxStompService } from '../rx-stomp.service';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  constructor(private rxStompService: RxStompService) { }

  receivedMessages: string[] = [];
  src: string = "GYAB4Td62zI";
  text:string = "Test";
  input:string = "";
  @ViewChild(YouTubePlayer) youtubePlayer!: YouTubePlayer ;

    // @ts-ignore, to suppress warning related to being undefined
  private subscription: Subscription;

  ngOnInit(): void {
    this.subscription = this.rxStompService
      .watch('/topic/demo')
      .subscribe((message: Message) => {
        this.receivedMessages[0] = message.body;
      });
  }
  onStateChange(event: YT.OnStateChangeEvent): void {
    if (event.data === YT.PlayerState.CUED) {
      this.readMessage(this.receivedMessages[0]);
    }
    else if(event.data == YT.PlayerState.PAUSED){
      this.youtubePlayer.playVideo();
    }
    else if(event.data == YT.PlayerState.PLAYING){
      this.youtubePlayer.playVideo();
    }
    else if(event.data == YT.PlayerState.ENDED){
      this.youtubePlayer.playVideo();
    }
    else if(event.data == YT.PlayerState.UNSTARTED){
      this.youtubePlayer.playVideo();
    }
    else if(event.data == YT.PlayerState.BUFFERING){
      this.youtubePlayer.playVideo();
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

  readMessage(message: string): void{
    if(message == "Play"){
      this.youtubePlayer.playVideo();
    }
    else if(message == "Pause"){
      this.youtubePlayer.pauseVideo();
    }
    else if(message == "Skipped"){
      
    }
  }
}
