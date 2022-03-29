import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

  constructor() { }
  queue: any[] = [
    "https://www.youtube.com/embed/IQK7Owcrh4",
    "https://www.youtube.com/embed/IQK7Owcrh4"];
  ngOnInit(): void {
    this.loadQueue();
  }

  loadQueue():void {
    this.queue = [
      "https://www.youtube.com/embed/IQK7Owcrh4",
      "https://www.youtube.com/embed/IQK7Owcrh4"];
  }

}
