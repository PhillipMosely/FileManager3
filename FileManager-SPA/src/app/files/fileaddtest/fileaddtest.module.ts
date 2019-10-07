import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileAddTestComponent } from './fileaddtest.component';
import { RouterModule } from '@angular/router';
import { FileAddTestRoutes } from './fileaddtest.routing';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FileAddTestRoutes),
],
declarations: [FileAddTestComponent],
schemas: [CUSTOM_ELEMENTS_SCHEMA],
exports: [FileAddTestComponent]
})
export class FileAddTestModule { }
