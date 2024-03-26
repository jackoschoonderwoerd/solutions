import { Component, EventEmitter, OnInit, Output, output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Observable, from } from 'rxjs';
import {
    outputFromObservable,
    outputToObservable,
    toObservable
} from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-add-todo',
    standalone: true,
    imports: [MatFormFieldModule, MatInput],
    templateUrl: './add-todo.component.html',
    styleUrl: './add-todo.component.scss'
})
export class AddTodoComponent implements OnInit {

    @Output() todoAddedThrougEventEmitter = new EventEmitter<string>()

    todoAddedThroughModel = output<string>();

    counter$ = from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

    counter = outputFromObservable(this.counter$);

    todo$ = outputToObservable(this.todoAddedThroughModel)

    ngOnInit(): void {
        this.todo$.subscribe(todo => console.log('todo$ emitted value', todo))
    }

    onInputChangeToEventEmitter(e: any) {

        const value = e.target.value;
        this.todoAddedThrougEventEmitter.emit(value)
    }

    onInputChangeToModel(e: any) {

        const value = e.target.value
        this.todoAddedThroughModel.emit(value)
    }
}
