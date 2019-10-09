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

import { FilemanagerRoutes } from './filemanager.routing';
import { FilemanagerComponent } from './filemanager.component';
import { ModalModule } from 'app/components/modal/modal.module';
import { FileAddModule } from '../fileadd/fileadd.module';
import { FileViewComponent } from '../fileview/fileview.component';
import { FolderNameComponent } from '../foldername/foldername.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FilemanagerRoutes),
    FormsModule,
    jqxTreeModule,
    jqxSplitterModule,
    jqxDataTableModule,
    jqxButtonModule,
    ModalModule,
    FileAddModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
],
declarations: [FilemanagerComponent,
  FileViewComponent,
  FolderNameComponent],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FilemanagerModule { }
