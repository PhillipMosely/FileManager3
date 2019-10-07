import { Routes } from '@angular/router';
import { FileAddTestComponent } from './fileaddtest.component';

export const FileAddTestRoutes: Routes = [{

    path: '',
    children: [ {
      path: 'fileaddtest',
      component: FileAddTestComponent
  }]
}];
