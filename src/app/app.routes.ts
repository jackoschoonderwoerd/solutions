import { Routes } from '@angular/router';
import { SignalsComponent } from './components/signals/signals.component';
import { ControlValueAccessorComponent } from './components/angular/control-value-accessor/control-value-accessor.component';

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
    },
    {
        path: 'google-translate',
        loadComponent: () => import('./components/google-translate/google-translate.component')
            .then(c => c.GoogleTranslateComponent),
        loadChildren: () => import('./components/google-translate/google-translate.routes')
            .then(r => r.GOOGLE_TRANSLATE_ROUTES
            )

    },
    {
        path: 'mat-theme',
        loadComponent: () => import('./components/mat-theme/mat-theme.component')
            .then(c => c.MatThemeComponent),
        loadChildren: () => import('./components/mat-theme/mat-theme.routes')
            .then(r => r.MAT_THEME_ROUTES)
    },
    {
        path: 'form-array',
        loadComponent: () => import('./components/form-array/form-array.component')
            .then(c => c.FormArrayComponent),
        loadChildren: () => import('./components/form-array/form-array.routes')
            .then(r => r.FORM_ARRAY_ROUTES)
    },
    {
        path: 'add-image',
        loadComponent: () => import('./components/add-image/add-image.component')
            .then(c => c.AddImageComponent),
        loadChildren: () => import('./components/add-image/add-image.routes')
            .then(r => r.ADD_IMAGE_ROUTES)
    },
    {
        path: 'uploadcare',
        loadComponent: () => import('./components/uploadcare/uploadcare.component')
            .then(c => c.UploadcareComponent),
        loadChildren: () => import('./components/uploadcare/uploadcare.routes')
            .then(r => r.UPLOADCARE_ROUTES)
    },
    {
        path: 'viewchild',
        loadComponent: () => import('./components/viewchild/viewchild.component')
            .then(c => c.ViewchildComponent),
        loadChildren: () => import('./components/viewchild/viewchild.routes')
            .then(r => r.VIEWCHILD_ROUTES)
    },
    {
        path: 'text-editor',
        loadComponent: () => import('./components/text-editor/text-editor.component')
            .then(c => c.TextEditorComponent),
        loadChildren: () => import('./components/text-editor/text-editor.routes')
            .then(r => r.TEXT_EDITOR_ROUTES)
    },
    {
        path: 'async-await',
        loadComponent: () => import('./components/async-await/async-await.component')
            .then(c => c.AsyncAwaitComponent),
        loadChildren: () => import('./components/async-await/async-await.routes')
            .then(r => r.ASYNC_AWAIT_ROUTES)
    },
    {
        path: 'add-navigation-item',
        loadComponent: () => import('./navigation/add-navigation-item/add-navigation-item.component')
            .then(c => c.AddNavigationItemComponent)
    },
    {
        path: 'dynamic-nested-menu',
        loadComponent: () => import('./components/dynamic-nested-menu/dynamic-nested-menu.component')
            .then(c => c.DynamicNestedMenuComponent),
        loadChildren: () => import('./components/dynamic-nested-menu/dynamic-nested-menu.routes')
            .then(r => r.DYNAMIC_NESTED_MENU_ROUTES)
    },
    {
        path: 'map',
        loadComponent: () => import('./components/map/map.component')
            .then(c => c.MapComponent),
        loadChildren: () => import('./components/map/map.routes')
            .then(r => r.MAP_ROUTES)
    },
    {
        path: 'map-constructor',
        loadComponent: () => import('./components/map-constructor/map-constructor.component')
            .then(c => c.MapConstructorComponent),
        loadChildren: () => import('./components/map-constructor/map-constructor.routes')
            .then(r => r.MAP_CONTRUCTOR_ROUTES)
    },
    {
        path: 'collection',
        loadComponent: () => import('./components/firebase/firestore/collection/collection.component')
            .then(c => c.CollectionComponent)
    },
    {
        path: 'doc',
        loadComponent: () => import('./components/firebase/firestore/doc/doc.component')
            .then(c => c.DocComponent)
    },

    {
        path: 'firebase',
        loadChildren: () => import('./components/firebase/firebase.routes')
            .then(r => r.FIREBASE_ROUTES)
    },
    {
        path: 'angular',
        loadChildren: () => import('./components/angular/angular.routes')
            .then(r => r.ANGULAR_ROUTES)
    },
    {
        path: 'javascript',
        loadChildren: () => import('./components/javascript/javascript.routes')
            .then(r => r.JAVASCRIPT_ROUTES)
    },
    {
        path: 'engelbewaarder',
        loadComponent: () => import('./components/engelbewaarder/engelbewaarder.component')
            .then(c => c.EngelbewaarderComponent)
    },
    {
        path: 'engelbewaarder-bis',
        loadComponent: () => import('./components/engelbewaarder-bis/engelbewaarder.component')
            .then(c => c.EngelbewaarderComponent),
        loadChildren: () => import('./components/engelbewaarder-bis/engelbewaarder-bis.router')
            .then(r => r.ENGELBEWAARDER_BIS_ROUTES)
    },
    {
        path: 'login',
        loadComponent: () => import('./shared/auth/login/login.component')
            .then(c => c.LoginComponent)
    },
    {
        path: 'css',
        loadComponent: () => import('./components/css/css.component')
            .then(c => c.CssComponent),
        loadChildren: () => import('./components/css/css-routes')
            .then(r => r.CSS_ROUTES)

    },
    {
        path: 'control-value-accessor',
        loadComponent: () => import('./components/angular/control-value-accessor/control-value-accessor.component')
            .then(c => c.ControlValueAccessorComponent)
    },
    {
        path: 'timepicker',
        loadComponent: () => import('./components/timepicker/timepicker.component')
            .then(c => c.TimepickerComponent)
    }

];
