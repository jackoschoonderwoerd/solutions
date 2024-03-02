import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-sidenav',
    standalone: true,
    imports: [RouterModule, RouterOutlet, MatToolbarModule],
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {
    menuItems: string[] = [
        'signals',
        'ngrx-signals',
        'update-ng',
        'at-if',
        'at-for',
        'ng-module',
        'camera',
        'crop',
        'highlights',
        'prism',
        'loadingindicator',
        'count-visitors',
        'ngx-translate',
        'google-translate',
        'mat-theme',
        'form-array',
        'add-image'
    ]
    ngOnInit(): void {
        this.menuItems = this.menuItems.sort();
    }
}
