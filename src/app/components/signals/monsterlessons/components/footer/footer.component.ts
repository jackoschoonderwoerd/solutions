import { CommonModule } from '@angular/common';
import { Component, Signal, WritableSignal, computed, inject } from '@angular/core';
import { TodosService } from '../../todos.service';
import { FilterEnum } from '../../types/filter.enum';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
    todosService = inject(TodosService)
    filterSig: WritableSignal<FilterEnum> = this.todosService.filterSig;
    filterEnum = FilterEnum;
    activeCount: Signal<number> = computed(() => {
        return this.todosService.todosSig().filter((todo => !todo.isCompleted)).length;
    })
    noTodosClass: Signal<boolean> = computed(() => {
        return this.todosService.todosSig().length === 0;
    })
    itemsLeftText: Signal<string> = computed(() => {
        return `item${this.activeCount() !== 1 ? 's' : ''} left`
    })

    changeFilter(event: Event, filterName: FilterEnum): void {
        event.preventDefault()
        this.todosService.changeFilter(filterName);
        console.log('after changeFilter', this.todosService.filterSig())

    }
}
