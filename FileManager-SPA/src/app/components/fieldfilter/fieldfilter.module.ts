import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldFilterComponent } from './fieldfilter.component';
import { RouterModule } from '@angular/router';
import { FieldFilterRoutes } from './fieldfilter.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FieldFilterRoutes),
    FormsModule
  ],
  declarations: [FieldFilterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [FieldFilterComponent]

})
export class FieldFilterModule { }
