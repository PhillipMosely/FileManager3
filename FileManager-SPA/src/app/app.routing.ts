import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [{
        path: '',
        redirectTo: 'pages/login',
        pathMatch: 'full',
      },{
        path: '',
        component: AdminLayoutComponent,
        children: [{
            path: '',
            loadChildren: './files/filemanager/filemanager.module#FilemanagerModule'
        },{
            path: '',
            loadChildren: './users/profileedit/profileedit.module#ProfileEditModule'
        },{
            path: 'sitesettings',
            loadChildren: './users/useradd/useradd.module#UserAddModule'
        },
        {
            path: 'sitesettings',
            loadChildren: './files/fmadmin/fmadmin.module#FMAdminModule'
        },{
            path: 'companysettings',
            loadChildren: './labels/labeladmin/labeladmin.module#LabelAdminModule'
        },
        {
            path: '',
            loadChildren: './dashboard/dashboard.module#DashboardModule'
        },{
            path: '',
            loadChildren: './userpage/user.module#UserModule'
        }]
        },{
            path: '',
            component: AuthLayoutComponent,
            children: [{
                path: 'pages',
                loadChildren: './pages/pages.module#PagesModule'
            }]
        }
];
