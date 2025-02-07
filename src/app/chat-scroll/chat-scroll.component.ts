import {Component, Input, Signal} from '@angular/core';
import {ChatMessage} from '../interfaces/Chat';
import {NgClass} from '@angular/common';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-chat-scroll',
  imports: [
    NgClass
  ],
  templateUrl: './chat-scroll.component.html',
  styleUrl: './chat-scroll.component.scss'
})
export class ChatScrollComponent {
  @Input() messages!: Signal<ChatMessage[]> | undefined;

  constructor(private authService: AuthService) {
  }

  isMe(sender: number) {
    return this.authService.getUserId() === sender;
  }
}
