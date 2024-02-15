import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { PrismService } from './prism.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';



@Component({
    selector: 'app-prism',
    standalone: true,
    imports: [MatToolbarModule, RouterModule],
    templateUrl: './prism.component.html',
    styleUrl: './prism.component.scss'
})
export class PrismComponent {

}

