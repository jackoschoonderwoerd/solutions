import { Person } from "./person.model";

export type EditPersonDialogData = {
    mode: 'create' | 'update';
    person?: Person
}
