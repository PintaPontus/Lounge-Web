import {Injectable} from '@angular/core';
import {AuthRequest, AuthResponse} from './interfaces/Auth';
import {environment} from '../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private USER_ID_KEY = 'userid';
    private AUTH_TOKEN_KEY = 'auth-token';

    async login(username: string, password: string) {
        const response = await fetch(
            `${environment.apiUrl}/login`,
            {
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password
                } as AuthRequest),
            }
        );

        console.log(response);

        const authResponseBody = await response.json() as AuthResponse

        console.log(authResponseBody);

        sessionStorage.setItem(this.USER_ID_KEY, String(authResponseBody.userId));
        sessionStorage.setItem(this.AUTH_TOKEN_KEY, authResponseBody.token);
    }

    isLogged() {
        return sessionStorage.getItem(this.USER_ID_KEY) && sessionStorage.getItem(this.AUTH_TOKEN_KEY);
    }

    getUserId(): number {
        return Number(sessionStorage.getItem(this.USER_ID_KEY));
    }

    getAuthToken() {
        return sessionStorage.getItem(this.AUTH_TOKEN_KEY);
    }

}
