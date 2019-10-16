import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentConfigComponent } from './componentconfig.component';
import { RouterModule } from '@angular/router';
import { ComponentConfigRoutes } from './componentconfig.routing';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { jqxTreeModule } from 'jqwidgets-ng/jqxtree';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentConfigRoutes),
    FormsModule,
    jqxTreeModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [ComponentConfigComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [ComponentConfigComponent]

})
export class ComponentConfigModule {
}
