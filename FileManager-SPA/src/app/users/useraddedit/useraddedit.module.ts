import { Input, NgModule, CUSTOM_ELEMENTS_SCHEMA, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserAddEditComponent } from './useraddedit.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule

],
declarations: [UserAddEditComponent],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserAddEditModule {

}
