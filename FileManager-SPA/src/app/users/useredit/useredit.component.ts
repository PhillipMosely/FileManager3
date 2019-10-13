import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'app/_models/user';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { SweetAlertService } from 'app/_services/sweetalert.service';
import { UserService } from 'app/_services/user.service';
import { AuthService } from 'app/_services/auth.service';
import { CompanyService } from 'app/_services/company.service';
import { Company } from 'app/_models/company';
import { ModalService } from 'app/_services/modal.service';


@Component({
    selector: 'app-useredit',
    templateUrl: './useredit.component.html'
})

export class UserEditComponent implements OnInit{
    @Input() useCloseEvent: boolean;
    @Output() closeEvent = new EventEmitter<string>();
    editForm: FormGroup;
    user = {} as User;
    companys: Company[];
    donotsubmit = false;

    constructor(private sweetAlertService: SweetAlertService,
                private userService: UserService,
                private companyService: CompanyService,
                private fb: FormBuilder, private router: Router,
                private authService: AuthService,
                private modalService: ModalService) { }

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
            country: [''],
            subfolder: ['', Validators.required]
        });
    }

    updateUser() {
        if (this.donotsubmit) {
            return;
        }

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
            if (next === null) {
                this.authService.register(this.user, this.editForm.value.subfolder).subscribe(next => {
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
