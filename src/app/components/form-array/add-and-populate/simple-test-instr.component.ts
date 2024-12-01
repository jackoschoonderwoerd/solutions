import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirestoreService } from '../../../shared/firestore.service';
import { DocumentReference } from '@angular/fire/firestore';
import { FirebaseError } from '@angular/fire/app';
import { Observable, take } from 'rxjs';

export interface Skill {
    skill: string;
    exp: number;
}
export interface Employee {
    firstName: string;
    lastName: string;
    skills: Skill[];
}

export interface Cd {
    title: string;
    employees: Employee[];
}

@Component({
    selector: 'app-simple-test-instr',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './simple-test-instr.component.html',
    styleUrl: './simple-test-instr.component.scss'
})


export class SimpleTestInstrComponent {
    empForm: FormGroup;
    fsService = inject(FirestoreService)
    cds$: Observable<any>
    editmode: boolean = false;
    cdId: string = '';

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        const pathToCds = `simple-test-instr`
        this.cds$ = this.fsService.collection(pathToCds)

        this.empForm = this.fb.group(
            {
                title: new FormControl(null, [Validators.required]),
                employees: this.fb.array([])
            });
    }

    onEditCd(id: string) {
        this.cdId = id;
        this.editmode = true;
        console.log(id)
        const pathToCd = `simple-test-instr/${id}`
        this.fsService.getDoc(pathToCd).pipe(take(1)).subscribe((cd: Cd) => {
            console.log(cd)
            this.empForm.patchValue({
                title: cd.title
            })
            cd.employees.forEach((employee: Employee) => {
                const existingSkills = []
                employee.skills.forEach((skill: Skill) => {
                    existingSkills.push(this.existingSkill(skill.skill, skill.exp))
                })
                console.log(existingSkills)
                this.employees().push(this.existingEmployee(employee.firstName, employee.lastName, existingSkills));
            })
            console.log(this.empForm)

        })
    }
    onDeleteCd(id: string) {
        const pathToCd = `simple-test-instr/${id}`
        this.fsService.deleteDoc(pathToCd)
            .then((res: any) => {
                console.log(`document deleted;${res}`)
            })
            .catch((err: FirebaseError) => {
                console.log(`failed to delete document; ${err.message}`)
            })
    }

    employees(): FormArray {
        return this.empForm.get('employees') as FormArray;
    }

    existingEmployee(firstName: string, lastName: string, skills: Skill[]): FormGroup {

        return this.fb.group({
            firstName,
            lastName,
            skills: this.fb.array(skills)
        })
    }
    existingSkill(skill: string, exp: number): FormGroup {
        console.log(skill, exp)
        return this.fb.group({
            skill: skill,
            exp: exp
        })
    }

    newEmployee(): FormGroup {
        return this.fb.group({
            firstName: '',
            lastName: '',
            skills: this.fb.array([])
        });
    }

    addEmployee() {
        this.employees().push(this.newEmployee());
    }

    removeEmployee(empIndex: number) {
        this.employees().removeAt(empIndex);
    }

    employeeSkills(empIndex: number): FormArray {
        return this.employees()
            .at(empIndex)
            .get('skills') as FormArray;
    }

    newSkill(): FormGroup {
        return this.fb.group({
            skill: '',
            exp: ''
        });
    }

    addEmployeeSkill(empIndex: number) {
        this.employeeSkills(empIndex).push(this.newSkill());
    }

    removeEmployeeSkill(empIndex: number, skillIndex: number) {
        this.employeeSkills(empIndex).removeAt(skillIndex);
    }

    onSubmit() {
        console.log(this.empForm.value);
        const formValue = this.empForm.value

        if (!this.editmode) {
            const pathToSimpleTestInstr = `simple-test-instr`
            this.fsService.addDoc(pathToSimpleTestInstr, this.empForm.value)
                .then((res: DocumentReference) => {
                    console.log(`document added; ${res.id}`)
                    this.resetForm();
                })
                .catch((err: FirebaseError) => {
                    console.log(`failed to add document; ${err.message}`)
                })
        } else {
            const pathToSimpleTestInstr = `simple-test-instr/${this.cdId}`
            this.fsService.updateDoc(pathToSimpleTestInstr, this.empForm.value)
                .then((res: any) => {
                    console.log(`document updated; ${res}`)
                    this.resetForm();
                })
                .catch((err: FirebaseError) => {
                    console.log(`failed to update document; ${err.message}`)
                })
        }

    }
    resetForm() {
        this.empForm.reset();
        this.employees().controls.length = 0;
        this.editmode = false;
    }
}
