import { Component, OnInit, inject } from '@angular/core';
import { TodosStore } from './store/todos.store';
import { CommonModule, JsonPipe } from '@angular/common';
import { TodosListComponent } from './todos-list/todos-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-vasco',
    standalone: true,
    imports: [JsonPipe, TodosListComponent, MatProgressSpinnerModule],
    templateUrl: './vasco.component.html',
    styleUrl: './vasco.component.scss'
})
export class VascoComponent implements OnInit {

    store = inject(TodosStore)

    ngOnInit(): void {
        this.loadTodos().then(() => console.log('Todos Loaded!'))
    }
    async loadTodos() {
        await this.store.loadAll()
    }
}
