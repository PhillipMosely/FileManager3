import { Input, NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEditComponent } from './useredit.component';
import { UserEditRoutes } from './useredit.routing';
import { RouterModule } from '@angular/router';
import { User } from 'app/_models/user';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserEditRoutes),
    ReactiveFormsModule

],
declarations: [UserEditComponent],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserEditModule {
  @Input() user: User;
}
