import {Subject} from 'rxjs';
import {WritableSignal} from '@angular/core';

export interface ChatConnection {
    messages: WritableSignal<ChatMessageReceive[]>;
    send: Subject<ChatMessageSend>;
}

export interface ChatAuth {
    authToken: string;
    recipient: number;
}

export interface ChatMessageSend {
    content: string;
}

export interface ChatMessageReceive {
    sender: number;
    content: string;
    date: Date;
}
