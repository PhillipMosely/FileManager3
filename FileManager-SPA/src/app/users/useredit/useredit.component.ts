import { Component, OnInit, Input, Output, EventEmitter, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { User } from 'app/_models/user';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { SweetAlertService } from 'app/_services/sweetalert.service';
import { UserService } from 'app/_services/user.service';
import { CompanyService } from 'app/_services/company.service';
import { Company } from 'app/_models/company';
import { FileManagerAdminService } from 'app/_services/filemanageradmin.service';
import { FileManagerAdmin } from 'app/_models/filemanageradmin';
import { Role } from 'app/_models/role';
import { RoleService } from 'app/_services/role.service';
import { UserRole } from 'app/_models/userrole';

@Component({
    selector: 'app-useredit',
    templateUrl: './useredit.component.html'
})

export class UserEditComponent implements OnInit{
    @Input() useCloseEvent: boolean;
    // @Input() user: User;
    @Output() closeEventEdit = new EventEmitter<string>();

    private _user: User;

    @Input() set user(value: User) {

       this._user = value;
       this.createEditForm();
       this.donotsubmit = false;

    }

    get user(): User {

        return this._user;

    }
    roles: Role[];
    userEditForm: FormGroup;
    companys: Company[];
    donotsubmit = false;
    myFMAdmin: FileManagerAdmin;

    constructor(private sweetAlertService: SweetAlertService,
                private userService: UserService,
                private companyService: CompanyService,
                private fb: FormBuilder, private router: Router,
                private fileManagerAdminService: FileManagerAdminService,
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

        if (this.user) {
            this.fileManagerAdminService.getFMAdminForUserId(this.user.id).subscribe( next => {
                this.myFMAdmin = next;
                this.userEditForm = this.fb.group({
                    companyid: [this.user.company.id, Validators.required],
                    firstname: [this.user.firstName, Validators.required],
                    lastname: [this.user.lastName, Validators.required],
                    username: [this.user.userName, Validators.required],
                    mobilephone: [this.user.mobilePhone],
                    email: [this.user.email, Validators.required],
                    knownas: [this.user.knownAs],
                    city: [this.user.city],
                    country: [this.user.country],
                    subfolder: [next.subFolderName, Validators.required],
                    roles: [[this.user.roles[0].roleId], Validators.required]
                });

            });
        } else {
            this.userEditForm = this.fb.group({
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
    }

    updateUser() {
        if (this.donotsubmit) {
            return;
        }

        if (!this.userEditForm.dirty) {
            this.donotsubmit = true;
            this.navigateAfterSaveCancel();
            return;
        }

        this.user.companyId = +this.userEditForm.value.companyid;
        this.user.userName = this.userEditForm.value.username;
        this.user.firstName = this.userEditForm.value.firstname;
        this.user.lastName = this.userEditForm.value.lastname;
        this.user.mobilePhone = this.userEditForm.value.mobilephone;
        this.user.email = this.userEditForm.value.email;
        this.user.knownAs = this.userEditForm.value.knownas;
        this.user.city = this.userEditForm.value.city;
        this.user.country = this.userEditForm.value.country;

        if (this.userEditForm.value.roles) {
            let myUserRoles = {} as UserRole[];
            for (let i = 0; i < this.userEditForm.value.roles.length; i++) {
                const myRole: Role = {id: this.userEditForm.value.roles[i], roleName: '', description: '',
                                      isSuperUser: false, isCompanyAdmin: false,
                                      dateCreated: this.user.dateCreated, dateModified: this.user.dateModified};
                myUserRoles = [{ roleId: myRole.id, role: myRole}];
            }
            this.user.roles = myUserRoles;
        }

        this.userService.updateUser(this.user.id, this.user).subscribe( next => {
            this.myFMAdmin.subFolderName = this.userEditForm.value.subfolder;
            this.fileManagerAdminService.updateFMAdmin(this.myFMAdmin.id, this.myFMAdmin).subscribe(next2 => {
                this.sweetAlertService.success('Successfully updated user');
                this.navigateAfterSaveCancel();
            }, error => {
                this.sweetAlertService.error('Not able to Update user folder');
            });
        }, error2 => {
            this.sweetAlertService.error('Not able to Update user');
        })


    }

    cancelUpdate() {
        this.donotsubmit = true;
        this.navigateAfterSaveCancel();
    }

    navigateAfterSaveCancel() {
        if ( this.useCloseEvent) {
            this.closeEventEdit.emit('done');
        } else {
            this.router.navigate(['/siteadmin/fmadmin']);
        }
    }
 }
