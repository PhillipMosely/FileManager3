import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelAdminComponent } from './labeladmin.component';
import { RouterModule } from '@angular/router';
import { LabelAdminRoutes } from './labeladmin.routing';
import { jqxDataTableModule } from 'jqwidgets-ng/jqxdatatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ModalModule } from 'app/components/modal/modal.module';
import { FieldUpdateModule } from 'app/components/fieldupdate/fieldupdate.module';
import { FieldFilterModule } from 'app/components/fieldfilter/fieldfilter.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LabelAdminRoutes),
    FormsModule,
    ReactiveFormsModule,
    jqxDataTableModule,
    ModalModule,
    FieldUpdateModule,
    FieldFilterModule
  ],
  declarations: [LabelAdminComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [LabelAdminComponent]

})
export class LabelAdminModule { }
