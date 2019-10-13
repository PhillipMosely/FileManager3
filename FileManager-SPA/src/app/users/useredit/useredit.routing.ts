import { Routes } from '@angular/router';
import { UserEditComponent } from './useredit.component';

export const UserEditRoutes: Routes = [{
    path: '',
    children: [{
        path: 'useredit',
        component: UserEditComponent
    }]
}];
