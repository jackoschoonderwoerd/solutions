import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';

@Component({
    selector: 'app-monsterlessons',
    standalone: true,
    imports: [HeaderComponent, FooterComponent, MainComponent],
    templateUrl: './monsterlessons.component.html',
    styleUrl: './monsterlessons.component.scss'
})
export class MonsterlessonsComponent {

}
