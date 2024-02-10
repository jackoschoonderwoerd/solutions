import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-zoaib',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, FormsModule, CommonModule],
    templateUrl: './zoaib.component.html',
    styleUrl: './zoaib.component.scss'
})
export class ZoaibComponent {
    firstName = signal('');
    lastName = signal('');
    fullName = computed(() => `${this.firstName()} ${this.lastName()}`)
}
