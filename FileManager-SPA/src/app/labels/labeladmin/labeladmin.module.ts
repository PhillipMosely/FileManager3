import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelAdminComponent } from './labeladmin.component';
import { RouterModule } from '@angular/router';
import { LabelAdminRoutes } from './labeladmin.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LabelAdminRoutes)
  ],
  declarations: [LabelAdminComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [LabelAdminComponent]
  
})
export class LabelAdminModule { }
