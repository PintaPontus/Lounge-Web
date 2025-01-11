import {Injectable, signal} from '@angular/core';
import {ChatConnection} from './interfaces/ChatConnection';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private serverPath = 'http://localhost:8080/';

  constructor() {
  }

  async connect(path: string) {
    return new Promise<ChatConnection>((resolve, reject) => {
      const socketConnection = new WebSocket(this.serverPath + path);

      socketConnection.onopen = function () {
        const send = new Subject<string>();
        const listen = signal<string[]>([]);

        send.subscribe(m => {
          console.log(`SENDING MESSAGE: ${JSON.stringify(m)}`);
          socketConnection.send(m);
        });

        socketConnection.addEventListener('message', (event) => {
          console.log(`NEW MESSAGE: ${JSON.stringify(event.data)}`);
          listen.update(l => [...l, event.data]);
        })

        resolve({
          messages: listen,
          send: send,
        } as ChatConnection);
      };

      socketConnection.onerror = function (err) {
        reject(err);
      };

    });
  }

}


