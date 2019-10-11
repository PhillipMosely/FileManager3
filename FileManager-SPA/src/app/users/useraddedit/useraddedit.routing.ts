import { Routes } from '@angular/router';

import { UserAddEditComponent } from './useraddedit.component';

export const UserAddEditRoutes: Routes = [{
    path: '',
    children: [{
        path: 'useraddedit',
        component: UserAddEditComponent
    }]
}];
