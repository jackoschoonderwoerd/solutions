import { Routes } from "@angular/router";

export const TEXT_EDITOR_ROUTES: Routes = [
    {
        path: 'tinymce-ayyaz',
        loadComponent: () => import('./tinymce-ayyaz/tinymce-ayyaz.component')
            .then(c => c.TinymceAyyazComponent)
    }
]
