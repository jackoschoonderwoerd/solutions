import { Component, inject } from '@angular/core';
import { MessagesService } from './messages.service';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-messages',
    imports: [MatIconModule, NgClass],
    templateUrl: './messages.component.html',
    styleUrl: './messages.component.scss'
})
export class MessagesComponent {
    messagesService = inject(MessagesService);

    message = this.messagesService.message;

    onClose() {
        this.messagesService.clear();
    }
}
