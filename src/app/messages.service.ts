import {Injectable, signal} from '@angular/core';
import {ChatAuth, ChatConnection, ChatMessageReceive, ChatMessageSend} from './interfaces/Chat';
import {Subject} from 'rxjs';
import {environment} from '../environments/environment';
import {AuthService} from './auth.service';
import {HttpService} from './http.service';

@Injectable({
    providedIn: 'root'
})
export class MessagesService {

    private FETCH_MESSAGES = 'direct-messages';
    private SOCKET_RT_MESSAGES = 'messages';

    constructor(private authService: AuthService, private http: HttpService) {
    }

    async fetch(recipient: number, page: number, size: number): Promise<ChatMessageReceive[]> {
        const messages = await
            this.http.get<ChatMessageReceive[]>(
                this.FETCH_MESSAGES,
                {
                    'recipient': recipient,
                    'page': page,
                    'size': size,
                }
            );
        messages.forEach(message => {
            message.date = new Date(message.date);
        });
        return messages;
    }

    async connect(recipient: number) {
        return new Promise<ChatConnection>((resolve, reject) => {
            const socketConnection = new WebSocket(`${environment.apiUrl}/${(this.SOCKET_RT_MESSAGES)}`);

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


