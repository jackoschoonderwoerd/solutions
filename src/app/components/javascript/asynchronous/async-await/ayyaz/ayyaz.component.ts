import { Component, inject } from '@angular/core';
import { AyyazService } from './ayyaz.service';
import { CommonModule } from '@angular/common';
import { ShowCodeComponent } from '../../../../../shared/show-code/show-code.component';

@Component({
    selector: 'app-ayyaz',
    standalone: true,
    imports: [CommonModule, ShowCodeComponent],
    templateUrl: './ayyaz.component.html',
    styleUrl: './ayyaz.component.scss'
})
export class AyyazComponent {

    ayyazService = inject(AyyazService)

    response: unknown = '';
    error: unknown = ''
    jsonplaceholderdata: any;
    snippets: string[] = []

    constructor() {
        this.displayData();
        this.displayDataWithAsyncAwait();
        this.getDataAsyncAwaitFormService();
        this.snippets = this.ayyazService.getSnippets()
    }

    async getDataAsyncAwaitFormService() {
        this.jsonplaceholderdata = await this.ayyazService.getDataAsyncAwait()
    }

    fetchData() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('data')
            }, 2000);
        })
    }

    async displayDataWithAsyncAwait() {
        try {
            this.response = await (this.fetchData())
        }
        catch (error) {
            console.log(error)
        }
    }

    displayData() {
        this.fetchData()
            .then((data) => {
                console.log(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

}
