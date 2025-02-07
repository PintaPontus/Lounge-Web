import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthRequest, AuthResponse} from './interfaces/Auth';
import {environment} from '../environments/environment';
import {firstValueFrom} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private USER_ID_KEY = 'userid';
  private AUTH_TOKEN_KEY = 'auth-token';

  constructor(private http: HttpClient) {
  }

  async login(username: string, password: string) {

    const authRequest = {
      username,
      password
    } as AuthRequest;

    const authResponse = await firstValueFrom(
      this.http.post<AuthResponse>(`${environment.apiUrl}/login`,
        authRequest
      )
    )
    sessionStorage.setItem(this.USER_ID_KEY, String(authResponse.userId));
    sessionStorage.setItem(this.AUTH_TOKEN_KEY, authResponse.token);

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
