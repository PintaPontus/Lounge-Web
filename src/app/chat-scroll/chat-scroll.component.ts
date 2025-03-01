import {Component, Input, Signal} from '@angular/core';
import {NgClass} from '@angular/common';
import {AuthService} from '../auth.service';
import {ChatMessageReceive} from '../interfaces/Chat';

@Component({
    selector: 'app-chat-scroll',
    imports: [
        NgClass
    ],
    templateUrl: './chat-scroll.component.html',
    styleUrl: './chat-scroll.component.scss'
})
export class ChatScrollComponent {
    @Input() messages!: Signal<ChatMessageReceive[]> | undefined;

    constructor(private authService: AuthService) {
    }

    isMe(sender: number) {
        return this.authService.getUserId() === sender;
    }
}
