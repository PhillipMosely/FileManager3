import { Input, NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEditComponent } from './useredit.component';
import { UserEditRoutes } from './useredit.routing';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from 'app/_models/user';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserEditRoutes),
    ReactiveFormsModule

],
declarations: [UserEditComponent],
schemas: [CUSTOM_ELEMENTS_SCHEMA],
exports: [UserEditComponent]
})
export class UserEditModule {
  @Input() useCloseEvent: boolean;
  @Input() user: User;
}
