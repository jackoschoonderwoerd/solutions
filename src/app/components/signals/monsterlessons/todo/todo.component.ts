import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { TodoInterface } from '../types/todo.interface';
import { CommonModule } from '@angular/common';
import { TodosService } from '../todos.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-todo',
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: './todo.component.html',
    styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit, OnChanges {
    @Input({ required: true }) todo!: TodoInterface;
    @Input({ required: true }) isEditing!: boolean;
    @Output() setEditingId: EventEmitter<string | null> = new EventEmitter();
    @ViewChild('textInput') textInput?: ElementRef

    todosService = inject(TodosService)

    editingText: string = '';

    ngOnInit(): void {
        this.editingText = this.todo.text
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['isEditing'].currentValue) {
            setTimeout(() => {
                this.textInput?.nativeElement.focus()
            }, 0);
        }
    }

    changeText(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.editingText = value;
    }

    changeTodo(): void {
        this.todosService.changeTodo(this.todo.id, this.editingText)
        this.setEditingId.emit(null);
    }
    setTodoInEditMode() {
        this.setEditingId.emit(this.todo.id)
    }

    removeTodo(id: string): void {
        this.todosService.deleteTodo(id)
    }
    toggleTodo() {
        this.todosService.toggleTodoIsCompleted(this.todo.id)
    }
}
