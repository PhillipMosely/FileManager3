import { Routes } from '@angular/router';
import { FMAdminComponent } from './fmadmin.component';

export const FMAdminRoutes: Routes = [{

    path: '',
    children: [ {
      path: 'fmadmin',
      component: FMAdminComponent
  }]
}];
