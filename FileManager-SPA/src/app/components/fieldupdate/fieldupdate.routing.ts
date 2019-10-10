import { Routes } from '@angular/router';
import { FieldUpdateComponent } from './fieldupdate.component';

export const FieldUpdateRoutes: Routes = [{

    path: '',
    children: [ {
      path: 'fieldupdate',
      component: FieldUpdateComponent
  }]
}];
