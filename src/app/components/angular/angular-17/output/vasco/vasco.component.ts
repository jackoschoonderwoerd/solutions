import { Component } from '@angular/core';
import { AddTodoComponent } from './add-todo/add-todo.component';

@Component({
    selector: 'app-vasco',
    standalone: true,
    imports: [AddTodoComponent],
    templateUrl: './vasco.component.html',
    styleUrl: './vasco.component.scss'
})
export class VascoComponent {

    inputFromAddTodoThrougEventEmitter: string = '';
    inputFromAddTodoThrougModel: string = '';

    inputChangedThroughEventEmitter(e) {
        this.inputFromAddTodoThrougEventEmitter = e
    }
    inputChangedThroughModel(e) {
        this.inputFromAddTodoThrougModel = e
    }
    onCounterChanged(counter: number) {
        console.log('Counter Changed:', counter)
    }
}
