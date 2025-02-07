import {Subject} from 'rxjs';
import {WritableSignal} from '@angular/core';

export interface ChatConnection {
  messages: WritableSignal<ChatMessage[]>;
  send: Subject<ChatMessage>;
}

export interface ChatAuth {
  authToken: string;
  recipient: number;
}

export interface ChatMessage {
  sender: number;
  content: string;
}
