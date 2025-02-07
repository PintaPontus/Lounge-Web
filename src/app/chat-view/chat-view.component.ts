import {Component, OnInit, signal} from '@angular/core';
import {MessagesService} from '../messages.service';
import {ChatConnection} from '../interfaces/Chat';
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
    this.connection = await this.socketService.connect(`messages`, id);
  }

  send(content: string) {
    let newMessage = {
      sender: this.authService.getUserId(),
      content: content
    }
    this.connection?.messages.update(l => [...l, newMessage]);
    this.connection?.send.next(newMessage);
  }
}
