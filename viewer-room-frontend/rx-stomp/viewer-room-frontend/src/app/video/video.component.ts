import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { RxStompService } from '../rx-stomp.service';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit, OnDestroy {

  constructor(private rxStompService: RxStompService) { }

  receivedMessage: string[] = [];
  src: string = "wTziIhu8yvU";
  newSrc:string = "";
  newTitle:string  = "";
  title:string = "";
  videos: Video[] = [];
  getVid: Boolean = false;
  message: string = "";
  @ViewChild(YouTubePlayer) youtubePlayer!: YouTubePlayer ;

    // @ts-ignore, to suppress warning related to being undefined
  private subscription: Subscription;

  onSendMessage() {
    const message = this.message;
    this.rxStompService.publish({ destination: '/topic/operations', body: message });
  }
  
  ngOnInit(): void {
    this.subscription = this.rxStompService
      .watch('/topic/operations')
      .subscribe((message: Message) => {
        this.receivedMessage.push(message.body);
        console.log(message.body);
        
        this.readMessage();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onStateChange(event: YT.OnStateChangeEvent): void {
    if (event.data === YT.PlayerState.CUED) {
      const message = "pause";
      this.message = message;
      this.onSendMessage();
    }
    else if(event.data == YT.PlayerState.PAUSED){
      const message = "pause";
      this.message = message;
      this.onSendMessage();
    }
    else if(event.data == YT.PlayerState.PLAYING){
      const message = "play";
      this.message = message;
      this.onSendMessage();
    }
    else if(event.data == YT.PlayerState.ENDED){
      const message = this.src;
      this.message = message;
      this.onSendMessage();
    }
    else if(event.data == YT.PlayerState.UNSTARTED){
      const message = "pause";
      this.message = message;
      this.onSendMessage();
    }
    else if(event.data == YT.PlayerState.BUFFERING){
      const time = this.youtubePlayer.getCurrentTime();
      const message = "time" + time;
      this.message = message;
      this.onSendMessage();
    }
  }

  onReady(event: YT.PlayerEvent): void {
    const message = "play";
    this.message = message;
    this.onSendMessage();
  }

  onKey(value: string) {
    this.newSrc = value;
  }
  
  titleKey(title :string){
    this.newTitle = title;
  }

  getNextVideo(): void{
    //this.src = "VFbaGT47RTw";
    let maxLikes = 0;
    let id = 0;
    for(let video of this.videos){
      if(video.likes > maxLikes){
        maxLikes = video.likes;
        id = video.id;
      }
    }
    
    let video = this.videos.find(x => x.id == id);

    if(video != null){
      this.getVid = true;
      this.title = video.title.valueOf().toString();
      this.src = video.src.valueOf().toString();
      console.log(video.title);
      console.log(video.src);
    }

    const message = this.src;
    this.message = message;
    this.onSendMessage();
  }

  addToQueu(newTitle: string, newSrc: string){
    if(newTitle == "" || newTitle == null || newSrc =="" || newSrc == null){
      var newVideo = new Video("video title", "wTziIhu8yvU", 0, 0);
    }
    else{
      var newVideo = new Video(newTitle, newSrc, 0, 0);
    }
    let videoCount = this.videos.length;
    newVideo.id = videoCount;
    this.videos.push(newVideo);
    const message = "addVideo" + newVideo.src + newVideo.title;
    console.log(message);
    this.message = message;
    this.onSendMessage();
  }

  likeVideo(id: number): void{
    var video = this.videos.find(x => x.id == id);
    video!.likes += 1;
    const message  = "like" + id;
    this.message = message;
    this.onSendMessage();
  }
  dislikeVideo(id: number): void{
    var video = this.videos.find(x => x.id == id);
    video!.likes -= 1;
    const message  = "dislike" + id;
    this.message = message;
    this.onSendMessage();
  }
  deleteVideo(id: number):void{
    this.videos.splice(id, 1);
    const message  = "delete" + id;
    this.message = message;
    this.onSendMessage();
  }

  readMessage(): void{
    var length = this.receivedMessage.length - 1;
    console.log("readMessage   " + this.receivedMessage.length);
    if(this.receivedMessage[length] == "play"){
      this.youtubePlayer.playVideo();
    }
    else if(this.receivedMessage[length] == "pause"){
      this.youtubePlayer.pauseVideo();
    }
    else if(this.receivedMessage[length].includes("like")){
      const id =  this.receivedMessage[length].slice(4);
      this.likeVideo(parseInt(id));
    }
    else if(this.receivedMessage[length].includes("dislike")){
      const id =  this.receivedMessage[length].slice(7);
      this.dislikeVideo(parseInt(id));
    }
    else if(this.receivedMessage[length].includes("delete")){
      const id =  this.receivedMessage[length].slice(6);
      this.deleteVideo(parseInt(id));
    }
    else if(this.receivedMessage[length].includes("addVideo")){
      const src =  this.receivedMessage[length].substring(7,18);
      const title = this.receivedMessage[length].substring(19, this.receivedMessage.length);
      this.addToQueu(title, src);
    }else if(this.receivedMessage[length].includes("time")){
      const time = this.receivedMessage[length].slice(4);
      this.youtubePlayer!.seekTo(Number.parseInt(time), true);
    }
    else{
      this.src = this.receivedMessage[length];
    }
  }
}

class Video {
  title: string = "";
  src: string = "";
  id: number = 0;
  likes: number = 0;
  
  constructor(title: string, src: string, id: number, likes: number){
    this.title = title;
    this.src = src;
    this.id = id;
    this.likes = likes;
  }
}