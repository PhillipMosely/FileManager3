import { Routes } from '@angular/router';
import { FieldFilterComponent } from './fieldfilter.component';

export const FieldFilterRoutes: Routes = [{

    path: '',
    children: [ {
      path: 'fieldfilter',
      component: FieldFilterComponent
  }]
}];
