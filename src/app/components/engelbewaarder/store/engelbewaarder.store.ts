import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Consumption, ConsumptionType } from "../types/models"
import { inject } from "@angular/core";
import { FirestoreService } from "../../../shared/firestore.service";






type EngelbewaarderState = {
    consumptionTypesArray: any;
    typesLoading: boolean;
    consumptions: Consumption[];
    consumptionLoading: boolean;
    selectedConsumption: Consumption;
    selectedConsumptionType: ConsumptionType;
    // addingNewConsumption: boolean;
    consumptionTypeUC: ConsumptionType;
    consumptionsComponentVisible: boolean,

    consumptionDetailsComponentVisible: boolean,
    consumptionTypeDetailsComponentVisible: boolean,
    storeComponentVisible: boolean;
}

const initialState: EngelbewaarderState = {
    consumptionTypesArray: [],
    typesLoading: false,
    consumptions: [],
    consumptionLoading: false,
    selectedConsumption: null,
    selectedConsumptionType: null,
    // addingNewConsumption: false,
    consumptionTypeUC: null,

    consumptionsComponentVisible: false,
    consumptionDetailsComponentVisible: false,
    consumptionTypeDetailsComponentVisible: false,
    storeComponentVisible: true
}





export const EngelbewaarderStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),

    withMethods(



        (store, fs = inject(FirestoreService)) => ({
            async loadTypes() {
                patchState(store, { typesLoading: true });
                const path = `engelbewaarder/consumptions`
                fs.getDoc(path).subscribe((consumptionTypesArray: any) => {
                    console.log(consumptionTypesArray)
                    patchState(store, { consumptionTypesArray })
                    patchState(store, { typesLoading: false });
                })
            },
            async consumptionTypeSelected(consumptionType: ConsumptionType) {
                patchState(store, { selectedConsumptionType: consumptionType })
                if (consumptionType) {
                    patchState(store, { consumptionLoading: true })
                    // patchState(store, { consumptionsComponentVisible: true })
                    const path = `engelbewaarder/consumptions/${consumptionType.name}/details`;
                    fs.getDoc(path).subscribe((details: any) => {
                        console.log(details)
                        patchState(store, { consumptionLoading: false });
                        if (details) {
                            patchState(store, { consumptions: details.consumptionDetailsArray });
                        }
                    })
                } else {
                    patchState(store, { consumptions: [] })
                }
            },
            async consumptionSelected(selectedConsumption: Consumption) {
                console.log(selectedConsumption)
                if (selectedConsumption) {
                    patchState(store, { selectedConsumption: selectedConsumption })
                } else {
                    patchState(store, { selectedConsumption: null })
                }
            },
            // addingNewConsumptionF(status: boolean) {
            //     patchState(store, { addingNewConsumption: status })
            // },
            editConsumptionType(consumptionTypeUC: ConsumptionType) {
                console.log(consumptionTypeUC)
                patchState(store, { consumptionTypeUC })
            },
            // async openAddConsumptionTypeDetails(status: boolean) {
            //     patchState(store, { consumptionDetailsVisible: status })
            // },
            toggleStoreComponentVisible() {
                return patchState(store, { storeComponentVisible: !store.storeComponentVisible() })
            },
            async toggleConsumptionTypeDetailsComponentVisible(status: boolean) {
                return patchState(store, { consumptionTypeDetailsComponentVisible: status })
            },
            async toggleConsumptionsComponentVisible(status: boolean) {
                return patchState(store, { consumptionsComponentVisible: status })
            },
            async toggleConsumptionDetailsComponentVisible(status: boolean) {
                return patchState(store, { consumptionDetailsComponentVisible: status })
            },
        })
    ),
);
