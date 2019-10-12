import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jqxDataTableModule } from 'jqwidgets-ng/jqxdatatable';

import { ModalModule } from 'app/components/modal/modal.module';
import { FMAdminRoutes } from './fmadmin.routing.';
import { FMAdminComponent } from './fmadmin.component';
import { UserAddModule } from 'app/users/useradd/useradd.module';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FMAdminRoutes),
    FormsModule,
    jqxDataTableModule,
    ModalModule,
    UserAddModule
],
declarations: [FMAdminComponent],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FMAdminModule { }
