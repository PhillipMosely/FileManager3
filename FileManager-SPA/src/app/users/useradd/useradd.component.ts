import { Component, OnInit, Input } from '@angular/core';
import { User } from 'app/_models/user';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { SweetAlertService } from 'app/_services/sweetalert.service';
import { UserService } from 'app/_services/user.service';
import { AuthService } from 'app/_services/auth.service';
import { CompanyService } from 'app/_services/company.service';
import { Company } from 'app/_models/company';


@Component({
    moduleId: module.id,
    selector: 'app-useradd',
    templateUrl: 'useradd.component.html'
})

export class UserAddComponent implements OnInit{
    editForm: FormGroup;
    user: User;
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
            company: ['', Validators.required],
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
        this.user = Object.assign('', this.editForm.value);
        this.authService.register(this.user).subscribe(next => {
            this.sweetAlertService.success('Successfully Added user');
          }, error => {
            this.sweetAlertService.error('Not able to Add user');
          });

    }

    cancelUpdate() {
        this.router.navigate(['/filemanager']);
    }
 }
