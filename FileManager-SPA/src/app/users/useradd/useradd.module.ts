import { Input, NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAddComponent } from './useradd.component';
import { UserAddRoutes } from './useradd.routing';
import { RouterModule } from '@angular/router';
import { User } from 'app/_models/user';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserAddRoutes),
    ReactiveFormsModule

],
declarations: [UserAddComponent],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserAddModule {
  @Input() user: User;
}
