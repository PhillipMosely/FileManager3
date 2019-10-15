import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelAdminComponent } from './labeladmin.component';
import { RouterModule } from '@angular/router';
import { LabelAdminRoutes } from './labeladmin.routing';
import { jqxDataTableModule } from 'jqwidgets-ng/jqxdatatable';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ModalModule } from 'app/components/modal/modal.module';
import { FieldUpdateModule } from 'app/components/fieldupdate/fieldupdate.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LabelAdminRoutes),
    FormsModule,
    ReactiveFormsModule,
    jqxDataTableModule,
    BsDatepickerModule.forRoot(),
    ModalModule,
    FieldUpdateModule
  ],
  declarations: [LabelAdminComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [LabelAdminComponent]

})
export class LabelAdminModule { }
