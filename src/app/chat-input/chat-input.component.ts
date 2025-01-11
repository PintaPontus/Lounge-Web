import {Component, output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-chat-input',
  imports: [
    FormsModule
  ],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss'
})
export class ChatInputComponent {
  message = '';
  send = output<string>();


  onEnter() {
    this.send.emit(this.message);
    this.message = ''
  }
}
