import { Injectable, signal } from '@angular/core';
import { TodoInterface } from './types/todo.interface';
import { FilterEnum } from './types/filter.enum';

@Injectable({
    providedIn: 'root'
})
export class TodosService {

    todosSig = signal<TodoInterface[]>([]);
    filterSig = signal<FilterEnum>(FilterEnum.all)

    changeFilter(filterName: FilterEnum): void {
        this.filterSig.set(filterName)
    }

    addTodo(text: string): void {
        const newTodo: TodoInterface = {
            text,
            isCompleted: false,
            id: Math.random().toString(16)
        }
        this.todosSig.update(todos => [...todos, newTodo])
    }
    changeTodo(id: string, text: string) {
        this.todosSig.update((todos: TodoInterface[]) =>
            todos.map((todo: TodoInterface) => (todo.id === id ? { ...todo, text } : todo))
        )
    }
    deleteTodo(id: string) {
        console.log(id)
        this.todosSig.update((todos: TodoInterface[]) => todos.filter((todo) => todo.id !== id));
    }
    toggleTodoIsCompleted(id) {
        this.todosSig.update((todos: TodoInterface[]) =>
            todos.map((todo: TodoInterface) => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo))
        )
    }
    toggleAllIsCompleted(isCompleted: boolean): void {
        this.todosSig.update((todos: TodoInterface[]) =>
            todos.map((todo: TodoInterface) => ({ ...todo, isCompleted: isCompleted }))
        )
    }

    constructor() { }
}
