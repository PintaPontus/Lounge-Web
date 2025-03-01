import {Component, OnInit, signal} from '@angular/core';
import {MessagesService} from '../messages.service';
import {ChatConnection, ChatMessageReceive, ChatMessageSend} from '../interfaces/Chat';
import {ChatInputComponent} from '../chat-input/chat-input.component';
import {ChatHeaderComponent} from '../chat-header/chat-header.component';
import {ChatScrollComponent} from '../chat-scroll/chat-scroll.component';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../auth.service';

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

  constructor(
    private authService: AuthService,
    private socketService: MessagesService,
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
      let lastMessages = await this.socketService.fetch(id, 0, 10);
      this.connection = await this.socketService.connect(id, lastMessages);
  }

  send(content: string) {
      this.connection?.messages.update(l => [...l, {
          sender: this.authService.getUserId(),
          content: content,
          date: new Date(),
      } as ChatMessageReceive]);
      this.connection?.send.next({
          content: content
      } as ChatMessageSend);
  }
}
