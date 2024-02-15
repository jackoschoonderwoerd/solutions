import { Routes } from "@angular/router";

export const CROP_ROUTES: Routes = [
    {
        path: 'zoaib',
        loadComponent: () => import('./zoaib/zoaib.component')
            .then(c => c.ZoaibComponent)
    }
]
