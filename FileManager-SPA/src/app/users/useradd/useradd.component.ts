import { Component, OnInit, Input } from '@angular/core';
import { User } from 'app/_models/user';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { SweetAlertService } from 'app/_services/sweetalert.service';
import { UserService } from 'app/_services/user.service';
import { AuthService } from 'app/_services/auth.service';
import { UserComponent } from 'app/userpage/user.component';


@Component({
    moduleId: module.id,
    selector: 'app-useradd',
    templateUrl: 'useradd.component.html'
})

export class UserAddComponent implements OnInit{
    editForm: FormGroup;
    user: User;

    constructor(private sweetAlertService: SweetAlertService,
                private userService: UserService,
                private fb: FormBuilder, private router: Router,
                private authService: AuthService) { }

    ngOnInit() {
        this.createEditForm();
    }

    createEditForm() {
        this.editForm = this.fb.group({
            company: [''],
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
