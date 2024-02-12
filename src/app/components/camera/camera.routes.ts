import { Routes } from "@angular/router";

export const CAMERA_ROUTES: Routes = [
    {
        path: 'techshareskk',
        loadComponent: () => import('./techshareskk/techshareskk.component')
            .then(c => c.TechshareskkComponent)
    }
]
