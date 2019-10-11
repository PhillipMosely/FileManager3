import { Component, OnInit, Input } from '@angular/core';
import { User } from 'app/_models/user';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { SweetAlertService } from 'app/_services/sweetalert.service';
import { UserService } from 'app/_services/user.service';
import { AuthService } from 'app/_services/auth.service';
import { CompanyService } from 'app/_services/company.service';
import { Company } from 'app/_models/company';
import { UserComponent } from 'app/userpage/user.component';


@Component({
    moduleId: module.id,
    selector: 'app-useradd',
    templateUrl: 'useradd.component.html'
})

export class UserAddComponent implements OnInit{
    editForm: FormGroup;
    user = {} as User;
    companys: Company[];

    constructor(private sweetAlertService: SweetAlertService,
                private userService: UserService,
                private companyService: CompanyService,
                private fb: FormBuilder, private router: Router,
                private authService: AuthService) { }

    ngOnInit() {
        this.companyService.getCompanys().subscribe( next => {
            this.companys = next.result;
        });
        this.createEditForm();
    }

    createEditForm() {
        this.editForm = this.fb.group({
            companyid: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            username: ['', Validators.required],
            mobilephone: [''],
            email: ['', Validators.required],
            knownas: [''],
            city: [''],
            country: ['']
        });
    }

    updateUser() {
        this.user.companyId = +this.editForm.value.companyid;
        this.user.userName = this.editForm.value.username;
        this.user.firstName = this.editForm.value.firstname;
        this.user.lastName = this.editForm.value.lastname;
        this.user.mobilePhone = this.editForm.value.mobilephone;
        this.user.email = this.editForm.value.email;
        this.user.knownAs = this.editForm.value.knownas;
        this.user.city = this. editForm.value.city;
        this.user.country = this.editForm.value.country;
        this.userService.getUserByUserName(this.user.userName.toLowerCase()).subscribe( next => {
            debugger;
            if (next === null) {
                this.authService.register(this.user).subscribe(next => {
                    this.sweetAlertService.success('Successfully Added user');
                    this.router.navigate(['/filemanager']);
                }, error => {
                    this.sweetAlertService.error('Not able to Add user');
                });
            } else {
                this.sweetAlertService.error('Username already exists');
            }
        }, error2 => {
            this.sweetAlertService.error('Not able to Add user');
        })


    }

    cancelUpdate() {
        this.router.navigate(['/filemanager']);
    }
 }
