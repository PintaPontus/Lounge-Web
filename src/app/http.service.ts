import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {environment} from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private authService: AuthService) {

    }

    async get<T>(
        path: string,
        params?: {
            [key: string]: string | number | boolean | null;
        },
        headers?: {
            [key: string]: string | null;
        }
    ): Promise<T> {
        const httpHeaders = this.generateHeaders(headers);

        const httpParams = this.generateQueryParams(params);

        const response = await fetch(
            `${environment.apiUrl}/${path}${httpParams ? '?' + httpParams.toString() : ''}`,
            {
                method: 'GET',
                headers: httpHeaders
            }
        );

        return await response.json() as T;
    }

    async post<T>(
        path: string,
        body: any,
        headers?: {
            [key: string]: string | null;
        }
    ): Promise<T> {
        const httpHeaders = this.generateHeaders(headers);

        const httpBody = JSON.stringify(body);

        const response = await fetch(
            `${environment.apiUrl}/${path}`,
            {
                method: 'GET',
                headers: httpHeaders,
                body: httpBody
            }
        );

        return await response.json() as T;
    }

    private generateHeaders(headers?: {
        [key: string]: string | null;
    }) {
        const httpHeaders = new Headers();
        if (this.authService.isLogged()) {
            httpHeaders.set('Authorization', `Bearer ${this.authService.getAuthToken()}`)
        }
        if (headers) {
            Object.entries(headers).forEach(([key, value]) => {
                if (value) {
                    httpHeaders.set(key, value);
                }
            })
        }
        return httpHeaders;
    }

    private generateQueryParams(params?: {
        [key: string]: string | number | boolean | null;
    }) {
        if (params) {
            const httpParams = new URLSearchParams()
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    console.log(`${key}: ${value}`);
                    httpParams.set(key, value.toString());
                }
            })
            return httpParams;
        }
        return;
    }


}
