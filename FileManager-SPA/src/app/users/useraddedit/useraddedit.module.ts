import { Input, NgModule, CUSTOM_ELEMENTS_SCHEMA, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserAddEditComponent } from './useraddedit.component';
import { UserAddEditRoutes } from './useraddedit.routing';
import { RouterModule } from '@angular/router';
import { User } from 'app/_models/user';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserAddEditRoutes),
    FormsModule

],
declarations: [UserAddEditComponent],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserAddEditModule {
  @Input() user: User;
}
