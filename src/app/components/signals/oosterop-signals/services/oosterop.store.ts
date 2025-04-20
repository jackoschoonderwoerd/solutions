
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";


import { computed, inject } from "@angular/core";
import { Band } from "../models/band.model";
import { OosteropService } from "./oosterop.service";



type OosteropState = {
    activeBand: Band
    loading: boolean,

}

const initialState: OosteropState = {
    activeBand: null,
    loading: false,
}

export const OosteropStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods(
        (store, oosteropService = inject(OosteropService)) => ({
            // async loadAll() {
            //     patchState(store, { loading: true });
            //     const todos = await todosService.getTodos()
            //     patchState(store, {
            //         todos: todos,
            //         loading: false
            //     })

            // },
            setActiveBand(band: Band) {
                console.log(band)
                patchState(store, { activeBand: band })
            }
            // async addTodo(title: string) {
            //     const todo = await todosService.addTodo(
            //         {
            //             title: title,
            //             completed: false
            //         }
            //     )
            //     patchState(store, (state => ({
            //         todos: [...state.todos, todo]
            //     })))
            // },
            // async deleteTodo(id) {
            //     await todosService.deleteTodo(id);
            //     patchState(store, (state) => ({
            //         todos: state.todos.filter(todo => todo.id !== id)
            //     }))
            // },
            // async updateTodo(id: string, completed: boolean) {
            //     await todosService.updateTodo(id, completed);
            //     patchState(store, (state) => ({
            //         todos: state.todos.map(todo => todo.id === id ? { ...todo, completed } : todo)
            //     }))

            // },
            // updateFilter(filter: TodosFilter) {
            //     patchState(store, { filter })
            // }

        })
    )
    , withComputed((state) => ({
        // filteredTodos: computed(() => {
        //     const todos = state.todos();
        //     switch (state.filter()) {
        //         case 'all':
        //             return todos
        //         case 'pending':
        //             return todos.filter(todo => !todo.completed)
        //         case 'completed':
        //             return todos.filter(todo => todo.completed)
        //     }
        // })
    }))
);
