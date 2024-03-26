import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AyyazService {

    snippets: string[] = [
        `
    async getDataAsyncAwait(): Promise<Object> {
        try {
            return await lastValueFrom(
                this.http.get('https://jsonplaceholder.typicode.com/users')
            );
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }`
        ,
        `
     async getDataAsyncAwaitFormService() {
        this.jsonplaceholderdata = await this.ayyazService.getDataAsyncAwait()
    }
    `
    ]


    constructor(private http: HttpClient) { }


    // rxjs lastValueFrom turns an Observable into a Promise
    getData(): Promise<Object> {
        return lastValueFrom(
            this.http.get(`https://jsonplaceholder.typicode.com/users`)
        );
    }

    async getDataAsyncAwait(): Promise<Object> {
        try {
            return await lastValueFrom(
                this.http.get(`https://jsonplaceholder.typicode.com/users`)
            );
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    getSnippets() {
        return this.snippets;
    }

}
