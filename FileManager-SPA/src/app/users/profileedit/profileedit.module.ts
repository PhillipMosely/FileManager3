import { Input, NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileEditComponent } from './profileedit.component';
import { ProfileEditRoutes } from './profileedit.routing';
import { RouterModule } from '@angular/router';
import { User } from 'app/_models/user';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProfileEditRoutes),
    ReactiveFormsModule,
    FileUploadModule

],
declarations: [ProfileEditComponent],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileEditModule {
  @Input() user: User;
}
