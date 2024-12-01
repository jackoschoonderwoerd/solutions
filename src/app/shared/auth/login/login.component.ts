import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthStore } from '../auth.store';
import { SolutionsUser } from '../../types/solutions-user.type';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { User as FirebaseUser } from "@angular/fire/auth";


@Component({
    selector: 'app-login',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatLabel
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
    fb = inject(FormBuilder);
    auStore = inject(AuthStore)
    form: FormGroup;
    route = inject(ActivatedRoute);
    provenance: string;
    router = inject(Router);
    afAuth = inject(Auth)



    ngOnInit(): void {

        if (this.route.snapshot.paramMap.get('provenance')) {
            this.provenance = this.route.snapshot.paramMap.get('provenance');
            console.log(this.provenance)
        } else {
            console.log(' no cigar')
        }

        this.initForm()
    }
    initForm() {
        this.form = this.fb.group({
            email: new FormControl('jackoboes@gmail.com'),
            password: new FormControl('123456')
        })
    }
    onSubmit() {
        const solutionsUser: SolutionsUser = {
            ...this.form.value
        }
        this.auStore.login(solutionsUser).then((res: any) => {
            console.log(res)
            if (this.provenance) {
                this.router.navigate([this.provenance])
            }
        })
    }

}
