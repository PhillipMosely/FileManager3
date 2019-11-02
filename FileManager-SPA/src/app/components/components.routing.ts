import { Routes } from '@angular/router';

import { PanelsComponent } from './panels/panels.component';
import { SweetAlertComponent } from './sweetalert/sweetalert.component';
import { TypographyComponent } from './typography/typography.component';


export const ComponentsRoutes: Routes = [{
        path: '',
        children: [{
            path: 'panels',
            component: PanelsComponent
        }]
    },{
        path: '',
        children: [{
            path: 'sweet-alert',
            component: SweetAlertComponent
        }]
    },{
        path: '',
        children: [{
            path: 'typography',
            component: TypographyComponent
        }]
    }
];
