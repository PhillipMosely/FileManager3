import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { User } from 'app/_models/user';
import { NgForm } from '@angular/forms';
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
    @ViewChild('editForm', {static: true}) editForm: NgForm;
    user: User;
    photoUrl: string;
    // @HostListener('window:beforeunload', ['$event'])
    //   unloadNotification($event: any) {
    //     if (this.editForm.dirty) {
    //       $event.returnValue = true;
    //     }
    // }

    constructor(private route: ActivatedRoute, private sweetAlert: SweetAlertService,
        private userService: UserService, private authService: AuthService) { }

    ngOnInit() {
        this.route.data.subscribe(data => {
          this.user = data['user'];
        });
        this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
    }

    updateUser() {
        
    }
 }
