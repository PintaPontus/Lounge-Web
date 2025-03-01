import {Component} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
    selector: 'app-chat-item',
    imports: [
        NgOptimizedImage
    ],
    templateUrl: './chat-item.component.html',
    styleUrl: './chat-item.component.scss'
})
export class ChatItemComponent {

}
