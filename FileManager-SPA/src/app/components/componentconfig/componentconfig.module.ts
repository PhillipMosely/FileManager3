import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentConfigComponent } from './componentconfig.component';
import { RouterModule } from '@angular/router';
import { ComponentConfigRoutes } from './componentconfig.routing';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentConfigRoutes),
    FormsModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [ComponentConfigComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [ComponentConfigComponent]

})
export class ComponentConfigModule {}
