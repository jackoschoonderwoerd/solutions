import { Component, OnInit, inject } from '@angular/core';
import { TodosStore } from './store/todos.store';
import { CommonModule, JsonPipe } from '@angular/common';
import { TodosListComponent } from './todos-list/todos-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ShowCodeComponent } from '../../../shared/show-code/show-code.component';

@Component({
    selector: 'app-vasco',
    standalone: true,
    imports: [JsonPipe, TodosListComponent, MatProgressSpinnerModule, ShowCodeComponent],
    templateUrl: './vasco.component.html',
    styleUrl: './vasco.component.scss'
})
export class VascoComponent implements OnInit {

    store = inject(TodosStore)

    ngOnInit(): void {
        console.log('01 vasco.component.ts - OnInit()')
        this.loadTodos().then(() => console.log('vasco.component.ts - Todos Loaded!'))
    }

    async loadTodos() {
        console.log('02 vasco.component.ts - loadTodos() ')
        await this.store.loadAll()
    }
}
