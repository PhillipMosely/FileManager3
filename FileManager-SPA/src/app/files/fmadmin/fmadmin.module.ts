import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { jqxDataTableModule } from 'jqwidgets-ng/jqxdatatable';

import { ModalModule } from 'app/components/modal/modal.module';
import { FMAdminRoutes } from './fmadmin.routing.';
import { FMAdminComponent } from './fmadmin.component';
import { UserAddModule } from 'app/users/useradd/useradd.module';
import { UserEditModule } from 'app/users/useredit/useredit.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FMAdminRoutes),
    FormsModule,
    ReactiveFormsModule,
    jqxDataTableModule,
    ModalModule,
    UserAddModule,
    UserEditModule
],
declarations: [FMAdminComponent],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FMAdminModule { }
