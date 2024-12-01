import { Component } from '@angular/core';
import { DessertComponent } from './dessert/dessert.component';
import { FishComponent } from './fish/fish.component';
import { MeatComponent } from './meat/meat.component';
import { SideComponent } from './side/side.component';
import { StartersComponent } from './starters/starters.component';
import { VegetarianComponent } from './vegetarian/vegetarian.component';

@Component({
    selector: 'app-dinner',
    imports: [
        DessertComponent,
        FishComponent,
        MeatComponent,
        SideComponent,
        StartersComponent,
        VegetarianComponent
    ],
    templateUrl: './dinner.component.html',
    styleUrl: './dinner.component.scss'
})
export class DinnerComponent {

}
