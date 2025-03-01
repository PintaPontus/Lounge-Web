import {Component} from '@angular/core';
import {ChatItemComponent} from '../chat-item/chat-item.component';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'app-chat-list',
    imports: [
        ChatItemComponent,
        RouterLink
    ],
    templateUrl: './chat-list.component.html',
    styleUrl: './chat-list.component.scss'
})
export class ChatListComponent {

}
