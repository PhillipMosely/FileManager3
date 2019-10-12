import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
import { jqxTreeModule } from 'jqwidgets-ng/jqxtree';
import { jqxSplitterModule} from 'jqwidgets-ng/jqxsplitter';
import { jqxDataTableModule } from 'jqwidgets-ng/jqxdatatable';
import {
  AgmCoreModule
} from '@agm/core';

import { ModalModule } from 'app/components/modal/modal.module';
import { FMAdminRoutes } from './fmadmin.routing.';
import { FMAdminComponent } from './fmadmin.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FMAdminRoutes),
    FormsModule,
    jqxDataTableModule,
    ModalModule
],
declarations: [FMAdminComponent],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FMAdminModule { }
