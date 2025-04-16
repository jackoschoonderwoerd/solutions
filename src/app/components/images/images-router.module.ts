import { Routes } from '@angular/router';


export const imagesRoutes: Routes = [

    {
        path: 'canvas',
        loadComponent: () => import('./resize/canvas/canvas.component')
            .then(c => c.CanvasComponent)
    }
];
