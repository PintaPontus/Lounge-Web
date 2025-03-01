import {Injectable, signal} from '@angular/core';
import {ChatAuth, ChatConnection, ChatMessageReceive, ChatMessageSend} from './interfaces/Chat';
import {Subject} from 'rxjs';
import {environment} from '../environments/environment';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class MessagesService {

    constructor(private authService: AuthService) {
    }

    async connect(path: string, recipient: number) {
        return new Promise<ChatConnection>((resolve, reject) => {
            const socketConnection = new WebSocket(`${environment.apiUrl}/${path}`);

            socketConnection.onopen = () => {
                const send = new Subject<ChatMessageSend>();
                const listen = signal<ChatMessageReceive[]>([]);

                socketConnection.send(JSON.stringify({
                    authToken: this.authService.getAuthToken(),
                    recipient: recipient
                } as ChatAuth));

                send.subscribe(m => {
                    console.log(`SENDING MESSAGE: ${JSON.stringify(m)}`);
                    socketConnection.send(JSON.stringify(m));
                });

                socketConnection.addEventListener('message', (event) => {
                    console.log(`NEW MESSAGE:`);
                    let message: ChatMessageReceive;
                    try {
                        message = JSON.parse(event.data);
                    } catch (e) {
                        message = {
                            sender: 0,
                            content: event.data,
                            date: new Date(),
                        }
                    }
                    message.date = new Date(message.date)
                    message.content = `ESTERNO: ${message.content}`;
                    listen.update(l => [...l, message]);
                    console.log(listen());
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


