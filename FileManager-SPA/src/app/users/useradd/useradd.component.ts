import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'app/_models/user';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { SweetAlertService } from 'app/_services/sweetalert.service';
import { UserService } from 'app/_services/user.service';
import { AuthService } from 'app/_services/auth.service';
import { CompanyService } from 'app/_services/company.service';
import { Company } from 'app/_models/company';
import { Role } from 'app/_models/role';
import { RoleService } from 'app/_services/role.service';
import { UserRole } from 'app/_models/userrole';

@Component({
    selector: 'app-useradd',
    templateUrl: './useradd.component.html'
})

export class UserAddComponent implements OnInit{
    @Input() useCloseEvent: boolean;
    @Output() closeEvent = new EventEmitter<string>();
    userAddForm: FormGroup;
    user = {} as User;
    companys: Company[];
    roles: Role[];
    donotsubmit = false;

    constructor(private sweetAlertService: SweetAlertService,
                private userService: UserService,
                private companyService: CompanyService,
                private fb: FormBuilder, private router: Router,
                private authService: AuthService,
                private roleService: RoleService) { }

    ngOnInit() {
        this.companyService.getCompanys().subscribe( next => {
            this.companys = next.result;
        });
        this.roleService.getRoles().subscribe( next => {
            this.roles = next.result;
        });
        this.createEditForm();
    }

    createEditForm() {
        this.userAddForm = this.fb.group({
            companyid: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            username: ['', Validators.required],
            mobilephone: [''],
            email: ['', Validators.required],
            knownas: [''],
            city: [''],
            country: [''],
            subfolder: ['', Validators.required],
            roles: ['', Validators.required]
        });
    }

    updateUser() {
        if (this.donotsubmit) {
            return;
        }

        this.user.companyId = +this.userAddForm.value.companyid;
        this.user.userName = this.userAddForm.value.username;
        this.user.firstName = this.userAddForm.value.firstname;
        this.user.lastName = this.userAddForm.value.lastname;
        this.user.mobilePhone = this.userAddForm.value.mobilephone;
        this.user.email = this.userAddForm.value.email;
        this.user.knownAs = this.userAddForm.value.knownas;
        this.user.city = this.userAddForm.value.city;
        this.user.country = this.userAddForm.value.country;


        if (this.userAddForm.value.roles) {
            const myUserRoles = {} as UserRole[];
            for (let i = 0; i < this.userAddForm.value.roles.length; i++) {
                const myRole: Role = {id: this.userAddForm.value.roles[i], roleName: '', description: '',
                                      isSuperUser: false, isCompanyAdmin: false, dateCreated: null, dateModified: null};
                myUserRoles[i] = {role: myRole};
            }
            this.user.roles = myUserRoles;
        }

        this.userService.getUserByUserName(this.user.userName.toLowerCase()).subscribe( next => {
            if (next === null) {
                this.authService.register(this.user, this.userAddForm.value.subfolder).subscribe( next2 => {
                    this.sweetAlertService.success('Successfully Added user');
                    this.navigateAfterSaveCancel();
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
        this.donotsubmit = true;
        this.navigateAfterSaveCancel();
    }

    navigateAfterSaveCancel() {
        if ( this.useCloseEvent) {
            this.closeEvent.emit('done');
        } else {
            this.router.navigate(['/siteadmin/fmadmin']);
        }
    }
 }
