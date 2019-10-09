import { Routes } from '@angular/router';
import { FolderNameComponent } from './foldername.component';

export const FolderNameRoutes: Routes = [{

    path: '',
    children: [ {
      path: 'foldername',
      component: FolderNameComponent
  }]
}];
