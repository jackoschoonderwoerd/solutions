import { Routes } from '@angular/router';
import { SignalsComponent } from './components/signals/signals.component';

export const routes: Routes = [
    {
        path: 'signals',
        loadComponent: () => import('./components/signals/signals.component')
            .then(c => c.SignalsComponent),
        loadChildren: () => import('./components/signals/signals.routes')
            .then(r => r.SIGNALS_ROUTES)
    },
    {
        path: 'ngrx-signals',
        loadComponent: () => import('./components/ngrx-signals/ngrx-signals.component')
            .then(c => c.NgrxSignalsComponent),
        loadChildren: () => import('./components/ngrx-signals/ngrx-signals.routes')
            .then(r => r.NGRX_SIGNALS_ROUTES)
    },
    {
        path: 'update-ng',
        loadComponent: () => import('./components/update-ng/update-ng.component')
            .then(c => c.UpdateNgComponent),
        loadChildren: () => import('./components/update-ng/update-ng.routes')
            .then(r => r.UPDATE_NG_ROUTES)
    },
    {
        path: 'at-if',
        loadComponent: () => import('./components/at-if/at-if.component')
            .then(c => c.AtIfComponent),
        loadChildren: () => import('./components/at-if/at-if.routes')
            .then(r => r.AT_IF_ROUTES)
    },
    {
        path: 'at-for',
        loadComponent: () => import('./components/at-for/at-for.component')
            .then(c => c.AtForComponent),
        loadChildren: () => import('./components/at-for/at-for.routes')
            .then(r => r.AT_FOR_ROUTES)
    },
    {
        path: 'ng-module',
        loadComponent: () => import('./components/ng-module/ng-module.component')
            .then(c => c.NgModuleComponent),
        loadChildren: () => import('./components/ng-module/ng-module.routes')
            .then(r => r.NG_MODULE_ROUTES)
    },
    {
        path: 'camera',
        loadComponent: () => import('./components/camera/camera.component')
            .then(c => c.CameraComponent),
        loadChildren: () => import('./components/camera/camera.routes')
            .then(r => r.CAMERA_ROUTES)
    },
    {
        path: 'crop',
        loadComponent: () => import('./components/crop/crop.component')
            .then(c => c.CropComponent),
        loadChildren: () => import('./components/crop/crop.routes')
            .then(r => r.CROP_ROUTES)
    },
    {
        path: 'highlightjs',
        loadComponent: () => import('./components/highlightjs/highlightjs.component')
            .then(c => c.HighlightjsComponent),
        loadChildren: () => import('./components/highlightjs/highlightjs.routes')
            .then(r => r.HIGHLIGHTJS_ROUTES)
    },
    {
        path: 'prism',
        loadComponent: () => import('./components/prism/prism.component')
            .then(c => c.PrismComponent),
        loadChildren: () => import('./components/prism/prism.routes')
            .then(r => r.PRISM_ROUTES)
    },
    {
        path: 'loading-indicator',
        loadComponent: () => import('./components/loading-indicator/loading-indicator.component')
            .then(c => c.LoadingIndicatorComponent),
        loadChildren: () => import('./components/loading-indicator/loading-indicator.routes')
            .then(r => r.LOADING_INDICATOR_ROUTES)
    },
    {
        path: 'count-visitors',
        loadComponent: () => import('./components/count-visitors/count-visitors.component')
            .then(c => c.CountVisitorsComponent),
        loadChildren: () => import('./components/count-visitors/count-visitors.routes')
            .then(r => r.COUNT_VISITORS_ROUTES)
    },
    {
        path: 'ngx-translate',
        loadComponent: () => import('./components/ngx-translate/ngx-translate.component')
            .then(c => c.NgxTranslateComponent),
        loadChildren: () => import('./components/ngx-translate/ngx-translate.routes')
            .then(r => r.NGX_TRANSLATE_ROUTES)
    }

];
