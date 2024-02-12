import { Routes } from "@angular/router";
import { JackoComponent } from "./jacko/jacko.component";

export const UPDATE_NG_ROUTES: Routes = [
    {
        path: 'jacko', component: JackoComponent
        // loadComponent: () => import('./jacko/jacko.component')
        //     .then(c => c.JackoComponent)
    }
]
