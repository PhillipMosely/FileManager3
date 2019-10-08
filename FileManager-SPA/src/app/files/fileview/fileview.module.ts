import { NgModule, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileViewComponent } from './fileview.component';
import { File } from '../../_models/file';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'app/components/modal/modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule
  ],
  declarations: [FileViewComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [FileViewComponent]
})
export class FileViewModule {
  @Input() myFile: File;
 }
