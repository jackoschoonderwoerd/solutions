import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Todo } from "../model/todo.model"
import { computed, inject } from "@angular/core";
import { TodosService } from "../services/todos.service";

export type TodosFilter = "all" | "pending" | "completed";

type TodosState = {
    todos: Todo[];
    loading: boolean;
    filter: TodosFilter
}

const initialState: TodosState = {
    todos: [],
    loading: false,
    filter: 'all'
}

export const TodosStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods(
        (store, todosService = inject(TodosService)) => ({
            async loadAll() {
                console.log('03 todos.store.ts - withMethods(loadAll())')
                patchState(store, {
                    loading: true
                })

                const todos = await todosService.getTodos();

                patchState(store, {
                    todos,
                    loading: false
                })
            },

            async addTodo(title: string) {
                console.log(`addTodo 02 todos.store.ts addTodo(${title})`)
                const todo = await todosService.addTodo({ title, completed: false });
                console.log(`addTodo 04 todosstore.ts ADDS THE COMPLETED TODO TO THE TODOS ARRAY`)
                patchState(store, (state) => ({
                    todos: [...state.todos, todo]
                }))
            },
            async deleteTodo(id: string) {
                console.log(`02 todo.store.ts - deleteTodo(${id})`)
                await todosService.deleteTodo(id)
                console.log(`04 todo.store.ts - deleteTodo(${id})`)
                patchState(store, (state) => ({
                    todos: state.todos.filter(todo => todo.id !== id
                    )
                }))
            },
            async updateTodo(id: string, completed: boolean) {
                await todosService.updateTodo(id, completed);

                patchState(store, (state) => ({
                    todos: state.todos.map(todo =>
                        todo.id == id ? { ...todo, completed } : todo)
                }))
            },
            updateFilter(filter: TodosFilter) {
                console.log(`07 store.ts - updateFilter(${filter})`)
                patchState(store, { filter })
            }

        })

    ),
    withComputed((state) => ({
        filteredTodos: computed(() => {

            const todos = state.todos();
            console.log(`STATE.TODOS HAS BEEN INITIALIZED OR UPDATED. totos-list.html WILL BE UPDATED ACCORDING TO THE ACTIVE FILTER`)

            switch (state.filter()) {
                case "all":
                    console.log(`08 store.ts - filteredTodos ${state.filter}`);
                    return todos;
                case "pending":
                    console.log(`08 store.ts - filteredTodos ${state.filter}`);
                    return todos.filter(todo => !todo.completed)
                case "completed":
                    console.log(`08 store.ts - filteredTodos ${state.filter}`);
                    return todos.filter(todo => todo.completed)
            }
        })
    }))
);
