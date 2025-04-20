import { AgeCategory } from "./age-category.model"
import { ReligionCategory } from "./religion-category.model"

export type Person = {
    id?: string
    name: string,
    age: number
    religion: ReligionCategory
}
