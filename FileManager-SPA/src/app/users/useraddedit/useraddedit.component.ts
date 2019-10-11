import { Component, ViewChild, HostListener, OnInit, Input } from '@angular/core';
import { User } from 'app/_models/user';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SweetAlertService } from 'app/_services/sweetalert.service';
import { UserService } from 'app/_services/user.service';
import { AuthService } from 'app/_services/auth.service';

@Component({
    moduleId: module.id,
    selector: 'app-useraddedit',
    templateUrl: 'useraddedit.component.html'
})

export class UserAddEditComponent implements OnInit{
    @Input() user: User;
    editForm: FormGroup;
    // @HostListener('window:beforeunload', ['$event'])
    //   unloadNotification($event: any) {
    //     if (this.editForm.dirty) {
    //       $event.returnValue = true;
    //     }
    // }

    constructor(private sweetAlertService: SweetAlertService,
                private userService: UserService,
                private fb: FormBuilder) { }

    ngOnInit() {
        if (!this.user) {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        this.createEditForm();
    }

    createEditForm() {
        this.editForm = this.fb.group({
            company: [this.user.company.companyName],
            firstname: [this.user.firstName, Validators.required],
            lastname: [this.user.lastName, Validators.required],
            username: [this.user.userName, Validators.required],
            mobilephone: [this.user.mobilePhone],
            email: [this.user.email, Validators.required],
            knownAs: [this.user.knownAs],
            city: [this.user.city],
            country: [this.user.country]
        });
    }

    updateUser() {
        this.userService.updateUser(this.user.id, this.user).subscribe(next => {
            this.sweetAlertService.success('Successfully updated user');
          }, error => {
            this.sweetAlertService.error('Not able to update user');
          });

    }
 }
