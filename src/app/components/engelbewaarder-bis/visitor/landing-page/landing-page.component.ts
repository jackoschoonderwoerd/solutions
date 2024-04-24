import { Component } from '@angular/core';
import { HeaderComponent } from '../navigation/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../navigation/footer/footer.component';
import { SidenavComponent } from '../navigation/sidenav/sidenav.component';


@Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [
        HeaderComponent,
        MatSidenavModule,
        RouterModule,
        FooterComponent,
        SidenavComponent
    ],
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
