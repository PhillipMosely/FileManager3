import { Component, OnInit, Input } from '@angular/core';
import { User } from 'app/_models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetAlertService } from 'app/_services/sweetalert.service';
import { UserService } from 'app/_services/user.service';
import { AuthService } from 'app/_services/auth.service';
import { Utilities } from 'app/_helpers/utilities';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';


@Component({
    moduleId: module.id,
    selector: 'app-profileedit',
    templateUrl: 'profileedit.component.html',
    styleUrls: ['./profileedit.component.css']
})

export class ProfileEditComponent implements OnInit {
    @Input() user: User;
    profileEditForm: FormGroup;
    editPhotoMode = false;
    public uploader: FileUploader;
    hasBaseDropZoneOver = false;
    baseUrl = environment.apiUrl;
    // @HostListener('window:beforeunload', ['$event'])
    //   unloadNotification($event: any) {
    //     if (this.editForm.dirty) {
    //       $event.returnValue = true;
    //     }
    // }

    constructor(private sweetAlertService: SweetAlertService,
                private userService: UserService,
                private fb: FormBuilder, private router: Router,
                private authService: AuthService) { }

    ngOnInit() {
        if (!this.user) {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        this.createEditForm();
        this.initializeUploader();
    }

    getLabel(modelName: string) {
        return Utilities.labelforModelName(modelName);
    }

    createEditForm() {
        this.profileEditForm = this.fb.group({
            company: [this.user.company.companyName],
            firstname: [this.user.firstName, Validators.required],
            lastname: [this.user.lastName, Validators.required],
            username: [this.user.userName, Validators.required],
            mobilephone: [this.user.mobilePhone],
            email: [this.user.email, Validators.required],
            knownas: [this.user.knownAs],
            city: [this.user.city],
            country: [this.user.country]
        });
    }

    updateUser() {
        this.user.userName = this.profileEditForm.value.username;
        this.user.firstName = this.profileEditForm.value.firstname;
        this.user.lastName = this.profileEditForm.value.lastname;
        this.user.mobilePhone = this.profileEditForm.value.mobilephone;
        this.user.email = this.profileEditForm.value.email;
        this.user.knownAs = this.profileEditForm.value.knownas;
        this.user.city = this. profileEditForm.value.city;
        this.user.country = this.profileEditForm.value.country;
        
        this.user.companyId = this.user.company.id;
        
        this.userService.updateUser(this.user.id, this.user).subscribe(next => {
            this.authService.updateUserInfo(this.user);
            this.sweetAlertService.success('Successfully updated user');
            this.router.navigate(['/filemanager']);
          }, error => {
            this.sweetAlertService.error('Not able to update user');
          });

    }

    cancelUpdate() {
        this.router.navigate(['/filemanager']);
    }

    deletePhoto() {
        this.sweetAlertService.confirm('Are you sure you want to delete the profile photo', 'delete', () => {
            this.user.photoUrl = '../../assets/img/user.png';
            this.userService.updateUser(this.user.id, this.user).subscribe( next => {
                this.authService.updateMemberPhoto('../../assets/img/user.png');
                this.sweetAlertService.message('Photo removed');
            }, error => {
                this.sweetAlertService.message('Not able to remove photo');
            })
        });
    }

    updatePhoto() {
        this.editPhotoMode = true;
    }

    cancelPhotoUpdate() {
        if (this.uploader.queue.length > 0) {
            this.uploader.clearQueue()
        }
        this.editPhotoMode = false;
    }

    fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }
    
    initializeUploader() {
        this.uploader = new FileUploader({
            url: this.baseUrl + 'users/' + this.user.id + '/updateprofilepicture',
            authToken: 'Bearer ' + localStorage.getItem('token'),
            isHTML5: true,
            allowedFileType: ['image'],
            removeAfterUpload: true,
            autoUpload: true,
            maxFileSize: 10 * 1024 * 1024,
        });

        this.uploader.onBeforeUploadItem = (file) => {file.url = this.baseUrl + 'users/' + this.user.id + '/updateprofilepicture' };
        this.uploader.onAfterAddingFile = (file) => {
            file.withCredentials = false;
            if (this.uploader.queue.length > 1) {
                this.uploader.removeFromQueue(this.uploader.queue[0]);
            }
        };

        this.uploader.onSuccessItem = (item, response, status, headers) => {
            if (response) {
                this.userService.getUser(this.user.id).subscribe(next => {
                    this.user = next;
                    this.editPhotoMode = false;
                    this.authService.updateUserInfo(this.user);
                    this.authService.updateMemberPhoto(this.user.photoUrl);
                })
            }

        };
    }
 }
