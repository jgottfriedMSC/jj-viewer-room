import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  constructor() { }
  src: string = "";
  pausedString: string = "Paused";
  paused: boolean = true;
  ytbSrc: string = "https://www.youtube.com/watch?v=Y5SLJde7D0o";
  ngOnInit(): void {
  }

  getNextVideo(): void{
    var iframe = document.getElementById('youtubeVideo')?.setAttribute('src',"https://www.youtube.com/embed/Y5SLJde7D0o");
  }
  videoPaused():void{
    alert("Clicked");
    if(this.paused){
      this.paused = false;
      this.pausedString = "Not Paused";
    }
    else{
      this.paused = true;
      this.pausedString = "Paused";
    }
  }
  

}
