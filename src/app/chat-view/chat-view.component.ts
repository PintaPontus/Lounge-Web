import {Component, OnInit, signal} from '@angular/core';
import {SocketService} from '../socket.service';
import {ChatConnection} from '../interfaces/ChatConnection';
import {ChatInputComponent} from '../chat-input/chat-input.component';
import {ChatHeaderComponent} from '../chat-header/chat-header.component';
import {ChatScrollComponent} from '../chat-scroll/chat-scroll.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-chat-view',
  imports: [
    ChatInputComponent,
    ChatHeaderComponent,
    ChatScrollComponent
  ],
  templateUrl: './chat-view.component.html',
  styleUrl: './chat-view.component.scss'
})
export class ChatViewComponent implements OnInit {
  connection: ChatConnection | undefined;
  selectedId = signal(0);

  private testMessages = [
    "PRIMO",
    "SECONDO",
    "TERZO",
    "QUARTO",
    "QUINTO",
    "SESTO",
    "SETTIMO"
  ]

  constructor(
    private socketService: SocketService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const chatId = Number(params.get('id'));
      this.selectedId.set(chatId);
      this.startConnection(chatId);
    });
  }

  async startConnection(id: number) {
    this.connection = await this.socketService.connect(`ws/${id}`);
    this.testMessages.forEach(m => {
      this.send(m);
    })
  }

  send(message: string) {
    this.connection?.messages.update(l => [...l, message]);
    this.connection?.send.next(message);
  }
}
