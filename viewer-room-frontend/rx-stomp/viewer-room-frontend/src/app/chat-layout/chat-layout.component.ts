import { Component, OnInit } from '@angular/core';
import { Message } from '../message/message.component';


@Component({
  selector: 'app-chat-layout',
  templateUrl: './chat-layout.component.html',
  styleUrls: ['./chat-layout.component.css']
})
export class ChatLayoutComponent implements OnInit {

  message: string = "";
  msgList: Message[] = [];
  userList: User[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }

  sendMessage(): void{
    const msg: Message = {
      username: "",
      message: this.message
    };
  }

  reciceMessages(): void{

  }

  getUser(): void{

  }

  onKey(value: string): void{
    this.message = value;
  }

}
export class User{
  username: string = "";
}