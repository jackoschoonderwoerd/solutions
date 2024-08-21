import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { StorageService } from './shared/storage.service';




type MainState = {
    showMainSidenav: boolean
}

const initialState: MainState = {
    showMainSidenav: true
}

export const MainStore = signalStore(
    { providedIn: 'root', protectedState: false },
    withState(initialState),

    withMethods(
        (store) => ({
            toggleMainSidenavVisibility() {
                console.log(store.showMainSidenav())
                if (store.showMainSidenav()) {
                    console.log('visible')
                    patchState(store, { showMainSidenav: false })
                } else {
                    patchState(store, { showMainSidenav: true })
                }
            }
        })
    ),
);
