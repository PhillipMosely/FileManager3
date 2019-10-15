import { Routes } from '@angular/router';
import { LabelAdminComponent } from './labeladmin.component';

export const LabelAdminRoutes: Routes = [{
    path: '',
    children: [{
        path: 'labeladmin',
        component: LabelAdminComponent
    }]
}];
