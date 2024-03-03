import { JsonPipe, NgStyle } from '@angular/common';
import { Component, Input, effect, inject, input, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleChange, MatButtonToggleGroup, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { TodosFilter, TodosStore } from '../store/todos.store';

@Component({
    selector: 'app-todos-list',
    standalone: true,
    imports: [
        JsonPipe,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatLabel,
        MatButtonModule,
        MatButtonToggleModule,
        MatListModule,
        NgStyle
    ],
    templateUrl: './todos-list.component.html',
    styleUrl: './todos-list.component.scss'
})
export class TodosListComponent {

    filter = viewChild.required(MatButtonToggleGroup)

    store = inject(TodosStore)

    constructor() {
        effect(() => {
            const filter = this.filter();
            filter.value = this.store.filter();
        })
    }

    async onAddTodo(title: string) {
        this.store.addTodo(title)
    }

    async onDeleteTodo(id: string, event: MouseEvent) {
        event.stopPropagation();
        await this.store.deleteTodo(id)
    }
    async onTodoToggled(id: string, completed: boolean) {
        await this.store.updateTodo(id, completed)
    }
    onFilterTodos(event: MatButtonToggleChange) {
        const filter = event.value as TodosFilter;
        this.store.updateFilter(filter);
    }
}
