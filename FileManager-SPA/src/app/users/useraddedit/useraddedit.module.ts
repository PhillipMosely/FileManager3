import { Input, NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAddEditComponent } from './useraddedit.component';
import { UserAddEditRoutes } from './useraddedit.routing';
import { RouterModule } from '@angular/router';
import { User } from 'app/_models/user';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserAddEditRoutes),
    ReactiveFormsModule

],
declarations: [UserAddEditComponent],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserAddEditModule {
  @Input() user: User;
}
