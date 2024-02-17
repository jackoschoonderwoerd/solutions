import { Component, Signal, computed, inject } from '@angular/core';
import { TodosService } from '../../todos.service';
import { filter } from 'rxjs';
import { FilterEnum } from '../../types/filter.enum';
import { TodoComponent } from '../../todo/todo.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [TodoComponent, CommonModule],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss'
})
export class MainComponent {
    public todosService = inject(TodosService);
    editingId: string | null = null;
    isAllTodosSelected: Signal<boolean> = computed(() => this.todosService.todosSig().every((todo) => todo.isCompleted));
    boolean
    noTodosClass: Signal<boolean> = computed(() => this.todosService.todosSig().length === 0)
    visibleTodos = computed(() => {
        const todos = this.todosService.todosSig();
        const filter = this.todosService.filterSig();

        if (filter === FilterEnum.active) {
            return todos.filter(todo => !todo.isCompleted);
        } else if (filter === FilterEnum.completed) {
            return todos.filter(todo => todo.isCompleted);
        } else {
            return todos;
        }

    });
    setEditingId(editingId: string | null): void {
        this.editingId = editingId
    }
    toggleAllTodos(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.todosService.toggleAllIsCompleted(target.checked)

    }
}
