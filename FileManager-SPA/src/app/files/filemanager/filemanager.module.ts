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
import { BsDatepickerModule } from 'ngx-bootstrap';

import { FilemanagerRoutes } from './filemanager.routing';
import { FilemanagerComponent } from './filemanager.component';
import { ModalModule } from 'app/components/modal/modal.module';
import { FileAddModule } from '../fileadd/fileadd.module';
import { FileViewComponent } from '../fileview/fileview.component';
import { FieldUpdateModule } from 'app/components/fieldupdate/fieldupdate.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FilemanagerRoutes),
    FormsModule,
    jqxTreeModule,
    jqxSplitterModule,
    jqxDataTableModule,
    jqxButtonModule,
    BsDatepickerModule.forRoot(),
    ModalModule,
    FileAddModule,
    FieldUpdateModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
],
declarations: [FilemanagerComponent,
  FileViewComponent],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FilemanagerModule { }
