import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() msg: Message = new Message;

  constructor() {
    this.username = this.msg.username;
    this.message = this.msg.message;
   }
  username: string = "";
  message: string = "";
  ngOnInit(): void {
  }

}
export class Message {
  username: string = "";
  message: string = "";
  
}
