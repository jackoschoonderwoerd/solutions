import { Injectable } from '@angular/core';
import { TODOS } from '../model/mock.data';
import { Todo } from '../model/todo.model';

@Injectable({
    providedIn: 'root'
})
export class TodosService {

    constructor() { }

    async getTodos() {
        await sleep(1000);
        console.log('05 todos.service.ts - getTodos()')
        return TODOS;
    }
    async addTodo(todo: Partial<Todo>): Promise<Todo> {
        console.log(todo)
        console.log(`addTodo 03 todos.service.ts onAddTodo(${todo.completed, todo.title})`)
        await sleep(1000);
        return {
            id: Math.random().toString(36).substr(2, 9),
            ...todo,
        } as Todo
    }

    async deleteTodo(id: string) {
        console.log(`03 todos.service.ts - deleteTodo(${id})`)
        await sleep(500);
    }

    async updateTodo(id: string, completed: boolean) {
        await sleep(500);
    }


}

async function sleep(ms: number) {
    console.log(`04 todos.service.ts - sleep(${ms})`)
    return new Promise(resolve =>
        setTimeout(resolve, ms));
}
