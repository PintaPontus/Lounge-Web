import {Component, Input, Signal} from '@angular/core';

@Component({
  selector: 'app-chat-scroll',
  imports: [],
  templateUrl: './chat-scroll.component.html',
  styleUrl: './chat-scroll.component.scss'
})
export class ChatScrollComponent {
  @Input() messages!: Signal<string[]> | undefined;

}
