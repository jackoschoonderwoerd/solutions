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

    filter = viewChild.required(MatButtonToggleGroup);

    store = inject(TodosStore)

    constructor() {
        effect(() => {
            const filter = this.filter();
            filter.value = this.store.filter();
        })
    }

    async onAddTodo(title: string) {
        console.log(`addTodo 01 todos-list.component.ts onAddTodo(${title})`)
        this.store.addTodo(title)
    }

    async onDeleteTodo(id: string, event: MouseEvent) {
        console.log(`01 todos-list.component.ts - onDeleteTodo(${id})`)
        event.stopPropagation();
        await this.store.deleteTodo(id)
    }
    async onTodoToggled(id: string, completed: boolean) {
        await this.store.updateTodo(id, completed)
    }
    onFilterTodos(event: MatButtonToggleChange) {
        console.log(`06 todos-list.component.ts - onFilterTodos(${event.value})`)
        const filter = event.value as TodosFilter;
        this.store.updateFilter(filter);
    }
}
