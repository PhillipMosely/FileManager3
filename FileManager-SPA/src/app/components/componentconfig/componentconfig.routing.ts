import { Routes } from '@angular/router';
import { ComponentConfigComponent } from './componentconfig.component';

export const ComponentConfigRoutes: Routes = [{

    path: '',
    children: [ {
      path: 'componentconfig',
      component: ComponentConfigComponent
  }]
}];
