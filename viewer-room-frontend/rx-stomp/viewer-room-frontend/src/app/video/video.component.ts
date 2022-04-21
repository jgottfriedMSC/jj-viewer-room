import { Component, OnInit, ViewChild } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { RxStompService } from '../rx-stomp.service';
import { Message } from '@stomp/stompjs';
import { max, Subscription } from 'rxjs';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  constructor(private rxStompService: RxStompService) { }

  receivedMessage: string = "";
  src: string = "wTziIhu8yvU";
  newSrc:string = "";
  newTitle:string  = "";
  title:string = "";
  videos: Video[] = [];
  getVid: Boolean = false;
  @ViewChild(YouTubePlayer) youtubePlayer!: YouTubePlayer ;

    // @ts-ignore, to suppress warning related to being undefined
  private subscription: Subscription;

  ngOnInit(): void {
    this.subscription = this.rxStompService
      .watch('/topic/demo')
      .subscribe((message: Message) => {
        this.receivedMessage = message.body;
      });
  }
  onStateChange(event: YT.OnStateChangeEvent): void {
    if (event.data === YT.PlayerState.CUED) {
      const message = "pause";
      this.rxStompService.publish({destination: 'topic/demo', body: message});
    }
    else if(event.data == YT.PlayerState.PAUSED){
      const message = "pause";
      this.rxStompService.publish({destination: 'topic/demo', body: message});
    }
    else if(event.data == YT.PlayerState.PLAYING){
      const message = "play";
      this.rxStompService.publish({destination: 'topic/demo', body: message});
    }
    else if(event.data == YT.PlayerState.ENDED){
      const message = this.src;
      this.rxStompService.publish({destination: 'topic/demo', body: message});
    }
    else if(event.data == YT.PlayerState.UNSTARTED){
      const message = "pause";
      this.rxStompService.publish({destination: 'topic/demo', body: message});
    }
    else if(event.data == YT.PlayerState.BUFFERING){
      const message = "pause";
      this.rxStompService.publish({destination: 'topic/demo', body: message});
    }
  }

  onReady(event: YT.PlayerEvent): void {
    const message = "play";
    this.rxStompService.publish({destination: 'topic/demo', body: message});
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
    this.rxStompService.publish({destination: 'topic/demo', body: message});
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
    const message = "addVideo";
    this.rxStompService.publish({destination: 'topic/demo', body: message});
  }

  likeVideo(id: number): void{
    var video = this.videos.find(x => x.id == id);
    video!.likes += 1;
  }
  dislikeVideo(id: number): void{
    var video = this.videos.find(x => x.id == id);
    video!.likes -= 1;
  }
  deleteVideo(id: number):void{
    this.videos.splice(id, 1);
  }

  readMessage(): void{
    if(this.receivedMessage == "play"){
      this.youtubePlayer.playVideo();
    }
    else if(this.receivedMessage == "pause"){
      this.youtubePlayer.pauseVideo();
    }
    else if(this.receivedMessage.includes("like")){
      const id =  this.receivedMessage.slice(4);
      this.likeVideo(parseInt(id));
    }
    else if(this.receivedMessage.includes("dislike")){
      const id =  this.receivedMessage.slice(7);
      this.dislikeVideo(parseInt(id));
    }
    else if(this.receivedMessage.includes("delete")){
      const id =  this.receivedMessage.slice(6);
      this.deleteVideo(parseInt(id));
    }
    else if(this.receivedMessage.includes("addVideo")){
      const src =  this.receivedMessage.slice(8);
      const title = this.receivedMessage.slice(8);
      this.addToQueu(title, src);
    }
    else{
      this.src = this.receivedMessage;
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