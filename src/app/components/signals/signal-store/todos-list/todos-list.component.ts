import { JsonPipe, NgStyle } from '@angular/common';
import { Component, effect, inject, input, viewChild } from '@angular/core';
import { TodosFilter, TodosStore } from '../store/todos.store';
import { MatFormFieldModule, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleChange, MatButtonToggleGroup, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule, MatSelectionList } from '@angular/material/list';

@Component({
    selector: 'app-todos-list',
    imports: [
        MatFormFieldModule,
        MatInput,
        MatIconModule,
        MatLabel,
        MatSuffix,
        MatButtonToggleModule,
        MatSelectionList,
        MatListModule,
        NgStyle
    ],
    templateUrl: './todos-list.component.html',
    styleUrl: './todos-list.component.scss'
})
export class TodosListComponent {

    store = inject(TodosStore);
    filter = viewChild.required(MatButtonToggleGroup)

    constructor() {
        effect(() => {
            const filter = this.filter()
            filter.value = this.store.filter();
        })
    }


    async onAddTodo(title: string) {
        await this.store.addTodo(title)
    }

    async onDelete(id: string, event: MouseEvent) {
        event.stopPropagation();
        await this.store.deleteTodo(id)
    }
    async onTodoToggled(id: string, completed: boolean) {
        await this.store.updateTodo(id, completed)
    }

    onFilterTodos(event: MatButtonToggleChange) {
        const filter = event.value as TodosFilter;
        this.store.updateFilter(filter)
    }
}
