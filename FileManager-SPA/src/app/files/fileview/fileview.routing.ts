import { Routes } from '@angular/router';
import { FileViewComponent } from './fileview.component';

export const FileViewRoutes: Routes = [{

    path: '',
    children: [ {
      path: 'fileview',
      component: FileViewComponent
  }]
}];
