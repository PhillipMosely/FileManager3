import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldUpdateComponent } from './fieldupdate.component';
import { RouterModule } from '@angular/router';
import { FieldUpdateRoutes } from './fieldupdate.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FieldUpdateRoutes),
    FormsModule
  ],
  declarations: [FieldUpdateComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [FieldUpdateComponent]

})
export class FieldUpdateModule { }
