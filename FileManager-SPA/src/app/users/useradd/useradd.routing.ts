import { Routes } from '@angular/router';
import { UserAddComponent } from './useradd.component';

export const UserAddRoutes: Routes = [{
    path: '',
    children: [{
        path: 'useradd',
        component: UserAddComponent
    }]
}];
