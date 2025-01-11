import {Subject} from 'rxjs';
import {WritableSignal} from '@angular/core';

export interface ChatConnection {
  messages: WritableSignal<string[]>;
  send: Subject<string>;
}
