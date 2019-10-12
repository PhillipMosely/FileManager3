import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { jqxDataTableModule } from 'jqwidgets-ng/jqxdatatable';

import { ModalModule } from 'app/components/modal/modal.module';
import { FMAdminRoutes } from './fmadmin.routing.';
import { FMAdminComponent } from './fmadmin.component';




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FMAdminRoutes),
    FormsModule,
    ReactiveFormsModule,
    jqxDataTableModule,
    ModalModule
],
declarations: [FMAdminComponent],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FMAdminModule { }
