import { Routes } from '@angular/router';
import { FileAddComponent } from './fileadd.component';

export const FileAddRoutes: Routes = [{

    path: '',
    children: [ {
      path: 'fileadd',
      component: FileAddComponent
  }]
}];
