

import { Component, inject, OnInit } from '@angular/core';
import { TodosListComponent } from './todos-list/todos-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TodosStore } from './store/todos.store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-signal-store',
    imports: [TodosListComponent, MatProgressSpinnerModule],
    templateUrl: './signal-store.component.html',
    styleUrl: './signal-store.component.scss'
})
export class SignalStoreComponent implements OnInit {
    store = inject(TodosStore);

    ngOnInit(): void {
        this.loadTodos()
            .then(() => {
                console.log('todos loaded')
            })
    }

    async loadTodos() {
        await this.store.loadAll()
    }
}
