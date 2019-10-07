import { Routes } from '@angular/router';
import { FilemanagerComponent } from './filemanager.component';

export const FilemanagerRoutes: Routes = [{

    path: '',
    children: [ {
      path: 'filemanager',
      component: FilemanagerComponent
  }]
}];
