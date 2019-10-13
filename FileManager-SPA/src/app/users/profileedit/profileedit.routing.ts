import { Routes } from '@angular/router';
import { ProfileEditComponent } from './profileedit.component';

export const ProfileEditRoutes: Routes = [{
    path: '',
    children: [{
        path: 'profileedit',
        component: ProfileEditComponent
    }]
}];
