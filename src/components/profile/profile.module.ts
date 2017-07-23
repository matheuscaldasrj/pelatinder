import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileComponent } from './profile';
import { FormsModule, ReactiveFormsModule }         from '@angular/forms';

@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    IonicPageModule.forChild(ProfileComponent),
  ],
  exports: [
    ProfileComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProfileComponentModule {}
