import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../core/services/chat.service';
import {StompService} from 'ng2-stomp-service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(
    // private chatService: ChatService,
    private stompService: StompService;
  ) { }

  ngOnInit() {
  }

}
