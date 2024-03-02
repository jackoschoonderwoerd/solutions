import { Routes } from "@angular/router";

export const FORM_ARRAY_ROUTES: Routes = [

    {
        path: 'jacko-cd',
        loadComponent: () => import('./jacko-cd/jacko-cd.component')
            .then(c => c.JackoCdComponent)
    },
    {
        path: 'add-input',
        loadComponent: () => import('./add-input/tekturorialshub.component')
            .then(c => c.TekturorialshubComponent)
    },
    {
        path: 'populate-input',
        loadComponent: () => import('./populate-input/chatgpt.component')
            .then(c => c.ChatgptComponent)
    },

    {
        path: 'add-and-populate',
        loadComponent: () => import('./add-and-populate/simple-test-instr.component')
            .then(c => c.SimpleTestInstrComponent)
    }
]
